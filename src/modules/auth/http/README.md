# HTTP API Tests for Auth Module

This directory contains HTTP request files for testing the Authentication module API endpoints.

## Files

- `auth.login.endpoint.http` - Test user login and token acquisition
- `auth.protected.endpoint.http` - Test protected endpoints with authentication
- `auth.roles.endpoint.http` - Test role-based protected endpoints
- `auth-flow.endpoint.http` - Complete authentication flow (register, login, access protected resources)

## How to Use

1. Start your NestJS server on port 3001
2. Open any of the .http files
3. Click the "Send Request" button to execute individual requests
4. For requests requiring a token, the token will be saved as a variable after login

## Testing Flow

The `auth-flow.endpoint.http` file demonstrates a complete authentication sequence:

1. Register a new user
2. Login with user credentials
3. Access a protected endpoint with the token
4. Test different role-based endpoints

## Variables

The HTTP files use response handling to extract and store:

- `authToken` - JWT token from the login response
- `userId` - ID of the created/authenticated user

These variables are automatically used in subsequent requests to maintain the authentication flow.
