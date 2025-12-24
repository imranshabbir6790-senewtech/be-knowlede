# 📚 Multilingual Books Backend - Complete API Documentation

**Base URL:** `http://localhost:5000/api/v1`

---

## 🎠 **CAROUSEL ENDPOINTS**

### 1. Get All Carousels
```
GET /carousels
```
**Query Parameters:**
- `language` (optional): Filter by language (en, ar, fr, es, de, zh, hi)
- `position` (optional): Filter by position (top, bottom)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "language": "en",
      "position": "top",
      "images": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "imageUrl": "https://example.com/image1.jpg",
          "clickUrl": "https://example.com/book1",
          "altText": "Book 1",
          "order": 1
        }
      ],
      "rotationInterval": 60000,
      "isActive": true,
      "createdAt": "2024-12-23T10:00:00Z",
      "updatedAt": "2024-12-23T10:00:00Z"
    }
  ],
  "count": 1
}
```

---

### 2. Get Carousel by ID
```
GET /carousels/:id
```
**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* carousel object */ }
}
```

---

### 3. Create New Carousel
```
POST /carousels
Content-Type: application/json
```
**Request Body:**
```json
{
  "language": "en",
  "position": "top",
  "images": [
    {
      "imageUrl": "https://example.com/image1.jpg",
      "clickUrl": "https://example.com/book1",
      "altText": "Book 1",
      "order": 1
    },
    {
      "imageUrl": "https://example.com/image2.jpg",
      "clickUrl": "https://example.com/book2",
      "altText": "Book 2",
      "order": 2
    }
  ],
  "rotationInterval": 60000
}
```
**Validation:**
- `language`: Required, must be one of: en, ar, fr, es, de, zh, hi
- `position`: Required, must be "top" or "bottom"
- `images`: Array with min 1 item, each with valid URLs
- `rotationInterval`: Optional, default 60000ms (60 seconds)

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Carousel created successfully",
  "data": { /* created carousel */ }
}
```

---

### 4. Update Carousel
```
PUT /carousels/:id
Content-Type: application/json
```
**Request Body:**
```json
{
  "images": [
    {
      "imageUrl": "https://example.com/image1.jpg",
      "clickUrl": "https://example.com/book1",
      "altText": "Updated Book 1",
      "order": 1
    }
  ],
  "rotationInterval": 45000,
  "isActive": true
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Carousel updated successfully",
  "data": { /* updated carousel */ }
}
```

---

### 5. Delete Carousel
```
DELETE /carousels/:id
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Carousel deleted successfully"
}
```

---

### 6. Add Image to Carousel
```
POST /carousels/:id/images
Content-Type: application/json
```
**Request Body:**
```json
{
  "imageUrl": "https://example.com/image3.jpg",
  "clickUrl": "https://example.com/book3",
  "altText": "Book 3",
  "order": 3
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Image added successfully",
  "data": { /* updated carousel */ }
}
```

---

### 7. Remove Image from Carousel
```
DELETE /carousels/:id/images/:imageId
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Image removed successfully",
  "data": { /* updated carousel */ }
}
```

---

## 📊 **DASHBOARD ENDPOINTS**

### 1. Get All Dashboards
```
GET /dashboards
```
**Query Parameters:**
- `language` (optional): Filter by language

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "language": "en",
      "pdfFile": {
        "fileName": "guide.pdf",
        "filePath": "./uploads/guide.pdf",
        "uploadedAt": "2024-12-23T10:00:00Z",
        "fileSize": 2048576
      },
      "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "socialLinks": {
        "discord": "https://discord.gg/example",
        "reddit": "https://reddit.com/r/books"
      },
      "isActive": true,
      "createdAt": "2024-12-23T10:00:00Z",
      "updatedAt": "2024-12-23T10:00:00Z"
    }
  ],
  "count": 1
}
```

---

### 2. Get Dashboard by Language
```
GET /dashboards/:language
```
**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* dashboard object */ }
}
```

---

### 3. Create or Update Dashboard with PDF
```
POST /dashboards
Content-Type: multipart/form-data
```
**Form Data:**
- `language`: "en" (required)
- `pdf`: File (optional, PDF only)
- `youtubeUrl`: "https://youtube.com/watch?v=xxx" (optional)
- `socialLinks[discord]`: "https://discord.gg/xxx" (optional)
- `socialLinks[reddit]`: "https://reddit.com/r/books" (optional)

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/v1/dashboards \
  -F "language=en" \
  -F "pdf=@/path/to/guide.pdf" \
  -F "youtubeUrl=https://youtube.com/watch?v=dQw4w9WgXcQ" \
  -F "socialLinks[discord]=https://discord.gg/example" \
  -F "socialLinks[reddit]=https://reddit.com/r/books"
```

**Response (201 Created or 200 OK):**
```json
{
  "success": true,
  "message": "Dashboard created successfully",
  "data": { /* dashboard object */ }
}
```

---

### 4. Update Dashboard Links Only (No PDF)
```
PUT /dashboards/:language
Content-Type: application/json
```
**Request Body:**
```json
{
  "language": "en",
  "youtubeUrl": "https://youtube.com/watch?v=newId",
  "socialLinks": {
    "discord": "https://discord.gg/newlink",
    "reddit": "https://reddit.com/r/newcommunity"
  }
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Dashboard links updated successfully",
  "data": { /* updated dashboard */ }
}
```

---

### 5. Delete Dashboard
```
DELETE /dashboards/:language
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Dashboard deleted successfully"
}
```

---

### 6. Download Dashboard PDF
```
GET /dashboards/:language/download-pdf
```
**Response:** Binary file (application/pdf)

---

## 📄 **PDF ENDPOINTS**

### 1. Get All PDFs (Paginated)
```
GET /pdfs
```
**Query Parameters:**
- `language` (optional): Filter by language
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "language": "en",
      "title": "English Literature Guide",
      "description": "A comprehensive guide to English literature",
      "fileName": "english-guide.pdf",
      "filePath": "./uploads/english-guide.pdf",
      "fileSize": 2048576,
      "uploadedBy": "admin",
      "downloadCount": 5,
      "isActive": true,
      "createdAt": "2024-12-23T10:00:00Z",
      "updatedAt": "2024-12-23T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

---

### 2. Get PDF by ID
```
GET /pdfs/:id
```
**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* pdf object */ }
}
```

---

### 3. Upload New PDF
```
POST /pdfs
Content-Type: multipart/form-data
```
**Form Data:**
- `pdf`: File (required, PDF only)
- `language`: "en" (required)
- `title`: "English Guide" (required)
- `description`: "Optional description" (optional)

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/v1/pdfs \
  -F "pdf=@/path/to/guide.pdf" \
  -F "language=en" \
  -F "title=English Literature Guide" \
  -F "description=A comprehensive guide"
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "PDF uploaded successfully",
  "data": { /* created pdf */ }
}
```

---

### 4. Update PDF
```
PUT /pdfs/:id
Content-Type: multipart/form-data
```
**Form Data:**
- `pdf`: File (optional, replace existing)
- `title`: "Updated Title" (optional)
- `description`: "Updated description" (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "PDF updated successfully",
  "data": { /* updated pdf */ }
}
```

---

### 5. Delete PDF
```
DELETE /pdfs/:id
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "PDF deleted successfully"
}
```

---

### 6. Download PDF (with counter)
```
GET /pdfs/:id/download
```
**Response:** Binary file (application/pdf)
**Side Effect:** Increments the `downloadCount` field

---

## 🏥 **HEALTH CHECK**

```
GET /health
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-12-23T10:00:00Z"
}
```

---

## ⚠️ **ERROR RESPONSES**

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "invalid",
      "msg": "Invalid value",
      "path": "language",
      "location": "body"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Carousel not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 🔐 **SECURITY NOTES**

✓ All inputs are validated before processing
✓ File uploads are restricted to PDF only
✓ File size limit: 50MB
✓ MongoDB injection prevention enabled
✓ CORS configured for localhost:5173 and localhost:3000
✓ Helmet.js security headers enabled
✓ Pre-schema validation on all models

---

## 🚀 **SUPPORTED LANGUAGES**

- `en` - English
- `ar` - Arabic
- `fr` - French
- `es` - Spanish
- `de` - German
- `zh` - Chinese
- `hi` - Hindi

---

## 📝 **QUICK START**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up `.env` file** (see `.env.example`)

3. **Seed database:**
   ```bash
   npm run seed
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```

5. **Test API:**
   ```bash
   curl http://localhost:5000/api/v1/health
   ```

---

Generated: December 23, 2024
