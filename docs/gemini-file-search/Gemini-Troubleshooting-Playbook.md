# Gemini File Search Troubleshooting Playbook

Your complete guide to diagnosing and fixing Gemini File Search setup, upload, and query errors. Use the index below to jump to your specific issue.

---

## Quick Index by Error Type

**Already know your error code?** Jump straight to it:
- [HTTP Status Codes](#http-status-code-errors) - 401, 403, 404, 429, 500, 503
- [Gemini-Specific Errors](#gemini-specific-errors) - Rate limits, quota, invalid store
- [Upload & Ingestion](#upload--ingestion-issues) - File too large, unsupported format, timeout
- [Query & Retrieval](#query--retrieval-issues) - No results, slow search, poor relevance
- [Integration Issues](#integration-issues) - N8N workflows, agent tools
- [Performance Issues](#performance-issues) - Slow queries, store limits

**Not sure what your issue is?** Use the symptom selector below.

---

## Symptom-Based Navigation

### "My API key isn't working"
Start here: [401 Authentication Failed](#401-authentication-failed)

### "Store not found"
Start here: [404 Store Not Found](#404-store-not-found)

### "Upload succeeded but I can't search the documents"
Start here: [Upload Succeeds But Not Searchable](#upload-succeeds-but-not-searchable)

### "I'm getting no search results"
Start here: [No Documents Found / Empty Results](#no-documents-found--empty-results)

### "The AI returns answers but no citations"
Start here: [Answer With No Grounding Chunks](#answer-with-no-grounding-chunks-hallucination-warning)

### "Getting 'quota exceeded' errors"
Start here: [Quota Exceeded](#quota-exceeded)

### "Queries are very slow"
Start here: [Slow Query Performance](#slow-query-performance)

### "N8N workflow keeps failing"
Start here: [N8N Workflow Integration Issues](#n8n-workflow-integration-issues)

---

# HTTP Status Code Errors

## 401 Authentication Failed

**What this means**: Your API key is invalid, missing, or expired.

### Symptom → Cause → Solution

**Symptom**: "Unauthorized" error when calling Gemini API
**Cause**: Invalid or missing API key
**Solution**: Validate and regenerate your key (see verification steps below)

### Verification: Is Your API Key Valid?

Run this curl command to test:

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"role":"user","parts":[{"text":"Hello"}]}]}'
```

**Valid response**: Returns `candidates` array with text
**Invalid response**: `{"error": {"code": 401, "message": "API key not valid"}}`

### Step-by-Step Fix

1. **Get a fresh API key**
   - Go to [aistudio.google.dev](https://aistudio.google.dev)
   - Click **Get API Key** in the left sidebar
   - Click **Create API Key** (in new project if needed)
   - Copy the full key (starts with `AIzaSy...`)

2. **Check for copy/paste errors**
   - Did you copy the full key (it's ~40 characters)?
   - Are there extra spaces before/after?
   - Did you accidentally include a newline character?
   - **Tip**: Copy to a text editor first to verify, then copy again to your code

3. **Verify key permissions**
   - Open [Google Cloud Console](https://console.cloud.google.com/)
   - Search for "Generative Language API"
   - Click **Enable API** (if not already enabled)
   - Wait 1-2 minutes for activation

4. **Update all references**
   - N8N HTTP Request nodes
   - Node.js scripts (check `.env` files)
   - Curl commands
   - Agent tool configurations
   - Search for old key: Cmd+F / Ctrl+F for "AIzaSy"

5. **Test again**
   - Run the curl verification above
   - Should see results within 2 seconds

### Common Mistakes

❌ **Copy key from your browser console output** (might be truncated or formatted)
✅ **Copy directly from aistudio.google.dev**

❌ **Hardcoding API key in committed code**
✅ **Use environment variables** (see N8N or Node.js examples below)

---

## 403 Forbidden

**What this means**: Your API key works, but doesn't have permission for this operation.

### Symptom → Cause → Solution

**Symptom**: API returns "Forbidden" or "Permission denied"
**Cause**: Generative Language API not enabled for your project
**Solution**: Enable the API in Google Cloud (see step 3 above under 401)

### Additional Checks

**If 401 fix didn't work**, check these:

1. **Is the correct API enabled?**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Search for "Generative Language API" (not just "Gemini")
   - Status should show "ENABLED"
   - If not: Click **Enable**

2. **Is your Google Cloud project correct?**
   - The API key must be for the same project where you enabled the API
   - In Google Cloud, check the project dropdown (top-left)
   - Verify it matches where you enabled the API

3. **Did the API just get enabled?**
   - Sometimes takes 1-2 minutes to activate
   - Try your request again after waiting

### Python Example: Using Credentials

```python
import os
from google.generativeai import genai

# Load API key from environment
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not set. Create a .env file with your key.")

genai.configure(api_key=api_key)

# This will fail with 403 if API isn't enabled
try:
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content("Hello")
    print(response.text)
except Exception as e:
    print(f"Error: {e}")
    print("→ Check if Generative Language API is enabled in Google Cloud Console")
```

### Node.js Example: Using Environment Variables

```javascript
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY not set in environment variables");
  console.error("Add to .env file: GEMINI_API_KEY=AIzaSy...");
  process.exit(1);
}

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: "Hello" }] }]
    })
  }
);

if (!response.ok) {
  console.error(`HTTP ${response.status}: ${response.statusText}`);
  console.error("→ Check if Generative Language API is enabled");
}
```

---

## 404 Store Not Found

**What this means**: The File Search Store doesn't exist at the ID you provided.

### Symptom → Cause → Solution

**Symptom**: "404 Not Found" when querying or uploading to a store
**Cause**: Store ID is wrong, typo, or store was deleted
**Solution**: Verify store ID format and existence

### Red Flag: Format Errors (Most Common)

This is the #1 mistake students make:

**Wrong format** (from Dec 10 transcript):
```
corpora/abc123  ❌ WRONG
fileSearchStore/abc123  ❌ WRONG (singular)
```

**Correct format**:
```
fileSearchStores/abc123  ✅ CORRECT (plural with 's')
```

The plural "**fileSearchStore**s**" is critical. One character difference = 404 error.

### Step-by-Step Fix

1. **Verify your store ID format**
   ```
   Should start with: fileSearchStores/
   Should NOT start with: corpora/ or fileSearchStore (no 's')
   ```

2. **List all your stores to find the correct ID**
   ```bash
   curl -X GET \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=YOUR_API_KEY'
   ```

   Response example:
   ```json
   {
     "fileSearchStores": [
       {
         "name": "fileSearchStores/hattie-bs-knowledge-base-a4r93m4pxm7k",
         "displayName": "Hattie B's Knowledge Base",
         "createTime": "2025-12-02T..."
       }
     ]
   }
   ```

   **Use the full `name` value** as your store ID.

3. **Copy the correct ID**
   - Take the entire `name` field: `fileSearchStores/hattie-bs-knowledge-base-a4r93m4pxm7k`
   - Update all references in your code/workflows
   - Test with a fresh curl command

4. **If store doesn't exist, create one**
   ```bash
   curl -X POST \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{"displayName": "My Knowledge Base"}'
   ```

   Save the returned `name` field.

### N8N Specific Fix

If using N8N HTTP Request node:

1. Open the node
2. Go to **URL** field
3. Check the URL contains the correct store ID
4. Common mistake: Using `corpora/...` instead of `fileSearchStores/...`

```
❌ Wrong:
https://generativelanguage.googleapis.com/v1beta/corpora/abc123/files?key=KEY

✅ Right:
https://generativelanguage.googleapis.com/v1beta/fileSearchStores/abc123/files?key=KEY
```

---

## 429 Rate Limited

**What this means**: You're making too many requests too fast.

### Symptom → Cause → Solution

**Symptom**: "429 Too Many Requests" after rapid-fire uploads or queries
**Cause**: Exceeded API rate limits
**Solution**: Add delays between requests, batch operations

### Rate Limit Thresholds

Gemini File Search has these limits:

| Operation | Limit | Window |
|-----------|-------|--------|
| File uploads | 60 requests | Per minute |
| File deletions | 60 requests | Per minute |
| Queries | 100 requests | Per minute (with pricing tier adjustment) |

### Step-by-Step Fix

1. **Identify what's rate limited**
   - Are you uploading many files at once?
   - Running many queries in a loop?
   - Repeatedly deleting and recreating stores?

2. **Add delays between requests**

   **Python example**:
   ```python
   import time

   documents = ["doc1.pdf", "doc2.pdf", "doc3.pdf"]

   for doc in documents:
       upload_file(doc)
       time.sleep(1)  # Wait 1 second between uploads
   ```

   **Node.js example**:
   ```javascript
   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   for (const doc of documents) {
     await uploadFile(doc);
     await delay(1000);  // Wait 1 second
   }
   ```

   **N8N**: Add a "Wait" node between upload nodes

3. **Batch operations when possible**
   - Instead of 60 separate requests, batch them
   - Gemini API supports batch file creation:
   ```bash
   curl -X POST \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files/batch/create?key=YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "requests": [
         {"file": {"displayName": "doc1.pdf", "mimeType": "application/pdf"}},
         {"file": {"displayName": "doc2.pdf", "mimeType": "application/pdf"}}
       ]
     }'
   ```

4. **Monitor your usage**
   - Check N8N execution logs for 429 errors
   - Set up alerts if you're near limits
   - Adjust your automation to spread requests over time

### Prevention: Batch Uploads

Instead of uploading one document at a time:

```javascript
// DON'T do this (60 separate HTTP calls)
for (const file of files) {
  await uploadFile(file);  // Hits rate limit
}

// DO this (1 batched HTTP call)
const batchUpload = await uploadFilesBatch(files);  // All at once
```

---

## 500 Internal Server Error

**What this means**: Google's servers encountered an error processing your request.

### Symptom → Cause → Solution

**Symptom**: "Internal Server Error" when calling Gemini API
**Cause**: Temporary server issue, malformed request, or rarely a Google API bug
**Solution**: Retry with exponential backoff, validate request format

### Step-by-Step Fix

1. **First, try again**
   - 500 errors are often temporary
   - Wait 5 seconds, then retry
   - If it works → No further action needed

2. **If error persists, validate your request format**

   For a query, your JSON should look like:
   ```json
   {
     "contents": [{
       "role": "user",
       "parts": [{"text": "Your query here"}]
     }],
     "tools": [{
       "fileSearch": {
         "fileSearchStoreNames": ["fileSearchStores/your-store-id"]
       }
     }],
     "generationConfig": {
       "temperature": 0.3,
       "maxOutputTokens": 2048
     }
   }
   ```

   Check:
   - Is `fileSearchStoreNames` a **list** (with brackets)?
   - Store name starts with `fileSearchStores/`?
   - All quotes are straight quotes, not curly quotes?

3. **Implement retry logic**

   **Python with exponential backoff**:
   ```python
   import time
   import requests

   def call_api_with_retry(url, data, max_retries=3):
       for attempt in range(max_retries):
           try:
               response = requests.post(url, json=data)
               if response.status_code == 500:
                   if attempt < max_retries - 1:
                       wait_time = 2 ** attempt  # 1, 2, 4 seconds
                       print(f"500 error, retrying in {wait_time}s...")
                       time.sleep(wait_time)
                       continue
               return response
           except requests.RequestException as e:
               print(f"Request failed: {e}")
               if attempt < max_retries - 1:
                   time.sleep(2 ** attempt)
       return None
   ```

   **Node.js with exponential backoff**:
   ```javascript
   async function callApiWithRetry(url, options, maxRetries = 3) {
     for (let attempt = 0; attempt < maxRetries; attempt++) {
       try {
         const response = await fetch(url, options);
         if (response.status === 500) {
           if (attempt < maxRetries - 1) {
             const waitTime = Math.pow(2, attempt) * 1000;
             console.log(`500 error, retrying in ${waitTime}ms...`);
             await new Promise(r => setTimeout(r, waitTime));
             continue;
           }
         }
         return response;
       } catch (error) {
         console.error(`Request failed: ${error}`);
         if (attempt < maxRetries - 1) {
           await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
         }
       }
     }
   }
   ```

4. **If error continues, contact Google Support**
   - Provide the request you sent
   - Include the timestamp and error response
   - Note: 500 errors are usually temporary; waiting an hour often fixes them

---

## 503 Service Unavailable

**What this means**: Google's API servers are overloaded or temporarily down.

### Symptom → Cause → Solution

**Symptom**: "Service Unavailable" or "Backend Unavailable"
**Cause**: Google infrastructure issue (rare, usually brief)
**Solution**: Retry with backoff; wait if widespread outage

### Step-by-Step Fix

1. **Check Google API status**
   - Go to [Google Cloud Status Dashboard](https://status.cloud.google.com/)
   - Search for "Generative AI" or "Gemini"
   - If there's an outage: **Wait** (usually resolved within 30 minutes)

2. **Implement retry logic** (same as 500 errors above)

3. **For long operations, use retry with longer delays**
   ```python
   max_wait_time = 300  # 5 minutes
   current_wait = 1

   while current_wait <= max_wait_time:
       response = call_api()
       if response.status_code == 503:
           print(f"Service unavailable, waiting {current_wait}s...")
           time.sleep(current_wait)
           current_wait = min(current_wait * 2, max_wait_time)
       else:
           return response
   ```

4. **If 503 lasts >30 minutes**
   - Check [Google Workspace Status](https://www.google.com/appsstatus) for broader outages
   - Check your internet connection
   - Try from a different network
   - Contact Google Cloud Support if issue persists

---

# Gemini-Specific Errors

## Quota Exceeded

**What this means**: You've hit your monthly token or request quota.

### Symptom → Cause → Solution

**Symptom**: "Quota exceeded" error, or queries suddenly start failing
**Cause**: Monthly quota reached (free tier: 15,000 requests/day)
**Solution**: Check your quota, wait for reset, or upgrade plan

### Quota Types

You have multiple quotas:

| Quota | Free Tier | Paid Tier |
|-------|-----------|-----------|
| Requests per minute | Varies | Varies by plan |
| Requests per day | 15,000 | Unlimited |
| Requests per month | Unlimited | Unlimited |
| Storage | 1 TB | 1 TB |

### Step-by-Step Fix

1. **Check your current usage**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click your project name (top-left)
   - Go to **Quotas** → **Search "Generative Language"**
   - See your current usage vs. limit

2. **Understand what hit the limit**
   - Are you at 15,000 requests/day?
   - Are you storing >1TB of documents?
   - Are you calling File Search API excessively?

3. **Reduce usage**

   **If 15,000 requests/day limit hit**:
   - Your agent is querying KB too much (redundantly)
   - Solution: Cache results, reduce query frequency
   - Example: Query KB once, reuse result instead of re-querying

   **If token quota hit**:
   - You're ingesting very large documents
   - Solution: Split large PDFs before uploading
   - Each upload counts toward your monthly token quota

   **If storage quota hit**:
   - You've stored >1TB of documents
   - Solution: Delete unused documents or stores

4. **Upgrade to paid plan for more quota**
   - Go to [Google AI Studio](https://aistudio.google.dev)
   - Click your account (top-right)
   - Go to **Billing** → **Set billing budget**
   - Upgrade to pay-as-you-go (recommended for production)

### Prevention: Monitor Your Usage

**In N8N, add a tracking node**:
```javascript
// Add after each API call
console.log(`API Call #${++callCount}`);

if (callCount > 10000) {
  throw new Error("Approaching daily quota limit");
}
```

---

## Invalid Store / Store Not Found (API-Level)

**What this means**: The store ID is incorrectly formatted or doesn't exist.

This overlaps with [404 Store Not Found](#404-store-not-found) above. Key differences:

- **404 HTTP Error**: Server explicitly returns "not found"
- **Invalid Store (API Error)**: API returns "Invalid store identifier"

### Root Causes

1. **Wrong format**
   - Using `corpora/` instead of `fileSearchStores/`
   - Missing the Store ID entirely
   - Extra characters or spaces

2. **Store doesn't exist**
   - You deleted the store
   - Typo in Store ID
   - Using a store from a different Google project

3. **Concurrency issue**
   - Creating and immediately querying a store
   - Store exists but not yet indexed

### Fix: Validate Store ID

```bash
# List all stores and verify yours exists
curl -X GET \
  'https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=YOUR_API_KEY'
```

In the response, find your store and copy the exact `name` field.

---

## Model Not Found / Unsupported Model

**What this means**: You're using a model that doesn't support File Search.

### Symptom → Cause → Solution

**Symptom**: "Model not found" or "This model doesn't support file search"
**Cause**: Using wrong model (Claude, older Gemini, etc.)
**Solution**: Use `gemini-2.5-flash` or `gemini-2.5-pro`

### Supported Models

File Search ONLY works with:
- ✅ `gemini-2.5-flash` (recommended - fast & cheap)
- ✅ `gemini-2.5-pro` (more capable, slower, expensive)

### NOT Supported

- ❌ `gemini-2.0-flash`, `gemini-1.5-flash` (older versions)
- ❌ `claude-3-sonnet`, `claude-opus` (different provider)
- ❌ `gpt-4` (different provider)

### Fix

Update your model reference:

**Wrong**:
```json
{
  "model": "gemini-2.0-flash:generateContent",
  "tools": [{"fileSearch": {...}}]
}
```

**Right**:
```json
{
  "model": "gemini-2.5-flash:generateContent",
  "tools": [{"fileSearch": {...}}]
}
```

---

## Indexing Lag

**What this means**: Documents uploaded but not yet searchable.

### Symptom → Cause → Solution

**Symptom**: "Upload succeeded" but queries return no results
**Cause**: Documents still being indexed (typical: 60 seconds)
**Solution**: Wait 60 seconds after upload before querying

### Timeline

| Action | Time | Status |
|--------|------|--------|
| Upload file | T+0 | File received |
| Indexing starts | T+0 | Processing begins |
| Chunks created | T+10-30s | Documents split |
| Embeddings generated | T+30-50s | Semantic encoding |
| Available for search | T+60s | Ready to query |

### Step-by-Step Fix

1. **After uploading, wait 60 seconds**
   ```python
   import time

   upload_response = upload_file(doc)
   print("File uploaded, waiting 60s for indexing...")
   time.sleep(60)

   # Now query
   query_response = query_kb("Your question")
   ```

2. **Add a check before querying**
   ```javascript
   async function queryAfterUpload(file, query) {
     const uploadTime = Date.now();

     // Upload file
     const response = await uploadFile(file);

     // Calculate remaining wait time
     const elapsed = Date.now() - uploadTime;
     const remainingWait = Math.max(0, 60000 - elapsed);

     console.log(`Uploaded, waiting ${Math.ceil(remainingWait / 1000)}s...`);
     await new Promise(r => setTimeout(r, remainingWait));

     // Now safe to query
     return queryKB(query);
   }
   ```

3. **In N8N workflows**
   - After "Upload to Gemini" node
   - Add "Wait" node set to 60 seconds
   - Then add "Query Knowledge Base" node

---

# Upload & Ingestion Issues

## Upload Succeeds But Not Searchable

**What this means**: File uploaded, but KB queries return no results for that document.

### Symptom → Cause → Solution

**Symptom**: Upload returns 200 success, but queries return "no documents found"
**Cause**: Indexing lag (wait 60s) OR format not supported
**Solution**: Wait 60 seconds, verify file format

This is the #1 issue students report (from Dec 10 transcript).

### Step-by-Step Diagnosis

1. **First: Did you wait 60 seconds?**
   - If upload was <60s ago, **wait 60 seconds** and try again
   - Uploads don't affect query until indexing completes

2. **Verify file format is supported**

   Supported formats:
   - ✅ PDF (`.pdf`)
   - ✅ Text (`.txt`)
   - ✅ Markdown (`.md`)
   - ✅ HTML (`.html`)
   - ✅ CSV (`.csv`)
   - ✅ JSON (`.json`)
   - ✅ Code files (`.js`, `.py`, `.go`, etc.)
   - ✅ Microsoft Word (`.docx`)
   - ❌ Spreadsheets (`.xlsx`, `.xls`)
   - ❌ Images (`.jpg`, `.png`)
   - ❌ Videos (`.mp4`, `.mov`)

   **Fix**: Convert unsupported files to PDF/TXT before uploading

3. **Verify file isn't corrupted**
   - Can you open the file normally?
   - Is the file size >0 bytes?
   - For PDFs, can you copy/paste text from it?

4. **Check store ID in upload request**
   - Is it using `fileSearchStores/` (plural)?
   - No typos?

5. **Verify file actually uploaded**
   ```bash
   curl -X GET \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files?key=YOUR_API_KEY'
   ```

   Look for your filename in the response.

### Complete Test Sequence

```bash
# 1. Create a simple test file
echo "Hours: 9am-5pm" > test.txt

# 2. Upload it
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files/upload?key=YOUR_API_KEY' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@test.txt'

# Response: {"name": "files/...", "mimeType": "text/plain", ...}

# 3. Wait exactly 60 seconds
sleep 60

# 4. Query immediately
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "What are the hours?"}]
    }],
    "tools": [{
      "fileSearch": {
        "fileSearchStoreNames": ["fileSearchStores/YOUR_STORE_ID"]
      }
    }]
  }'

# If query returns the answer with citations: ✅ Works!
# If query returns "no results": ⚠️ Check Step 2-4 above
```

---

## File Too Large

**What this means**: Your file exceeds the upload size limit.

### Symptom → Cause → Solution

**Symptom**: "File too large" error during upload
**Cause**: File >100MB
**Solution**: Split large files before uploading

### File Size Limits

| File Type | Max Size | Recommendation |
|-----------|----------|-----------------|
| Any format | 100 MB | Keep under 50 MB for safety |
| PDF | 100 MB | Split 400+ page PDFs |
| TXT/Markdown | 100 MB | Usually not an issue |

### Fix: Split Large Files

**For large PDFs**:
```python
from pypdf import PdfReader, PdfWriter

# Read large PDF
reader = PdfReader("large_file.pdf")
total_pages = len(reader.pages)
chunk_size = 200  # Pages per file

for i in range(0, total_pages, chunk_size):
    writer = PdfWriter()
    for j in range(i, min(i + chunk_size, total_pages)):
        writer.add_page(reader.pages[j])

    output = f"chunk_{i//chunk_size + 1}.pdf"
    with open(output, "wb") as out:
        writer.write(out)

    print(f"Created {output}")
```

**For large text files**:
```python
# Split by lines
with open("large_file.txt") as f:
    lines = f.readlines()

chunk_size = 10000  # Lines per file

for i in range(0, len(lines), chunk_size):
    chunk = lines[i:i+chunk_size]
    output = f"chunk_{i//chunk_size + 1}.txt"
    with open(output, "w") as f:
        f.writelines(chunk)
```

---

## Unsupported File Format

**What this means**: File format isn't supported by Gemini File Search.

### Symptom → Cause → Solution

**Symptom**: "File format not supported" or upload fails silently
**Cause**: Uploading `.xlsx`, `.jpg`, `.mp4`, or other unsupported format
**Solution**: Convert to supported format (PDF, TXT, etc.)

### Conversion Guide

**Excel (.xlsx) → CSV**:
```bash
# macOS: use Numbers app, export as CSV
# Windows: Open in Excel, Save As CSV
# Or use LibreOffice:
libreoffice --headless --convert-to csv file.xlsx
```

**Word (.docx) → PDF**:
```bash
# macOS: Open in Word, File → Export as PDF
# Windows: Open in Word, File → Export → Create PDF
# Or use pandoc:
pandoc file.docx -o file.pdf
```

**Google Sheets → CSV**:
1. Open in Google Sheets
2. File → Download → CSV
3. Upload the CSV

**Image (.jpg) → PDF**:
```bash
# Using ImageMagick:
convert image.jpg image.pdf

# Using Pillow (Python):
from PIL import Image
Image.open("image.jpg").convert('RGB').save("image.pdf")
```

---

## Resumable Upload Failures

**What this means**: Large file upload was interrupted and failed to resume.

### Symptom → Cause → Solution

**Symptom**: Upload times out or fails mid-way (usually 30+ second uploads)
**Cause**: Network interruption or timeout
**Solution**: Use resumable uploads (Google API default)

### How Resumable Uploads Work

Most Google APIs support "resumable uploads" automatically:

1. **Initiate**: Send metadata (filename, size)
2. **Upload**: Send file content in chunks
3. **Resume**: If connection breaks, pick up where you left off
4. **Complete**: Finalize

### Fix: Explicit Resumable Upload

**Python**:
```python
import requests
from google.generativeai import genai

genai.configure(api_key="YOUR_API_KEY")

# Use the SDK's built-in resumable upload
with open("large_file.pdf", "rb") as f:
    response = genai.upload_file(
        path=f.name,
        mime_type="application/pdf",
        # Implicit resumable upload
    )
    print(f"Uploaded: {response.name}")
```

**Node.js (using Google AI SDK)**:
```javascript
const fs = require("fs");
const GoogleGenerativeAI = require("@google/generative-ai");

const genai = new GoogleGenerativeAI.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function uploadWithResume(filePath) {
  const fileContent = fs.readFileSync(filePath);

  try {
    const response = await genai.uploadFile({
      path: filePath,
      mimeType: "application/pdf"
    });
    console.log(`Uploaded: ${response.name}`);
    return response;
  } catch (error) {
    if (error.message.includes("resume")) {
      console.log("Upload interrupted, retrying...");
      return uploadWithResume(filePath);  // Retry
    }
    throw error;
  }
}
```

---

# Query & Retrieval Issues

## No Documents Found / Empty Results

**What this means**: Query returns no results even though documents exist in the store.

### Symptom → Cause → Solution

**Symptom**: Query executes (no error), but answer is empty or "I don't have information"
**Cause**: Indexing lag (60s), wrong store ID, or poor query match
**Solution**: Wait 60s after upload, verify store ID, rephrase query

### Diagnosis Decision Tree

```
Query returns empty results?
├─ Did you wait 60s after upload?
│  ├─ NO → Wait 60 seconds, try again
│  └─ YES → Continue
├─ Is the store ID correct?
│  ├─ NO (using 'corpora/' or typo) → Fix to 'fileSearchStores/...'
│  └─ YES → Continue
├─ Did you verify documents are in the store?
│  ├─ NO → List files: GET /fileSearchStores/{id}/files
│  └─ YES → Continue
├─ Is your query very vague?
│  ├─ YES (e.g., "Tell me about things") → Rephrase more specifically
│  └─ NO → Continue
└─ Check if documents actually contain the answer
   ├─ YES → Consider custom RAG (Gemini has retrieval limits)
   └─ NO → Add missing documents to KB
```

### Step-by-Step Troubleshooting

1. **List all documents in the store**
   ```bash
   curl -X GET \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files?key=YOUR_API_KEY'
   ```

   Expected response shows file list. If empty:
   - No files have been successfully uploaded
   - Go back to [Upload & Ingestion](#upload--ingestion-issues)

2. **Verify specific document exists**
   Look for your filename in the list above.

3. **Test with a simple query**
   Instead of:
   > "What are the most important company values?"

   Try:
   > "hours"
   > "menu"
   > "policy"

   Simple, specific keywords work better.

4. **Check if document contains the answer**
   - Open the original file
   - Search for key terms from your query
   - If not there, add content to the document

5. **Test with Gemini directly (not through N8N)**
   This rules out workflow issues:
   ```bash
   curl -X POST \
     'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "contents": [{"role": "user", "parts": [{"text": "What are your hours?"}]}],
       "tools": [{"fileSearch": {"fileSearchStoreNames": ["fileSearchStores/YOUR_STORE_ID"]}}]
     }'
   ```

### Common Query Mistakes

❌ **Too vague**:
```
"Tell me about things"
"Information"
"Details"
```

✅ **Specific**:
```
"What are store hours?"
"Do you take reservations?"
"What is your return policy?"
```

---

## No Results Found / Query Mismatch

**What this means**: Document exists, but query doesn't match the content well enough.

### Symptom → Cause → Solution

**Symptom**: Query returns "no relevant results" for a topic that IS in the KB
**Cause**: Semantic mismatch - query phrasing differs from document phrasing
**Solution**: Rephrase query or add synonym documents

### Example

**Document contains**: "We offer chicken sandwiches"
**Query that fails**: "Do you have poultry products?"
**Query that works**: "What kind of chicken do you have?"

### Fix: Rephrase Your Query

Instead of:
```
"Elaborate on the compensation structure"
```

Try:
```
"What are salaries?"
"How much do employees make?"
"What is the pay?"
```

### Add Synonyms to Documents

Edit your knowledge base documents to include alternate phrasings:

**Before**:
```
RETURN POLICY
Items may be returned within 30 days of purchase.
```

**After**:
```
RETURN POLICY (Refunds, Exchanges, Returns)
Items may be returned within 30 days of purchase.
We accept returns, exchanges, and refunds for up to 30 days.
Send back merchandise for a refund or store credit.
```

---

## Answer But No Grounding Chunks (Hallucination Warning)

**What this means**: AI generates an answer without citing sources. High hallucination risk.

### Symptom → Cause → Solution

**Symptom**: Answer returned, but `groundingMetadata` is empty or missing
**Cause**: AI generated answer without retrieving documents
**Solution**: Check grounding metadata, regenerate with file search forced

### Red Flag: Hallucination Risk

This is a serious issue. The AI is making up answers instead of referencing your documents.

### Step-by-Step Fix

1. **Check the response structure**
   Your response should include:
   ```json
   {
     "candidates": [{
       "content": {"parts": [{"text": "...answer..."}]},
       "groundingMetadata": {
         "groundingChunks": [
           {
             "retrievedContext": {"uri": "file://doc.pdf"},
             "text": "...cited text..."
           }
         ]
       }
     }]
   }
   ```

   If `groundingMetadata` or `groundingChunks` is missing or empty:
   - AI didn't search the KB
   - Answer is likely hallucinated

2. **Verify store has documents**
   ```bash
   curl -X GET \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files?key=YOUR_API_KEY'
   ```

3. **Force file search with system instruction**
   ```json
   {
     "contents": [{"role": "user", "parts": [{"text": "What are your hours?"}]}],
     "systemInstruction": {
       "parts": [{
         "text": "You MUST search the documents using the fileSearch tool. If documents don't contain the answer, say 'I don't have that information in my knowledge base.' Do NOT make up answers."
       }]
     },
     "tools": [{"fileSearch": {"fileSearchStoreNames": ["fileSearchStores/YOUR_STORE_ID"]}}]
   }
   ```

4. **If still no grounding**
   - Check if your query is too broad
   - Verify documents actually contain relevant information
   - Try a more specific query

### Prevention: Verify Grounding in N8N

Add a verification node after your query:

```javascript
// In an N8N Script node
const response = $json;

if (!response.groundingMetadata || response.groundingMetadata.groundingChunks.length === 0) {
  throw new Error("ERROR: No grounding metadata. Answer may be hallucinated. Regenerate with file search.");
}

console.log(`✅ Grounded with ${response.groundingMetadata.groundingChunks.length} citations`);
return response;
```

---

## Poor Relevance / Wrong Results

**What this means**: Query returns results, but they're not relevant to the question.

### Symptom → Cause → Solution

**Symptom**: Query returns answer about unrelated topic
**Cause**: Semantic similarity issue or document organization
**Solution**: Reorganize documents, add context to queries

### Example

**Query**: "What is your return policy?"
**Bad result**: Document about "inventory returns" (internal use, not customer returns)
**Good result**: Document about "Customer Return Policy"

### Fix: Organize Documents by Topic

**Instead of one mega document**:
```
company-info.txt (contains everything)
```

**Create focused documents**:
```
customer-policy.txt (returns, refunds, exchanges)
employee-handbook.txt (internal policies)
faq.txt (frequently asked questions)
menu.txt (products and pricing)
```

Gemini's retrieval works better with focused documents.

### Add Context to Queries

**Instead of**:
```
"What about returns?"
```

**Try**:
```
"What is our customer return policy for purchased items?"
```

More context helps semantic search find the right documents.

---

## Slow Query Performance

**What this means**: Queries take 10+ seconds to return results.

### Symptom → Cause → Solution

**Symptom**: Query request times out or takes >10 seconds
**Cause**: Large store, network latency, or poor indexing
**Solution**: Split stores, optimize queries, check network

### Performance Baseline

| Store Size | Typical Response Time | Max Safe Time |
|------------|----------------------|---------------|
| <100 docs | 2-3 seconds | 5 seconds |
| 100-500 docs | 3-5 seconds | 8 seconds |
| 500-1000 docs | 5-8 seconds | 10 seconds |
| >1000 docs | 8-15 seconds | 20+ seconds |

### Step-by-Step Fix

1. **Check your store size**
   ```bash
   curl -X GET \
     'https://generativelanguage.googleapis.com/v1beta/fileSearchStores/YOUR_STORE_ID/files?key=YOUR_API_KEY' \
     | grep -c '"name"'  # Count documents
   ```

2. **If >1000 documents, split into multiple stores**

   Create topic-specific stores:
   ```
   Store 1: Customer-facing (FAQ, policies, hours)
   Store 2: Product catalog (inventory, specifications)
   Store 3: Internal operations (procedures, training)
   ```

   Then route queries to the appropriate store:
   ```python
   query = "What are your hours?"

   if any(word in query.lower() for word in ["hour", "open", "close", "time"]):
       store = "fileSearchStores/customer-facing"
   elif any(word in query.lower() for word in ["product", "specs", "inventory"]):
       store = "fileSearchStores/catalog"
   else:
       store = "fileSearchStores/operations"

   results = query_kb(query, store)
   ```

3. **Optimize your query model**
   - Use `gemini-2.5-flash` (faster)
   - Avoid `gemini-2.5-pro` (slower, but more accurate)

4. **Check network latency**
   Timing breakdown:
   - Request → Google: ~200ms
   - Retrieval: ~1-3 seconds
   - Embedding: ~500ms
   - Generation: ~2-5 seconds
   - Response → You: ~200ms
   - **Total**: 2-9 seconds typical

---

# Integration Issues

## N8N Workflow Integration Issues

**What this means**: N8N workflow fails when calling Gemini File Search API.

### Common N8N Errors

#### Error: "No matching credentials"

**Symptom**: Red error in N8N, mentions "credentials"
**Cause**: Google AI credentials not configured in N8N
**Solution**: Create and configure credentials

**Fix**:
1. In N8N, go **Credentials** → **Create**
2. Search for "Google" or "Generative AI"
3. Select **"Google AI API"** or **"Google Generative AI"**
4. Paste your Gemini API key
5. Save with name: `gemini-api-key`
6. In your agentTool/LLM node, select this credential

#### Error: "Invalid store name format"

**Symptom**: HTTP Request node returns error about store format
**Cause**: Using wrong store name format in N8N expression
**Solution**: Verify store name uses `fileSearchStores/` (plural)

**Fix**:
1. Open HTTP Request node
2. In the Body or URL, find store name reference
3. Change `corpora/...` → `fileSearchStores/...`
4. Ensure full store name: `fileSearchStores/your-store-id`

#### Error: "agentTool not found" or "agentTool error"

**Symptom**: agentTool node shows red X
**Cause**: Missing Google AI credentials OR tool configuration issue
**Solution**: Configure credentials and validate tool schema

**Fix**:
```
1. Click the agentTool node
2. Go to "LLM Model" section
3. Select "gemini-2.5-flash"
4. Ensure credentials dropdown shows "gemini-api-key"
5. In "Tools" section, verify each tool has:
   - Name: (e.g., "search_knowledge_base")
   - Description: (e.g., "Search company knowledge base")
   - Input schema: (JSON with required fields)
6. Save and Deploy
```

#### Error: "Tool returned undefined response"

**Symptom**: agentTool executes but next node receives empty data
**Cause**: HTTP Request tool didn't return valid JSON OR response parsing failed
**Solution**: Verify HTTP response and add error handling

**Fix**:

1. **Test the HTTP Request node directly**
   - Right-click HTTP Request node
   - Select "Execute Node"
   - Check the output (should be valid JSON)

2. **Add error handling to agentTool**
   ```json
   {
     "name": "search_kb",
     "description": "Search knowledge base",
     "input_schema": {
       "type": "object",
       "properties": {
         "query": {
           "type": "string",
           "description": "Search query"
         }
       },
       "required": ["query"]
     },
     "error_handling": "return_error_message"
   }
   ```

3. **Check HTTP Request output format**
   Should return:
   ```json
   {
     "content": {
       "parts": [{"text": "...answer..."}]
     },
     "groundingMetadata": {...}
   }
   ```

### Workflow Structure Issues

#### Issue: Librarian tool not being called

**Symptom**: Workflow runs but agentTool/Librarian never executes
**Cause**: Agent doesn't think it needs the tool
**Solution**: Update tool description, force tool use in prompt

**Fix**:
```
1. Update agentTool description to be very clear:
   Description: "ALWAYS use this tool to search the knowledge base
   before answering any question about hours, policies, or procedures."

2. Add to the agent's system prompt:
   "When the user asks about company policies, hours, or procedures,
   you MUST use the search_knowledge_base tool before responding."

3. If still not called, explicitly mention in the prompt:
   "Use the available tools to search for information."
```

#### Issue: Responses include tool calls in the output

**Symptom**: Final message shows "[Tool call: search_kb]" instead of just the answer
**Cause**: agentTool not properly extracting the final answer
**Solution**: Add a post-processing node

**Fix**:
```javascript
// Add an "Edit Fields" node after the agentTool
// Extract just the text from the response

// Input: agentTool response
// Output: Just the text answer
{
  "answer": $json.content.parts[0].text,
  "citations": $json.groundingMetadata?.groundingChunks.length || 0
}
```

---

## Agent Tool Configuration

**What this means**: Your agentTool isn't properly configured to search the knowledge base.

### Configuration Template

Here's the correct agentTool setup:

```json
{
  "name": "search_knowledge_base",
  "description": "Search the company knowledge base for information about policies, procedures, FAQs, and business details. Always use this tool when asked about company information.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query to send to the knowledge base (e.g., 'What are your hours?', 'Return policy')"
      }
    },
    "required": ["query"]
  }
}
```

Then configure the HTTP Request tool that handles the search:

```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY

Headers:
  Content-Type: application/json

Body:
{
  "contents": [{"role": "user", "parts": [{"text": "{{ $fromAI('query') }}"}]}],
  "tools": [{
    "fileSearch": {
      "fileSearchStoreNames": ["fileSearchStores/YOUR_STORE_ID"]
    }
  }],
  "generationConfig": {
    "temperature": 0.3,
    "maxOutputTokens": 2048
  }
}
```

### Verification Checklist

- [ ] agentTool LLM is `gemini-2.5-flash`
- [ ] Google AI credentials configured
- [ ] Tool "name" is set (e.g., `search_knowledge_base`)
- [ ] Tool "description" is clear and specific
- [ ] Input schema includes "query" parameter
- [ ] HTTP Request tool uses correct API key
- [ ] URL contains correct store name (starts with `fileSearchStores/`)
- [ ] Body includes file search tool declaration
- [ ] Temperature is 0.3 (optimal for retrieval)
- [ ] agentTool is connected to other nodes properly

---

# Performance Issues

## Slow Query Performance

See [Slow Query Performance](#slow-query-performance) under Query & Retrieval Issues above.

## Store Size Limits

**What this means**: Your store is getting too large.

### Symptom → Cause → Solution

**Symptom**: Queries slow down dramatically, approaching 10+ seconds
**Cause**: Store exceeds 20GB (or approaching it)
**Solution**: Split into multiple focused stores

### Size Limits

| Metric | Limit | Recommendation |
|--------|-------|-----------------|
| Documents per store | Unlimited | Keep <1000 for performance |
| Total storage | 1 TB | Google official, but slow above 20GB |
| Optimal size | <20 GB | Performance degrades above this |

### Example: Wade Murley Cost Trap

Wade's mistake: Re-uploading the same documents every day = 30x cost.

**Wrong approach**:
```
Day 1: Upload 10 docs = $0.30 ingestion cost
Day 2: Upload same 10 docs again = $0.30 more
Day 3: Upload same 10 docs again = $0.30 more
...30 days: $9 in ingestion costs (for the same content!)
```

**Right approach**:
```
Day 1: Upload 10 docs = $0.30 ingestion cost
Day 1-30: Query same docs = No ingestion cost (queries are cheap)
Day 31: Update one doc = $0.01 ingestion cost
Month total: ~$0.31
```

**Lesson**: Only re-ingest when content actually changes.

### Fix: Split Stores by Topic

Instead of:
```
"Company Knowledge Base" (all documents)
```

Create:
```
"Customer-Facing Knowledge Base" (FAQ, hours, policies) - 50 MB
"Product Catalog" (inventory, specs) - 5 GB
"Internal Procedures" (employee handbook, processes) - 15 GB
```

Then route queries to appropriate store.

---

# Debug Process Templates

Use these step-by-step processes when something goes wrong.

## Complete Gemini API Connectivity Test

Run this when you're unsure if the API is working:

```bash
#!/bin/bash

API_KEY="YOUR_API_KEY"
STORE_ID="fileSearchStores/YOUR_STORE_ID"

echo "=== Gemini File Search Connectivity Test ==="

# Test 1: Is API key valid?
echo -e "\n1. Testing API key validity..."
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"role":"user","parts":[{"text":"Hello"}]}]}' \
  | grep -q "\"text\"" && echo "✅ API key valid" || echo "❌ API key invalid"

# Test 2: Does store exist?
echo -e "\n2. Checking if store exists..."
curl -s -X GET \
  "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files?key=$API_KEY" \
  | grep -q "fileSearchStores" && echo "✅ Store found" || echo "❌ Store not found"

# Test 3: How many documents?
echo -e "\n3. Counting documents in store..."
DOC_COUNT=$(curl -s -X GET \
  "https://generativelanguage.googleapis.com/v1beta/$STORE_ID/files?key=$API_KEY" \
  | grep -c '"name"')
echo "✅ Documents in store: $DOC_COUNT"

# Test 4: Can we query?
echo -e "\n4. Testing query..."
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"hello\"}]}],
    \"tools\":[{\"fileSearch\":{\"fileSearchStoreNames\":[\"$STORE_ID\"]}}]
  }" | grep -q "\"text\"" && echo "✅ Query works" || echo "❌ Query failed"

echo -e "\n=== Test Complete ==="
```

---

## Python Verification Script

```python
#!/usr/bin/env python3
import os
import requests
import json
import time
from datetime import datetime

class GeminiKBTest:
    def __init__(self, api_key, store_id):
        self.api_key = api_key
        self.store_id = store_id
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"
        self.model = "gemini-2.5-flash"

    def test_api_key(self):
        """Test if API key is valid"""
        url = f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}"
        data = {"contents": [{"role": "user", "parts": [{"text": "Hello"}]}]}

        try:
            response = requests.post(url, json=data, timeout=10)
            if response.status_code == 200:
                print("✅ API Key valid")
                return True
            else:
                print(f"❌ API Key invalid: {response.status_code}")
                return False
        except requests.RequestException as e:
            print(f"❌ Connection error: {e}")
            return False

    def test_store_exists(self):
        """Test if store exists"""
        url = f"{self.base_url}/{self.store_id}/files?key={self.api_key}"

        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print("✅ Store exists")
                return True
            elif response.status_code == 404:
                print("❌ Store not found")
                return False
            else:
                print(f"❌ Error: {response.status_code}")
                return False
        except requests.RequestException as e:
            print(f"❌ Connection error: {e}")
            return False

    def count_documents(self):
        """Count documents in store"""
        url = f"{self.base_url}/{self.store_id}/files?key={self.api_key}"

        try:
            response = requests.get(url, timeout=10)
            data = response.json()
            doc_count = len(data.get("files", []))
            print(f"✅ Store contains {doc_count} documents")
            return doc_count
        except Exception as e:
            print(f"❌ Error counting: {e}")
            return 0

    def test_query(self, query_text):
        """Test querying the KB"""
        url = f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}"
        data = {
            "contents": [{"role": "user", "parts": [{"text": query_text}]}],
            "tools": [{
                "fileSearch": {
                    "fileSearchStoreNames": [self.store_id]
                }
            }],
            "generationConfig": {
                "temperature": 0.3,
                "maxOutputTokens": 2048
            }
        }

        try:
            response = requests.post(url, json=data, timeout=30)
            if response.status_code == 200:
                result = response.json()
                text = result["candidates"][0]["content"]["parts"][0].get("text", "")
                grounding = result["candidates"][0].get("groundingMetadata", {}).get("groundingChunks", [])

                print(f"✅ Query successful")
                print(f"   Answer: {text[:100]}...")
                print(f"   Citations: {len(grounding)}")
                return True
            else:
                print(f"❌ Query failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Error: {e}")
            return False

    def run_all_tests(self):
        """Run all tests"""
        print("=== Gemini File Search Diagnostic ===\n")
        print(f"API Key: {self.api_key[:10]}...")
        print(f"Store: {self.store_id}")
        print(f"Time: {datetime.now()}\n")

        self.test_api_key()
        self.test_store_exists()
        self.count_documents()
        self.test_query("What is this knowledge base about?")

        print("\n=== Diagnostic Complete ===")

if __name__ == "__main__":
    api_key = os.getenv("GEMINI_API_KEY")
    store_id = os.getenv("GEMINI_STORE_ID")

    if not api_key or not store_id:
        print("Error: Set GEMINI_API_KEY and GEMINI_STORE_ID environment variables")
        exit(1)

    tester = GeminiKBTest(api_key, store_id)
    tester.run_all_tests()
```

---

## Node.js Verification Script

```javascript
#!/usr/bin/env node
const fs = require("fs");
require("dotenv").config();

class GeminiKBTest {
  constructor(apiKey, storeId) {
    this.apiKey = apiKey;
    this.storeId = storeId;
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta";
    this.model = "gemini-2.5-flash";
  }

  async testApiKey() {
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;
    const data = {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("✅ API Key valid");
        return true;
      } else {
        console.log(`❌ API Key invalid: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Connection error: ${error.message}`);
      return false;
    }
  }

  async testStoreExists() {
    const url = `${this.baseUrl}/${this.storeId}/files?key=${this.apiKey}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        console.log("✅ Store exists");
        return true;
      } else if (response.status === 404) {
        console.log("❌ Store not found");
        return false;
      } else {
        console.log(`❌ Error: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Connection error: ${error.message}`);
      return false;
    }
  }

  async countDocuments() {
    const url = `${this.baseUrl}/${this.storeId}/files?key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const docCount = data.files ? data.files.length : 0;
      console.log(`✅ Store contains ${docCount} documents`);
      return docCount;
    } catch (error) {
      console.log(`❌ Error counting: ${error.message}`);
      return 0;
    }
  }

  async testQuery(queryText) {
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;
    const data = {
      contents: [{ role: "user", parts: [{ text: queryText }] }],
      tools: [
        {
          fileSearch: {
            fileSearchStoreNames: [this.storeId]
          }
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        timeout: 30000
      });

      if (response.ok) {
        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;
        const grounding = result.candidates[0].groundingMetadata?.groundingChunks || [];

        console.log("✅ Query successful");
        console.log(`   Answer: ${text.substring(0, 100)}...`);
        console.log(`   Citations: ${grounding.length}`);
        return true;
      } else {
        console.log(`❌ Query failed: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      return false;
    }
  }

  async runAllTests() {
    console.log("=== Gemini File Search Diagnostic ===\n");
    console.log(`API Key: ${this.apiKey.substring(0, 10)}...`);
    console.log(`Store: ${this.storeId}`);
    console.log(`Time: ${new Date().toISOString()}\n`);

    await this.testApiKey();
    await this.testStoreExists();
    await this.countDocuments();
    await this.testQuery("What is in this knowledge base?");

    console.log("\n=== Diagnostic Complete ===");
  }
}

const apiKey = process.env.GEMINI_API_KEY;
const storeId = process.env.GEMINI_STORE_ID;

if (!apiKey || !storeId) {
  console.error("Error: Set GEMINI_API_KEY and GEMINI_STORE_ID environment variables");
  process.exit(1);
}

const tester = new GeminiKBTest(apiKey, storeId);
tester.runAllTests();
```

---

# When to Contact Support vs. Self-Fix

Use this decision tree to know when to troubleshoot vs. escalate.

## Self-Fix (You Can Solve These)

**Go through troubleshooting above if**:

| Error | Self-Fix Difficulty | Time Estimate |
|-------|---------------------|----------------|
| 401 - Invalid API key | Easy | 5 minutes |
| 404 - Store not found | Easy | 10 minutes |
| Wrong store format (`corpora/` vs `fileSearchStores/`) | Easy | 2 minutes |
| Indexing lag (60 seconds) | Easy | 60+ seconds |
| Unsupported file format | Medium | 15 minutes |
| No results / empty KB | Medium | 20 minutes |
| Slow queries | Medium | 30 minutes |
| N8N configuration | Hard | 45+ minutes |

---

## Contact Google Support If

**Open a Google Cloud Support ticket when**:

1. **500/503 errors persist >1 hour**
   - Likely a Google infrastructure issue
   - Self-fix retry logic won't help
   - Need official status update

2. **Quota seems wrong**
   - You're being charged unexpectedly
   - Quota counter doesn't match your usage
   - Need official quota review

3. **API behavior is inconsistent**
   - Some queries work, some don't (no clear pattern)
   - Same request succeeds then fails randomly
   - Need logging/debugging from Google side

4. **Possible data loss/corruption**
   - Documents uploaded but completely lost
   - Store became inaccessible without action
   - Need recovery from Google backups

**How to contact**:
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Click "?" icon (top-right)
- Select "Support"
- Create ticket with:
  - Error message (full text)
  - Timestamp (exact time)
  - Request body (sanitized, no sensitive data)
  - Steps to reproduce

---

## Ask the Community If

**Post in forums when**:

1. **Architectural questions**
   - "Should I use one big store or many small ones?"
   - "How to organize documents for best retrieval?"
   - "Custom RAG vs Gemini File Search?"

2. **Best practices**
   - "What indexing strategy works best?"
   - "Cost optimization tips?"
   - "Performance tuning?"

3. **Integration patterns**
   - "How to use with N8N agents?"
   - "How to route to multiple stores?"
   - "Caching strategy?"

**Best communities**:
- [Google AI Forum](https://ai.google.dev/forum)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/gemini) (tag: `gemini`)
- [MindValley Discord](link here when available)

---

# Checklist: Ready to Go Live?

Before deploying your Gemini KB to production, verify:

- [ ] **API Key Security**
  - [ ] API key in environment variables (not hardcoded)
  - [ ] API key not committed to git
  - [ ] Regenerate key regularly (monthly)
  - [ ] Monitor key usage in Google Cloud

- [ ] **Store Setup**
  - [ ] Store name verified (`fileSearchStores/...`)
  - [ ] Documents uploaded (>0 files)
  - [ ] All documents indexed (waited 60+ seconds)
  - [ ] Query test successful with grounding metadata

- [ ] **Integration**
  - [ ] Credentials configured in N8N
  - [ ] agentTool connected and tested
  - [ ] HTTP Request tool returns valid JSON
  - [ ] Error handling in place (catches 4xx, 5xx errors)

- [ ] **Performance**
  - [ ] Queries complete in <10 seconds (typical)
  - [ ] No timeout errors in logs
  - [ ] Store organized for semantic search (topics separated)

- [ ] **Cost Control**
  - [ ] Understand per-token pricing
  - [ ] Set monthly budget alerts
  - [ ] Document upload batched (not daily)
  - [ ] Monitor token consumption

- [ ] **User Experience**
  - [ ] Grounding metadata included in responses
  - [ ] Citations visible to users
  - [ ] Clear message if no results found
  - [ ] Fallback behavior when KB can't help

---

**Last Updated**: January 30, 2026
**Target Audience**: Students (entrepreneurs setting up Gemini File Search)
**Author**: MindValley AI Mastery Team

For updates and additional resources, visit [aistudio.google.dev](https://aistudio.google.dev) and [Google AI Documentation](https://ai.google.dev/gemini-api/docs/file-search).
