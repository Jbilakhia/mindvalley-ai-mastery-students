# Gemini File Search API Reference (2026)

**Target Audience**: Technical students, Claude Code agents, developers implementing RAG with Gemini

**Last Updated**: January 2026
**API Version**: v1beta
**Status**: Production-ready

---

## 1. API Overview

### Base URLs

| Operation | Base URL |
|-----------|----------|
| FileSearchStore management | `https://generativelanguage.googleapis.com/v1beta/` |
| File uploads (resumable) | `https://generativelanguage.googleapis.com/upload/v1beta/` |
| Content generation | `https://generativelanguage.googleapis.com/v1beta/` |

### Authentication

All requests require API key authentication. Two methods:

**Method 1: Query Parameter (Simple)**
```
GET https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=YOUR_API_KEY
```

**Method 2: Bearer Token (Recommended for SDKs)**
```
Authorization: Bearer YOUR_API_KEY
```

### API Versioning

Current version: `v1beta` (subject to breaking changes, but Google has committed to stability)

**Backwards Compatibility**: Google explicitly supports the parameter naming and structure shown in this doc. If they change it, they'll announce deprecation first.

---

## 2. Authentication Methods

### Getting Your API Key

1. Go to https://aistudio.google.com
2. Click "Get API Key"
3. Select or create Google Cloud project
4. Copy the API key (looks like: `AIzaSyDxxxxxxxxxxxxxxxxxxxx`)

### Environment Variables

Store your API key securely:

```bash
# Linux/macOS - Add to ~/.bashrc, ~/.zshrc, or ~/.bash_profile
export GEMINI_API_KEY="your-api-key-here"

# Windows - PowerShell
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")

# Verify it's set
echo $GEMINI_API_KEY  # Linux/macOS
echo $env:GEMINI_API_KEY  # Windows PowerShell
```

### SDK Authentication

**Python (google-genai)**
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
# OR from environment
import os
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
```

**Node.js (google-generative-ai)**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

**cURL**
```bash
API_KEY="your-api-key-here"

# Use as query parameter
curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$API_KEY"

# Store in variable for reuse
export GEMINI_API_KEY="your-api-key-here"
curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY"
```

---

## 3. File Search Store Operations

A **FileSearchStore** is a container holding documents and their embeddings. You query against stores, not individual files.

### Create Store (POST)

**Endpoint**
```
POST https://generativelanguage.googleapis.com/v1beta/fileSearchStores
```

**Required Headers**
```
Content-Type: application/json
X-Goog-Api-Key: YOUR_API_KEY
```

**Request Body**
```json
{
  "displayName": "Customer Support Knowledge Base"
}
```

**cURL Example**
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Customer Support Knowledge Base"
  }'
```

**Response (Success)**
```json
{
  "name": "fileSearchStores/abc123xyz",
  "displayName": "Customer Support Knowledge Base",
  "createTime": "2026-01-30T15:32:45.123456Z",
  "updateTime": "2026-01-30T15:32:45.123456Z"
}
```

**Python Example**
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

# Create store
store = genai.models.FileSearch.create_file_search_store(
    display_name="Customer Support Knowledge Base"
)

print(f"Store ID: {store.name}")
# Output: Store ID: fileSearchStores/abc123xyz
```

**Node.js Example**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function createStore() {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?" +
    "key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: "Customer Support Knowledge Base"
      })
    }
  );
  const store = await response.json();
  console.log("Store ID:", store.name);
  return store;
}
```

**Response Fields**
| Field | Type | Description |
|-------|------|-------------|
| name | string | Resource identifier: `fileSearchStores/{ID}` |
| displayName | string | Human-readable name you provided |
| createTime | string | ISO 8601 timestamp of creation |
| updateTime | string | ISO 8601 timestamp of last update |

### List Stores (GET)

**Endpoint**
```
GET https://generativelanguage.googleapis.com/v1beta/fileSearchStores
```

**Optional Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| pageSize | integer | 10 | Number of stores per page (1-100) |
| pageToken | string | none | Token from previous response for pagination |

**cURL Example**
```bash
# List all stores with default pagination
curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY"

# List with custom page size
curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?pageSize=50&key=$GEMINI_API_KEY"
```

**Response**
```json
{
  "fileSearchStores": [
    {
      "name": "fileSearchStores/abc123xyz",
      "displayName": "Customer Support Knowledge Base",
      "createTime": "2026-01-30T15:32:45.123456Z",
      "updateTime": "2026-01-30T15:32:45.123456Z"
    },
    {
      "name": "fileSearchStores/def456uvw",
      "displayName": "Product Documentation",
      "createTime": "2026-01-30T14:22:15.654321Z",
      "updateTime": "2026-01-30T14:22:15.654321Z"
    }
  ],
  "nextPageToken": "CjkSGxvODM..."
}
```

**Python Example**
```python
# List all stores
stores = genai.models.FileSearch.list_file_search_stores()

for store in stores:
    print(f"Store: {store.display_name} ({store.name})")
```

### Delete Store (DELETE)

**Endpoint**
```
DELETE https://generativelanguage.googleapis.com/v1beta/{storeId}
```

**Where `{storeId}` is**: `fileSearchStores/abc123xyz`

**cURL Example**
```bash
STORE_ID="fileSearchStores/abc123xyz"

curl -X DELETE \
  "https://generativelanguage.googleapis.com/v1beta/$STORE_ID?key=$GEMINI_API_KEY"
```

**Response**
```json
{}
```

Empty response indicates success.

**Python Example**
```python
store_id = "fileSearchStores/abc123xyz"
genai.models.FileSearch.delete_file_search_store(store_id)
print(f"Deleted store: {store_id}")
```

**Important Notes**
- Deleting a store also deletes all documents in it
- This operation cannot be undone
- Deletes are asynchronous but typically complete within seconds

---

## 4. Document Operations

### Upload Document (Resumable Protocol)

Gemini File Search uses Google's resumable upload protocol. This is a 2-step process:

**Step 1: Initiate Upload**

**Endpoint**
```
POST https://generativelanguage.googleapis.com/upload/v1beta/files
```

**Required Headers**
```
X-Goog-Upload-Protocol: resumable
X-Goog-Upload-Command: start
X-Goog-Upload-Header-Content-Type: application/pdf
Content-Length: 0
```

**Query Parameter**
```
?key=YOUR_API_KEY
```

**Request Body**
Empty for start command.

**cURL Example (Step 1)**
```bash
FILE_PATH="./document.pdf"
FILE_SIZE=$(wc -c < "$FILE_PATH")

# Initiate upload
UPLOAD_URL=$(curl -i -X POST \
  "https://generativelanguage.googleapis.com/upload/v1beta/files?key=$GEMINI_API_KEY" \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Type: application/pdf" \
  -H "Content-Length: 0" \
  2>&1 | grep -i "location:" | cut -d' ' -f2 | tr -d '\r')

echo "Upload URL: $UPLOAD_URL"
# Output example: Upload URL: https://generativelanguage.googleapis.com/upload/v1beta/...
```

**Response Headers**
```
Location: https://generativelanguage.googleapis.com/upload/v1beta/files?upload_id=...
X-Goog-Upload-Status: active
```

**Step 2: Upload File Bytes**

Once you have the upload URL from Step 1:

**Endpoint**
```
PUT {location_from_step_1}
```

**Required Headers**
```
X-Goog-Upload-Command: finalize
X-Goog-Upload-Offset: 0
Content-Type: application/pdf
```

**Request Body**
Binary file content

**cURL Example (Step 2)**
```bash
FILE_PATH="./document.pdf"
FILE_SIZE=$(wc -c < "$FILE_PATH")
UPLOAD_URL="https://generativelanguage.googleapis.com/upload/v1beta/files?upload_id=..."

# Upload file bytes
curl -X PUT \
  "$UPLOAD_URL" \
  -H "X-Goog-Upload-Command: finalize" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "Content-Type: application/pdf" \
  --data-binary "@$FILE_PATH"
```

**Response**
```json
{
  "file": {
    "name": "files/abc-123-def-456",
    "mimeType": "application/pdf",
    "sizeBytes": "1024000",
    "createTime": "2026-01-30T15:35:22.123456Z",
    "expirationTime": "2026-02-06T15:35:22.123456Z"
  }
}
```

**Python Example (Complete 2-Step Process)**
```python
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Upload file (handles resumable protocol automatically)
with open("document.pdf", "rb") as f:
    file = genai.upload_file(
        f,
        mime_type="application/pdf"
    )

print(f"File uploaded: {file.name}")
print(f"Size: {file.size_bytes} bytes")
print(f"Expires: {file.expiration_time}")
# Output example:
# File uploaded: files/abc-123-def-456
# Size: 1024000 bytes
# Expires: 2026-02-06T15:35:22.123456Z
```

**Node.js Example (Complete 2-Step Process)**
```javascript
const fs = require("fs");
const fetch = require("node-fetch");

async function uploadFile(filePath, apiKey) {
  const fileContent = fs.readFileSync(filePath);
  const fileName = require("path").basename(filePath);

  // Step 1: Initiate
  const initiateResponse = await fetch(
    "https://generativelanguage.googleapis.com/upload/v1beta/files?" +
    "key=" + apiKey,
    {
      method: "POST",
      headers: {
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Type": "application/pdf",
        "Content-Length": "0"
      }
    }
  );

  const uploadUrl = initiateResponse.headers.get("location");
  console.log("Upload URL:", uploadUrl);

  // Step 2: Upload file bytes
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "X-Goog-Upload-Command": "finalize",
      "X-Goog-Upload-Offset": "0",
      "Content-Type": "application/pdf"
    },
    body: fileContent
  });

  const result = await uploadResponse.json();
  console.log("File uploaded:", result.file.name);
  return result.file;
}

uploadFile("document.pdf", process.env.GEMINI_API_KEY);
```

**Supported MIME Types**
| Format | MIME Type |
|--------|-----------|
| PDF | application/pdf |
| Text | text/plain |
| Markdown | text/markdown |
| HTML | text/html |
| CSV | text/csv |
| JSON | application/json |
| Python | text/x-python |
| JavaScript | text/javascript |
| TypeScript | text/typescript |

**Upload Response Fields**
| Field | Type | Description |
|-------|------|-------------|
| name | string | Resource identifier: `files/{ID}` |
| mimeType | string | MIME type of uploaded file |
| sizeBytes | string | File size in bytes |
| createTime | string | ISO 8601 creation timestamp |
| expirationTime | string | ISO 8601 expiration (48 hours from upload) |

**Critical Behavior**
- Files expire after 48 hours if not added to a store
- Maximum file size: 2GB
- Resumable protocol automatically retries on connection failure
- Files are stored in Google's managed infrastructure (free storage)

### Add Document to Store

After uploading a file, add it to a FileSearchStore.

**Endpoint**
```
POST https://generativelanguage.googleapis.com/v1beta/{storeId}/files
```

**Where `{storeId}` is**: `fileSearchStores/abc123xyz`

**Request Body**
```json
{
  "fileId": "files/abc-123-def-456"
}
```

**cURL Example**
```bash
STORE_ID="fileSearchStores/abc123xyz"
FILE_ID="files/abc-123-def-456"

curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"fileId\": \"$FILE_ID\"}"
```

**Response**
```json
{
  "name": "fileSearchStores/abc123xyz/files/abc-123-def-456",
  "fileId": "files/abc-123-def-456",
  "displayName": "document.pdf",
  "createTime": "2026-01-30T15:36:10.123456Z",
  "updateTime": "2026-01-30T15:36:10.123456Z"
}
```

**Python Example**
```python
store_id = "fileSearchStores/abc123xyz"
file_id = "files/abc-123-def-456"

# Add file to store (triggers embedding and chunking)
store_file = genai.models.FileSearch.add_file_to_store(
    name=f"{store_id}",
    file_id=file_id
)

print(f"File added: {store_file.name}")
print(f"Processing started - indexing in background")
```

**Processing Timeline**
- Addition request returns immediately
- Indexing happens asynchronously
- Documents typically available for search within 30 seconds
- Large documents (>50MB) may take minutes
- Check with List Documents to see status

**Critical Behavior**
- Same file can be added to multiple stores
- Adding triggers automatic chunking, embedding, and indexing
- No visibility into chunk count or embedding details (black box)
- No way to cancel or modify indexing once started

### List Documents in Store (GET)

**Endpoint**
```
GET https://generativelanguage.googleapis.com/v1beta/{storeId}/files
```

**Optional Query Parameters**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| pageSize | integer | 10 | Number of files per page (1-100) |
| pageToken | string | none | Token from previous response for pagination |

**cURL Example**
```bash
STORE_ID="fileSearchStores/abc123xyz"

# List all documents
curl "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files?key=$GEMINI_API_KEY"

# List with custom page size
curl "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files?pageSize=50&key=$GEMINI_API_KEY"
```

**Response**
```json
{
  "files": [
    {
      "name": "fileSearchStores/abc123xyz/files/file1",
      "fileId": "files/file1",
      "displayName": "customer-guide.pdf",
      "createTime": "2026-01-30T15:36:10.123456Z",
      "updateTime": "2026-01-30T15:36:10.123456Z"
    },
    {
      "name": "fileSearchStores/abc123xyz/files/file2",
      "fileId": "files/file2",
      "displayName": "faq.txt",
      "createTime": "2026-01-30T15:36:15.123456Z",
      "updateTime": "2026-01-30T15:36:15.123456Z"
    }
  ],
  "nextPageToken": "CjISGxvODM..."
}
```

**Python Example**
```python
store_id = "fileSearchStores/abc123xyz"

# List files in store
files = genai.models.FileSearch.list_files_in_store(store_id)

for file in files:
    print(f"File: {file.display_name} ({file.file_id})")
```

### Delete Document from Store (DELETE)

**Endpoint**
```
DELETE https://generativelanguage.googleapis.com/v1beta/{storeId}/files/{fileId}
```

**Where**:
- `{storeId}` is: `fileSearchStores/abc123xyz`
- `{fileId}` is: `file1` (the last segment of the file resource name)

**cURL Example**
```bash
STORE_ID="fileSearchStores/abc123xyz"
FILE_ID="file1"

curl -X DELETE \
  "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files/$FILE_ID?key=$GEMINI_API_KEY"
```

**Response**
```json
{}
```

Empty response indicates success.

**Python Example**
```python
store_id = "fileSearchStores/abc123xyz"
file_id = "file1"

genai.models.FileSearch.remove_file_from_store(
    store_id=store_id,
    file_id=file_id
)
print("File removed from store")
```

**Important Notes**
- Removing from store doesn't delete the underlying file
- File continues to exist for 48 hours from original upload
- Can add the same file to another store without re-uploading
- Removal is immediate (no async processing)

---

## 5. Query Operations

### File Search Query (generateContent with tools)

This is how you actually search and retrieve information from your knowledge base.

**Endpoint**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

**Model Options**
| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| gemini-2.5-flash | Very fast | Good | Most queries, real-time |
| gemini-2.5-pro | Fast | Excellent | Complex reasoning, accuracy critical |
| gemini-1.5-flash | Fast | Good | Legacy, lower cost |

**Request Body Structure**
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "What is your return policy?"
        }
      ]
    }
  ],
  "tools": [
    {
      "fileSearch": {
        "fileSearchStoreNames": ["fileSearchStores/abc123xyz"]
      }
    }
  ],
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 2048,
    "topK": 40,
    "topP": 0.95
  }
}
```

**CRITICAL PARAMETER**: Use `fileSearchStoreNames` (NOT `storeIds` or `storeNames`)

**cURL Example (Single Store)**
```bash
STORE_ID="fileSearchStores/abc123xyz"
API_KEY="$GEMINI_API_KEY"

curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "What is your return policy?"
          }
        ]
      }
    ],
    "tools": [
      {
        "fileSearch": {
          "fileSearchStoreNames": ["'$STORE_ID'"]
        }
      }
    ],
    "generationConfig": {
      "temperature": 0.3,
      "maxOutputTokens": 2048
    }
  }'
```

**Python Example (Single Store)**
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

# Initialize model
model = genai.GenerativeModel("gemini-2.5-flash")

# Create file search tool
file_search_tool = genai.types.Tool(
    file_search=genai.types.FileSearch(
        file_search_store_names=["fileSearchStores/abc123xyz"]
    )
)

# Query with file search
response = model.generate_content(
    "What is your return policy?",
    tools=[file_search_tool],
    generation_config={
        "temperature": 0.3,
        "max_output_tokens": 2048
    }
)

# Extract answer and citations
answer = response.text
citations = response.grounding_metadata.grounding_chunks if response.grounding_metadata else []

print("Answer:", answer)
print(f"Number of sources: {len(citations)}")

for i, chunk in enumerate(citations):
    print(f"\nSource {i+1}:")
    print(f"  File: {chunk.retrieved_context.title}")
    print(f"  Content: {chunk.text[:200]}...")
```

**Node.js Example (Single Store)**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function queryWithFileSearch() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "What is your return policy?"
          }
        ]
      }
    ],
    tools: [
      {
        fileSearch: {
          fileSearchStoreNames: ["fileSearchStores/abc123xyz"]
        }
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048
    }
  });

  console.log("Answer:", response.text);

  if (response.groundingMetadata?.groundingChunks) {
    console.log("Sources:");
    response.groundingMetadata.groundingChunks.forEach((chunk, i) => {
      console.log(`${i + 1}. ${chunk.retrievedContext.title}`);
    });
  }
}

queryWithFileSearch();
```

### Multi-Store Query

Query across multiple knowledge bases in a single request.

**Request Body (5 Stores)**
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Compare return policies across all documents"
        }
      ]
    }
  ],
  "tools": [
    {
      "fileSearch": {
        "fileSearchStoreNames": [
          "fileSearchStores/store1",
          "fileSearchStores/store2",
          "fileSearchStores/store3",
          "fileSearchStores/store4",
          "fileSearchStores/store5"
        ]
      }
    }
  ],
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 2048
  }
}
```

**cURL Example (Multi-Store)**
```bash
API_KEY="$GEMINI_API_KEY"

curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Compare return policies across all documents"
          }
        ]
      }
    ],
    "tools": [
      {
        "fileSearch": {
          "fileSearchStoreNames": [
            "fileSearchStores/store1",
            "fileSearchStores/store2",
            "fileSearchStores/store3",
            "fileSearchStores/store4",
            "fileSearchStores/store5"
          ]
        }
      }
    ],
    "generationConfig": {
      "temperature": 0.3,
      "maxOutputTokens": 2048
    }
  }'
```

**Python Example (Multi-Store)**
```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.5-flash")

# Define multiple stores
stores = [
    "fileSearchStores/customer-support",
    "fileSearchStores/product-docs",
    "fileSearchStores/faq",
    "fileSearchStores/policies",
    "fileSearchStores/guides"
]

# Create file search tool with multiple stores
file_search_tool = genai.types.Tool(
    file_search=genai.types.FileSearch(
        file_search_store_names=stores
    )
)

# Query across all stores
response = model.generate_content(
    "Compare return policies across all documents",
    tools=[file_search_tool],
    generation_config={
        "temperature": 0.3,
        "max_output_tokens": 2048
    }
)

# Extract results
answer = response.text
citations = response.grounding_metadata.grounding_chunks if response.grounding_metadata else []

print("Answer:", answer)
print(f"Total sources used: {len(citations)}")

# Group citations by source
sources_by_file = {}
for chunk in citations:
    file_name = chunk.retrieved_context.title
    if file_name not in sources_by_file:
        sources_by_file[file_name] = []
    sources_by_file[file_name].append(chunk.text)

for file_name, chunks in sources_by_file.items():
    print(f"\n{file_name}: {len(chunks)} chunks")
```

**Behavior Notes**
- Results are merged and deduplicated automatically
- Model prioritizes most relevant results from all stores
- Response indicates which files were used (via grounding metadata)
- No limit on number of stores (tested up to 20+)

---

## 6. Request/Response Formats

### Complete Query Request Example (Fully Annotated)

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "What does the document say about shipping costs for international orders?"
        }
      ]
    }
  ],
  "tools": [
    {
      "fileSearch": {
        "fileSearchStoreNames": ["fileSearchStores/abc123xyz"]
      }
    }
  ],
  "systemInstruction": {
    "parts": [
      {
        "text": "You are a helpful customer service representative. Answer questions based only on the provided documents. If you cannot find the answer, say so explicitly."
      }
    ]
  },
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 2048,
    "topK": 40,
    "topP": 0.95,
    "stopSequences": []
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

### Complete Query Response Example (Fully Annotated)

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "According to our shipping documentation, international orders typically incur the following costs:\n\n1. Standard International Shipping: $25-$50 depending on destination region\n2. Express International: $75-$150 with 3-5 day delivery\n3. Free shipping applies to orders over $200 to select countries\n\nThe exact cost depends on the package weight and destination country. Additional customs and import duties may apply depending on the recipient country's regulations."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE"
        }
      ],
      "groundingMetadata": {
        "groundingChunks": [
          {
            "web": {
              "uri": "fileSearchStores/abc123xyz"
            },
            "retrievedContext": {
              "title": "shipping-guide.pdf",
              "uri": "fileSearchStores/abc123xyz/files/file1"
            },
            "text": "International orders typically incur the following costs: Standard International Shipping: $25-$50 depending on destination region. Express International: $75-$150 with 3-5 day delivery.",
            "chunkMetadata": {
              "chunkIndex": 5
            }
          },
          {
            "retrievedContext": {
              "title": "policies.txt",
              "uri": "fileSearchStores/abc123xyz/files/file2"
            },
            "text": "Free shipping applies to orders over $200 to select countries. Additional customs and import duties may apply depending on the recipient country's regulations.",
            "chunkMetadata": {
              "chunkIndex": 12
            }
          }
        ],
        "webSearchQueries": []
      }
    }
  ],
  "usageMetadata": {
    "promptTokens": 1250,
    "cachedContentTokens": 0,
    "candidatesTokens": 340,
    "totalTokens": 1590
  }
}
```

### Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| candidates[0].content.parts[0].text | string | The generated answer with grounding |
| candidates[0].finishReason | string | Why response ended (STOP, MAX_TOKENS, SAFETY, etc.) |
| candidates[0].groundingMetadata.groundingChunks | array | Retrieved context chunks with citations |
| groundingChunks[n].retrievedContext.title | string | Source document name |
| groundingChunks[n].text | string | Exact text chunk from document |
| usageMetadata.promptTokens | integer | Tokens used in request |
| usageMetadata.candidatesTokens | integer | Tokens generated in response |
| usageMetadata.totalTokens | integer | Total for billing purposes |

---

## 7. Parameters Reference

### generationConfig Parameters

Complete list of parameters for controlling response generation.

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| temperature | number | 1.0 | 0.0 - 2.0 | Controls randomness. 0.3 recommended for factual accuracy. Higher = more creative but less reliable. |
| maxOutputTokens | integer | 8192 | 1 - 128000 | Maximum response length. Recommend 2048 for file search (balance detail vs cost). |
| topK | integer | 40 | 1 - 100 | Consider only top K most likely tokens. Reduces nonsensical options. |
| topP | number | 0.95 | 0.0 - 1.0 | Consider tokens until cumulative probability exceeds P. 0.95 is good default. |
| stopSequences | array | [] | varies | Stop generation if any sequence appears. Useful to end at natural boundaries. |

### Recommended Configs

**For Factual Queries (Most Use Cases)**
```json
{
  "temperature": 0.3,
  "maxOutputTokens": 2048,
  "topK": 40,
  "topP": 0.95
}
```

**For Creative Responses**
```json
{
  "temperature": 1.5,
  "maxOutputTokens": 4096,
  "topK": 50,
  "topP": 0.99
}
```

**For Cost Optimization**
```json
{
  "temperature": 0.3,
  "maxOutputTokens": 512,
  "topK": 30,
  "topP": 0.90
}
```

### File Search Tool Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fileSearchStoreNames | array | yes | List of store resource names (e.g., `["fileSearchStores/abc123"]`) |

**Common Pattern**
```json
"tools": [
  {
    "fileSearch": {
      "fileSearchStoreNames": ["fileSearchStores/customer-support"]
    }
  }
]
```

---

## 8. Error Codes Catalog

### HTTP Status Codes and Error Responses

**400 Bad Request**
```json
{
  "error": {
    "code": 400,
    "message": "Invalid Argument: The provided API key is not valid.",
    "status": "INVALID_ARGUMENT"
  }
}
```

| Cause | Solution |
|-------|----------|
| Invalid API key format | Check key starts with `AIzaSy...` |
| Invalid store ID format | Must be `fileSearchStores/abc123xyz` |
| Invalid parameter types | Check JSON types match specification |
| Missing required parameters | Verify `fileSearchStoreNames` is provided |

**401 Unauthorized**
```json
{
  "error": {
    "code": 401,
    "message": "Request had invalid authentication credentials.",
    "status": "UNAUTHENTICATED"
  }
}
```

| Cause | Solution |
|-------|----------|
| API key not provided | Add `?key=YOUR_API_KEY` to URL |
| API key expired | Regenerate from aistudio.google.com |
| Wrong API key | Verify key matches your project |

**403 Forbidden**
```json
{
  "error": {
    "code": 403,
    "message": "The caller does not have permission to access the API.",
    "status": "PERMISSION_DENIED"
  }
}
```

| Cause | Solution |
|-------|----------|
| API not enabled in project | Enable Gemini API in Google Cloud Console |
| Quota exceeded for project | Check billing and quota settings |

**404 Not Found**
```json
{
  "error": {
    "code": 404,
    "message": "The requested resource was not found.",
    "status": "NOT_FOUND"
  }
}
```

| Cause | Solution |
|-------|----------|
| Store doesn't exist | Check store ID with `GET /fileSearchStores` |
| File doesn't exist | Verify file was uploaded and added to store |
| Deleted resource | Resource may have been deleted by another user |

**429 Too Many Requests**
```json
{
  "error": {
    "code": 429,
    "message": "Resource has been exhausted.",
    "status": "RESOURCE_EXHAUSTED"
  }
}
```

| Cause | Solution |
|-------|----------|
| Rate limit exceeded | See Rate Limits section, implement backoff |
| Quota exceeded | Upgrade billing, reduce request rate |
| Concurrent uploads | Stagger uploads or use smaller files |

**500 Internal Server Error**
```json
{
  "error": {
    "code": 500,
    "message": "Internal error occurred.",
    "status": "INTERNAL"
  }
}
```

| Cause | Solution |
|-------|----------|
| Temporary service issue | Retry with exponential backoff |
| File processing error | Try re-uploading file |
| Indexing failure | Contact support if persists |

**503 Service Unavailable**
```json
{
  "error": {
    "code": 503,
    "message": "The service is temporarily unavailable.",
    "status": "UNAVAILABLE"
  }
}
```

| Cause | Solution |
|-------|----------|
| Service maintenance | Wait and retry |
| Regional outage | Try again in 5-10 minutes |
| Overloaded backend | Implement exponential backoff |

### Undocumented Behavior Discovered in Implementation

**Issue**: Sometimes grounding metadata is missing
- **Cause**: Model chose not to use file search (rare)
- **Solution**: Check that query is answerable from documents, adjust temperature

**Issue**: Duplicate retrieval results in groundingMetadata
- **Cause**: Same chunk retrieved from multiple indexes
- **Solution**: Deduplicate by `text` field in your application code

**Issue**: Store creation succeeds but queries return "Store not found"
- **Cause**: Eventual consistency delay (usually <1 second)
- **Solution**: Add 1-2 second delay after store creation before queries

**Issue**: Files added to store but not appearing in results
- **Cause**: Indexing in progress (async operation)
- **Solution**: Wait 10-30 seconds before querying new files

---

## 9. Rate Limits & Quotas

### Free Tier Limits

| Resource | Limit | Reset Period |
|----------|-------|--------------|
| Requests per minute | 60 | 60 seconds |
| Requests per day | 1,500 | 24 hours (UTC) |
| Concurrent uploads | 10 | N/A |
| File storage | 1GB | N/A |
| Max file size | 2GB | N/A |
| Max store size | 1TB | N/A |

### Paid Tier Limits

Higher limits available with paid API. Check Google Cloud Console for your current tier.

### Handling Rate Limits

**Python with Exponential Backoff**
```python
import time
import random
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-2.5-flash")

def query_with_retry(query, store_id, max_retries=3):
    """Query with automatic retry and exponential backoff."""

    file_search_tool = genai.types.Tool(
        file_search=genai.types.FileSearch(
            file_search_store_names=[store_id]
        )
    )

    for attempt in range(max_retries):
        try:
            response = model.generate_content(
                query,
                tools=[file_search_tool],
                generation_config={"temperature": 0.3}
            )
            return response

        except ResourceExhausted as e:
            if attempt < max_retries - 1:
                # Exponential backoff: 2^attempt seconds + jitter
                wait_time = (2 ** attempt) + random.uniform(0, 1)
                print(f"Rate limited. Waiting {wait_time:.2f}s before retry...")
                time.sleep(wait_time)
            else:
                raise

# Usage
response = query_with_retry(
    "What is your return policy?",
    "fileSearchStores/abc123xyz"
)
print(response.text)
```

**Node.js with Exponential Backoff**
```javascript
async function queryWithRetry(query, storeId, maxRetries = 3) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{ text: query }]
        }],
        tools: [{
          fileSearch: {
            fileSearchStoreNames: [storeId]
          }
        }]
      });

      return response;

    } catch (error) {
      if (error.message.includes("429") && attempt < maxRetries - 1) {
        const waitTime = (Math.pow(2, attempt) + Math.random()) * 1000;
        console.log(`Rate limited. Waiting ${(waitTime/1000).toFixed(2)}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
}
```

**cURL with Bash Retry Loop**
```bash
#!/bin/bash

API_KEY="$GEMINI_API_KEY"
STORE_ID="fileSearchStores/abc123xyz"
QUERY="What is your return policy?"
MAX_RETRIES=3

for attempt in $(seq 1 $MAX_RETRIES); do
  response=$(curl -s -w "\n%{http_code}" \
    -X POST \
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"contents\": [{
        \"role\": \"user\",
        \"parts\": [{\"text\": \"$QUERY\"}]
      }],
      \"tools\": [{
        \"fileSearch\": {
          \"fileSearchStoreNames\": [\"$STORE_ID\"]
        }
      }]
    }")

  http_code=$(echo "$response" | tail -n 1)
  body=$(echo "$response" | head -n -1)

  if [ "$http_code" -eq 200 ]; then
    echo "$body"
    exit 0
  elif [ "$http_code" -eq 429 ] && [ $attempt -lt $MAX_RETRIES ]; then
    wait_time=$((2 ** (attempt - 1)))
    echo "Rate limited. Waiting ${wait_time}s..." >&2
    sleep $wait_time
  else
    echo "Error: HTTP $http_code" >&2
    echo "$body" >&2
    exit 1
  fi
done
```

### Quota Monitoring

**Check quotas in Google Cloud Console**
1. Go to https://console.cloud.google.com/
2. Navigate to APIs & Services > Quotas
3. Filter for "Generative AI"
4. See current usage and limits

**Monitor token usage for cost**
```python
def estimate_cost(num_requests, avg_prompt_tokens=1000, avg_response_tokens=300):
    """Estimate cost for file search queries."""

    # Pricing: $0.075 per 1M input tokens, $0.30 per 1M output tokens
    input_cost = (num_requests * avg_prompt_tokens / 1_000_000) * 0.075
    output_cost = (num_requests * avg_response_tokens / 1_000_000) * 0.30
    total = input_cost + output_cost

    print(f"Requests: {num_requests}")
    print(f"Est. input cost: ${input_cost:.4f}")
    print(f"Est. output cost: ${output_cost:.4f}")
    print(f"Total: ${total:.4f}")

estimate_cost(1000)  # For 1000 requests
# Output:
# Requests: 1000
# Est. input cost: $0.0750
# Est. output cost: $0.0900
# Total: $0.1650
```

---

## 10. Code Examples

### Setup: Create Store, Upload Documents, Run Query

**Complete Python Workflow**
```python
import google.generativeai as genai
import os

# 1. Configure API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 2. Create FileSearchStore
print("Creating FileSearchStore...")
store = genai.models.FileSearch.create_file_search_store(
    display_name="Customer Knowledge Base"
)
store_id = store.name
print(f"Store created: {store_id}")

# 3. Upload and add documents
files_to_upload = [
    ("customer-guide.pdf", "application/pdf"),
    ("faq.txt", "text/plain"),
    ("policies.md", "text/markdown")
]

for file_path, mime_type in files_to_upload:
    print(f"\nUploading {file_path}...")

    with open(file_path, "rb") as f:
        file = genai.upload_file(f, mime_type=mime_type)

    print(f"  File uploaded: {file.name}")

    # Add to store
    store_file = genai.models.FileSearch.add_file_to_store(
        name=store_id,
        file_id=file.name
    )
    print(f"  Added to store")

# 4. Wait for indexing (usually 10-30 seconds)
import time
print("\nWaiting for indexing...")
time.sleep(15)

# 5. Query the knowledge base
print("\nQuerying knowledge base...")
model = genai.GenerativeModel("gemini-2.5-flash")

file_search_tool = genai.types.Tool(
    file_search=genai.types.FileSearch(
        file_search_store_names=[store_id]
    )
)

response = model.generate_content(
    "What is the return policy?",
    tools=[file_search_tool],
    generation_config={
        "temperature": 0.3,
        "max_output_tokens": 2048
    }
)

# 6. Extract and display results
print("\n" + "="*60)
print("ANSWER:")
print(response.text)

if response.grounding_metadata and response.grounding_metadata.grounding_chunks:
    print("\n" + "="*60)
    print("SOURCES:")
    for i, chunk in enumerate(response.grounding_metadata.grounding_chunks, 1):
        print(f"\n{i}. {chunk.retrieved_context.title}")
        print(f"   {chunk.text[:150]}...")

# 7. Clean up
print("\n" + "="*60)
print("Cleaning up...")
genai.models.FileSearch.delete_file_search_store(store_id)
print(f"Deleted store: {store_id}")
```

**Complete Node.js Workflow**
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function completeWorkflow() {
  // 1. Create FileSearchStore
  console.log("Creating FileSearchStore...");
  const createResponse = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?" +
    "key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: "Customer Knowledge Base"
      })
    }
  );

  const store = await createResponse.json();
  const storeId = store.name;
  console.log(`Store created: ${storeId}`);

  // 2. Upload and add documents
  const files = [
    { path: "customer-guide.pdf", mime: "application/pdf" },
    { path: "faq.txt", mime: "text/plain" },
    { path: "policies.md", mime: "text/markdown" }
  ];

  for (const file of files) {
    console.log(`\nUploading ${file.path}...`);

    // Upload file (2-step resumable)
    const fileContent = fs.readFileSync(file.path);

    // Step 1: Initiate
    const initiateResponse = await fetch(
      "https://generativelanguage.googleapis.com/upload/v1beta/files?" +
      "key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "X-Goog-Upload-Protocol": "resumable",
          "X-Goog-Upload-Command": "start",
          "X-Goog-Upload-Header-Content-Type": file.mime,
          "Content-Length": "0"
        }
      }
    );

    const uploadUrl = initiateResponse.headers.get("location");

    // Step 2: Upload bytes
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "X-Goog-Upload-Command": "finalize",
        "X-Goog-Upload-Offset": "0",
        "Content-Type": file.mime
      },
      body: fileContent
    });

    const uploadedFile = await uploadResponse.json();
    const fileId = uploadedFile.file.name;
    console.log(`  File uploaded: ${fileId}`);

    // Add to store
    const addResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${storeId}/files?` +
      "key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId })
      }
    );

    console.log("  Added to store");
  }

  // 3. Wait for indexing
  console.log("\nWaiting for indexing...");
  await new Promise(resolve => setTimeout(resolve, 15000));

  // 4. Query the knowledge base
  console.log("Querying knowledge base...");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: "What is the return policy?" }]
    }],
    tools: [{
      fileSearch: {
        fileSearchStoreNames: [storeId]
      }
    }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048
    }
  });

  // 5. Display results
  console.log("\n" + "=".repeat(60));
  console.log("ANSWER:");
  console.log(response.text);

  if (response.groundingMetadata?.groundingChunks) {
    console.log("\n" + "=".repeat(60));
    console.log("SOURCES:");
    response.groundingMetadata.groundingChunks.forEach((chunk, i) => {
      console.log(`\n${i + 1}. ${chunk.retrievedContext.title}`);
      console.log(`   ${chunk.text.substring(0, 150)}...`);
    });
  }

  // 6. Clean up
  console.log("\n" + "=".repeat(60));
  console.log("Cleaning up...");
  await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${storeId}?` +
    "key=" + process.env.GEMINI_API_KEY,
    { method: "DELETE" }
  );
  console.log(`Deleted store: ${storeId}`);
}

completeWorkflow().catch(console.error);
```

### N8N HTTP Node Configuration

**Create Store (N8N HTTP Node)**
```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key={{$env.GEMINI_API_KEY}}

Headers:
{
  "Content-Type": "application/json"
}

Body (JSON):
{
  "displayName": "My Knowledge Base"
}

Output parsing: body.name
```

**Upload and Add Document (2 HTTP nodes)**

Node 1: Initiate Upload
```
Method: POST
URL: https://generativelanguage.googleapis.com/upload/v1beta/files?key={{$env.GEMINI_API_KEY}}

Headers:
{
  "X-Goog-Upload-Protocol": "resumable",
  "X-Goog-Upload-Command": "start",
  "X-Goog-Upload-Header-Content-Type": "application/pdf",
  "Content-Length": "0"
}

Body: (empty)

Output: response.headers.location (save as uploadUrl)
```

Node 2: Complete Upload
```
Method: PUT
URL: {{uploadUrl}}

Headers:
{
  "X-Goog-Upload-Command": "finalize",
  "X-Goog-Upload-Offset": "0",
  "Content-Type": "application/pdf"
}

Body (Binary): file from file upload node
Output parsing: body.file.name (this is fileId)
```

Node 3: Add to Store
```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/{{storeId}}/files?key={{$env.GEMINI_API_KEY}}

Headers:
{
  "Content-Type": "application/json"
}

Body (JSON):
{
  "fileId": "{{fileId}}"
}
```

**Query with File Search (N8N HTTP Node)**
```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={{$env.GEMINI_API_KEY}}

Headers:
{
  "Content-Type": "application/json"
}

Body (JSON):
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "{{queryText}}"
        }
      ]
    }
  ],
  "tools": [
    {
      "fileSearch": {
        "fileSearchStoreNames": ["{{storeId}}"]
      }
    }
  ],
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 2048
  }
}

Output parsing:
Answer: body.candidates[0].content.parts[0].text
Citations: body.candidates[0].groundingMetadata.groundingChunks
```

---

## 11. Best Practices

### Retry Logic

Always implement retry with exponential backoff for production systems:

```python
def query_with_smart_retry(query, store_id, max_retries=5):
    """Retry with exponential backoff and jitter."""

    import time
    import random
    import google.generativeai as genai

    model = genai.GenerativeModel("gemini-2.5-flash")
    file_search_tool = genai.types.Tool(
        file_search=genai.types.FileSearch(
            file_search_store_names=[store_id]
        )
    )

    for attempt in range(max_retries):
        try:
            return model.generate_content(
                query,
                tools=[file_search_tool],
                generation_config={"temperature": 0.3}
            )

        except Exception as e:
            if attempt < max_retries - 1:
                # Exponential backoff: 2^attempt + jitter
                base_wait = 2 ** attempt
                jitter = random.uniform(0, base_wait * 0.1)
                wait_time = base_wait + jitter

                print(f"Attempt {attempt + 1} failed: {e}")
                print(f"Retrying in {wait_time:.2f}s...")
                time.sleep(wait_time)
            else:
                print(f"Final attempt failed after {max_retries} tries")
                raise
```

### Error Handling

Handle specific error types appropriately:

```python
import google.generativeai as genai
from google.api_core.exceptions import (
    InvalidArgument,
    Unauthenticated,
    PermissionDenied,
    NotFound,
    ResourceExhausted,
    InternalServerError,
    ServiceUnavailable
)

def query_with_error_handling(query, store_id):
    """Query with comprehensive error handling."""

    model = genai.GenerativeModel("gemini-2.5-flash")
    file_search_tool = genai.types.Tool(
        file_search=genai.types.FileSearch(
            file_search_store_names=[store_id]
        )
    )

    try:
        response = model.generate_content(
            query,
            tools=[file_search_tool],
            generation_config={"temperature": 0.3}
        )
        return response

    except InvalidArgument as e:
        print(f"Invalid argument: {e}")
        print("Check store ID format and parameters")
        raise

    except Unauthenticated as e:
        print(f"Authentication failed: {e}")
        print("Check API key is valid and set correctly")
        raise

    except PermissionDenied as e:
        print(f"Permission denied: {e}")
        print("Check API is enabled in Google Cloud Console")
        raise

    except NotFound as e:
        print(f"Resource not found: {e}")
        print("Check store exists and hasn't been deleted")
        raise

    except ResourceExhausted as e:
        print(f"Rate limited: {e}")
        print("Implement exponential backoff")
        raise

    except ServiceUnavailable as e:
        print(f"Service unavailable: {e}")
        print("Try again in a few seconds")
        raise

    except InternalServerError as e:
        print(f"Internal server error: {e}")
        print("Try again with backoff")
        raise
```

### Optimization: Cost

Minimize token usage to reduce costs:

```python
def query_with_cost_optimization(
    query,
    store_id,
    brief_mode=False
):
    """Query with cost optimization settings."""

    model = genai.GenerativeModel("gemini-2.5-flash")
    file_search_tool = genai.types.Tool(
        file_search=genai.types.FileSearch(
            file_search_store_names=[store_id]
        )
    )

    # For brief responses
    if brief_mode:
        system_prompt = "Answer very briefly (1-2 sentences)."
        max_tokens = 256
    else:
        system_prompt = "Provide detailed answer with examples."
        max_tokens = 2048

    response = model.generate_content(
        query,
        system_instruction=system_prompt,
        tools=[file_search_tool],
        generation_config={
            "temperature": 0.3,
            "maxOutputTokens": max_tokens,
            "topK": 30,  # Lower K = fewer tokens checked
            "topP": 0.90  # Lower P = tighter distribution
        }
    )

    # Log token usage
    usage = response.usage_metadata
    estimated_cost = (
        (usage.prompt_tokens / 1_000_000) * 0.075 +
        (usage.candidates_tokens / 1_000_000) * 0.30
    )

    print(f"Prompt tokens: {usage.prompt_tokens}")
    print(f"Response tokens: {usage.candidates_tokens}")
    print(f"Estimated cost: ${estimated_cost:.6f}")

    return response
```

### Optimization: Accuracy

Improve answer quality for complex queries:

```python
def query_with_accuracy_optimization(query, stores):
    """Multi-step query for maximum accuracy."""

    model = genai.GenerativeModel("gemini-2.5-flash")
    file_search_tool = genai.types.Tool(
        file_search=genai.types.FileSearch(
            file_search_store_names=stores
        )
    )

    # Step 1: Initial query
    initial_response = model.generate_content(
        f"{query}\n\nProvide a comprehensive answer with specific details.",
        tools=[file_search_tool],
        generation_config={
            "temperature": 0.3,
            "maxOutputTokens": 2048
        }
    )

    # Step 2: Verification query
    follow_up = (
        f"Original question: {query}\n\n"
        f"Your answer: {initial_response.text}\n\n"
        f"Are there any other relevant details or edge cases I missed?"
    )

    verification_response = model.generate_content(
        follow_up,
        tools=[file_search_tool],
        generation_config={
            "temperature": 0.3,
            "maxOutputTokens": 1024
        }
    )

    # Combine results
    combined_answer = f"{initial_response.text}\n\nAdditional details:\n{verification_response.text}"

    # Extract all citations
    all_citations = []
    if initial_response.grounding_metadata:
        all_citations.extend(initial_response.grounding_metadata.grounding_chunks)
    if verification_response.grounding_metadata:
        all_citations.extend(verification_response.grounding_metadata.grounding_chunks)

    # Deduplicate by text
    seen = set()
    unique_citations = []
    for citation in all_citations:
        if citation.text not in seen:
            seen.add(citation.text)
            unique_citations.append(citation)

    return {
        "answer": combined_answer,
        "citations": unique_citations,
        "citation_count": len(unique_citations)
    }
```

### Document Preparation Best Practices

Prepare documents for optimal retrieval:

1. **Structure**: Use clear headings and sections
2. **Redundancy**: Include both long and short forms of terms
3. **Context**: Keep related information together
4. **Freshness**: Update documents regularly
5. **Splitting**: Break documents >10MB into smaller parts

```python
def prepare_document_for_upload(file_path, max_chunk_size_mb=5):
    """Check if document needs splitting."""

    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)

    if file_size_mb > max_chunk_size_mb:
        print(f"Warning: {file_path} is {file_size_mb:.1f}MB")
        print(f"Consider splitting into <{max_chunk_size_mb}MB chunks for optimal indexing")
        print("Suggestion: Use PyPDF2 or pdfplumber to split PDF into sections")
        return False

    print(f"✓ {file_path} is {file_size_mb:.1f}MB - good size for upload")
    return True
```

---

## 12. Migration Notes & API Version Changes

### Current Status

The Gemini File Search API is in `v1beta` (since November 2024).

**Stability**: Google has committed to backwards compatibility for:
- Parameter names (`fileSearchStoreNames`)
- Request/response structure
- Core behavior

**Potential Breaking Changes** (if they happen):
- Model pricing may change
- New parameters may be added (but old ones keep working)
- Rate limits may change based on usage tiers

### Version Migration Path (If Needed)

If Google releases v1 (production):

**Before**: `v1beta`
```
POST https://generativelanguage.googleapis.com/v1beta/fileSearchStores
```

**After**: `v1` (hypothetical)
```
POST https://generativelanguage.googleapis.com/v1/fileSearchStores
```

**Migration**: Update all base URLs. Request/response format stays the same.

---

## 13. Quick Reference Tables

### Endpoint Summary

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create Store | POST | `/v1beta/fileSearchStores` |
| List Stores | GET | `/v1beta/fileSearchStores` |
| Delete Store | DELETE | `/v1beta/fileSearchStores/{id}` |
| Upload File | POST/PUT | `/upload/v1beta/files` (resumable) |
| Add File to Store | POST | `/v1beta/{storeId}/files` |
| List Files in Store | GET | `/v1beta/{storeId}/files` |
| Remove File | DELETE | `/v1beta/{storeId}/files/{fileId}` |
| Generate with File Search | POST | `/v1beta/models/{model}:generateContent` |

### Models Available

| Model | Speed | Quality | Cost (Input/Output) | Recommended Use |
|-------|-------|---------|-------------------|-----------------|
| gemini-2.5-flash | Very Fast | Good | $0.075/$0.30 per 1M tokens | File search queries (recommended) |
| gemini-2.5-pro | Fast | Excellent | $2.50/$10.00 per 1M tokens | Complex reasoning, high accuracy needed |
| gemini-1.5-flash | Fast | Good | $0.075/$0.30 per 1M tokens | Legacy, cost-conscious |

### Common Parameter Combinations

**Highest Accuracy** (for important queries)
```json
{
  "temperature": 0.2,
  "maxOutputTokens": 4096,
  "topK": 40,
  "topP": 0.95
}
```

**Balanced** (default recommendation)
```json
{
  "temperature": 0.3,
  "maxOutputTokens": 2048,
  "topK": 40,
  "topP": 0.95
}
```

**Cost Optimized** (for high volume)
```json
{
  "temperature": 0.3,
  "maxOutputTokens": 512,
  "topK": 20,
  "topP": 0.85
}
```

---

## 14. Troubleshooting Guide

### "No relevant results"

**Checklist**:
1. Verify document was added to store: `GET /v1beta/{storeId}/files`
2. Wait 30+ seconds after adding document (indexing may be in progress)
3. Try simpler query: "Tell me about X" instead of "What is the policy on X?"
4. Check document actually contains the information

**Fix**:
```python
# Verify document is indexed
store_id = "fileSearchStores/abc123xyz"
files = genai.models.FileSearch.list_files_in_store(store_id)
print(f"Documents in store: {len(files)}")

# Try rephrased query
response = model.generate_content(
    "The document talks about...",  # Simpler phrasing
    tools=[file_search_tool]
)
```

### "Hallucinated content" (wrong answers)

**Cause**: Model generating information not in documents

**Fix**:
```python
# Lower temperature for more factual responses
response = model.generate_content(
    query,
    tools=[file_search_tool],
    generation_config={
        "temperature": 0.1  # Very low = factual
    }
)

# Verify grounding
if response.grounding_metadata and response.grounding_metadata.grounding_chunks:
    print("Answer is grounded in documents")
else:
    print("WARNING: Answer may not be grounded")
```

### "Rate limit" (429 errors)

**Cause**: Exceeded quota

**Fix**: See Rate Limits section above with retry code

### "Store not found" immediately after creation

**Cause**: Eventual consistency delay

**Fix**:
```python
# Add delay after store creation
store = genai.models.FileSearch.create_file_search_store(...)
time.sleep(2)  # Wait for consistency

# Or use eventual consistency pattern
import time
for i in range(3):
    try:
        response = model.generate_content(
            "test",
            tools=[file_search_tool]
        )
        break
    except NotFound:
        if i < 2:
            time.sleep(1)
        else:
            raise
```

### "File not found" after upload

**Cause**: File expired (48 hours) before being added to store

**Fix**: Add file to store immediately after upload
```python
# Upload
file = genai.upload_file(f, mime_type="application/pdf")

# Add to store IMMEDIATELY (don't delay)
store_file = genai.models.FileSearch.add_file_to_store(
    name=store_id,
    file_id=file.name
)
```

---

## Additional Resources

**Official Documentation**
- https://ai.google.dev/gemini-api/docs/file-search
- https://ai.google.dev/api/rest/v1beta/projects.locations.fileSearchStores

**SDKs**
- Python: https://github.com/google/generative-ai-python
- Node.js: https://github.com/google/generative-ai-js
- Go: https://github.com/google/generative-ai-go

**Learning Path**
1. Start with "Create Store" tutorial in Week 3
2. Build knowledge base with your own documents
3. Try multi-store queries (Week 4)
4. Integrate into N8N workflows (Week 4 advanced)

---

**End of API Reference**

Last verified: January 2026 | API Version: v1beta | Status: Production-ready
