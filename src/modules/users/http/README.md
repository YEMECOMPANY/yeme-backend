# HTTP API Tests for Users Module

This directory contains HTTP request files for testing the Users module API endpoints.

## Files

- `users.post.endpoint.http` - Test creating users
- `users.get.endpoint.http` - Test fetching users
- `users.patch.endpoint.http` - Test updating users
- `users.delete.endpoint.http` - Test deleting users
- `test-flow.endpoint.http` - Test the complete user flow (create, read, update, delete)

## How to Use

1. Start your NestJS server on port 3001
2. Open any of the .http files
3. Use the "Send Request" button to execute individual requests
4. For requests that require a user ID, replace "replace-with-actual-user-id" with a real user ID

## Testing Flow

The `test-flow.endpoint.http` file demonstrates a complete test sequence:

1. Create a new user
2. Get the user details
3. Update the user
4. Get the updated details
5. Delete the user
6. Verify the user is deleted

After executing the first request (creating a user), copy the ID from the response and replace all instances of "replace-after-creation" with that ID to test the complete flow.
