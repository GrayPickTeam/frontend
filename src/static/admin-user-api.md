# Admin User API Documentation

## Overview
This document describes the admin user management APIs for the Graypick (Graydang) application. All endpoints require admin authentication.

## Base URL
- Development: `http://localhost:8080`
- Production: `{production_url}`

## Authentication
All admin APIs require:
- JWT token in the `Authorization` header: `Bearer {token}`
- User must have `ADMIN` role

## API Endpoints

### 1. User Management APIs

#### 1.1 Get User List
Retrieves a paginated list of users with optional search functionality.

**Endpoint**: `GET /api/admin/users`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | Integer | No | 0 | Page number (0-indexed) |
| size | Integer | No | 20 | Number of items per page |
| keyword | String | No | - | Search keyword (searches username and email) |

**Response**:
```json
{
  "isSuccess": true,
  "responseCode": 200,
  "responseMessage": "Success",
  "result": {
    "content": [
      {
        "id": 1,
        "username": "user@example.com",
        "email": "user@example.com",
        "nickname": "사용자닉네임",
        "role": "USER",
        "status": "ACTIVE",
        "createdAt": "2025-01-15T10:00:00"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20
    },
    "totalElements": 100,
    "totalPages": 5,
    "last": false,
    "first": true
  }
}
```

#### 1.2 Get User Detail
Retrieves detailed information about a specific user.

**Endpoint**: `GET /api/admin/users/{userId}`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | Long | Yes | User ID |

**Response**:
```json
{
  "isSuccess": true,
  "responseCode": 200,
  "responseMessage": "Success",
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
      }
    ],
    "createdAt": "2025-01-15T10:00:00",
    "updatedAt": "2025-01-15T10:00:00"
  }
}
```

### 2. User Block Management APIs

#### 2.1 Block User
Blocks an active user from accessing the service.

**Endpoint**: `PUT /api/admin/users/{userId}/block`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | Long | Yes | User ID to block |

**Response**:
```json
{
  "isSuccess": true,
  "responseCode": 200,
  "responseMessage": "Success",
  "result": null
}
```

**Error Responses**:
- `400 Bad Request`: User is already blocked or inactive
- `404 Not Found`: User not found

#### 2.2 Unblock User
Unblocks a previously blocked user.

**Endpoint**: `PUT /api/admin/users/{userId}/unblock`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | Long | Yes | User ID to unblock |

**Response**:
```json
{
  "isSuccess": true,
  "responseCode": 200,
  "responseMessage": "Success",
  "result": null
}
```

**Error Responses**:
- `400 Bad Request`: User is not blocked
- `404 Not Found`: User not found

#### 2.3 Get User Report History
Retrieves the report history for a specific user.

**Endpoint**: `GET /api/admin/users/{userId}/reports`

**Path Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | Long | Yes | User ID |

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | Integer | No | 0 | Page number (0-indexed) |
| size | Integer | No | 20 | Number of items per page |

**Response**:
```json
{
  "isSuccess": true,
  "responseCode": 200,
  "responseMessage": "Success",
  "result": {
    "content": [
      {
        "reportId": 1,
        "reportReason": "부적절한 언어 사용",
        "reportStatus": "PENDING",
        "reportedAt": "2025.01.15 10:30",
        "commentId": 100,
        "commentContent": "신고된 댓글 내용",
        "commenterId": 2,
        "commenterEmail": "commenter@example.com",
        "commenterNickname": "댓글작성자",
        "billId": 500,
        "billTitle": "환경보호법 개정안",
        "billProposeDate": "2025.01.10"
      }
    ],
    "hasNext": true,
    "last": false,
    "first": true,
    "numberOfElements": 20,
    "size": 20,
    "number": 0
  }
}
```

## Data Types

### User Status
- `ACTIVE`: 활성 사용자
- `BLOCKED`: 차단된 사용자
- `INACTIVE`: 비활성 사용자

### User Role
- `USER`: 일반 사용자
- `ADMIN`: 관리자

### OAuth Provider
- `KAKAO`: 카카오 로그인
- `GOOGLE`: 구글 로그인

### Report Status
- `PENDING`: 처리 대기중
- `APPROVED`: 승인됨
- `REJECTED`: 거부됨

## Error Response Format
```json
{
  "isSuccess": false,
  "responseCode": 400,
  "responseMessage": "Error message",
  "result": null
}
```

## Common HTTP Status Codes
- `200 OK`: 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

## Notes for Frontend Development
1. 모든 요청에 JWT 토큰을 `Authorization` 헤더에 포함해야 합니다.
2. 페이징은 0부터 시작합니다 (0-indexed).
3. 날짜 형식은 두 가지가 사용됩니다:
   - ISO format: `2025-01-15T10:00:00` (API response)
   - Display format: `2025.01.15 10:30` (formatted fields)
4. 사용자 검색은 username과 email 필드에서 부분 일치로 검색됩니다.
5. 현재 사용자 정보 수정 및 삭제 API는 제공되지 않습니다.

## Swagger Documentation
API 문서는 Swagger UI를 통해서도 확인 가능합니다:
- Development: `http://localhost:8080/swagger-ui.html`