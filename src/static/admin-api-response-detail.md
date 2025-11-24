# Admin API 응답값 상세 문서

## 개요
이 문서는 Graypick (Graydang) 애플리케이션의 모든 Admin API 응답값에 대한 상세한 설명을 제공합니다. 프론트엔드 개발자가 API 응답을 정확히 이해하고 구현할 수 있도록 작성되었습니다.

## 공통 응답 구조

### BaseResponse<T>
모든 Admin API는 일관된 응답 형식을 사용합니다.

```json
{
  "isSuccess": boolean,
  "responseCode": number,
  "responseMessage": string,
  "result": T
}
```

| 필드명 | 타입 | 설명 | 예시값 |
|--------|------|------|--------|
| `isSuccess` | Boolean | 요청 성공 여부 | `true`, `false` |
| `responseCode` | Integer | 응답 코드 | `1000` (성공), `2601` (사용자 없음) |
| `responseMessage` | String | 응답 메시지 | `"요청에 성공하였습니다."` |
| `result` | Generic | 실제 응답 데이터 | 아래 상세 참조 |

### 성공 응답 코드
- `1000`: 요청에 성공하였습니다.

### 주요 에러 응답 코드
| 코드 | 메시지 | 설명 |
|------|--------|------|
| `2601` | 존재하지 않는 사용자입니다. | 요청한 사용자 ID가 존재하지 않음 |
| `3004` | 이미 차단된 사용자입니다. | 이미 차단된 사용자를 다시 차단하려고 시도 |
| `3005` | 차단되지 않은 사용자입니다. | 차단되지 않은 사용자를 차단 해제하려고 시도 |
| `3006` | 탈퇴한 사용자는 차단할 수 없습니다. | 비활성 사용자를 차단하려고 시도 |
| `2053` | 로그인이 필요합니다. | JWT 토큰이 없거나 유효하지 않음 |
| `2951` | 권한이 없는 유저의 접근입니다. | ADMIN 권한이 없는 사용자의 접근 |

## 1. 사용자 목록 조회 API

### 요청
`GET /api/admin/users`

### 응답: BaseResponse<Page<UserListResponseDto>>

#### Page<UserListResponseDto> 구조
```json
{
  "content": [UserListResponseDto],
  "pageable": {
    "pageNumber": number,
    "pageSize": number,
    "sort": {
      "empty": boolean,
      "sorted": boolean,
      "unsorted": boolean
    },
    "offset": number,
    "paged": boolean,
    "unpaged": boolean
  },
  "totalElements": number,
  "totalPages": number,
  "last": boolean,
  "first": boolean,
  "size": number,
  "number": number,
  "sort": {
    "empty": boolean,
    "sorted": boolean,
    "unsorted": boolean
  },
  "numberOfElements": number,
  "empty": boolean
}
```

#### UserListResponseDto 상세 필드

| 필드명 | 타입 | Null 허용 | 설명 | 예시값 |
|--------|------|-----------|------|--------|
| `id` | Long | No | 사용자 고유 ID | `1`, `2`, `100` |
| `username` | String | No | 사용자명 (로그인 ID) | `"user@example.com"` |
| `email` | String | No | 이메일 주소 | `"user@example.com"` |
| `nickname` | String | Yes | 사용자 닉네임 | `"홍길동"`, `null` |
| `role` | String | No | 사용자 역할 | `"USER"`, `"ADMIN"` |
| `status` | String | No | 사용자 상태 | `"ACTIVE"`, `"BLOCKED"`, `"INACTIVE"` |
| `createdAt` | String (ISO DateTime) | No | 가입일시 | `"2025-01-15T10:00:00"` |

#### 전체 응답 예시
```json
{
  "isSuccess": true,
  "responseCode": 1000,
  "responseMessage": "요청에 성공하였습니다.",
  "result": {
    "content": [
      {
        "id": 1,
        "username": "user1@example.com",
        "email": "user1@example.com",
        "nickname": "사용자1",
        "role": "USER",
        "status": "ACTIVE",
        "createdAt": "2025-01-15T10:00:00"
      },
      {
        "id": 2,
        "username": "user2@example.com",
        "email": "user2@example.com",
        "nickname": null,
        "role": "USER",
        "status": "BLOCKED",
        "createdAt": "2025-01-14T09:30:00"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20,
      "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "totalElements": 150,
    "totalPages": 8,
    "last": false,
    "first": true,
    "size": 20,
    "number": 0,
    "numberOfElements": 20,
    "empty": false
  }
}
```

## 2. 사용자 상세 조회 API

### 요청
`GET /api/admin/users/{userId}`

### 응답: BaseResponse<UserDetailResponseDto>

#### UserDetailResponseDto 상세 필드

| 필드명 | 타입 | Null 허용 | 설명 | 예시값 |
|--------|------|-----------|------|--------|
| `id` | Long | No | 사용자 고유 ID | `1` |
| `username` | String | No | 사용자명 (로그인 ID) | `"user@example.com"` |
| `email` | String | No | 이메일 주소 | `"user@example.com"` |
| `role` | String | No | 사용자 역할 | `"USER"`, `"ADMIN"` |
| `status` | String | No | 사용자 상태 | `"ACTIVE"`, `"BLOCKED"`, `"INACTIVE"` |
| `profile` | ProfileInfo | Yes | 프로필 정보 객체 | 아래 참조 |
| `credentials` | CredentialInfo[] | No | 인증 제공자 목록 | 아래 참조 |
| `createdAt` | String (ISO DateTime) | No | 가입일시 | `"2025-01-15T10:00:00"` |
| `updatedAt` | String (ISO DateTime) | No | 수정일시 | `"2025-01-15T10:00:00"` |

#### ProfileInfo 상세 필드

| 필드명 | 타입 | Null 허용 | 설명 | 예시값 |
|--------|------|-----------|------|--------|
| `profileImage` | String | Yes | 프로필 이미지 URL | `"https://s3.amazonaws.com/bucket/profile.jpg"` |
| `nickname` | String | Yes | 사용자 닉네임 | `"홍길동"` |
| `keyword1` | String | Yes | 관심 키워드 1 | `"환경"` |
| `keyword2` | String | Yes | 관심 키워드 2 | `"교육"` |
| `keyword3` | String | Yes | 관심 키워드 3 | `"복지"` |
| `keyword4` | String | Yes | 관심 키워드 4 | `"경제"` |
| `keyword5` | String | Yes | 관심 키워드 5 | `"안전"` |
| `status` | String | No | 프로필 상태 | `"ACTIVE"`, `"INACTIVE"` |

#### CredentialInfo 상세 필드

| 필드명 | 타입 | Null 허용 | 설명 | 예시값 |
|--------|------|-----------|------|--------|
| `provider` | String | No | OAuth 제공자 | `"KAKAO"`, `"GOOGLE"` |
| `providerUserId` | String | No | 제공자에서의 사용자 ID | `"1234567890"` |
| `status` | String | No | 인증 상태 | `"ACTIVE"`, `"INACTIVE"` |

#### 전체 응답 예시
```json
{
  "isSuccess": true,
  "responseCode": 1000,
  "responseMessage": "요청에 성공하였습니다.",
  "result": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "role": "USER",
    "status": "ACTIVE",
    "profile": {
      "profileImage": "https://s3.amazonaws.com/bucket/profile.jpg",
      "nickname": "사용자닉네임",
      "keyword1": "환경",
      "keyword2": "교육",
      "keyword3": "복지",
      "keyword4": null,
      "keyword5": null,
      "status": "ACTIVE"
    },
    "credentials": [
      {
        "provider": "KAKAO",
        "providerUserId": "1234567890",
        "status": "ACTIVE"
      },
      {
        "provider": "GOOGLE",
        "providerUserId": "google123456",
        "status": "ACTIVE"
      }
    ],
    "createdAt": "2025-01-15T10:00:00",
    "updatedAt": "2025-01-15T10:00:00"
  }
}
```

## 3. 사용자 차단 API

### 요청
`PUT /api/admin/users/{userId}/block`

### 응답: BaseResponse<Void>

#### 성공 응답
```json
{
  "isSuccess": true,
  "responseCode": 1000,
  "responseMessage": "요청에 성공하였습니다.",
  "result": null
}
```

#### 에러 응답 예시
```json
{
  "isSuccess": false,
  "responseCode": 3004,
  "responseMessage": "이미 차단된 사용자입니다.",
  "result": null
}
```

## 4. 사용자 차단 해제 API

### 요청
`PUT /api/admin/users/{userId}/unblock`

### 응답: BaseResponse<Void>

#### 성공 응답
```json
{
  "isSuccess": true,
  "responseCode": 1000,
  "responseMessage": "요청에 성공하였습니다.",
  "result": null
}
```

#### 에러 응답 예시
```json
{
  "isSuccess": false,
  "responseCode": 3005,
  "responseMessage": "차단되지 않은 사용자입니다.",
  "result": null
}
```

## 5. 사용자 신고 이력 조회 API

### 요청
`GET /api/admin/users/{userId}/reports`

### 응답: BaseResponse<SliceResponse<UserReportHistoryResponseDto>>

#### SliceResponse<UserReportHistoryResponseDto> 구조
```json
{
  "content": [UserReportHistoryResponseDto],
  "pageNumber": number,
  "isLast": boolean
}
```

#### UserReportHistoryResponseDto 상세 필드

| 필드명 | 타입 | Null 허용 | 설명 | 예시값 |
|--------|------|-----------|------|--------|
| `reportId` | Long | No | 신고 고유 ID | `1` |
| `reportReason` | String | No | 신고 사유 | `"부적절한 언어 사용"` |
| `reportStatus` | String | No | 신고 처리 상태 | `"PENDING"`, `"APPROVED"`, `"REJECTED"` |
| `reportedAt` | String | No | 신고일시 (포맷: yyyy.MM.dd HH:mm) | `"2025.01.15 10:30"` |
| `commentId` | Long | No | 신고된 댓글 ID | `100` |
| `commentContent` | String | No | 신고된 댓글 내용 | `"이것은 신고된 댓글입니다."` |
| `commenterId` | Long | No | 댓글 작성자 ID | `2` |
| `commenterEmail` | String | No | 댓글 작성자 이메일 | `"commenter@example.com"` |
| `commenterNickname` | String | No | 댓글 작성자 닉네임 | `"댓글작성자"` |
| `billId` | Long | No | 댓글이 달린 법안 ID | `500` |
| `billTitle` | String | No | 법안 제목 | `"환경보호법 개정안"` |
| `billProposeDate` | String | No | 법안 발의일 (포맷: yyyy.MM.dd) | `"2025.01.10"` |

#### 전체 응답 예시
```json
{
  "isSuccess": true,
  "responseCode": 1000,
  "responseMessage": "요청에 성공하였습니다.",
  "result": {
    "content": [
      {
        "reportId": 1,
        "reportReason": "부적절한 언어 사용",
        "reportStatus": "PENDING",
        "reportedAt": "2025.01.15 10:30",
        "commentId": 100,
        "commentContent": "신고된 댓글 내용입니다.",
        "commenterId": 2,
        "commenterEmail": "commenter@example.com",
        "commenterNickname": "댓글작성자",
        "billId": 500,
        "billTitle": "환경보호법 개정안",
        "billProposeDate": "2025.01.10"
      },
      {
        "reportId": 2,
        "reportReason": "스팸",
        "reportStatus": "APPROVED",
        "reportedAt": "2025.01.14 15:20",
        "commentId": 101,
        "commentContent": "또 다른 신고된 댓글입니다.",
        "commenterId": 3,
        "commenterEmail": "user3@example.com",
        "commenterNickname": "사용자3",
        "billId": 501,
        "billTitle": "교육법 개정안",
        "billProposeDate": "2025.01.05"
      }
    ],
    "pageNumber": 0,
    "isLast": false
  }
}
```

## 상태값 및 열거형 정의

### 사용자 상태 (User Status)
- `ACTIVE`: 활성 사용자 (정상적으로 서비스 이용 가능)
- `BLOCKED`: 차단된 사용자 (서비스 이용 제한)
- `INACTIVE`: 비활성 사용자 (탈퇴한 사용자)

### 사용자 역할 (User Role)
- `USER`: 일반 사용자
- `ADMIN`: 관리자

### 프로필 상태 (Profile Status)
- `ACTIVE`: 활성 프로필
- `INACTIVE`: 비활성 프로필

### OAuth 제공자 (Provider)
- `KAKAO`: 카카오 로그인
- `GOOGLE`: 구글 로그인

### 인증 상태 (Credential Status)
- `ACTIVE`: 활성 인증
- `INACTIVE`: 비활성 인증

### 신고 상태 (Report Status)
- `PENDING`: 처리 대기중
- `APPROVED`: 승인됨 (신고가 유효함)
- `REJECTED`: 거부됨 (신고가 무효함)

## 날짜 형식 규칙

### ISO DateTime 형식
API 응답의 `createdAt`, `updatedAt` 필드는 ISO 8601 형식을 사용합니다.
- 형식: `yyyy-MM-ddTHH:mm:ss`
- 예시: `"2025-01-15T10:00:00"`
- 시간대: 서버 로컬 시간 (한국 표준시)

### 표시용 날짜 형식
사용자에게 표시하기 위해 포맷된 날짜는 다음 형식을 사용합니다.
- 날짜+시간: `yyyy.MM.dd HH:mm` (예: `"2025.01.15 10:30"`)
- 날짜만: `yyyy.MM.dd` (예: `"2025.01.10"`)

## 프론트엔드 구현 참고사항

### 1. Null 값 처리
- `nickname`, `profileImage`, `keyword1-5` 등은 `null` 값이 가능합니다.
- 프론트엔드에서 적절한 기본값이나 플레이스홀더를 제공해야 합니다.

### 2. 페이징 처리
- 사용자 목록은 Spring Data의 `Page` 객체를 사용합니다.
- 신고 이력은 `SliceResponse` 객체를 사용하여 더 간단한 페이징을 제공합니다.

### 3. 에러 처리
- 모든 에러는 `isSuccess: false`와 함께 적절한 `responseCode`와 `responseMessage`를 제공합니다.
- HTTP 상태 코드와 별도로 애플리케이션 레벨의 에러 코드를 확인해야 합니다.

### 4. 인증 처리
- 모든 Admin API는 JWT 토큰과 ADMIN 권한이 필요합니다.
- `Authorization: Bearer {token}` 헤더를 포함해야 합니다.

### 5. 검색 기능
- 사용자 목록 조회에서 `keyword` 파라미터는 `username`과 `email` 필드에서 부분 일치 검색을 수행합니다.
- 대소문자 구분하지 않습니다.

## API 테스트
개발 환경에서 Swagger UI를 통해 API를 테스트할 수 있습니다.
- URL: `http://localhost:8080/swagger-ui.html`
- Admin API 테스트 시 ADMIN 권한을 가진 JWT 토큰이 필요합니다.