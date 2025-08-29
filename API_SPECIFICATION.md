# Mandala 3D Website - API Specification

## API Overview

The Mandala 3D Website API provides a comprehensive RESTful interface for managing 3D mandala patterns, user interactions, and social features. All API endpoints follow REST conventions and return JSON responses.

## Base Configuration

### Base URLs
- **Development**: `http://localhost:3000/api/v1`
- **Staging**: `https://staging-api.mandala3d.com/api/v1`
- **Production**: `https://api.mandala3d.com/api/v1`

### Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Rate Limiting
- **Anonymous**: 100 requests per hour
- **Authenticated**: 1000 requests per hour
- **Premium**: 5000 requests per hour

### Common Headers
```http
Content-Type: application/json
Accept: application/json
X-API-Version: 1.0
X-Request-ID: <unique-request-id>
```

## Response Format

### Success Response
```json
{
  "status": "success",
  "data": { },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0",
    "request_id": "uuid"
  }
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { },
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "SecurePassword123!",
  "confirm_password": "SecurePassword123!"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "tokens": {
      "access_token": "jwt_access_token",
      "refresh_token": "jwt_refresh_token",
      "expires_in": 3600
    }
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe"
    },
    "tokens": {
      "access_token": "jwt_access_token",
      "refresh_token": "jwt_refresh_token",
      "expires_in": 3600
    }
  }
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refresh_token": "jwt_refresh_token"
}
```

### Logout
```http
POST /auth/logout
```
**Authorization Required**

## Mandala Endpoints

### Generate Mandala
```http
POST /mandalas/generate
```
**Authorization Required**

**Request Body:**
```json
{
  "parameters": {
    "complexity": 5,
    "symmetry": 8,
    "layers": [
      {
        "type": "geometric",
        "count": 12,
        "radius": 100,
        "shape": "triangle"
      },
      {
        "type": "floral",
        "count": 8,
        "radius": 150,
        "pattern": "lotus"
      }
    ],
    "colorScheme": {
      "type": "gradient",
      "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1"],
      "mode": "radial"
    },
    "animation": {
      "enabled": true,
      "type": "rotation",
      "speed": 0.5,
      "direction": "clockwise"
    }
  },
  "options": {
    "quality": "high",
    "format": "3d",
    "optimize": true
  }
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "mandala": {
      "id": "uuid",
      "geometry_url": "https://cdn.mandala3d.com/geometry/uuid.glb",
      "thumbnail_url": "https://cdn.mandala3d.com/thumbnails/uuid.jpg",
      "parameters": { },
      "metadata": {
        "vertices": 12500,
        "faces": 8300,
        "file_size": "2.3MB",
        "generation_time_ms": 450
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
}
```

### Get Mandala
```http
GET /mandalas/{id}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "mandala": {
      "id": "uuid",
      "title": "Cosmic Harmony",
      "description": "A vibrant mandala representing cosmic balance",
      "user": {
        "id": "user_uuid",
        "username": "johndoe",
        "avatar_url": "https://cdn.mandala3d.com/avatars/user.jpg"
      },
      "geometry_url": "https://cdn.mandala3d.com/geometry/uuid.glb",
      "thumbnail_url": "https://cdn.mandala3d.com/thumbnails/uuid.jpg",
      "parameters": { },
      "stats": {
        "views": 1250,
        "likes": 89,
        "shares": 23,
        "remixes": 5
      },
      "tags": ["cosmic", "geometric", "vibrant"],
      "is_public": true,
      "is_featured": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  }
}
```

### List Mandalas
```http
GET /mandalas
```

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 20, max: 100)
- `sort` (string): Sort field (created_at, popularity, views)
- `order` (string): Sort order (asc, desc)
- `filter[public]` (boolean): Filter by visibility
- `filter[user_id]` (string): Filter by user
- `filter[tags]` (string): Comma-separated tags
- `search` (string): Search query

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "mandalas": [
      { },
      { }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "total_pages": 8,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### Update Mandala
```http
PUT /mandalas/{id}
```
**Authorization Required (Owner only)**

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "is_public": true,
  "tags": ["new", "tags"]
}
```

### Delete Mandala
```http
DELETE /mandalas/{id}
```
**Authorization Required (Owner only)**

### Fork Mandala
```http
POST /mandalas/{id}/fork
```
**Authorization Required**

**Request Body:**
```json
{
  "title": "My Remix of Cosmic Harmony",
  "modifications": {
    "colorScheme": {
      "colors": ["#FF0000", "#00FF00", "#0000FF"]
    }
  }
}
```

### Export Mandala
```http
POST /mandalas/{id}/export
```
**Authorization Required**

**Request Body:**
```json
{
  "format": "png",
  "resolution": {
    "width": 4096,
    "height": 4096
  },
  "options": {
    "transparent_background": true,
    "include_watermark": false
  }
}
```

**Response (202 Accepted):**
```json
{
  "status": "success",
  "data": {
    "job_id": "export_job_uuid",
    "status": "processing",
    "estimated_time_seconds": 30,
    "webhook_url": "https://api.mandala3d.com/jobs/export_job_uuid"
  }
}
```

## Social Endpoints

### Like Mandala
```http
POST /mandalas/{id}/like
```
**Authorization Required**

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "liked": true,
    "total_likes": 90
  }
}
```

### Unlike Mandala
```http
DELETE /mandalas/{id}/like
```
**Authorization Required**

### Share Mandala
```http
POST /mandalas/{id}/share
```
**Authorization Required**

**Request Body:**
```json
{
  "platform": "twitter",
  "message": "Check out this amazing mandala!"
}
```

### Add Comment
```http
POST /mandalas/{id}/comments
```
**Authorization Required**

**Request Body:**
```json
{
  "content": "Beautiful work! Love the color scheme.",
  "parent_id": null
}
```

### Get Comments
```http
GET /mandalas/{id}/comments
```

**Query Parameters:**
- `page` (integer): Page number
- `limit` (integer): Items per page
- `sort` (string): newest, oldest, popular

## User Endpoints

### Get User Profile
```http
GET /users/{id}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "display_name": "John Doe",
      "bio": "Digital artist and mandala enthusiast",
      "avatar_url": "https://cdn.mandala3d.com/avatars/user.jpg",
      "stats": {
        "mandalas_created": 45,
        "total_likes": 892,
        "followers": 234,
        "following": 89
      },
      "social_links": {
        "twitter": "@johndoe",
        "instagram": "@johndoe_art"
      },
      "created_at": "2023-01-01T00:00:00Z"
    }
  }
}
```

### Update User Profile
```http
PUT /users/{id}
```
**Authorization Required (Self only)**

**Request Body:**
```json
{
  "display_name": "John Doe",
  "bio": "Updated bio",
  "social_links": {
    "twitter": "@newhandle"
  }
}
```

### Get User Mandalas
```http
GET /users/{id}/mandalas
```

### Follow User
```http
POST /users/{id}/follow
```
**Authorization Required**

### Unfollow User
```http
DELETE /users/{id}/follow
```
**Authorization Required**

## Discovery Endpoints

### Get Feed
```http
GET /feed
```
**Authorization Required**

**Query Parameters:**
- `type` (string): following, popular, recent
- `page` (integer): Page number
- `limit` (integer): Items per page

### Discover Mandalas
```http
GET /discover
```

**Query Parameters:**
- `category` (string): trending, featured, new, top
- `timeframe` (string): day, week, month, all
- `page` (integer): Page number
- `limit` (integer): Items per page

### Search
```http
GET /search
```

**Query Parameters:**
- `q` (string): Search query (required)
- `type` (string): mandalas, users, tags
- `page` (integer): Page number
- `limit` (integer): Items per page

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "results": {
      "mandalas": [ ],
      "users": [ ],
      "tags": [ ]
    },
    "total_results": 42,
    "query": "geometric"
  }
}
```

## Template Endpoints

### List Templates
```http
GET /templates
```

**Query Parameters:**
- `category` (string): geometric, floral, abstract, traditional
- `difficulty` (string): beginner, intermediate, advanced
- `sort` (string): popular, newest, alphabetical

### Get Template
```http
GET /templates/{id}
```

### Create from Template
```http
POST /templates/{id}/create
```
**Authorization Required**

**Request Body:**
```json
{
  "customizations": {
    "colorScheme": {
      "colors": ["#custom", "#colors"]
    },
    "complexity": 7
  }
}
```

## WebSocket Events

### Connection
```javascript
const ws = new WebSocket('wss://api.mandala3d.com/ws');

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'jwt_token'
  }));
});
```

### Real-time Events

#### Pattern Update
```json
{
  "type": "pattern:update",
  "data": {
    "mandala_id": "uuid",
    "changes": { },
    "user": {
      "id": "user_uuid",
      "username": "johndoe"
    },
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### Collaboration
```json
{
  "type": "user:join",
  "data": {
    "session_id": "session_uuid",
    "user": {
      "id": "user_uuid",
      "username": "johndoe",
      "cursor_color": "#FF6B6B"
    }
  }
}
```

#### Render Progress
```json
{
  "type": "render:progress",
  "data": {
    "job_id": "render_job_uuid",
    "progress": 75,
    "status": "rendering",
    "estimated_remaining_seconds": 10
  }
}
```

## Error Codes

### HTTP Status Codes
- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request creating resource
- `202 Accepted`: Request accepted for async processing
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate username)
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

### Application Error Codes
```json
{
  "AUTH_001": "Invalid credentials",
  "AUTH_002": "Token expired",
  "AUTH_003": "Token invalid",
  "AUTH_004": "Account locked",
  
  "MANDALA_001": "Invalid parameters",
  "MANDALA_002": "Generation failed",
  "MANDALA_003": "Export format not supported",
  "MANDALA_004": "Mandala not found",
  "MANDALA_005": "Unauthorized access",
  
  "USER_001": "User not found",
  "USER_002": "Username already taken",
  "USER_003": "Email already registered",
  "USER_004": "Invalid email format",
  
  "VALIDATION_001": "Required field missing",
  "VALIDATION_002": "Invalid field format",
  "VALIDATION_003": "Value out of range",
  
  "RATE_001": "Rate limit exceeded",
  "RATE_002": "Daily limit reached"
}
```

## Versioning

The API uses URL versioning. The current version is `v1`. When breaking changes are introduced, a new version will be created.

### Version Headers
```http
X-API-Version: 1.0
X-API-Deprecation: 2025-01-01  # If endpoint is deprecated
```

## Pagination

All list endpoints support pagination using the following parameters:
- `page`: Current page number (starts at 1)
- `limit`: Items per page (max 100)

### Pagination Response
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false,
    "next_page": 2,
    "prev_page": null
  }
}
```

## Rate Limiting

Rate limit information is included in response headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

When rate limited, the API returns:
```json
{
  "status": "error",
  "error": {
    "code": "RATE_001",
    "message": "Rate limit exceeded",
    "retry_after": 3600
  }
}
```

## CORS Configuration

The API supports CORS with the following configuration:
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Request-ID
Access-Control-Max-Age: 86400
```

## Security Considerations

### Authentication
- JWT tokens expire after 1 hour
- Refresh tokens expire after 30 days
- Tokens are revoked on password change
- Support for OAuth 2.0 providers

### Data Protection
- All endpoints use HTTPS
- Sensitive data is encrypted at rest
- PII is masked in logs
- GDPR compliant data handling

### Input Validation
- All inputs are sanitized
- File uploads are virus scanned
- Size limits enforced
- SQL injection protection

## SDK Support

Official SDKs available for:
- JavaScript/TypeScript
- Python
- Go
- Ruby
- Swift (iOS)
- Kotlin (Android)

### JavaScript SDK Example
```javascript
import { MandalaAPI } from '@mandala3d/sdk';

const api = new MandalaAPI({
  apiKey: 'your_api_key',
  version: 'v1'
});

// Generate a mandala
const mandala = await api.mandalas.generate({
  complexity: 5,
  symmetry: 8,
  colorScheme: {
    type: 'gradient',
    colors: ['#FF6B6B', '#4ECDC4']
  }
});

// Get user profile
const user = await api.users.get('user_id');
```

## Testing

### Test Environment
- Base URL: `https://sandbox-api.mandala3d.com/api/v1`
- Test API Keys available in developer portal
- Rate limits relaxed for testing
- Data reset daily

### Postman Collection
Download the Postman collection for easy testing:
`https://api.mandala3d.com/docs/postman-collection.json`

## Changelog

### Version 1.0.0 (2024-01-01)
- Initial API release
- Core mandala generation endpoints
- User authentication and profiles
- Basic social features
- Template system

### Planned Features (v1.1.0)
- Collaborative editing
- AI-powered generation
- Advanced export formats
- Marketplace integration
- Analytics API