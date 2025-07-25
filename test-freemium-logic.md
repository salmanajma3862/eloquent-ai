# Freemium Logic Test Plan

## Overview
This document outlines how to test the new advanced freemium logic system based on the CEO's strategy.

## Test Scenarios

### Scenario 1: Free User - First 3 Sessions
**Expected Behavior:** User should be able to complete 3 sessions successfully
1. Create a new user account (will have `totalSessions: 0` and `subscription.plan: 'free'`)
2. Complete first test session → `totalSessions: 1` ✅
3. Complete second test session → `totalSessions: 2` ✅  
4. Complete third test session → `totalSessions: 3` ✅

### Scenario 2: Free User - 4th Session (Gated)
**Expected Behavior:** User should be blocked with 403 error
1. User with `totalSessions: 3` and `subscription.plan: 'free'`
2. Attempt 4th test session → Should receive 403 error with message: "You've completed your 3 free tests. Please upgrade for unlimited practice."

### Scenario 3: Premium User - Unlimited Access
**Expected Behavior:** User should have unlimited access regardless of session count
1. User with `subscription.plan: 'premium'` and any `totalSessions` count
2. Should be able to complete sessions without any gating

## API Endpoints to Test

### POST /api/test/transcribe
**Request Format:**
```
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData:
- audio: <audio file>
- topicText: <string>
- durationInSeconds: <number>
```

**Success Response (201):**
```json
{
  "sessionId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

**Freemium Gate Response (403):**
```json
{
  "message": "You've completed your 3 free tests. Please upgrade for unlimited practice."
}
```

## Database Changes Verification

### User Model Updates
- ✅ Removed `freeTestsRemaining` field
- ✅ Removed `lastTestResetDate` field  
- ✅ Added `totalSessions` field (default: 0)
- ✅ Existing `subscription.plan` field used for gating

### Session Creation Flow
- ✅ Gating logic checks `user.subscription.plan` and `user.totalSessions`
- ✅ Session creation and `totalSessions` increment happen atomically
- ✅ Frontend receives `sessionId` directly for navigation

## Manual Testing Steps

1. **Setup Test User:**
   ```javascript
   // In MongoDB or via API
   {
     "email": "test@example.com",
     "name": "Test User",
     "subscription": { "plan": "free" },
     "totalSessions": 0
   }
   ```

2. **Test Free User Limit:**
   - Complete 3 sessions successfully
   - Verify `totalSessions` increments to 3
   - Attempt 4th session and verify 403 response

3. **Test Premium User:**
   ```javascript
   // Update user to premium
   db.users.updateOne(
     { email: "test@example.com" },
     { $set: { "subscription.plan": "premium" } }
   )
   ```
   - Verify unlimited access regardless of `totalSessions` count

## Implementation Notes

- **Atomic Operations:** Gating check, transcription, session creation, and user update all happen in single controller function
- **Error Handling:** Frontend properly handles 403 responses and displays freemium message
- **Scalability:** New system tracks total sessions for better analytics and is more scalable than time-based limits
- **Data Integrity:** Session count increments only after successful transcription and session creation
