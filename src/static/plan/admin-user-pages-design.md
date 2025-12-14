# Admin User Management Pages Design

## Overview
This document outlines the design for the admin user management pages based on the API endpoints provided in `/src/static/admin-user-api.md`.

## 1. User List Page

### URL
`/admin/user`

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Admin Header (AdminBar)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ User Management                                              ││
│ │ ───────────────                                              ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Search & Filters                                             ││
│ │ ┌───────────────────────────────┐ ┌────────────┐           ││
│ │ │ 🔍 Search users...            │ │   Search   │           ││
│ │ └───────────────────────────────┘ └────────────┘           ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Total Users: 100                                             ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ User List Table                                              ││
│ │ ┌───┬─────────────┬─────────────┬──────┬────────┬─────────┐││
│ │ │ID │Email        │Nickname     │Role  │Status  │Actions  │││
│ │ ├───┼─────────────┼─────────────┼──────┼────────┼─────────┤││
│ │ │1  │user@ex.com  │사용자닉네임 │USER  │ACTIVE  │View|Block│││
│ │ │2  │test@ex.com  │테스트유저   │USER  │BLOCKED │View|Unblock││
│ │ └───┴─────────────┴─────────────┴──────┴────────┴─────────┘││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Pagination                                                   ││
│ │ < Previous  1 2 3 4 5  Next >                               ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Components

#### UserListPage (`/src/app/admin/user/page.tsx`)
- Main page component
- Manages overall state
- Handles API calls for user list

#### UserSearchBar (`/src/features/admin/user/components/UserSearchBar.tsx`)
- Search input with button
- Triggers search on enter key or button click
- Clears search functionality

#### UserTable (`/src/features/admin/user/components/UserTable.tsx`)
- Displays user data in table format
- Responsive design (cards on mobile)
- Column headers:
  - ID
  - Email (username)
  - Nickname
  - Role (USER/ADMIN badge)
  - Status (ACTIVE/BLOCKED badge)
  - Actions (View details, Block/Unblock)

#### UserTableRow (`/src/features/admin/user/components/UserTableRow.tsx`)
- Individual user row
- Status badges with colors:
  - ACTIVE: Green background
  - BLOCKED: Red background
- Action buttons

#### Pagination (`/src/components/common/Pagination.tsx`)
- Page navigation
- Shows current page and total pages
- Disable previous/next when at boundaries

### API Integration

```typescript
// API call example
const { data } = await getUserList({
  page: 0,
  size: 20,
  keyword: searchKeyword
});
```

### Features
1. **Search**: Real-time search by username/email
2. **Pagination**: 20 users per page (configurable)
3. **Loading states**: Skeleton loaders while fetching
4. **Error handling**: Toast notifications for errors
5. **Empty states**: Message when no users found
6. **Responsive**: Table on desktop, cards on mobile

## 2. User Detail Page

### URL
`/admin/user/[userId]`

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Admin Header (AdminBar)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ < Back to User List                                         ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ User Details                                                 ││
│ │ ─────────────                                                ││
│ │                                                              ││
│ │ ┌───────────────────────────────────────────────────────────┐│
│ │ │ Basic Information                                         ││
│ │ │ ┌─────────┐                                               ││
│ │ │ │ Profile │  Email: user@example.com                      ││
│ │ │ │  Image  │  Nickname: 사용자닉네임                       ││
│ │ │ └─────────┘  Role: USER                                   ││
│ │ │               Status: ACTIVE ✓                             ││
│ │ │               Created: 2025.01.15 10:00                    ││
│ │ │                                                            ││
│ │ │               [Block User]                                 ││
│ │ └───────────────────────────────────────────────────────────┘│
│ │                                                              ││
│ │ ┌───────────────────────────────────────────────────────────┐│
│ │ │ Keywords                                                   ││
│ │ │ [환경] [교육] [복지]                                       ││
│ │ └───────────────────────────────────────────────────────────┘│
│ │                                                              ││
│ │ ┌───────────────────────────────────────────────────────────┐│
│ │ │ OAuth Providers                                            ││
│ │ │ KAKAO: Connected (ID: 1234567890)                         ││
│ │ └───────────────────────────────────────────────────────────┘│
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Report History                                               ││
│ │ ─────────────                                                ││
│ │                                                              ││
│ │ ┌───────────────────────────────────────────────────────────┐│
│ │ │ Date       │ Reason              │ Bill      │ Status    ││
│ │ ├────────────┼─────────────────────┼───────────┼───────────┤│
│ │ │ 2025.01.15 │ 부적절한 언어 사용  │ 환경보호법 │ PENDING   ││
│ │ └───────────────────────────────────────────────────────────┘│
│ │                                                              ││
│ │ < Previous  1  Next >                                        ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Components

#### UserDetailPage (`/src/app/admin/user/[userId]/page.tsx`)
- Fetches user details by ID
- Manages overall page state
- Handles block/unblock actions

#### UserInfoCard (`/src/features/admin/user/components/UserInfoCard.tsx`)
- Displays basic user information
- Profile image (or default avatar)
- Email, nickname, role, status
- Creation date
- Block/Unblock action button

#### UserKeywordsCard (`/src/features/admin/user/components/UserKeywordsCard.tsx`)
- Shows user's selected keywords
- Chip/badge style display

#### UserOAuthCard (`/src/features/admin/user/components/UserOAuthCard.tsx`)
- Lists connected OAuth providers
- Provider name and ID

#### UserReportHistory (`/src/features/admin/user/components/UserReportHistory.tsx`)
- Table of user's report history
- Pagination for reports
- Links to related bills
- Report status badges

### API Integration

```typescript
// Get user details
const userData = await getUserDetail(userId);

// Get report history
const reportData = await getUserReports(userId, { page: 0, size: 20 });

// Block/Unblock user
await blockUser(userId);
await unblockUser(userId);
```

### Features
1. **Back navigation**: Easy return to user list
2. **User actions**: Block/Unblock with confirmation dialog
3. **Report pagination**: Navigate through report history
4. **Loading states**: Skeleton loaders for each section
5. **Error handling**: 404 page for non-existent users
6. **Responsive design**: Stack cards vertically on mobile

## 3. Common Components

### StatusBadge (`/src/components/common/StatusBadge.tsx`)
```typescript
interface StatusBadgeProps {
  status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  size?: 'sm' | 'md' | 'lg';
}
```

### ConfirmDialog (`/src/components/common/ConfirmDialog.tsx`)
- Used for block/unblock confirmations
- "Are you sure?" pattern

### EmptyState (`/src/components/common/EmptyState.tsx`)
- When no users or reports found
- Includes icon and message

## 4. Styling Guidelines

### Colors
- Primary: `primary-main-normal`
- Success/Active: `status-positive`
- Error/Blocked: `status-negative`
- Warning/Pending: `status-warning`
- Text: `label-normal`, `label-strong`
- Background: `background-normal-normal`

### Typography
- Page titles: `typo-display1`
- Section headers: `typo-heading1`
- Body text: `typo-body1-reading`
- Table headers: `typo-body2-medium`

### Spacing
- Page padding: `px-4 md:px-8`
- Section spacing: `space-y-6`
- Card padding: `p-4 md:p-6`

### Responsive Breakpoints
- Mobile: Default
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

## 5. User Experience Considerations

### Loading States
- Use skeleton loaders matching content structure
- Maintain layout during loading to prevent jumps

### Error Handling
- Toast notifications for action errors
- Inline error messages for form validation
- 404 page for invalid user IDs

### Accessibility
- Proper ARIA labels for buttons
- Keyboard navigation support
- Screen reader friendly status badges

### Performance
- Implement pagination to limit data loads
- Debounce search input (500ms)
- Cache user details for back navigation

## 6. Future Enhancements
- Bulk actions for multiple users
- Export user data to CSV
- Advanced filters (by role, status, date range)
- User activity timeline
- Email user directly from admin panel
- Role management capabilities