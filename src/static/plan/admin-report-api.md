# 댓글 신고 API 변경사항

**작성일**: 2025-10-18  
**목적**: 댓글 신고 시스템에 신고당한 사용자 정보 추가 및 Admin API 확장

## 데이터베이스 변경사항

### comment_report 테이블 수정

기존 테이블에 `reported_user_id` 컬럼을 추가하여 신고당한 댓글 작성자 정보를 저장합니다.

```sql
ALTER TABLE comment_report 
ADD COLUMN reported_user_id BIGINT NOT NULL,
ADD CONSTRAINT FK_comment_report_reported_user 
FOREIGN KEY (reported_user_id) REFERENCES users (id);
```

### 테이블 구조 (변경 후)
- `id`: 신고 ID (Primary Key)
- `created_at`: 신고 생성일시
- `updated_at`: 신고 수정일시
- `reason`: 신고 사유
- `status`: 신고 상태
- `comment_id`: 신고된 댓글 ID (Foreign Key)
- `user_id`: 신고한 사용자 ID (Foreign Key)
- `reported_user_id`: 신고당한 사용자 ID (Foreign Key) **[NEW]**

## 엔티티 변경사항

### CommentReport 엔티티
```java
@Entity
public class CommentReport extends BaseEntity {
    // 기존 필드들...
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_user_id", nullable = false)
    private User reportedUser; // 추가된 필드
}
```

### 신고 생성 로직 변경
댓글 신고 시 `comment.getUser()`를 통해 신고당한 사용자 정보가 자동으로 설정됩니다.

## API 변경사항

### Admin API 엔드포인트 변경

#### 1. 기존 API 경로 변경
- **변경 전**: `GET /api/admin/users/{userId}/reports`
- **변경 후**: `GET /api/admin/users/{userId}/reports/received`
- **기능**: 특정 사용자가 **신고당한** 댓글 내역 조회

#### 2. 새로운 API 추가
- **경로**: `GET /api/admin/users/{userId}/reports/sent`
- **기능**: 특정 사용자가 **신고한** 댓글 내역 조회
- **권한**: ADMIN 역할 필요 (`@PreAuthorize("hasRole('ADMIN')")`)

### API 상세 정보

#### 신고당한 이력 조회
```http
GET /api/admin/users/{userId}/reports/received?page=0&size=20
```

**응답 예시**:
```json
{
  "status": "SUCCESS",
  "message": "요청이 성공했습니다.",
  "data": {
    "content": [
      {
        "reportId": 1,
        "reportReason": "부적절한 표현",
        "reportStatus": "ACTIVE",
        "reportedAt": "2025-10-18T10:30:00",
        "commentId": 123,
        "commentContent": "신고당한 댓글 내용",
        "reporterId": 456,
        "reporterEmail": "reporter@example.com",
        "reporterNickname": "신고자닉네임",
        "billId": 789,
        "billTitle": "관련 법안 제목",
        "billProposeDate": "2025-10-01"
      }
    ],
    "hasNext": false,
    "numberOfElements": 1
  }
}
```

#### 신고한 이력 조회
```http
GET /api/admin/users/{userId}/reports/sent?page=0&size=20
```

**응답 예시**:
```json
{
  "status": "SUCCESS",
  "message": "요청이 성공했습니다.",
  "data": {
    "content": [
      {
        "reportId": 2,
        "reportReason": "스팸성 댓글",
        "reportStatus": "ACTIVE",
        "reportedAt": "2025-10-18T11:00:00",
        "commentId": 124,
        "commentContent": "신고한 댓글 내용",
        "commenterId": 789,
        "commenterEmail": "commenter@example.com",
        "commenterNickname": "댓글작성자닉네임",
        "billId": 790,
        "billTitle": "관련 법안 제목",
        "billProposeDate": "2025-10-02"
      }
    ],
    "hasNext": false,
    "numberOfElements": 1
  }
}
```

## 서비스 레이어 변경사항

### CommentReportService 새로운 메서드
```java
@Transactional(readOnly = true)
public SliceResponse<UserReportHistoryResponseDto> getReportHistoryByReportedUser(
    Long reportedUserId, 
    Pageable pageable
) {
    // 신고당한 사용자 기준으로 신고 이력 조회
}
```

### CommentReportRepository 새로운 쿼리
```java
@Query("""
    SELECT r.id AS reportId, r.reason AS reportReason, ...
    FROM CommentReport r
    JOIN r.comment c
    JOIN r.user ru
    JOIN ru.profile rup
    JOIN c.bill b
    WHERE r.reportedUser.id = :reportedUserId
    ORDER BY r.createdAt DESC
""")
Slice<UserReportHistoryProjection> findByReportedUserId(
    @Param("reportedUserId") Long reportedUserId, 
    Pageable pageable
);
```

## 마이그레이션 가이드

1. **데이터베이스 스키마 업데이트**
   ```sql
   -- add_reported_user_column.sql 실행
   ALTER TABLE comment_report ADD COLUMN reported_user_id BIGINT NOT NULL;
   ALTER TABLE comment_report ADD CONSTRAINT FK_comment_report_reported_user 
   FOREIGN KEY (reported_user_id) REFERENCES users (id);
   ```

2. **기존 데이터 마이그레이션** (필요시)
   ```sql
   -- 기존 신고 데이터의 reported_user_id를 comment의 작성자로 설정
   UPDATE comment_report cr 
   SET reported_user_id = (
       SELECT c.user_id 
       FROM comment c 
       WHERE c.id = cr.comment_id
   );
   ```

3. **API 클라이언트 업데이트**
    - 기존 `/api/admin/users/{userId}/reports` 호출을 `/api/admin/users/{userId}/reports/received`로 변경
    - 필요시 `/api/admin/users/{userId}/reports/sent` 엔드포인트 추가 활용

## 주의사항

- 모든 Admin API는 ADMIN 역할이 필요합니다
- 페이징 파라미터는 선택사항이며, 기본값은 page=0, size=20입니다
- 응답 데이터는 신고 생성일시 기준 내림차순으로 정렬됩니다
- 신고당한 사용자와 신고한 사용자의 구분이 명확해져 관리자의 사용자 관리가 효율적으로 개선됩니다