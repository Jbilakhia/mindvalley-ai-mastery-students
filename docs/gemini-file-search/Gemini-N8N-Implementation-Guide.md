# Gemini File Search + N8N Implementation Guide

**Target Audience**: Students building AI agents with Gemini File Search in N8N Cloud

**Document Version**: 1.0
**Last Updated**: January 30, 2026
**Status**: Ready for Student Use

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Architecture Overview](#architecture-overview)
4. [Core Workflow: Librarian Tool v2](#core-workflow-librarian-tool-v2)
5. [Core Workflow: Ingestion Engine v2](#core-workflow-ingestion-engine-v2)
6. [Supporting Workflows](#supporting-workflows)
7. [Agent Integration](#agent-integration)
8. [Configuration Guide](#configuration-guide)
9. [Testing Protocols](#testing-protocols)
10. [Common N8N Errors](#common-n8n-errors)
11. [Performance Optimization](#performance-optimization)
12. [Workflow Version History](#workflow-version-history)

---

## Overview

N8N is the glue that connects your AI agents to Gemini File Search. Instead of writing code to call the Gemini API, you build workflows visually in N8N Cloud, and your agents can search your knowledge base instantly.

**What you'll build**:
- A **Librarian Tool** workflow that acts as a specialized agent for knowledge base searches
- An **Ingestion Engine** to upload documents to Gemini File Search in bulk
- **Supporting tools** for managing stores and documents
- Integration points where your other agents call Librarian as a tool

**Why N8N?**
- Visual workflow builder (no code required)
- Built-in Gemini integration
- Supports sub-workflows (Librarian as a callable tool)
- Easy to test and debug

---

## Prerequisites

### Account Requirements

1. **N8N Cloud Account**
   - Sign up at: https://n8n.io
   - Free tier available
   - Recommended: Professional plan for production use

2. **Google Cloud Project with Gemini API**
   - Create project: https://console.cloud.google.com
   - Enable Gemini API
   - Create API key in "Credentials" section
   - You'll need this API key in N8N

3. **API Key Setup**
   - Have your Gemini API key ready
   - Store securely (don't commit to git)
   - You'll paste this into N8N credentials

### Model & Storage Requirements

- **Recommended Model**: Gemini 2.5 Flash (cost-effective, fast)
- **Alternative**: Gemini 3.0 Flash (if you want improved grounding/citations)
- **Storage Limit**: 1 TB per project (no per-file limit with 100 MB individual files)
- **File Size**: Up to 100 MB per file
- **Supported Formats**: PDF, DOCX, TXT, MD, HTML, PPTX, etc.

### Network Requirements

- Stable internet connection
- N8N Cloud webhooks must be accessible
- No firewall blocking of Google Cloud API calls

---

## Architecture Overview

### The Complete Picture

Your system will have three layers:

```
┌─────────────────────────────────────────────────┐
│          Your AI Agents (Claude, Gemini)        │
│       (CinnaMon, Hatch, Sugar, Bishop)          │
└────────────────────┬────────────────────────────┘
                     │ Call "Librarian" tool
                     ↓
┌─────────────────────────────────────────────────┐
│         N8N Librarian Tool v2 (Sub-workflow)   │
│                                                 │
│  • Receives search query                       │
│  • Formats for Gemini File Search API          │
│  • Calls generateContent endpoint              │
│  • Extracts grounding chunks                   │
│  • Returns results to agent                    │
└────────────────────┬────────────────────────────┘
                     │ HTTP request
                     ↓
┌─────────────────────────────────────────────────┐
│         Gemini File Search API                  │
│                                                 │
│  • fileSearchStores/{store-id}                  │
│  • Searches your knowledge base                │
│  • Returns chunks with relevance scores       │
└────────────────────┬────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────┐
│      Your Knowledge Base Documents              │
│                                                 │
│  • brand-voice.md                              │
│  • faq.md                                      │
│  • policies.md                                 │
│  • locations.md                                │
│  • menu.md                                     │
└─────────────────────────────────────────────────┘
```

### Key Concept: Sub-Workflows as Tools

The **Librarian Tool is a sub-workflow**, not a standalone workflow. This means:

- Other workflows can **call** it (like a function call)
- It receives input parameters (the search query)
- It returns output (search results)
- Your agents see it as a tool they can use

This is different from a trigger-based workflow that runs when something happens. Librarian waits to be called.

---

## Core Workflow: Librarian Tool v2

### What It Does

Librarian is a specialized agent that searches your knowledge base. When one of your other agents needs information, it calls Librarian with a question, and Librarian returns relevant context.

### Architecture

```
Input: { query: "What is our delivery policy?" }
  ↓
Store Registry (configuration node)
  • API key
  • Store ID
  • Temperature
  • Model
  ↓
Prepare Request
  • Format query with system prompt
  • Include store name
  • Set token limits
  ↓
HTTP Request → Gemini generateContent
  • POST to: https://generativelanguage.googleapis.com/v1beta/projects/{project-id}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/generateContent
  • Body: tools.fileSearch object
  ↓
Process Response
  • Extract grounding chunks
  • Format for readability
  • Count tokens used
  ↓
Output: { answer: "...", chunks: [...], metadata: {...} }
```

### Node-by-Node Breakdown

#### 1. **Execute Workflow Trigger**
- **Type**: Execute Workflow Trigger
- **Purpose**: Receives calls from other workflows
- **Configuration**: No special config needed (this is the sub-workflow entry point)

#### 2. **Store Registry** (Set Node)
- **Type**: Set (Data Assignment)
- **Purpose**: Hardcoded configuration for your knowledge base
- **Configuration**:
```json
{
  "storeId": "fileSearchStores/hattie-bs-knowledge-base-a4r93m4pxm7k",
  "apiKey": "{{ env.GEMINI_API_KEY }}",
  "model": "gemini-2.5-flash",
  "temperature": 0.3,
  "maxOutputTokens": 2048,
  "systemPrompt": "You are a knowledge base expert. Search the knowledge base and return relevant information. Be concise and fact-based."
}
```

**Important**: Replace `storeId` with YOUR store ID and `GEMINI_API_KEY` with your environment variable.

#### 3. **Prepare Request** (Set Node)
- **Type**: Set (Data Assignment)
- **Purpose**: Format the query into the Gemini File Search API structure
- **Input**: Receives `query` from calling workflow
- **Output**:
```json
{
  "model": "{{ $json.model }}",
  "tools": [
    {
      "googleSearch": {},
      "fileSearch": {
        "fileSearchStores": ["{{ $json.storeId }}"]
      }
    }
  ],
  "toolConfig": {
    "functionCallingConfig": {
      "mode": "AUTO"
    }
  },
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "{{ $json.systemPrompt }}\n\nQuery: {{ $json.query }}"
        }
      ]
    }
  ]
}
```

#### 4. **HTTP Request → Gemini generateContent**
- **Type**: HTTP Request
- **Method**: POST
- **URL**: `https://generativelanguage.googleapis.com/v1beta/projects/{PROJECT-ID}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/generateContent?key={{ $json.apiKey }}`

**Replace `{PROJECT-ID}`** with your actual Google Cloud project ID.

- **Headers**:
```json
{
  "Content-Type": "application/json"
}
```

- **Body**: Set to `Raw` and paste the request from "Prepare Request" node
- **Continue on Fail**: Enable (so errors don't crash the workflow)

#### 5. **Process Response** (Code Node)
- **Type**: Code (JavaScript)
- **Purpose**: Extract grounding chunks and format output
- **Code**:
```javascript
// Gemini File Search response processing
const response = $json;

if (!response.candidates || response.candidates.length === 0) {
  return [{
    json: {
      answer: "No results found.",
      chunks: [],
      usageMetadata: {
        inputTokens: 0,
        outputTokens: 0
      }
    }
  }];
}

const candidate = response.candidates[0];
const content = candidate.content?.parts?.[0]?.text || "No answer generated";

// Extract grounding chunks from response
const chunks = [];
if (response.groundingMetadata?.groundedChunks) {
  response.groundingMetadata.groundedChunks.forEach(chunk => {
    chunks.push({
      source: chunk.retrievedContext?.title || "Unknown",
      text: chunk.web?.title || chunk.retrievedContext?.snippet || "",
      startIndex: chunk.startIndex || null
    });
  });
}

return [{
  json: {
    answer: content,
    chunks: chunks,
    usageMetadata: {
      inputTokens: response.usageMetadata?.promptTokenCount || 0,
      outputTokens: response.usageMetadata?.candidatesTokenCount || 0
    }
  }
}];
```

### Store Registry Configuration

The Store Registry node is critical. Here's the complete JSON structure:

```json
{
  "storeId": "fileSearchStores/YOUR-STORE-ID-HERE",
  "apiKey": "{{ env.GEMINI_API_KEY }}",
  "model": "gemini-2.5-flash",
  "temperature": 0.3,
  "maxOutputTokens": 2048,
  "keywords": [
    "brand voice",
    "policies",
    "locations",
    "menu",
    "faq"
  ],
  "systemPrompt": "You are a helpful knowledge base assistant. Search the knowledge base for relevant information. Always cite sources."
}
```

### Input/Output Contracts

**Input** (from calling workflow):
```json
{
  "query": "What are our delivery policies?",
  "storeId": "fileSearchStores/...",  // Optional override
  "maxResults": 5  // Optional, default 3
}
```

**Output** (returned to calling workflow):
```json
{
  "answer": "We deliver to areas within 5 miles of our main location. Orders over $50 get free delivery.",
  "chunks": [
    {
      "source": "policies.md",
      "text": "Delivery area: 5 mile radius from main location",
      "startIndex": 42
    }
  ],
  "usageMetadata": {
    "inputTokens": 156,
    "outputTokens": 45
  }
}
```

### Call Depth Loop Prevention

Important: N8N sub-workflows can call other sub-workflows, but you must prevent infinite loops.

**Pattern**: Add a `call_depth` parameter

```javascript
// In "Prepare Request" node, add:
{
  "call_depth": ({{ $json.call_depth || 0 }}) + 1,
  "maxCallDepth": 3
}

// Then check in an IF node before making HTTP request:
if (call_depth > maxCallDepth) {
  return error("Maximum call depth exceeded");
}
```

For most use cases with Librarian, you won't need this since Librarian doesn't call other sub-workflows. But document it for safety.

---

## Core Workflow: Ingestion Engine v2

### What It Does

Ingestion Engine uploads multiple documents to Gemini File Search in a 2-step resumable upload protocol. Use this when you have 5+ files to upload at once.

### 2-Step Resumable Upload Protocol

Google Gemini File Search uses a resumable upload for reliability:

1. **Initiate Upload**: Create an upload session, get a session URI
2. **Upload Chunk**: Send file data to the session URI

```
POST /files?uploadType=resumable
  Headers: X-Goog-Upload-Protocol: resumable
  Body: { displayName: "file.pdf" }
  ↓
Response: X-Goog-Upload-Session-URI: https://...
  ↓
PUT {session-uri}
  Headers: X-Goog-Upload-Protocol: resumable, Content-Type: application/pdf
  Body: <binary file data>
  ↓
Response: { file: { name: "files/...", mimeType: "..." } }
```

### Manual vs. Webhook Modes

**Manual Mode** (for your own use):
- Activate workflow manually
- Point to a local folder
- Watch progress in N8N
- Best for: Initial setup, testing

**Webhook Mode** (for The Stacks UI):
- External system calls workflow via HTTP
- Returns file ID via webhook response
- Best for: Integration with student UI

This guide covers **Manual Mode**. For Webhook, see "Supporting Workflows" section.

### Workflow Architecture

```
Start
  ↓
Get Files from Folder
  (Iterate through each file)
  ↓
FOR EACH FILE:
  ├─ Validate File
  │   ├─ Check size (<100MB)
  │   ├─ Check type (PDF, DOCX, etc)
  │   └─ [Fail?] → Skip with error log
  │
  ├─ Initiate Upload
  │   ├─ POST /files?uploadType=resumable
  │   ├─ Get session URI
  │   └─ [Error?] → Retry up to 3x
  │
  ├─ Upload File Chunk
  │   ├─ PUT {session-uri} with file data
  │   ├─ Monitor progress
  │   └─ [Error?] → Retry or escalate
  │
  └─ Log Success
      └─ File uploaded, store file ID
  ↓
Generate Report
  (Summary: X uploaded, Y failed)
  ↓
End
```

### Node Configuration

#### 1. **Folder Input** (Set Node)
```json
{
  "folderPath": "/Users/yourname/knowledge-base-files",
  "storeId": "fileSearchStores/your-store-id",
  "apiKey": "{{ env.GEMINI_API_KEY }}",
  "projectId": "your-gcp-project-id",
  "maxRetries": 3
}
```

#### 2. **Get Files** (Code Node)
```javascript
const fs = require('fs');
const path = require('path');

const folderPath = $json.folderPath;
const files = fs.readdirSync(folderPath)
  .filter(file => {
    // Supported formats
    const supported = ['.pdf', '.docx', '.txt', '.md', '.html', '.pptx'];
    return supported.includes(path.extname(file).toLowerCase());
  })
  .map(file => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);
    return {
      name: file,
      path: fullPath,
      size: stats.size,
      mimeType: getMimeType(file)
    };
  });

return [{ json: { files } }];

function getMimeType(filename) {
  const types = {
    '.pdf': 'application/pdf',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.html': 'text/html',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  };
  const ext = require('path').extname(filename).toLowerCase();
  return types[ext] || 'application/octet-stream';
}
```

#### 3. **Validate File** (IF Node)
- Check: `$json.size < 104857600` (100 MB in bytes)
- If false: branch to error logging

#### 4. **Initiate Upload** (HTTP Request)
- **Method**: POST
- **URL**: `https://generativelanguage.googleapis.com/v1beta/projects/{{ $json.projectId }}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/uploads?key={{ $json.apiKey }}`
- **Headers**:
```json
{
  "X-Goog-Upload-Protocol": "resumable",
  "X-Goog-Upload-Command": "start",
  "Content-Type": "application/json"
}
```
- **Body**:
```json
{
  "file": {
    "displayName": "{{ $json.name }}"
  }
}
```
- **Continue on Fail**: true

**Response**: Header `X-Goog-Upload-Session-URI` contains the session URI for step 2.

#### 5. **Extract Session URI** (Set Node)
```json
{
  "sessionUri": "{{ $json._headers['x-goog-upload-session-uri'] }}"
}
```

#### 6. **Upload File Chunk** (HTTP Request)
- **Method**: PUT
- **URL**: `{{ $json.sessionUri }}`
- **Headers**:
```json
{
  "X-Goog-Upload-Protocol": "resumable",
  "X-Goog-Upload-Command": "upload, finalize",
  "Content-Type": "{{ $json.mimeType }}"
}
```
- **Body Type**: Binary
- **Body**: Read file from disk (use File Read node if needed)
- **Continue on Fail**: true
- **Retry**: Enable, max 3 attempts

### Validation Layer

Before uploading, check:

1. **File Size**: Must be < 100 MB (104857600 bytes)
2. **File Type**: Must be a supported format (PDF, DOCX, TXT, MD, HTML, PPTX)
3. **API Key**: Present and valid
4. **Store ID**: Valid Gemini File Search store

Example validation:
```javascript
const file = $json;
const errors = [];

if (file.size > 104857600) {
  errors.push(`File too large: ${file.size} bytes (max 100 MB)`);
}

const supported = ['.pdf', '.docx', '.txt', '.md', '.html', '.pptx'];
const ext = require('path').extname(file.name).toLowerCase();
if (!supported.includes(ext)) {
  errors.push(`Unsupported format: ${ext}`);
}

if (!$json.apiKey) {
  errors.push('API key not found in environment');
}

if (errors.length > 0) {
  return [{
    json: {
      valid: false,
      errors: errors
    }
  }];
}

return [{
  json: {
    valid: true,
    errors: []
  }
}];
```

### Verification Step

After upload, verify the file is accessible:

```javascript
// Call Gemini API to list files in store
// Confirm your file appears in the list
// If yes: mark success
// If no: retry upload or escalate
```

---

## Supporting Workflows

### Gemini File Search - Create Store (Webhook)

Creates a new FileSearchStore. Students use this to set up their first knowledge base.

**Workflow ID**: `4lXQVvpcLF0mnwGj`

**Configuration**:
```json
{
  "method": "POST",
  "endpoint": "https://generativelanguage.googleapis.com/v1beta/projects/{PROJECT-ID}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/createStore",
  "headers": {
    "Authorization": "Bearer {{ env.GEMINI_API_TOKEN }}",
    "Content-Type": "application/json"
  },
  "body": {
    "displayName": "{{ $json.storeName }}",
    "solutionType": "SOLUTION_TYPE_CHAT"
  }
}
```

**Webhook Input**:
```json
{
  "storeName": "my-knowledge-base"
}
```

**Webhook Output**:
```json
{
  "storeId": "fileSearchStores/abc123def456",
  "displayName": "my-knowledge-base",
  "status": "created"
}
```

### Gemini File Search - List Stores (Webhook)

Lists all FileSearchStores. Used by The Stacks UI to populate dropdown.

**Workflow ID**: `TnW5x7kBDf9kzFGI`

**Response Example**:
```json
{
  "stores": [
    {
      "name": "fileSearchStores/abc123def456",
      "displayName": "my-knowledge-base",
      "documentCount": 5
    },
    {
      "name": "fileSearchStores/xyz789uvw012",
      "displayName": "customer-faqs",
      "documentCount": 12
    }
  ]
}
```

### Gemini File Search - Upload Document (Webhook)

Uploads single document. Used by The Stacks UI's drag-and-drop interface.

**Workflow ID**: `ThwggKXYRQvI0BZB`

**Webhook Input**:
```json
{
  "storeId": "fileSearchStores/abc123def456",
  "fileName": "brand-voice.md",
  "fileData": "<binary data or base64>"
}
```

**Uses 2-step resumable upload protocol** (see Ingestion Engine above).

### Gemini File Search - List Documents (Webhook)

Lists documents in a store. Shows file names, sizes, and upload dates.

**Workflow ID**: `6OBm0LYZrJ3yIffA`

**Response Example**:
```json
{
  "documents": [
    {
      "name": "files/abc123def456",
      "displayName": "brand-voice.md",
      "mimeType": "text/markdown",
      "createTime": "2025-01-30T10:00:00Z",
      "size": "2048"
    }
  ]
}
```

### Gemini File Search - Delete Document (Webhook)

Removes document from store.

**Workflow ID**: `doRVErMaI31ZSlWx`

**Webhook Input**:
```json
{
  "fileId": "files/abc123def456"
}
```

**Response Example**:
```json
{
  "success": true,
  "fileId": "files/abc123def456",
  "message": "Document deleted"
}
```

### Gemini File Search - Drive Watcher (Advanced)

Auto-syncs a Google Drive folder to your Gemini File Search store. Optional for students.

**Workflow ID**: `QXiPAxGCnFSdSbhf`

**How It Works**:
1. Scheduled trigger (every 1 hour)
2. Lists files in Drive folder
3. Compares to files already in store
4. Uploads new files automatically
5. Deletes removed files from store

**Configuration**:
```json
{
  "driveFolder": "1A2B3C4D5E6F7G8H9I0J",
  "storeId": "fileSearchStores/abc123def456",
  "checkInterval": "0 * * * *",  // Every hour
  "autoDelete": true
}
```

---

## Agent Integration

### How Hatch Calls Librarian

Your main agent (Hatch) needs to know about Librarian Tool. In N8N:

**Step 1**: Add Librarian as a Tool node in your agent's workflow
- Tool type: "Workflow"
- Workflow: Select "Librarian Tool v2"
- Name: "search_kb"
- Description: "Search the knowledge base for relevant information"

**Step 2**: Connect to agent's AI Tool port
- Agent node has an `ai_tool` output port
- Connect it to the Tool node
- This tells the agent it CAN use this tool

**Step 3**: Agent's system prompt includes tool knowledge
```
You have access to the following tool:
- search_kb: Search the knowledge base for relevant information

When the user asks about our business, use search_kb to find facts.
Format: { "query": "user's question" }
```

### Example Agent Prompt Using Librarian

```
You are Hatch, a customer service expert for Hattie B's catering.

Your job:
1. Understand what the customer is asking
2. Search the knowledge base (using search_kb tool) for relevant info
3. Provide a helpful, accurate response

Available tools:
- search_kb(query): Search knowledge base
  Usage: When you need to look up policies, menu items, locations, etc.

Example:
  User: "Do you deliver to East Nashville?"
  You: search_kb({ query: "delivery area locations" })
  KB returns: "We deliver within 5 miles of downtown"
  You respond: "Yes, we deliver to East Nashville if it's within 5 miles..."

Be concise, factual, and always cite the knowledge base when relevant.
```

### Multiple Agents Using Librarian

Each agent can call Librarian independently:

```
CinnaMon → (Sentiment analysis, doesn't use KB)
  ↓
Hatch → calls search_kb("inquiry details")
  ↓
Sugar → calls search_kb("brand voice guidelines")
  ↓
Bishop → calls search_kb("fact verification")
```

They all call the same Librarian Tool, but with different queries based on their role.

---

## Configuration Guide

### Environment Variables in N8N

N8N supports environment variables for sensitive data. Set them in N8N Cloud settings:

**Steps**:
1. Go to **Settings** (gear icon)
2. Go to **Environment Variables**
3. Add each variable:

| Variable | Value | Purpose |
|----------|-------|---------|
| `GEMINI_API_KEY` | Your API key from Google AI Studio | Authenticate with Gemini API |
| `GEMINI_PROJECT_ID` | Your Google Cloud project ID | Identify your project in API calls |
| `LIBRARIAN_STORE_ID` | `fileSearchStores/abc123...` | Which knowledge base to search |
| `LIBRARIAN_MODEL` | `gemini-2.5-flash` | Which model to use |

**Usage in workflows**:
```
{{ env.GEMINI_API_KEY }}
{{ env.GEMINI_PROJECT_ID }}
{{ env.LIBRARIAN_STORE_ID }}
{{ env.LIBRARIAN_MODEL }}
```

### Credentials Setup

#### Gemini API Credential

1. **Get API Key**:
   - Go to https://aistudio.google.dev
   - Click "Get API key"
   - Create new API key
   - Copy the key

2. **Add to N8N**:
   - In N8N, go to **Credentials**
   - Click **Create New**
   - Search for "Google Generative AI"
   - Paste API key
   - Test connection
   - Save

#### Gmail Credential (Optional, for sending emails)

If you want to send emails after approval:

1. Go to **Credentials**
2. Click **Create New**
3. Search for "Gmail"
4. Follow OAuth flow
5. Authorize N8N to access your Gmail

### Store ID Configuration

Your Librarian Tool needs to know which store to search. This is the `storeId` in the Store Registry node.

**Format**: `fileSearchStores/{unique-id}`

**Example**: `fileSearchStores/hattie-bs-knowledge-base-a4r93m4pxm7k`

**Where to find yours**:
```
# Option 1: From The Stacks UI
- Go to The Stacks
- Click "Select Store"
- Copy store ID from URL or settings

# Option 2: From Google Cloud
- Open Google Cloud Console
- Go to Generative AI
- List stores
- Copy store ID

# Option 3: From List Stores workflow
- Run "Gemini File Search - List Stores"
- Copy storeId from response
```

### Temperature Settings

Temperature controls how creative/random the model is. For knowledge base search:

- **0.3** (recommended): Factual, consistent answers
- **0.5**: Balanced, some creativity
- **0.8+**: Creative, varied answers

Use **0.3** for Librarian to keep answers focused on KB content.

---

## Testing Protocols

### Manual Testing Checklist

**Before deploying to production, verify**:

- [ ] API key is valid and not expired
- [ ] Store ID is correct and contains documents
- [ ] HTTP endpoint URL is correct (no typos)
- [ ] Request JSON is properly formatted
- [ ] Response parsing handles all cases (success, error, empty)
- [ ] Retry logic works (test by simulating failure)
- [ ] Token usage is within budget
- [ ] Workflow completes in < 5 seconds for typical query

### Librarian Tool Testing

**Test 1: Simple Query**
```
Input: { query: "What is your delivery policy?" }
Expected Output:
{
  "answer": "We deliver...",
  "chunks": [ {...} ],
  "usageMetadata": { "inputTokens": 123, "outputTokens": 45 }
}
```

**Test 2: Complex Multi-Part Query**
```
Input: { query: "What are your hours, location, and do you deliver?" }
Expected Output: All three pieces answered with proper citations
```

**Test 3: No Results**
```
Input: { query: "What is your secret recipe for moon rocks?" }
Expected Output:
{
  "answer": "No relevant information found in knowledge base",
  "chunks": [],
  "usageMetadata": {...}
}
```

**Test 4: Call from Another Workflow**
```
- Create test workflow with Manual Trigger
- Add node to call Librarian Tool
- Confirm output appears in node preview
```

### Ingestion Engine Testing

**Test 1: Single Small File**
- Upload 1 small file (< 1 MB)
- Verify success response
- Check file appears in "List Documents"

**Test 2: Batch Upload**
- Upload 5 files at once
- Verify all succeed or fail gracefully
- Check all appear in "List Documents"

**Test 3: Large File**
- Upload 95 MB PDF (near limit)
- Verify resumable upload handles chunking
- Check file is searchable

**Test 4: Invalid File**
- Try uploading 150 MB file
- Expect validation error
- Verify error message is helpful

**Test 5: Integration**
- Upload documents via Ingestion Engine
- Query via Librarian Tool
- Verify Librarian finds the uploaded content

### Testing Checklist for Each Workflow

Create a test file with these steps:

```markdown
## Librarian Tool v2 Test Plan

### Setup
- [ ] Store ID configured correctly
- [ ] API key in environment variables
- [ ] Test documents uploaded to store

### Execution
- [ ] Run with simple 1-word query
- [ ] Run with complex multi-sentence query
- [ ] Run with query that has no results
- [ ] Check execution time (should be < 5 seconds)

### Output Validation
- [ ] Response includes "answer" field
- [ ] Response includes "chunks" array
- [ ] Response includes "usageMetadata"
- [ ] Token counts make sense

### Error Handling
- [ ] Invalid API key → graceful error
- [ ] Invalid store ID → graceful error
- [ ] Network timeout → retry succeeds
- [ ] Malformed query → helpful error

### Performance
- [ ] Query executes in < 5 seconds (typical case)
- [ ] Token usage is reasonable (< 1000 tokens)
- [ ] No rate limiting issues
```

---

## Common N8N Errors

### "Node type not found: Librarian Tool"

**Symptom**: Red error when trying to add Librarian Tool to another workflow

**Cause**: The Librarian Tool workflow doesn't exist in your workspace yet

**Solution**:
1. Import Librarian Tool v2 workflow first
2. Verify it appears in your workflows list
3. Then add it as a tool in other workflows

### "Import failed: Invalid workflow JSON"

**Symptom**: Error when importing a workflow file

**Cause**: JSON syntax error or incompatible N8N version

**Solution**:
```bash
# Check JSON is valid
python -m json.tool workflow.json

# Or use online JSON validator
# https://jsonlint.com
```

If syntax is valid:
- Check N8N version (must be current)
- Try importing in browser (not native app)
- Contact N8N support with JSON file

### "Environment variable not recognized"

**Symptom**: Expression `{{ env.GEMINI_API_KEY }}` returns undefined

**Cause**: Variable not set in N8N settings or misspelled

**Solution**:
1. Go to **Settings** → **Environment Variables**
2. Verify variable exists exactly as you're using it
3. Variable names are case-sensitive: `GEMINI_API_KEY` ≠ `gemini_api_key`
4. If just created, refresh the page

### "HTTP 404 on generateContent endpoint"

**Symptom**: 404 error when calling Gemini API

**Cause**: URL is malformed or project ID is wrong

**Solution**:
```
WRONG: https://generativelanguage.googleapis.com/.../generateContent
RIGHT: https://generativelanguage.googleapis.com/v1beta/projects/{PROJECT-ID}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/generateContent?key={API-KEY}

Check:
1. PROJECT-ID matches your Google Cloud project
2. API key is valid and not expired
3. Endpoint path has no typos
4. Key parameter is URL-encoded if needed
```

### "Store ID format errors"

**Symptom**: Error saying store ID is invalid

**Cause**: Store ID has wrong format

**Solution**:
```
WRONG FORMATS:
- abc123def456 (missing fileSearchStores/ prefix)
- fileSearchStores/abc 123 (space in ID)
- fileSearchStores/ (no ID)

CORRECT FORMAT:
- fileSearchStores/abc123def456

Get correct ID from:
1. Google Cloud Console → Generative AI
2. The Stacks UI settings
3. List Stores workflow response
```

### "Timeout on large file uploads"

**Symptom**: Upload hangs or times out for files >50 MB

**Cause**: HTTP request timeout too short for large file

**Solution**:
1. In HTTP Request node, set **Timeout** to 300 seconds (5 minutes)
2. Use resumable upload (2-step process, not single POST)
3. For files >100 MB: Not supported, split file first

### "403 Unauthorized: API key invalid"

**Symptom**: Every API call returns 403 Unauthorized

**Cause**: API key is expired, invalid, or has wrong permissions

**Solution**:
1. Generate new API key in Google AI Studio: https://aistudio.google.dev
2. Update environment variable in N8N
3. Verify API key has permissions for Gemini API (not just other Google APIs)
4. Check API key isn't restricted to specific IPs

### "The model 'gemini-2.0-flash' does not exist"

**Symptom**: Error about deprecated model

**Cause**: Gemini 2.0 Flash was deprecated March 31, 2026

**Solution**:
```
UPDATE all references from:
  "gemini-2.0-flash"
TO:
  "gemini-2.5-flash" (recommended)
  OR "gemini-3.0-flash" (if you want cutting edge)

Where to update:
1. Store Registry node (model field)
2. Environment variable (if you have one)
3. Agent system prompts (if hardcoded)
4. Documentation
```

### "Workflow execution failed: out of memory"

**Symptom**: Workflow crashes with memory error on large files

**Cause**: Processing huge files in memory (e.g., 100 MB PDF in memory)

**Solution**:
1. Stream files instead of loading full content
2. Split large files before upload
3. Use resumable upload (which chunks automatically)
4. Reduce `maxOutputTokens` in Store Registry

---

## Performance Optimization

### Execution Time Goals

- **Librarian Query**: < 5 seconds (typical)
- **Single File Upload**: < 10 seconds
- **Batch Upload (5 files)**: < 60 seconds
- **Store Creation**: < 2 seconds

### Cost Reduction Strategies

#### 1. Temperature Setting
Lower temperature = fewer tokens (cheaper)
```
Temperature 0.3: ~15% fewer output tokens
Temperature 0.5: ~5% fewer output tokens
```

#### 2. Token Limits
Set reasonable `maxOutputTokens` in Store Registry:
```json
{
  "maxOutputTokens": 1024  // Not 2048
}
```

For "fact checking" queries, 512 tokens is enough.

#### 3. Pagination
Don't retrieve all documents at once:
```json
{
  "pageSize": 10,
  "pageToken": "{{ $json.nextPageToken }}"
}
```

#### 4. Caching
If asking same query multiple times, cache result:
```javascript
const cacheKey = `query-${$json.query}`;
const cached = await n8n.cache.get(cacheKey);

if (cached) {
  return [{ json: cached }];
}

// ... Make API call ...

await n8n.cache.set(cacheKey, result, 3600);  // 1 hour TTL
```

### Query Optimization

#### Bad Query (Expensive)
```
"Tell me everything about every policy in detail"
```
(AI tries to retrieve ALL policies, expensive)

#### Good Query (Efficient)
```
"What is our return policy?"
```
(AI finds specific section, fewer tokens)

**Tip**: Train users/agents to ask specific questions.

### Monitoring

Track these metrics in your logs:

```json
{
  "timestamp": "2025-01-30T10:30:00Z",
  "workflow": "Librarian Tool v2",
  "query": "delivery policy",
  "inputTokens": 156,
  "outputTokens": 45,
  "executionTime": 3.2,
  "cost": "$0.000052"
}
```

Calculate daily cost:
```
(inputTokens × $0.075 + outputTokens × $0.3) / 1_000_000
= (1560 × 0.075 + 450 × 0.3) / 1_000_000
= (117 + 135) / 1_000_000
= $0.000252 per query

× 100 queries/day = $0.0252/day
× 30 days = $0.756/month
```

---

## Workflow Version History

### Version 2.0 (Current, January 2026)

**Librarian Tool v2**
- Gemini 2.5 Flash model (updated from 2.0 Flash)
- Improved grounding chunks extraction
- Store Registry pattern for configuration
- Call depth loop prevention
- Environment variables for API key

**Ingestion Engine v2**
- 2-step resumable upload protocol (replaced single POST)
- Better error handling and retry logic
- Validation layer for file types and sizes
- Progress tracking for batch uploads
- Support for 100 MB files (up from 20 MB)

**What Changed from v1**:
- Model updated (must change from 2.0 to 2.5)
- Upload protocol changed (resumable, more reliable)
- Better error messages and logging
- More efficient token usage

### Migration from v1 to v2

If you're using old workflows:

**Step 1**: Update model name
```
OLD: "gemini-2.0-flash"
NEW: "gemini-2.5-flash"
```

**Step 2**: Update upload process
If using single-POST upload, switch to 2-step resumable:
1. Initiate with resumable header
2. PUT file to session URI

**Step 3**: Update Store Registry
Use new configuration structure with environment variables

**Step 4**: Test thoroughly
Run full integration test with sample data

### Recommended Upgrade Timeline

- **Immediately**: Update model to 2.5 Flash (2.0 deprecated)
- **This week**: Update Ingestion Engine to v2 (if uploading files)
- **Next week**: Test all workflows with new versions
- **Before March 31, 2026**: Complete migration (2.0 stops working)

---

## Quick Reference

### Store Registry Template
```json
{
  "storeId": "fileSearchStores/YOUR-ID",
  "apiKey": "{{ env.GEMINI_API_KEY }}",
  "model": "gemini-2.5-flash",
  "temperature": 0.3,
  "maxOutputTokens": 2048
}
```

### HTTP Request Template
```
Method: POST
URL: https://generativelanguage.googleapis.com/v1beta/projects/{PROJECT-ID}/locations/us-central1/endpoints/google.generative-ai.GenerativeService/generateContent?key={API-KEY}
Headers: { "Content-Type": "application/json" }
Body: { "model": "...", "tools": [...], "contents": [...] }
```

### Environment Variables Required
```
GEMINI_API_KEY = Your API key
GEMINI_PROJECT_ID = Your GCP project ID
LIBRARIAN_STORE_ID = fileSearchStores/your-id
LIBRARIAN_MODEL = gemini-2.5-flash
```

### Testing Commands
```bash
# Validate JSON
python -m json.tool workflow.json

# Check API endpoint
curl -X POST https://generativelanguage.googleapis.com/v1beta/... \
  -H "Content-Type: application/json" \
  -d '{"model": "..."}'
```

---

## Summary

You now have a complete guide to building Gemini File Search + N8N systems. Key takeaways:

1. **Librarian Tool** is a sub-workflow your agents call to search your knowledge base
2. **Ingestion Engine** uses 2-step resumable uploads for reliable document ingestion
3. **Supporting Workflows** handle store/document management (mostly invisible to you)
4. **Configuration** is done via environment variables and the Store Registry node
5. **Testing** should verify each workflow in isolation and as integrated system
6. **Performance** is optimized through temperature settings, token limits, and caching
7. **Error handling** is documented for common issues

Start with Librarian Tool, get it working, then layer in Ingestion Engine and supporting tools.

---

## Support & Next Steps

### Getting Help

1. **N8N Docs**: https://docs.n8n.io
2. **Gemini API Docs**: https://ai.google.dev/gemini-api/docs
3. **This Guide**: Refer back to Common Errors section
4. **Community**: Ask in N8N forum or Gemini Discord

### Next: Building Your First Agent

Once you have Librarian Tool working:

1. Create a simple agent that calls Librarian
2. Test with sample queries
3. Iterate on prompt to improve results
4. Expand to other agents (Sugar, Bishop, etc.)
5. Add human-in-the-loop approval (Slack integration)

### Advanced Topics (Future Learning)

- Custom embeddings (not supported by Gemini File Search)
- Multi-turn conversations with context
- Streaming responses for real-time output
- Cost optimization for large-scale systems

---

**Document Version**: 1.0
**Last Updated**: January 30, 2026
**Status**: Ready for Student Use
**Reviewed By**: Technical Curriculum Team
**Gemini API Version**: 1.0 beta, 2025
**N8N Version**: 1.55+ required
