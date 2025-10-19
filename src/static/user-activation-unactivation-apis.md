# 회원 비활성화/활성화 API 가이드

## 개요

Graypick 시스템에서 회원 상태를 관리하는 API들에 대한 가이드입니다. 시스템은 3가지 회원 상태를 지원합니다:

- **ACTIVE**: 정상 활성 상태 (로그인 및 모든 기능 사용 가능)
- **INACTIVE**: 탈퇴 상태 (사용자 자발적 탈퇴)
- **BLOCKED**: 차단 상태 (관리자에 의한 강제 차단)

## 회원 비활성화 API
### 2. 관리자에 의한 회원 차단

```http
PUT /api/admin/users/{userId}/block
```

**권한**: 관리자 권한 필요 (`ADMIN` 역할)

**Path Parameters**:
- `userId`: 차단할 사용자 ID

**Response**:
```json
{
  "success": true,
  "message": "사용자가 차단되었습니다"
}
```

**파일 위치**: `src/main/java/com/graydang/app/domain/admin/controller/AdminController.java`

**효과**:
- 사용자 상태를 `BLOCKED`로 변경
- 관련 UserProfile, UserCredential도 함께 차단
- 로그인 불가능

## 회원 활성화 API

### 관리자에 의한 회원 차단 해제

```http
PUT /api/admin/users/{userId}/unblock
```

**권한**: 관리자 권한 필요 (`ADMIN` 역할)

**Path Parameters**:
- `userId`: 차단 해제할 사용자 ID

**Response**:
```json
{
  "success": true,
  "message": "사용자 차단이 해제되었습니다"
}
```

**파일 위치**: `src/main/java/com/graydang/app/domain/admin/controller/AdminController.java`

**효과**:
- 사용자 상태를 `ACTIVE`로 변경
- 관련 UserProfile, UserCredential도 함께 활성화
- 로그인 가능


## 주의사항

1. **탈퇴한 사용자 복구**: 현재 시스템에서 `INACTIVE` 상태의 사용자를 다시 `ACTIVE`로 변경하는 API는 제공되지 않습니다.

2. **관리자 권한**: 차단/차단해제 기능은 관리자 권한이 필요하며, `@PreAuthorize("hasRole('ADMIN')")`로 보호됩니다.

3. **연관 데이터**: 사용자 차단 시 UserProfile과 UserCredential 등 연관된 엔티티들도 함께 상태가 변경됩니다.