# Gemini File Search Setup Verification Checklist

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

## Quick Reference

**Copy These When You Have Them**:

```
API Key: AIzaSy_______________________________
Store ID: fileSearchStores/___________________
Store Name: _________________________________
Documents Uploaded: _____ files
Test Query Results: _____ documents found
```

**Save in a secure location** (password manager, encrypted note, etc.)

---

## Document Version

- Created: January 30, 2026
- For: MindValley AI Mastery Program
- Target Audience: Non-technical students, first-time setup
- Last Updated: January 30, 2026
