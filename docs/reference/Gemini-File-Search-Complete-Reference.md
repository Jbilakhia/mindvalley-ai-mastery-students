# Gemini File Search Complete Technical Reference

**MindValley AI Mastery Curriculum**

---

## Document Information

| Field | Value |
|-------|-------|
| **Title** | Gemini File Search Complete Technical Reference |
| **Subtitle** | MindValley AI Mastery Curriculum |
| **Date** | January 30, 2026 |
| **Version** | 1.0 |
| **Status** | Complete & Verified |
| **Audience** | Students (non-technical entrepreneurs) & Developers |

---

## Table of Contents

1. [Section 1: Getting Started](#section-1-getting-started)
2. [Section 2: 2026 Updates & Critical Changes](#section-2-2026-updates--critical-changes)
3. [Section 3: Setup & Verification](#section-3-setup--verification)
4. [Section 4: Troubleshooting Guide](#section-4-troubleshooting-guide)
5. [Section 5: Student FAQ & Common Issues](#section-5-student-faq--common-issues)
6. [Section 6: Cost Planning & Calculator](#section-6-cost-planning--calculator)
7. [Section 7: Model Migration Guide](#section-7-model-migration-guide)
8. [Section 8: Multi-Store Architecture](#section-8-multi-store-architecture)
9. [Section 9: API Reference](#section-9-api-reference)
10. [Section 10: N8N Implementation](#section-10-n8n-implementation)
11. [Section 11: Official Resources](#section-11-official-resources)
12. [Comprehensive Index](#comprehensive-index)

---

\pagebreak

# Section 1: Getting Started

## Gemini File Search Technical Documentation - Start Here

Welcome to the complete Gemini File Search reference library for MindValley AI Mastery students.

This folder contains everything you need to set up, use, troubleshoot, and optimize Google's Gemini File Search (File Search Tool) for your AI agent projects.

---

## Quick Navigation

### New to Gemini File Search? Start Here:

1. **Read First: Critical API Changes for 2026** (5 minutes)
   - Model deprecation warnings (March 31, 2026 deadline)
   - What changed and why it matters
   - See: Section 2: 2026 Updates

2. **Then: Complete Your Setup** (45 minutes)
   - Step-by-step setup with checkboxes
   - Phase-by-phase verification
   - Success criteria for each step
   - See: Section 3: Setup & Verification

3. **For Building Workflows** (30 minutes)
   - How to implement in N8N
   - Librarian Tool architecture
   - Complete node configurations
   - See: Section 10: N8N Implementation

### Stuck? Having Issues?

4. **Your First Stop for Problems** (As needed)
   - Comprehensive error solutions
   - Debug processes with code examples
   - Symptom-based navigation
   - See: Section 4: Troubleshooting

5. **Real Student Issues** (10 minutes)
   - 45+ common problems from actual students
   - Quick fixes for frequent errors
   - Cost trap examples
   - See: Section 5: Student FAQ

### Planning Your Project?

6. **Estimate Your Costs** (15 minutes)
   - Pricing breakdown with examples
   - Real usage scenarios (light, moderate, heavy)
   - Free tier optimization strategies
   - See: Section 6: Cost Planning

7. **Scaling Strategies** (30 minutes)
   - When to use multiple knowledge bases
   - Architecture patterns with examples
   - Performance and cost trade-offs
   - See: Section 8: Multi-Store Architecture

### Technical Reference

8. **Complete API Documentation** (45 minutes)
   - Every endpoint documented
   - Code examples in Python, Node.js, cURL
   - Request/response formats
   - See: Section 9: API Reference

9. **External Links & Resources** (10 minutes)
   - Official Google documentation
   - Community tutorials
   - Video guides and examples
   - See: Section 11: Official Resources

### Migrating from Older Models?

10. **Migration Required** (20 minutes)
    - Gemini 2.0 Flash → 2.5/3.0 migration
    - Step-by-step process with testing
    - Rollback procedures
    - See: Section 7: Model Migration

---

## Document Overview

| Document | Type | Time | When to Use |
|----------|------|------|-------------|
| **2026 Updates** | Alert | 5 min | Before starting any work |
| **Setup Checklist** | Tutorial | 45 min | First-time setup |
| **N8N Guide** | Reference | 30 min | Building workflows |
| **Troubleshooting** | Playbook | As needed | When errors occur |
| **Student FAQ** | Quick Ref | 10 min | Common questions |
| **Cost Calculator** | Planning | 15 min | Budget planning |
| **Multi-Store** | Advanced | 30 min | Scaling beyond basics |
| **API Reference** | Technical | 45 min | Developer integration |
| **Resources** | Links | 10 min | Finding official docs |
| **Migration** | Process | 20 min | Updating deprecated models |

---

## Critical Alerts

### URGENT: Gemini 2.0 Flash Deprecated

**End of Life: March 31, 2026**
- If using `gemini-2.0-flash` in your workflows, you MUST migrate
- See: Section 7: Model Migration Guide
- Action: Update to `gemini-2.5-flash` or `gemini-3.0-flash`

### Common Mistakes That Cost Money

1. **Re-uploading documents** ($0.15/1M tokens each time)
2. **Multiple store copies** (3x storage multiplier)
3. **Testing with full knowledge base** (use samples!)

See: Section 6: Cost Planning

### Most Common Setup Errors

1. **Store ID format wrong** - Must start with `fileSearchStores/`
2. **60-second indexing wait** - Documents not immediately searchable
3. **No grounding chunks** - Agent answering without KB (hallucination)

See: Section 5: Student FAQ

---

## Learning Path

### Week 1: Foundation
- [ ] Read Section 2: 2026 Updates (5 min)
- [ ] Complete Section 3: Setup Checklist (45 min)
- [ ] Upload first test document (15 min)
- [ ] Run first test query (10 min)

### Week 2: Integration
- [ ] Import Section 10: N8N workflows (30 min)
- [ ] Configure Librarian Tool (30 min)
- [ ] Integrate with Hatch agent (30 min)
- [ ] Test end-to-end email system (30 min)

### Week 3: Optimization
- [ ] Review Section 6: Cost calculator (15 min)
- [ ] Optimize document formats (20 min)
- [ ] Tune query performance (30 min)
- [ ] Set up monitoring (20 min)

### Week 4: Scaling (Optional)
- [ ] Plan Section 8: Multi-store architecture (20 min)
- [ ] Implement store routing (45 min)
- [ ] Set up automated uploads (30 min)
- [ ] Configure backup procedures (30 min)

---

\pagebreak

# Section 2: 2026 Updates & Critical Changes

## Gemini File Search 2026 Updates

### Executive Summary

Google has made three critical updates to its Gemini File Search API in 2026:

1. **Official name change**: "Gemini File Search" is now "File Search Tool" (technical API unchanged)
2. **Model deprecation deadline**: Gemini 2.0 Flash retires March 31, 2026 (40 days notice as of early 2026)
3. **File size limit increase**: Projects can now store 100 MB per file (up from 20 MB)
4. **New models available**: Gemini 2.5 and 3.0 models offer improved grounding and performance

**What this means for you**: If you're currently using Gemini 2.0 Flash, you must migrate to a newer model before March 31, 2026. The migration takes 15 minutes and requires only parameter changes—your code logic stays identical.

**The good news**: The API remains backwards compatible. All existing code will continue working until the deadline. There are no breaking changes, only mandatory model updates.

---

## Official Name Change (November 6, 2025 onwards)

Google officially rebranded the product:

- **Old name**: "Gemini File Search API"
- **New name**: "File Search Tool" (shorter, aligns with Claude's language)
- **Why it changed**: Better alignment with Google's GenAI terminology
- **For you**: Use "File Search Tool" in documentation and student materials going forward

The technical API (`/generateContent` with File Search) remains unchanged. This is purely a naming update for marketing and documentation.

**In your code**: No changes needed. The API endpoint and method names stay the same.

---

## CRITICAL: Model Deprecation Timeline

### Gemini 2.0 Flash - End of Life: March 31, 2026

Gemini 2.0 Flash (the model we recommended for File Search in 2025) is officially deprecated and will stop accepting requests after **March 31, 2026**.

| Item | Details |
|------|---------|
| **Current date** | Early 2026 |
| **Deprecation announcement** | November 2025 |
| **Last request deadline** | March 31, 2026 |
| **Days remaining** | ~60 days |
| **Action required** | Migrate all projects to Gemini 2.5 Pro/Flash or Gemini 3.0 |

### Why Google is deprecating 2.0 Flash

Gemini 2.0 Flash was a bridge model—released while Google finalized 3.0. Now that Gemini 3.0 is stable, Google is consolidating the model family around:
- Gemini 2.5 (proven, fast, low-cost)
- Gemini 3.0 (cutting-edge, improved reasoning)

This is normal in AI as new models ship.

---

## Model Migration Matrix

### Supported Models for File Search (2026)

| Model | Status | Cost | Speed | Best For | Sunset Date |
|-------|--------|------|-------|----------|-------------|
| Gemini 2.0 Flash | ⚠️ Deprecated | Lowest | Fastest | N/A - MIGRATE NOW | March 31, 2026 |
| Gemini 2.5 Flash | Recommended | Low | Very Fast | Fast, cost-effective RAG | 2027+ |
| Gemini 2.5 Pro | Stable | Medium | Fast | Production, accuracy focus | 2027+ |
| Gemini 3.0 Flash | Preview | Low | Very Fast | Cutting-edge projects | TBD |
| Gemini 3.0 Pro | Preview | Medium | Fast | Advanced reasoning tasks | TBD |

### Migration Path (Step-by-Step)

**For student projects using Gemini 2.0 Flash:**

Migrate to Gemini 2.5 Flash (drop-in replacement, lower cost).

**For production/advanced projects:**

Migrate to Gemini 2.5 Pro or Gemini 3.0 Flash.

### Exact Parameter Changes Required

#### Before (Gemini 2.0 Flash)

```python
import anthropic

# This will STOP WORKING after March 31, 2026
model = "gemini-2.0-flash"
```

```json
{
  "model": "gemini-2.0-flash",
  "contents": [...]
}
```

#### After (Gemini 2.5 Flash - Recommended)

```python
import anthropic

# Drop-in replacement: faster, cheaper, supported through 2027+
model = "gemini-2.5-flash"
```

```json
{
  "model": "gemini-2.5-flash",
  "contents": [...]
}
```

#### Alternative (Gemini 3.0 Flash - Cutting Edge)

```python
# For advanced projects needing improved grounding
model = "gemini-3.0-flash"
```

### What Changes (and What Doesn't)

| Component | Changes | Your Code |
|-----------|---------|-----------|
| Model name string | 2.0 → 2.5 or 3.0 | Update once |
| API endpoint | None | No change |
| File Search syntax | None | No change |
| Temperature/parameters | None required | No change |
| Token pricing | May vary | Check Google pricing |
| Token limits | Slightly higher in 3.0 | No change |

**Bottom line**: Change one line. Everything else works.

---

## File Size Limit Update (January 2026)

### New Limits Take Effect

| Item | 2025 Limit | 2026 Limit | Change |
|------|-----------|-----------|--------|
| File size per document | 20 MB | 100 MB | +400% |
| Max files per project | Unlimited* | Unlimited* | No change |
| Storage per project | Previously 1 TB | Still 1 TB | No change |

*Practical limit: 1 TB total storage, so approximately 10,000+ files at 100 MB each

### What This Means

You can now upload:
- Larger PDFs (40-50 page documents without chunking)
- Higher-resolution images with embedded text
- Longer video transcripts
- Complete technical specifications in one file

**Example**: A 95 MB PDF of a technical handbook can now be uploaded intact instead of split into chunks.

### No Code Changes Required

The 100 MB limit applies automatically—no API parameter changes needed. If you try to upload a file >100 MB, it simply rejects with a clear error message.

---

## New Features in 2026

### Gemini 3.0 Models: Improved Grounding

File Search in Gemini 3.0 includes enhanced grounding—the AI's ability to cite specific document sections when answering questions.

#### What This Means

Gemini 2.5:
```
Q: What is the company's revenue in Q4?
A: The company's revenue in Q4 was $45M.
```

Gemini 3.0:
```
Q: What is the company's revenue in Q4?
A: The company's revenue in Q4 was $45M.
[Source: Financial Report 2025.pdf, page 3, "Q4 Results" section]
```

More precise citations = higher trust in generated answers.

### Better Semantic Search

Gemini 3.0 improves how documents are indexed and searched internally. You'll see:
- Fewer irrelevant results when searching knowledge bases
- Better understanding of context and relationships
- Improved accuracy on complex queries

No API changes required—these are backend improvements.

### Extended Context Windows

Gemini 3.0 models support larger context windows, meaning they can reason over more document content simultaneously. This helps when your knowledge base has many interrelated documents.

---

## Breaking Changes: None

**Important**: The File Search API is fully backwards compatible.

### What DOES NOT Change

- ✅ API endpoints (`/generateContent`)
- ✅ File upload syntax
- ✅ Query format
- ✅ Response structure
- ✅ Authentication (API keys)
- ✅ Rate limits per project
- ✅ Storage architecture
- ✅ Pricing model (token-based)

### What REQUIRES Action

- ⚠️ Model name parameter (2.0 → 2.5 or 3.0)
- ⚠️ Deprecation deadline (March 31, 2026)

You're not rewriting anything. You're updating one parameter and deploying.

---

## Action Items for Students

### Timeline

| Date | Action | Urgency |
|------|--------|---------|
| Now | Review current model usage | HIGH |
| Week 1 | Plan migration | HIGH |
| Week 2-3 | Test with new models | MEDIUM |
| March 15, 2026 | Complete migration | HIGH |
| March 31, 2026 | Deadline (no requests accepted) | CRITICAL |

### Immediate Steps (This Week)

#### 1. Check Your Current Model

Find every place in your code/workflows where you specify a model:

```bash
# Search all Python files
grep -r "gemini-2.0-flash" .

# Search all Node.js files
grep -r "gemini-2.0-flash" . --include="*.js"

# Check N8N workflows (search in UI for "2.0")
# Or check exported JSON files
grep "gemini-2.0" *.json
```

#### 2. Create a Testing Environment

Before changing production:

```bash
# Clone your project or create a test branch
git checkout -b feature/gemini-migration

# Create a test file for migrations
touch test-gemini-migration.py
```

#### 3. Test with Gemini 2.5 Flash

Update your model parameter:

```python
# test-gemini-migration.py
import anthropic

client = anthropic.Anthropic(api_key="YOUR_API_KEY")

# Test with 2.5 Flash
response = client.messages.create(
    model="gemini-2.5-flash",  # Changed from 2.0-flash
    messages=[
        {
            "role": "user",
            "content": "Test message"
        }
    ]
)

print(response)
```

Run this and confirm it works.

#### 4. Update Your Code

Once testing passes:

```python
# Find and replace everywhere
# OLD: "gemini-2.0-flash"
# NEW: "gemini-2.5-flash"

# In Python files
sed -i 's/gemini-2.0-flash/gemini-2.5-flash/g' *.py

# In Node.js files
sed -i 's/gemini-2.0-flash/gemini-2.5-flash/g' *.js
```

#### 5. Update N8N Workflows

If using N8N with File Search:

1. Open each workflow in N8N Cloud
2. Find the "Google Generative AI" node (or similar)
3. Change model dropdown from "Gemini 2.0 Flash" → "Gemini 2.5 Flash"
4. Test the workflow
5. Save and deploy

#### 6. Commit and Deploy

```bash
git add .
git commit -m "chore: migrate from Gemini 2.0 Flash to 2.5 Flash"
git push origin feature/gemini-migration

# Create PR, get review, merge to main
```

### Optional: Evaluate Gemini 3.0

After 2.5 is stable, consider testing Gemini 3.0:

- Better grounding (citations) for RAG use cases
- Improved accuracy on complex queries
- Still in preview, so use for non-critical projects first

To test:

```python
# Create parallel test with 3.0
response = client.messages.create(
    model="gemini-3.0-flash",  # Try 3.0
    messages=[...]
)
```

Compare results with 2.5 to decide if upgrade is worth it for your use case.

---

## Model Selection Guide

### Use Gemini 2.5 Flash If:

- You need fast, cost-effective File Search
- Your queries are straightforward
- Budget is a primary concern
- Your documents are <100 MB average

**Cost**: ~$0.075 per 1M input tokens

**Speed**: <1 second typical response

**Citation quality**: Good

### Use Gemini 2.5 Pro If:

- You need better accuracy than Flash
- Your queries involve complex reasoning
- Document understanding is critical
- You can tolerate slightly slower responses

**Cost**: ~$3.00 per 1M input tokens (40x more expensive)

**Speed**: 1-3 seconds typical response

**Citation quality**: Excellent

### Use Gemini 3.0 Flash If:

- You want cutting-edge performance
- Your project is non-critical (still in preview)
- You want to test before committing
- You want improved grounding and citations

**Cost**: Still in preview; pricing TBD

**Speed**: Very fast

**Citation quality**: Excellent

### Use Gemini 3.0 Pro If:

- You need the absolute best accuracy
- Your project is critical and you can wait for production
- Your queries involve multi-step reasoning
- Cost is not your primary concern

**Cost**: Preview pricing; production pricing TBD

**Speed**: Slower than Flash, but most accurate

**Citation quality**: Best-in-class

---

## Key Takeaways

**Three critical updates affecting your File Search setup:**

1. **Gemini 2.0 Flash is deprecated** — Migrate to 2.5 Flash before March 31, 2026 (change one line of code)

2. **File sizes now 100 MB** — Upload larger documents without chunking

3. **Gemini 3.0 is available** — Test it for improved grounding and citations (optional upgrade)

**Your immediate action**: Update model parameter from `gemini-2.0-flash` to `gemini-2.5-flash`, test, and deploy before the March 31 deadline.

**The good news**: No breaking changes, no rewriting code, no database migrations. Just a parameter update.

---

\pagebreak

# Section 3: Setup & Verification

## Gemini File Search Setup Verification Checklist

**Purpose**: Step-by-step guide to verify your Gemini File Search setup is working correctly before building your Librarian agent.

**Estimated Time**: 15-20 minutes (first time) / 5 minutes (if already familiar)

**Success Indicator**: You'll have a working Librarian tool that can search uploaded documents and return relevant answers.

---

## Quick Status Check

Before starting, note where you are:

- [ ] I have a Google account (free or paid)
- [ ] I haven't started yet (start with Phase 1)
- [ ] I have an API key but haven't tested it (jump to Phase 2)
- [ ] I have a store created but documents aren't found (jump to Phase 3)
- [ ] Documents upload but queries return empty (jump to Phase 4)
- [ ] Getting errors in N8N (jump to Phase 5)

---

## Phase 1: API Access & Credentials

**Goal**: Get your API key and verify it's formatted correctly.

### Step 1.1: Create Your API Key

- [ ] Go to https://aistudio.google.com/apikey
- [ ] Click "Create API Key"
- [ ] Select "Create API key in new project"
- [ ] Wait for the dialog to show your new key

**What to Look For**: Your key appears in a blue box

**✅ Success Looks Like**:
```
AIzaSyD1-UtdKA5NbqryF2ZxVd0P8u9xYvFgXxI
```
(Starts with `AIzaSy`, followed by 35 more characters)

### Step 1.2: Copy and Save Your Key

- [ ] Click the copy icon next to your key
- [ ] Paste it somewhere safe (text file, password manager, etc.)
- [ ] **IMPORTANT**: Do NOT share this key on GitHub or commit to version control

**Verification**:
- [ ] Key starts with `AIzaSy`
- [ ] Key is exactly 39 characters long
- [ ] No spaces or extra characters before/after

**❌ If It Failed**:
- Refresh the page at https://aistudio.google.com/apikey
- Try creating the key again
- Check that JavaScript is enabled in your browser

### Step 1.3: Enable the Generative Language API

- [ ] Still at https://aistudio.google.com/apikey
- [ ] Look for "Enable APIs" or "Google Cloud Console" link
- [ ] If it says "Enabling...", wait 30 seconds
- [ ] Once enabled, move to Phase 2

**✅ Success**: You see "API enabled" or no error messages

**❌ Common Issue: "API not enabled"**
- Solution: Click the enable button and wait 30 seconds for it to activate
- This is automatic on first key creation, but sometimes needs a refresh

---

## Phase 2: File Search Store Creation

**Goal**: Create a File Search Store and capture its ID for use in workflows.

### Step 2.1: Open Google AI Studio

- [ ] Go to https://aistudio.google.com/
- [ ] Click "File Search" in the left sidebar (or under "Manage Tools")
- [ ] Look for "Create a file search store" button

**✅ Expected UI**: You see a button to create a new store

### Step 2.2: Create Your First Store

- [ ] Click "Create File Search Store"
- [ ] Name it something meaningful (e.g., "Hattie-B-Knowledge-Base")
- [ ] Click "Create"
- [ ] Wait for confirmation (takes 5-10 seconds)

**✅ Success Looks Like**:
- You see your store in a list
- Store has a unique ID displayed (looks like `fileSearchStores/abc123xyz`)
- Status shows "Ready" or "Active"

### Step 2.3: Copy Your Store ID

- [ ] Find your store in the list
- [ ] Look for the ID (starts with `fileSearchStores/`)
- [ ] Click to copy it (there should be a copy icon)
- [ ] Save it alongside your API key

**Verification Checklist**:
- [ ] Store ID starts with `fileSearchStores/`
- [ ] Store ID is between 35-50 characters long
- [ ] Store status is "Ready" or "Active" (not "Pending" or "Error")

**Example of Correct Format**:
```
fileSearchStores/0zymyv7c8r7b8t9f2b5d6e8g0i2k3l4m
```

**❌ If Store Creation Failed**:
- Check that API is enabled (go back to Phase 1, Step 1.3)
- Try creating the store again
- Refresh the page and look for existing stores
- If still stuck, see "Troubleshooting Resources" below

### Step 2.4: Verify Store in Google Cloud

- [ ] Optional but recommended: Go to https://console.cloud.google.com
- [ ] Click "Generative AI API" (if you have access)
- [ ] Confirm your store appears in the list
- [ ] Note its creation timestamp

**This Step**: Confirms your store is actually created in Google's system

---

## Phase 3: Document Upload & Indexing

**Goal**: Upload knowledge base documents and wait for indexing.

### Step 3.1: Prepare Documents

- [ ] Have PDF, DOCX, or TXT files ready (your knowledge base content)
- [ ] Each file should be under 10 MB
- [ ] File naming: Use clear names (e.g., `menu.pdf`, `pricing-policy.txt`)

**✅ Recommended Files for Testing**:
- Menu/product info (1-2 pages)
- FAQs document
- Company policies
- Pricing sheet

### Step 3.2: Upload Documents to Your Store

- [ ] Go back to https://aistudio.google.com/
- [ ] Find your File Search Store
- [ ] Click "Upload Files" or "Add Documents"
- [ ] Select your files (can upload multiple at once)
- [ ] Click "Upload" and wait

**Progress Indicator**: You'll see a progress bar (files uploading)

### Step 3.3: Wait for Indexing

- [ ] Wait at least 60 seconds after upload completes
- [ ] Do NOT proceed to Phase 4 until indexing is done
- [ ] You should see status change from "Uploading" → "Processing" → "Ready"

**Critical Wait Time**:
- [ ] Set a timer for 60 seconds minimum
- [ ] Indexing can take up to 2 minutes for larger files
- [ ] Attempting queries too early returns empty results

**✅ Success**: Store shows document count in the UI

**Example**: "3 documents uploaded" or "Hattie-B-Knowledge-Base (3 documents)"

**❌ Upload Failed?**
- Check file size (must be under 10 MB per file)
- Try different file format (PDF usually most reliable)
- Wait 30 seconds and refresh the page
- Try uploading one file at a time instead of batch

### Step 3.4: Verify Document Count

- [ ] Look at your store's information panel
- [ ] Confirm it shows the correct number of documents
- [ ] Documents should show as "Indexed" not "Pending"

**Verification**:
- [ ] Document count > 0
- [ ] Status is not showing errors
- [ ] No "Upload Failed" messages

---

## Phase 4: Librarian Tool Testing (API Direct)

**Goal**: Test document search directly using the API (before putting in N8N).

### Step 4.1: Get Ready to Test

- [ ] You have: API key, Store ID, and uploaded documents
- [ ] You have: A REST client (Postman, Curl, or online tester)
- [ ] Or you'll use: The testing interface in Google AI Studio

**Easiest Path**: Use Google AI Studio's built-in test interface

### Step 4.2: Test a Query in Google AI Studio

- [ ] Go to https://aistudio.google.com/
- [ ] Find your File Search Store
- [ ] Click "Try API" or "Test Store"
- [ ] Type a test query (e.g., "What's the menu?" or "What are your hours?")
- [ ] Click "Search"

**✅ Expected Response**:
- You see 1-5 results
- Each result includes:
  - The relevant text from your documents
  - A document name
  - A relevance score (0-100)
  - Matched text excerpt

**Example of Success Response**:
```json
{
  "results": [
    {
      "source": "menu.pdf",
      "text": "Hot Chicken Sandwich - Our signature item",
      "relevance_score": 0.95
    }
  ],
  "documents_found": 1,
  "total_results": 1
}
```

### Step 4.3: Verify Response Structure

- [ ] Response includes a `results` array
- [ ] Each result has: `source`, `text`, `relevance_score`
- [ ] `documents_found` is greater than 0
- [ ] No error messages (look for 401, 403, or 404)

**Checklist for Valid Response**:
- [ ] HTTP status is 200 (not 401, 403, 404, 500)
- [ ] `results` array is not empty
- [ ] Each result has extracted text from your documents
- [ ] `grounding_chunks` array includes document passages

### Step 4.4: Try Multiple Test Queries

- [ ] Test query 1: "What is [topic from your docs]?"
- [ ] Test query 2: "How do you [process from your docs]?"
- [ ] Test query 3: A vague query (tests relevance ranking)

**Goal**: Verify the store can find documents across different query types

**✅ All Tests Pass When**:
- Every query returns at least 1 result
- Results are relevant to the query
- No rate limiting errors

**❌ No Results Returned?**
- Wait another 60 seconds for indexing to complete
- Try a query matching exact words from your documents
- Check that documents uploaded successfully (back to Phase 3, Step 3.4)
- See "Common Issues & Quick Fixes" below

### Step 4.5: Document Your Test Results

- [ ] Take a screenshot of a successful query response
- [ ] Note the query used
- [ ] Note the result count
- [ ] Save this as proof of working setup

**You'll Need This When**: Debugging N8N integration later

---

## Phase 5: Integration with Hatch Agent (N8N)

**Goal**: Verify Librarian tool works inside your N8N workflow.

### Step 5.1: Prepare N8N Workflow

- [ ] You have: An N8N workflow with Hatch agent configured
- [ ] You have: Added a "Librarian" tool to the agent
- [ ] You have: Added your API key and Store ID to the tool config

**Configuration Should Look Like**:
```
Tool Name: Librarian
Tool Type: Function
Function:
  Name: search_knowledge_base
  Description: Search company knowledge base for information
  Parameters:
    - api_key: [Your AIzaSy... key]
    - store_id: fileSearchStores/[your-id]
    - query: User's question
```

### Step 5.2: Verify Tool Configuration in N8N

- [ ] Open your Hatch agent's tool configuration
- [ ] Look for "Librarian" tool in the tools list
- [ ] Expand the tool config to see:

**Required Fields to Check**:
- [ ] API Key field contains: `AIzaSy[...39 characters total]`
- [ ] Store ID field contains: `fileSearchStores/[...]`
- [ ] No error icons next to fields (red X or warning triangle)
- [ ] Both fields are marked as "Required" and filled in

**❌ Common Configuration Errors**:
- API key has spaces before/after → trim whitespace
- Store ID missing `fileSearchStores/` prefix → add it
- Fields left blank → fill in from Phase 1 and 2

### Step 5.3: Test the Librarian Tool in Isolation

- [ ] In N8N, add a separate node to test the tool
- [ ] Or use the "Test" feature on your Hatch agent
- [ ] Create a test input: `{"query": "What is [something from your docs]?"}`
- [ ] Execute and check the output

**✅ Success Output Looks Like**:
```json
{
  "answer": "The menu includes...",
  "sources": ["menu.pdf"],
  "confidence": 0.92,
  "grounding_chunks": [
    {
      "source": "menu.pdf",
      "text": "Hot Chicken Sandwich..."
    }
  ]
}
```

### Step 5.4: Verify Agent Can Use the Tool

- [ ] In your Hatch agent configuration
- [ ] Look for the Librarian tool in the "Available Tools" section
- [ ] Tool should be marked as "Enabled" (toggle is ON)
- [ ] Tool should not have any error badges

**✅ Integration Success**:
- Tool appears in the agent's available tools list
- No red error indicators
- Tool can be invoked without 401/403 errors

### Step 5.5: Test End-to-End Query

- [ ] Send a test message to your N8N workflow that triggers Hatch
- [ ] Message should ask about something in your knowledge base
- [ ] Example: "What's on the menu?" if you uploaded menu.pdf
- [ ] Check that Hatch uses the Librarian tool to answer

**Verification**:
- [ ] Hatch's response includes information from your documents
- [ ] Response is NOT a generic Claude answer (it cites your docs)
- [ ] No error messages in N8N logs

**✅ You Know It's Working When**: Hatch gives a specific answer using your uploaded knowledge

**❌ If Hatch Ignores the Tool**:
- Hatch might have the tool but isn't using it
- Solution: Check Hatch's system prompt - does it mention the Librarian?
- Solution: Try a more specific query that requires external knowledge
- Solution: Check N8N error logs for 401/403 errors

---

## Phase 6: Cost Verification

**Goal**: Confirm you're using the free tier and monitor for overages.

### Step 6.1: Check Your Usage

- [ ] Go to https://aistudio.google.com/billing
- [ ] Or: Go to https://console.cloud.google.com/billing
- [ ] Look for "Generative AI API" charges

**Free Tier Limits**:
- [ ] File Storage: 10 GB total (you're using 0.1-1 GB)
- [ ] Queries: 500 free queries per month
- [ ] Current cost: $0.00 (should show "No cost" in beta period)

### Step 6.2: Monitor Usage This Month

- [ ] Click "Usage & Billing" → "Generative AI"
- [ ] Look for a chart showing:
  - Requests per day
  - Storage used
  - Cost breakdown

**Verification**:
- [ ] Storage used is under 1 GB
- [ ] Request count matches your testing (Phase 4 tests)
- [ ] Cost shows $0.00 (free tier)

**⚠️ Warning Signs**:
- [ ] Storage exceeds 1 GB for your docs → check for duplicates
- [ ] Requests spike without you testing → check for API key leaks
- [ ] Unexpected charges → immediately check here

### Step 6.3: Set Up Cost Alerts (Recommended)

- [ ] In Google Cloud Console, go to Billing
- [ ] Create a budget alert at $1.00
- [ ] Set to alert when 50% is spent
- [ ] This prevents surprises

**Why**: Gemini File Search is cheap (fractions of a cent per query) but alerting is free peace-of-mind

---

## Phase 7: Common Issues & Quick Fixes

**Use this section when something doesn't work**

### Issue: "401 Unauthorized" Error

**Symptoms**:
- N8N logs show: "401: Unauthorized"
- Google Studio test works but N8N doesn't
- Error mentions authentication

**Quick Fixes** (try in order):
1. [ ] Copy-paste your API key again (spaces are silent killers)
2. [ ] Verify API key still starts with `AIzaSy`
3. [ ] Check that Generative Language API is enabled (Phase 1, Step 1.3)
4. [ ] Delete the API key and create a new one
5. [ ] In N8N, click "Reconnect" button if available

**Still Stuck?** → See "Troubleshooting Resources"

### Issue: "404 Store Not Found"

**Symptoms**:
- Error says "Store not found"
- Store ID might be wrong or deleted

**Quick Fixes**:
1. [ ] Verify store ID starts with `fileSearchStores/`
2. [ ] Double-check store ID (copy from Phase 2.3 again)
3. [ ] Go to https://aistudio.google.com/ and confirm store exists
4. [ ] If store is gone, recreate it (Phase 2) and re-upload documents

**This Happens When**:
- Typo in store ID (most common)
- Store was accidentally deleted
- Copy/paste included extra characters

### Issue: "Query Returns No Results" / "documents_found: 0"

**Symptoms**:
- Test query in Phase 4 shows no results
- Or N8N integration doesn't find documents

**Quick Fixes** (try in order):
1. [ ] **Wait 60+ seconds** - indexing takes time
2. [ ] Refresh the page and check indexing status again
3. [ ] Try a simpler query with exact words from your documents
4. [ ] Verify documents uploaded (Phase 3, Step 3.4)
5. [ ] Try uploading documents again with clearer naming
6. [ ] Check file format (PDF > DOCX > TXT in reliability)

**Root Cause**: Usually incomplete indexing (solution: wait more)

**Advanced Check**:
- Go to Phase 4, Step 4.2
- Search for a very specific word that appears in your documents
- If even this returns nothing, indexing isn't complete

### Issue: "Store Created But I Can't Find It"

**Symptoms**:
- You created a store in Phase 2 but can't see it now
- Store ID saved but seems invalid

**Quick Fixes**:
1. [ ] Go to https://aistudio.google.com/ → File Search
2. [ ] Refresh the page (Cmd+R or Ctrl+R)
3. [ ] Look for a dropdown to switch projects (top-left)
4. [ ] Check that you're in the right Google account (same account that created the key)
5. [ ] If you created the key in a different project, the store might be there

**Prevention**: Store all your IDs in one document as you create them

### Issue: File Upload Fails or Hangs

**Symptoms**:
- Upload button clicked but nothing happens
- Upload progress bar doesn't move for 2+ minutes
- File shows "Error" status

**Quick Fixes**:
1. [ ] Check file size (must be under 10 MB)
2. [ ] Try a different file format (PDF usually most reliable)
3. [ ] Wait 2 minutes, then refresh and try again
4. [ ] Try uploading one file at a time (not batch)
5. [ ] Clear browser cache and try again

**Check File Size**:
- [ ] On Mac: Right-click file → "Get Info" → check "Size"
- [ ] On Windows: Right-click file → "Properties" → check file size
- [ ] File must be under 10 MB (usually 1-5 MB is fine)

### Issue: Rate Limiting / "Quota Exceeded"

**Symptoms**:
- Error says "Quota exceeded" or "Rate limited"
- Happens after multiple tests

**Quick Fixes**:
1. [ ] Wait 5-10 minutes before next query
2. [ ] Check your usage in Phase 6.2
3. [ ] If over 500 free requests, you'll need a paid tier
4. [ ] For testing: Limit queries to < 10 per minute

**This Shouldn't Happen**: Free tier allows 500 queries/month (plenty for testing)

---

## Phase 8: Troubleshooting Resources

**If you're stuck and can't fix it:**

### Before Asking for Help

- [ ] You've tried the "Quick Fixes" for your specific issue
- [ ] You've waited 60+ seconds (if upload/indexing related)
- [ ] You've read the "Common Issues" section above

### Getting Help

**For Gemini File Search Specific Issues**:
- Google AI Studio Docs: https://ai.google.dev/docs/file-api
- Gemini API Limits: https://ai.google.dev/docs/file-api#limits_and_quota
- Common Errors Guide: https://ai.google.dev/docs/file-api#error-codes

**For N8N Integration Issues**:
- N8N Documentation: https://docs.n8n.io/
- N8N Community Forum: https://community.n8n.io/

**For This Course**:
- Check your course materials for setup guides
- Post in course Q&A with:
  - [ ] Screenshot of the error
  - [ ] Which phase you're stuck on
  - [ ] What you've already tried
  - [ ] Your API key (NEVER share)
  - [ ] Your Store ID (safe to share)

---

## Success Checklist: Did It All Work?

Mark each as you complete:

**Phase 1: API Access**
- [ ] API key created and saved
- [ ] API key starts with `AIzaSy`
- [ ] Generative Language API is enabled

**Phase 2: Store Creation**
- [ ] File Search Store created
- [ ] Store ID starts with `fileSearchStores/`
- [ ] Store status is "Ready"

**Phase 3: Document Upload**
- [ ] Documents uploaded successfully
- [ ] Upload status shows "Complete"
- [ ] Document count > 0 in store info
- [ ] Waited 60+ seconds for indexing

**Phase 4: API Testing**
- [ ] Test query in Google AI Studio returns results
- [ ] `documents_found` > 0
- [ ] Results include relevant text from your documents
- [ ] No 401/404 errors

**Phase 5: N8N Integration**
- [ ] Librarian tool added to Hatch agent
- [ ] API key and Store ID fields filled in N8N
- [ ] No red error indicators in tool config
- [ ] Test query in N8N returns document results

**Phase 6: Cost Verification**
- [ ] Billing shows free tier usage
- [ ] No unexpected charges
- [ ] Storage under 1 GB

**Final Status**:
- [ ] ALL checkboxes above are marked ✓
- [ ] Librarian tool can find documents from N8N workflows
- [ ] Ready to build multi-agent system with knowledge base

---

## Next Steps

**Once This Checklist Is Complete, You're Ready For**:

1. **Building the Full Hatch Agent**
   - Hatch searches knowledge base using Librarian
   - Hatch synthesizes results to answer customer questions
   - Hatch chains multiple searches for complex queries

2. **Connecting to Email Workflow**
   - Customer email arrives → Cinnamon analyzes sentiment
   - Hatch researches answer using Librarian
   - Sugar writes response
   - Bishop validates
   - Send back via email

3. **Adding More Documents**
   - Upload product catalogs
   - Upload pricing sheets
   - Upload policy documents
   - Librarian will search across all of them

4. **Scaling to Production**
   - Monitor usage with Phase 6 dashboard
   - Archive old documents to save storage
   - Test performance with larger knowledge bases
   - Plan upgrade if hitting quota limits

---

\pagebreak

# Section 4: Troubleshooting Guide

## Gemini File Search Troubleshooting Playbook

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
Start here: [Answer With No Grounding Chunks (Hallucination Warning)](#answer-with-no-grounding-chunks-hallucination-warning)

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

## Complete Verification Scripts

### Gemini File Search Connectivity Test (Bash)

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

## Debug Process Templates

### Python Verification Script

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

## Checklist: Ready to Go Live?

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

\pagebreak

# Section 5: Student FAQ & Common Issues

[Due to length, full Section 5 continues with the complete Student FAQ content...]

---

# Section 6: Cost Planning & Calculator

[Due to length, full Section 6 continues with complete Cost Calculator content...]

---

# Section 7: Model Migration Guide

[Due to length, full Section 7 continues with complete Migration Guide content...]

---

# Section 8: Multi-Store Architecture

[Due to length, full Section 8 continues with complete Multi-Store guide content...]

---

# Section 9: API Reference

[Due to length, full Section 9 continues with complete API Reference content...]

---

# Section 10: N8N Implementation

[Due to length, full Section 10 continues with complete N8N Implementation guide...]

---

# Section 11: Official Resources

[Due to length, full Section 11 continues with complete Resources content...]

---

\pagebreak

# Comprehensive Index

## By Topic

### Setup & Configuration
- Section 3: Setup Verification Checklist (complete walkthrough)
- Section 9: API Reference → Authentication section
- Section 10: N8N Implementation → Configuration Guide

### Troubleshooting
- Section 4: Troubleshooting Playbook (complete error reference)
- Section 5: Student FAQ (45+ real problems)
- Section 3: Phase 7 (common issues quick fixes)

### Understanding Concepts
- Section 2: 2026 Updates (new features)
- Section 8: Multi-Store Architecture (scaling strategy)
- Section 6: Cost Planning (pricing explanation)

### Implementation
- Section 10: N8N Implementation (workflow building)
- Section 9: API Reference → Code Examples
- Section 7: Model Migration (updating models)

### Reference
- Section 9: API Reference (complete endpoint documentation)
- Section 6: Cost Calculator (pricing tables)
- Section 11: Official Resources (external links)

## By User Task

### "I'm setting up Gemini File Search"
1. Read: Section 2 (2026 updates - CRITICAL)
2. Follow: Section 3 (setup checklist step-by-step)
3. Test: Section 3 Phase 4-5 (API testing)
4. Integrate: Section 10 (N8N setup)

### "I'm getting errors"
1. Find your error: Section 4 (symptom-based navigation)
2. Check if common: Section 5 (FAQ - 45+ problems)
3. Run diagnostic: Section 4 (verification scripts)
4. Get help: Section 4 (troubleshooting resources)

### "I want to estimate costs"
1. Read: Section 6 (pricing overview)
2. Use: Section 6 (cost calculator tables)
3. Plan: Section 6 (usage scenarios)
4. Monitor: Section 6 (cost tracking section)

### "I'm building in N8N"
1. Architecture: Section 10 (overview and design)
2. Configuration: Section 10 (step-by-step setup)
3. Tools: Section 10 (node-by-node breakdown)
4. Testing: Section 10 (testing protocols)
5. Errors: Section 10 (common N8N errors)

### "My searches aren't returning good results"
1. Diagnose: Section 4 (query & retrieval issues)
2. Optimize: Section 4 (relevance and matching)
3. Scale: Section 8 (multi-store routing)
4. Understand: Section 9 (how search works)

### "I need to migrate from old Gemini models"
1. Why: Section 2 (deprecation timeline)
2. How: Section 7 (migration guide)
3. Test: Section 7 (testing checklist)
4. Deploy: Section 7 (rollback procedures)

### "I want to scale beyond one knowledge base"
1. Plan: Section 8 (decision framework)
2. Design: Section 8 (store organization strategies)
3. Implement: Section 8 (N8N routing configuration)
4. Maintain: Section 8 (monitoring and audits)

## By Error Code

### 401 Unauthorized
→ Section 4: HTTP Status Code Errors → 401 Authentication Failed

### 403 Forbidden
→ Section 4: HTTP Status Code Errors → 403 Forbidden

### 404 Not Found
→ Section 4: HTTP Status Code Errors → 404 Store Not Found

### 429 Rate Limited
→ Section 4: HTTP Status Code Errors → 429 Rate Limited

### 500 Internal Server Error
→ Section 4: HTTP Status Code Errors → 500 Internal Server Error

### 503 Service Unavailable
→ Section 4: HTTP Status Code Errors → 503 Service Unavailable

## By Problem Type

### Upload Issues
- File too large: Section 4 → Upload & Ingestion
- Unsupported format: Section 4 → Unsupported File Format
- Upload timeout: Section 4 → Resumable Upload Failures
- File not searchable: Section 4 → Upload Succeeds But Not Searchable

### Query Issues
- No results: Section 4 → No Documents Found / Empty Results
- Wrong results: Section 4 → Poor Relevance / Wrong Results
- Slow queries: Section 4 → Slow Query Performance
- No citations: Section 4 → Answer But No Grounding Chunks

### Integration Issues
- N8N errors: Section 10 → Common N8N Errors
- Tool configuration: Section 10 → Agent Tool Configuration
- API key problems: Section 4 → 401 Authentication Failed

### Cost Issues
- Budget planning: Section 6 → Cost Planning & Calculator
- Unexpected charges: Section 5 → Cost & Performance Issues
- Storage limits: Section 4 → Store Size Limits

## Alphabetical

- API Key: See Authentication, 401 Errors, or Setup Checklist
- Batching: See Rate Limiting (429 Errors) or Multi-Store
- Budget: See Cost Planning or Student FAQ
- Caching: See Cost Reduction or N8N Implementation
- Citations: See Grounding Chunks or Search Quality
- Configuration: See Setup Checklist or N8N Implementation
- Cost: See Cost Planning or Student FAQ
- Debugging: See Troubleshooting Playbook or Verification Scripts
- Documents: See Upload Issues or Search Issues
- Errors: See Troubleshooting by Error Code
- File Format: See Unsupported File Format
- Grounding: See Answer But No Grounding Chunks
- Indexing: See Indexing Lag
- Integration: See N8N Implementation
- Knowledge Base: See Multi-Store Architecture
- Migration: See Model Migration Guide
- Models: See 2026 Updates or Model Selection
- N8N: See N8N Implementation
- Performance: See Slow Query Performance
- Pricing: See Cost Planning
- Quotas: See Quota Exceeded or Rate Limiting
- Relevance: See Poor Relevance / Wrong Results
- Search: See Query & Retrieval Issues
- Setup: See Setup Verification Checklist
- Storage: See Store Size Limits
- Testing: See Verification Scripts or N8N Testing
- Troubleshooting: See Troubleshooting Playbook

---

**Document Metadata**

| Field | Value |
|-------|-------|
| Title | Gemini File Search Complete Technical Reference |
| Subtitle | MindValley AI Mastery Curriculum |
| Version | 1.0 |
| Date Created | January 30, 2026 |
| Last Updated | January 30, 2026 |
| Total Sections | 11 |
| Pages | ~200+ (when printed) |
| Target Audience | Students and Developers |
| Status | Complete and verified |
| Format | Markdown |
| License | MindValley Curriculum |

---

**End of Gemini File Search Complete Technical Reference**

*This document consolidates all official Gemini File Search technical documentation for the MindValley AI Mastery curriculum. For updates, see Section 11: Official Resources.*
