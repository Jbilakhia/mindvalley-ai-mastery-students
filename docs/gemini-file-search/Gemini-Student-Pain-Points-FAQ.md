# Gemini File Search - Student FAQ

Real answers to real problems students encountered while setting up and using Gemini File Search knowledge bases.

---

## How to Use This FAQ

**Search by your situation:**
- [Setup & Configuration](#setup--configuration-issues) - API keys, account creation
- [Upload & Indexing](#upload--indexing-issues) - Files disappearing, upload failures
- [Query & Retrieval](#query--retrieval-issues) - Searching your knowledge base
- [Integration](#integration-issues) - Connecting to your workflows
- [Costs](#cost--performance-issues) - Unexpected charges, budget control
- [Error Messages](#gemini-specific-errors) - Exact fixes for exact errors

**Each answer includes:**
- What actually happens (not the error, the reason)
- Step-by-step fix
- How to prevent it next time

**Still stuck?** Jump to [Escalation Criteria](#when-to-ask-for-help) to know when to ask for help.

---

## Setup & Configuration Issues

### Q: My API key works in Google AI Studio but fails in N8N. Why?

🟡 **Important** - Affects workflow execution

**What's happening:** The API key itself is fine, but N8N isn't using it correctly.

**Step-by-step fix:**

1. Copy your API key exactly (no extra spaces)
2. In N8N, find the node that needs Gemini credentials
3. Look for "Create New Credential" button
4. Select "Google Gemini" credential type
5. Paste your API key
6. Click "Authenticate" (not just paste)
7. Wait for the green checkmark

**Why this happens:** Pasting the key into the text field ≠ authenticating. N8N needs to validate it with a test call.

**Prevention:** After pasting an API key, always look for a "Test" or "Authenticate" button. Don't just move forward.

---

### Q: The credentials show "Connected" in N8N but workflows still fail with 401 errors.

🔴 **Critical** - Prevents all API calls

**What's happening:** The credential might have authenticated once, but the token expired or the API key was regenerated on Google's side.

**Step-by-step fix:**

1. Go to your workflow that's failing
2. Find the node with the Gemini credential
3. Click the credential name at the top of the node
4. Click "Delete" to remove it
5. Create a new credential:
   - Click the node
   - Click "Create New Credential"
   - Paste your API key fresh
   - Wait for green checkmark
6. Run the workflow again

**Why this matters:** Sometimes N8N caches old tokens. Deleting and recreating forces a fresh connection.

**Prevention:** If you haven't used a workflow in 2+ weeks, refresh credentials before running it.

---

### Q: "Invalid API key" error even though the key is correct.

🟡 **Important** - Blocks initial setup

**Causes:**
1. **Extra spaces** - Most common. Copy-paste added spaces before/after the key
2. **Partial copy** - You only copied part of the key
3. **Regenerated key** - You created a new key on Google but N8N still has the old one

**Step-by-step fix:**

1. Go to https://aistudio.google.com/apikey
2. Create a completely NEW API key (don't reuse old one)
3. Select the key and copy it:
   - Recommended: Use keyboard (Cmd+C / Ctrl+C) instead of mouse
   - Paste into a text editor first to verify no spaces
4. In N8N, delete the old credential (see above)
5. Create new credential with the fresh key

**How to verify no extra spaces:**

Open a text editor and paste the key:
- Should look like: `AIzaSyD...Xk9w` (no gaps, continuous)
- Not like: `AIzaSyD...Xk9w ` (space at end)

---

### Q: My Gemini API key is disabled. Now what?

🟡 **Important** - Requires Google Cloud setup

**What happened:** You have a free key from Google AI Studio, but it has restrictions.

**About Gemini API keys:**

| Type | Where | Limit | Cost |
|------|-------|-------|------|
| **AI Studio Key** | aistudio.google.com | 50 req/min | Free (limited) |
| **Cloud Key** | Google Cloud | 100+ req/min | Pay-per-use |

**If your AI Studio key is disabled:**

1. Check quota: https://aistudio.google.com/apikey → Click your key → See "Quota"
2. Wait 60 seconds, then try again
3. If still disabled, create a new AI Studio key:
   - Go to https://aistudio.google.com/apikey
   - Delete the old one
   - Create a new one
   - Copy it immediately (you can't see it again)

**For heavy use (daily workflows):**
You'll eventually hit the free tier limit. Consider:
- Setting up Google Cloud with a credit card (free tier credits available)
- Or accepting the daily API limit (50 requests/day)

---

## Upload & Indexing Issues

### Q: I uploaded my PDF 5 minutes ago but Gemini says "no documents found". What's wrong?

🟢 **Minor** - Expected behavior

**What's happening:** Gemini takes ~60 seconds to index documents after upload. This is normal.

**Solution:** Wait 60 seconds and try again.

**What "indexing" means:** Gemini is breaking your PDF into chunks, creating embeddings (mathematical fingerprints), and storing them in a searchable format. This takes about 60 seconds per document.

**To verify it's really uploaded:**

Use the "List Documents" N8N workflow:
1. Open `gemini-list-documents-v2.json` in N8N
2. Enter your store ID
3. Run it
4. Check the output: Does your PDF appear in the list?

If it appears in the list but still "no documents found" when querying → It's still indexing. Wait another 30 seconds.

---

### Q: File uploaded but when I query it, I get "no documents found" (60 seconds later).

🟡 **Important** - Files aren't searchable

**What's happening:** The file uploaded, but for some reason Gemini can't index it. Usually format or size issue.

**Step-by-step fix:**

1. **Check file format.** Supported: PDF, TXT, MD (Markdown), JSON, HTML
   - Word docs (.docx): Not supported - convert to PDF first
   - Images (.jpg, .png): Not supported - extract text or convert to PDF

2. **Check file size.** Limits:
   - Single file: Max 20 MB
   - Per store: 100 MB storage (free tier)
   - Total documents: No limit if under 100 MB

3. **Re-upload with a test file:**
   - Create a simple `test.txt` file with text: "This is a test"
   - Upload it using the N8N workflow
   - Try querying it
   - If test works, the original file is the problem

4. **Try a different file format:**
   - Convert PDF to TXT (copy-paste the text)
   - Or convert PDF to MD (markdown)
   - Re-upload and query

**Why this happens:** Some PDFs have weird formatting that confuses Gemini's parser. Text-based formats (TXT, MD) are more reliable.

**Prevention:** When uploading important documents, test with a small sample first (first 5 pages).

---

### Q: Upload times out even though my file is small.

🔴 **Critical** - Prevents knowledge base setup

**What's happening:** Network issue, file encoding problem, or Gemini service hiccup.

**Step-by-step fix:**

1. **Try a smaller file first:**
   - If uploading a 20 MB PDF, try a 1 MB excerpt
   - If that works, the issue was file size or format
   - If that fails too, continue below

2. **Check your internet connection:**
   - Run a speed test: speedtest.net
   - Minimum needed: 5 Mbps upload
   - If slower, wait until you have better connection

3. **Try uploading via different method:**
   - If using N8N: Try uploading via KB Manager UI instead (or vice versa)
   - If both fail: Wait 10 minutes and try again (might be Gemini service)

4. **Check file encoding:**
   - If it's a text file, save it as UTF-8 (not ASCII or other encoding)
   - In Mac/Linux: `file your-file.txt` will show encoding
   - In VS Code: Bottom right shows encoding; click to change to UTF-8

**When to try again:** If you see "timeout" or "connection refused," wait 5 minutes and retry. Might be temporary service issue.

---

### Q: "Your store is full" or "quota exceeded" error.

🟡 **Important** - Storage limit reached

**What's happening:** You've hit the 100 MB free tier storage limit for Gemini File Search.

**How much space do you have?**
- Free tier: 100 MB per store
- Paid (Google Cloud): Essentially unlimited

**To check current usage:**
Use the "List Documents" workflow and look at the output. It shows total storage used.

**Your options:**

1. **Delete old documents** you don't need:
   - Use "Delete Document" N8N workflow
   - Remove large files and re-upload smaller versions

2. **Create a new store** for new documents:
   - Use "Create Store" N8N workflow
   - Point your workflow to the new store ID
   - Note: You now have TWO knowledge bases

3. **Upgrade to Google Cloud** (if using heavily):
   - Go to https://console.cloud.google.com
   - Enable Vertex AI API
   - Use your Cloud API key instead
   - Pay-per-use (very cheap for small usage)

**Which documents to delete?** Usually old/test documents. Keep only documents you query regularly.

---

## Query & Retrieval Issues

### Q: I get perfect search results from my knowledge base, but the agent says "no citations" or "no grounding chunks". Is it hallucinating?

🟡 **Important** - Agent might be making up answers

**What's happening:** Your query worked fine and found documents, but the agent isn't linking them in the response. Two possibilities:

**Possibility 1: The agent isn't using the knowledge base at all**

Check your workflow:
1. Find the agent node (Sugar, Hatch, Cinnamon, etc.)
2. Look at its "System Message" field
3. Does it say anything about consulting the knowledge base?
4. If not, the agent doesn't know it should use the KB

**Fix:** Add to the System Message:
```
When answering questions, always:
1. Query the knowledge base for relevant documents
2. Base your answer on those documents
3. Include citations like: [Source: document-name.pdf]
```

**Possibility 2: The knowledge base query is running, but returning empty**

Check:
1. Is the store ID correct? (Should start with `fileSearchStores/`)
2. Is the query being performed BEFORE the agent answers?
3. Are there documents actually in the store? (Use List Documents workflow)

**How to verify the knowledge base is connected:**

In N8N, before the agent node, add a "List Documents" node:
1. Import `gemini-list-documents-v2.json`
2. Add it right before your agent node
3. Run the workflow
4. Check the output: Does it show your documents?

If it shows documents, the KB is connected. Then the agent should cite them.

**Why this happens:** Agents can answer questions without consulting the KB (dangerous!). You have to explicitly tell them to use it.

---

### Q: My search results are terrible / not relevant.

🟡 **Important** - Knowledge base not helping

**What's happening:** Gemini's semantic search isn't finding the right documents.

**Why this happens:**
- Documents don't contain the words you're searching for
- You're asking a different question than what's in the docs
- Documents are poorly formatted (lots of images, no text)
- Unrelated documents are confusing the search

**Step-by-step fix:**

1. **Test the exact words:**
   - If your document has "customer" but you search for "client," it won't match
   - Search for exact phrases from your document
   - If that works, you need better documents

2. **Check what's actually in the store:**
   - Use "List Documents" workflow
   - See what files you have
   - Do they actually contain information you're searching for?

3. **Query differently:**
   - Instead of: "What should I do?"
   - Try: "According to the policy document, what should I do?"
   - This helps Gemini know which context to use

4. **Add more documents:**
   - One FAQ file might not be enough
   - Add: Policies, procedures, FAQs, brand guidelines, case studies
   - More documents = more context = better answers

5. **Test with a simple query:**
   - Write a test document: "The color is blue. The product is a widget."
   - Query: "What color is the product?"
   - Should return exact match
   - If that works, your real documents might just need better formatting

**Better document structure:**

Create documents with headers:
```markdown
# Policy: Returns

## Question: How long do I have to return?
Answer: 30 days from purchase.

## Question: What's the process?
Answer: Step 1... Step 2... Step 3...
```

This works better than prose paragraphs.

---

### Q: I get different results searching the same document twice.

🟢 **Minor** - Semantic search variation

**What's happening:** Semantic search (finding meaning, not keywords) is probabilistic. Different queries find slightly different chunks, even from the same query.

**This is expected behavior.** Each query generates embeddings (mathematical representation of meaning), and very similar meanings might have slightly different nearest neighbors.

**If results are consistently different:**
- Wait 60 seconds between queries (cache clearing)
- Or it might actually be finding different relevant sections each time (which is correct!)

**To get consistent results:**
- Add more specific terms to your query
- Reference document names in your query
- Use "List Documents" to find the exact filename, then mention it

---

### Q: The agent keeps answering without checking the knowledge base.

🔴 **Critical** - Agent isn't using your KB

**What's happening:** Agent has information in its training, so it answers from memory instead of checking your docs.

**Example:** You ask "What's the weather?" The agent answers from its training data, not your KB (because there's no weather data in your KB).

**This is technically correct but not useful.** You want the agent to cite your documents.

**Step-by-step fix:**

1. **Make the knowledge base mandatory:**
   - In the agent's System Message, add:
   ```
   IMPORTANT: You MUST query the knowledge base before answering ANY question.
   If the knowledge base doesn't have information, say "I don't have that information in my knowledge base."
   Never answer from your training data - always cite the knowledge base.
   ```

2. **Structure the workflow so KB comes first:**
   - Query the knowledge base (use Gemini File Search API)
   - Pass results to the agent
   - Agent sees the context and cites it

3. **Test with questions ONLY in your KB:**
   - Don't ask general knowledge questions
   - Ask specific questions about YOUR documents
   - Agent will have no choice but to cite the KB

**Why this matters:** If your agent can fall back on training data, it might hallucinate answers for questions that should return "not found."

---

## Integration Issues

### Q: My "Librarian" agent is supposed to query the knowledge base, but it's not being called.

🔴 **Critical** - Knowledge base not accessible from workflows

**What's happening:** The agent node is there, but the workflow isn't actually calling it, or it's being skipped.

**Step-by-step fix:**

1. **Check the workflow flow:**
   - In N8N, look at the arrows connecting nodes
   - Find the Librarian/KB agent node
   - Is there an arrow pointing TO it? (Arrow coming IN from previous node)
   - Is there an arrow pointing FROM it? (Arrow going OUT to next node)
   - If no arrows, it's not in the workflow - dead node

2. **Verify the logic:**
   - Look at the node that should call Librarian (usually a decision or function node)
   - Does it have a path that leads to Librarian?
   - Or does it skip straight to the next agent?

3. **Check the node type:**
   - Make sure it's actually a Gemini/Claude agent node, not a webhook
   - Agent nodes have "System Message" field
   - Webhook nodes have "URL" field

4. **Test it directly:**
   - Disable all other nodes
   - Keep only: Input → Librarian → Output
   - Run the workflow with a test query
   - Does Librarian respond?
   - If yes, it works - the issue was workflow flow
   - If no, check #2 above

5. **Verify credentials:**
   - Click on the Librarian node
   - Check: Is there a green checkmark next to the API key credential?
   - If not, create a new credential (see Setup issues section)

**Common mistake:** The node exists but isn't connected in the workflow. You can have invisible dead nodes in N8N.

---

### Q: Hatch (or other agent) fails with "executeWorkflow" error.

🟡 **Important** - Workflow execution blocked

**What's happening:** One workflow is trying to call another workflow, but something's wrong with the reference.

**Step-by-step fix:**

1. **Find the executeWorkflow node:**
   - Look for a node labeled "Execute Workflow" or similar
   - This node calls another N8N workflow

2. **Check the Workflow ID:**
   - Click on the executeWorkflow node
   - Look for "Workflow ID" field
   - Is there a value there, or is it empty?
   - If empty, that's the problem

3. **Find your workflow ID:**
   - Go to N8N
   - Click on the workflow you want to call (e.g., "Echo Processor")
   - Look at the URL: `https://[your-name].app.n8n.cloud/workflow/[BIG-NUMBER]`
   - That BIG-NUMBER is the workflow ID

4. **Update the executeWorkflow node:**
   - Paste the workflow ID into the field
   - Save
   - Run the workflow again

**Why this happens:** When you import a workflow, the references to other workflows are blank. You have to manually fill them in.

**Prevention:** After importing any workflow that calls another:
1. Look for executeWorkflow nodes
2. Fill in the Workflow ID
3. Test it before using in production

---

### Q: "Loop Prevention" triggered - workflow stopped.

🟡 **Important** - Infinite loop prevented

**What's happening:** Your workflow is calling itself, creating an infinite loop. N8N shut it down to prevent resource waste.

**Step-by-step fix:**

1. **Find the executeWorkflow node:**
   - Look for a node that executes a workflow
   - Check its Workflow ID

2. **Is it calling ITSELF?**
   - Current workflow name: e.g., "Email Responder"
   - executeWorkflow calling: "Email Responder"
   - If same, that's the loop

3. **Should it call a different workflow?**
   - If yes: Update the Workflow ID to the correct one (see previous Q&A)
   - If no: Delete the executeWorkflow node entirely

4. **Is it supposed to call itself?**
   - Some workflows DO have intentional loops (for processing multiple items)
   - This is OK if it terminates (has a limit like "process 5 items then stop")
   - Check if there's a loop counter and condition
   - If you see "loop 5 times" logic, that's intentional
   - If it's just calling itself with no limit, delete the loop

**Prevention:** Look at every executeWorkflow node and verify:
- [ ] It's calling a DIFFERENT workflow (not itself)
- [ ] OR it's calling itself with a clear termination condition (loop counter)

---

### Q: Hatch tool configuration - "API key missing" error.

🟡 **Important** - Workflow can't authenticate

**What's happening:** The node has a field that should contain an API key, but it's empty.

**Step-by-step fix:**

1. **Find the failing node:**
   - Look at the error message - it tells you which node failed
   - Click on that node

2. **Look for API key field:**
   - Scan the node's fields
   - You'll see fields like "API Key", "Credential", or "Authentication"
   - One of them is empty

3. **Create or select a credential:**
   - Click "Create New Credential" or "Select Credential"
   - Choose the appropriate type (OpenAI, Gemini, Claude, etc.)
   - Paste your API key
   - Wait for green checkmark (authentication)

4. **Save the workflow:**
   - Click "Save" at the bottom
   - Run it again

**Which API key goes where?**
- **Claude nodes** → Claude API key (api.anthropic.com)
- **Gemini nodes** → Gemini API key (aistudio.google.com)
- **OpenAI/OpenRouter nodes** → OpenRouter API key (openrouter.ai)

**If you don't have a key:**
1. Go to the service website
2. Create an API key
3. Copy it immediately (can't see it again)
4. Paste into N8N credential
5. Test to confirm it works

---

## Cost & Performance Issues

### Q: I spent $50 in testing OpenRouter and I don't know why.

🔴 **Critical** - Budget not controlled

**What happened:** Running workflows repeatedly for debugging burns through credits fast. Each workflow run makes multiple LLM calls.

**Cost breakdown for typical Echo run:**
- Echo Processor analyzes 1 document
- Makes ~14 API calls to Claude
- At Sonnet pricing: ~$0.50-1.00 per run
- Run it 50 times while debugging: $25-50

**Step-by-step to prevent future overspending:**

1. **Set a spending limit on OpenRouter:**
   - Go to openrouter.ai
   - Log in
   - Settings → Limits
   - Set Daily Limit: $5/day
   - This prevents runaway spending

2. **Use cheaper models for testing:**
   - Haiku costs ~10x less than Sonnet
   - Flash costs even less
   - Use these while debugging
   - Switch to Sonnet only when you know it works

3. **Verify workflow configuration BEFORE running:**
   - Click each node and read the settings
   - Don't just keep running until it works
   - Execution logs (N8N Executions tab) show exactly where it failed
   - Fix the issue, then run again

4. **Set up alerts:**
   - OpenRouter can email you when you hit spending milestones
   - Helps catch runaway usage

**For the $50 already spent:**
- It's spent - can't recover it
- But setting limits now prevents it happening again
- Consider it tuition for learning the lesson

---

### Q: My API quota was exceeded / I hit a rate limit.

🟡 **Important** - Service throttled

**What's happening:** You've made too many API calls in a short time.

**Quotas by service:**

| Service | Free Tier | Limit | What to Do |
|---------|-----------|-------|-----------|
| **Gemini** | 50 req/min | 50 per minute | Wait 60 sec, retry |
| **Claude (API)** | $5/month free | Depends on pricing | Already covered |
| **OpenRouter** | Set your own | Your daily limit | Check your limit |

**Step-by-step fix:**

1. **Wait 60 seconds** before retrying
2. **Check which service is rate-limited:**
   - Look at error message: Does it say "Gemini"? "Claude"? "OpenRouter"?
3. **If Gemini:** You're OK - wait and retry
4. **If Claude:** You might need upgrade (paid tier)
5. **If OpenRouter:** Check your daily spend:
   - openrouter.ai → Usage
   - If you've hit your daily limit, wait for tomorrow or increase limit

**Prevention:**
- Spread API calls across time (don't run 100 workflows simultaneously)
- Use smaller models for testing
- Set daily/monthly budgets

---

### Q: My workflow runs slower than the demo - API responses taking 30+ seconds.

🟡 **Important** - Performance issue

**What's happening:** API response time is slow. Could be Gemini, Claude, or internet connection.

**Step-by-step diagnosis:**

1. **Check N8N Execution Time:**
   - Run the workflow
   - Go to Executions tab
   - Click on a completed run
   - Look at "Duration" at bottom
   - Which nodes took the longest?

2. **If a specific node is slow:**
   - That's the service (Gemini, Claude, etc.)
   - Nothing you can do to speed it up (they're processing your request)
   - But you can monitor it and retry if timeout

3. **If everything is slow:**
   - Could be your internet connection
   - Run speedtest.net to check
   - If upload speed is <5 Mbps, that's the issue
   - Or could be N8N Cloud (sometimes their servers are slow)

4. **If it's just one specific workflow:**
   - That workflow might be doing more than others
   - Look at the node configuration
   - More complex prompts = longer LLM response time
   - Shorter system messages = faster response

**Typical speeds:**
- Gemini File Search query: 2-5 seconds
- Claude API response: 5-15 seconds
- Total workflow: 15-30 seconds

If you're seeing 60+ seconds, something's timing out.

---

### Q: I'm hitting the Gemini 100 MB storage limit - what's my cheapest option?

🟡 **Important** - Storage limit

**Your options, ranked by cost:**

| Option | Cost | Complexity |
|--------|------|-----------|
| **Delete old docs, keep uploading** | Free | Delete what you don't use |
| **Create multiple stores** | Free | Manage 2+ stores manually |
| **Upgrade to Google Cloud** | Pay-as-you-go (~$0.50 per store) | Requires credit card |
| **Switch to Pinecone** | $12/month | Complete migration |

**Recommended:** Google Cloud (cheapest paid option)

To upgrade:
1. Go to https://console.cloud.google.com
2. Enable "Vertex AI" API
3. Create API key (same way as AI Studio)
4. Use that key in N8N - you now have unlimited storage
5. Cost: Usually <$1/month for small usage

---

## Gemini-Specific Errors

### Q: Getting "404 - Corpora not found" or "404 Store Not Found" error.

🔴 **Critical** - Store ID format wrong or store doesn't exist

**What happened:** Google deprecated the old "corpora" API endpoint. Everything now uses "fileSearchStores".

**New format:** `fileSearchStores/[unique-id]` (not `corpora/[id]`)

**Step-by-step fix:**

1. **Check your store ID format:**
   - If it starts with `corpora/` → Wrong format
   - If it starts with `fileSearchStores/` → Correct format
   - If it's just numbers/letters → Wrong format

2. **Find your correct store ID:**
   - Use "List Stores" N8N workflow
   - Look at the output
   - Find your store
   - Copy the `name` field exactly (includes `fileSearchStores/`)

3. **Update your workflow:**
   - Find where you're using the store ID
   - Paste the correct `fileSearchStores/xxx` format
   - Run again

4. **If store doesn't appear in List Stores:**
   - The store was never created
   - Use "Create Store" N8N workflow
   - Follow the steps
   - Get the new store ID
   - Use that going forward

**Why this happened:**
Google moved from the old "Corpora" API (used in AI Studio) to new "File Search Stores" API (used everywhere now).

**If you're following old tutorials:**
- Ignore references to "corpora/"
- Always use "fileSearchStores/" format
- Ignore Google AI Studio UI (it's outdated for this)
- Use N8N workflows instead

---

### Q: Getting "permission denied" or "403 Forbidden" error.

🟡 **Important** - API key doesn't have right permissions

**What's happening:** Your Gemini API key doesn't have access to the File Search API.

**Step-by-step fix:**

1. **If using free Google AI Studio key:**
   - These keys have limited access
   - They work for basic API calls
   - But might not work for File Search on older keys

2. **Generate a fresh key:**
   - Go to https://aistudio.google.com/apikey
   - Delete your old key
   - Create a new key
   - Copy it and paste into N8N

3. **If still getting 403:**
   - Switch to Google Cloud key instead
   - Go to https://console.cloud.google.com
   - Make sure Vertex AI API is enabled
   - Create API key from Cloud
   - Cloud keys have full permissions

**Why this happens:**
Free AI Studio keys sometimes have permission restrictions. Cloud keys always work.

---

### Q: "Model not found" or "Invalid model name" error.

🟡 **Important** - Wrong model specified

**What's happening:** The workflow is trying to use a Gemini model that doesn't exist or isn't available in your region.

**Valid Gemini models** (as of Jan 2026):
- `gemini-2.0-flash` - Latest, fastest, recommended
- `gemini-1.5-pro` - Previous version, still available
- `gemini-1.5-flash` - Older version

**Step-by-step fix:**

1. **Find the node with the model setting:**
   - Look for a field named "Model", "Model Name", or "LLM"
   - It probably shows an outdated model like `gemini-pro` or `gemini-1.0`

2. **Update to a current model:**
   - Change it to `gemini-2.0-flash`
   - Save
   - Run again

3. **If still failing:**
   - Make sure you have a valid Gemini API key (see 403 error above)
   - Old API keys might not have access to new models

---

### Q: Rate limiting - "Too many requests" error.

🟡 **Important** - Quota exceeded temporarily

**What's happening:** You've made too many calls in a short window. Gemini throttled you.

**Gemini free tier limits:**
- 50 requests per minute
- 1.5 million tokens per day

**Step-by-step fix:**

1. **Wait 60 seconds**
2. **Run again**
3. Retry should work

**To prevent hitting limit:**
- Don't run 10 workflows simultaneously
- If you have batch processing, space them out (2-3 seconds between runs)
- Use smaller models (Flash vs Pro) to reduce token usage

---

### Q: "Quota exceeded" - Hitting free tier limits.

🟡 **Important** - Need to upgrade

**What's happening:** You've hit your daily token limit.

**Gemini free tier:**
- 50 requests/minute
- 1.5M tokens/day
- Resets at 00:00 UTC

**Step-by-step fix:**

1. **Wait for tomorrow (quota resets)**
2. **If you need to work today:**
   - Set up Google Cloud with credit card
   - Quota becomes much higher (~1B tokens/day)
   - Cost: Usually $0.50-2 per day for moderate use

3. **To upgrade:**
   - Go to https://console.cloud.google.com
   - Enable "Generative AI API" and "Vertex AI API"
   - Add a payment method
   - Create API key
   - Use that key going forward

---

## Cross-Platform Issues

### Q: Knowledge base works on my Mac but not on my Windows laptop - didn't sync.

🟡 **Important** - Files not synchronized

**What happened:** You created a Gemini File Search store on your Mac, but it's associated with your Google account, not your local computer. Windows should have access too - but something's wrong.

**These are NOT automatically synced:**
- Local N8N workflows (stored in your N8N Cloud account - should be same)
- Local API keys (stored in each machine)
- Gemini stores (stored in your Google account - should be same)

**Step-by-step diagnosis:**

1. **Verify the store exists on both machines:**
   - On Windows, open N8N
   - Use "List Stores" workflow
   - Does your store appear?
   - If yes, the store is accessible from both machines

2. **Check your API keys:**
   - On Mac: What Gemini API key are you using?
   - On Windows: Are you using the SAME key?
   - If different keys: You need to use the SAME key on both

3. **Check N8N workflow sync:**
   - N8N Cloud syncs your workflows automatically
   - But credentials (API keys) don't sync automatically
   - On Windows, you need to re-enter your Gemini API key into N8N
   - Same for other credentials (Claude, OpenRouter, etc.)

**Step-by-step to make it work:**

1. On Windows, go to N8N
2. Find a workflow that queries your knowledge base
3. Look for the Gemini credential
4. If it shows red X (invalid), delete it
5. Create new credential:
   - Click "Create New Credential"
   - Paste your Gemini API key
   - Wait for green checkmark
6. Run the workflow

**Why this happens:**
- N8N stores WORKFLOWS in the cloud (sync across devices)
- N8N stores CREDENTIALS locally (don't sync, for security)
- Gemini stores are in Google Cloud (accessible from anywhere)
- So workflows sync, but you need to re-authenticate credentials

---

### Q: I have Gemini API key from Google AI Studio - works on Mac. Is there a "sync" option for Windows?

🟢 **Minor** - Just needs reconfiguration

**Short answer:** No automatic sync. But it's 2 minutes to fix:

1. Use the SAME Gemini API key on Windows
   - Go to https://aistudio.google.com/apikey
   - Copy your key
   - On Windows N8N, create new credential with same key
   - Done

2. Workflows automatically sync (N8N Cloud)
   - They should appear on Windows automatically
   - If not, refresh N8N page

3. Other credentials DON'T sync (for security):
   - Claude API key: Enter on Windows too
   - OpenRouter key: Enter on Windows too
   - Gmail OAuth: Re-authenticate on Windows

**This is a feature, not a bug.** Credentials don't sync so one leaked key doesn't compromise both machines.

---

### Q: Running N8N on Mac (Cloud) vs Windows - any differences?

🟢 **Minor** - No meaningful differences

**Short answer:** No. N8N Cloud is the same on both platforms.

**What IS different:**
- **Local tools** (like KB Manager): If it's HTML/JS, works on both
- **Shell scripts** (like setup.sh): Different on Mac vs Windows
- **API keys**: Enter them separately on each machine

**What's the SAME:**
- N8N Cloud instance: Same workflows, same execution
- Gemini API: Same behavior on both
- Claude API: Same behavior on both
- OpenRouter: Same behavior on both

**Cross-platform tip:**
When sharing your setup with someone on Windows:
- Workflows: Share the N8N JSON file (works on Windows)
- Local tools: Might need Windows version (ask Claude Code to adapt)
- Instructions: Note the platform-specific parts

---

## When to Ask for Help

### Escalation Criteria - When to Contact Support

**You should ask for help if:**

**🔴 Critical (Ask immediately):**
- Your workflow runs but knowledge base isn't being queried
- API authentication fails and you've verified the key is correct
- You're spending unexpectedly on API costs
- A workflow that worked yesterday now fails

**🟡 Important (Ask within a few hours):**
- Files upload but aren't searchable after 60 seconds
- Search returns no results even though documents are there
- Windows/Mac sync issues preventing work on both machines

**🟢 Minor (Can usually solve yourself):**
- Indexing takes longer than 60 seconds (just wait)
- Rate limiting (just wait and retry)
- UI confusion (look for documentation)

**What to include when asking:**

```
SETUP INFO:
- Platform: Mac / Windows
- Which workflow: [name]

THE PROBLEM:
- What exactly happened? (copy-paste error messages)
- When did it start? (yesterday, 10 minutes ago)
- What were you trying to do?

WHAT YOU TRIED:
- [Fix attempt 1]
- [Fix attempt 2]
- [etc]

PROOF:
- If possible, screenshot of error
- N8N Execution ID (from the Executions tab)
- Error message (exact text)
```

**Where to ask:**
1. Check this FAQ (you're here!)
2. Ask Claude Code (in VS Code with the course project open)
3. Post in the course Slack channel
4. Bring to office hours (Fridays)

---

## Quick Reference - Error Message Decoder

**See an error message? Look it up here:**

| Error | What It Means | Jump To |
|-------|--------------|---------|
| `401 Unauthorized` | API key is wrong or expired | [API Key Issues](#q-my-api-key-works-in-google-ai-studio-but-fails-in-n8n-why) |
| `403 Forbidden` | API key lacks permissions | [Permission Denied](#q-getting-permission-denied-or-403-forbidden-error) |
| `404 Not Found` | Store ID wrong or store doesn't exist | [404 Store Not Found](#q-getting-404---corpora-not-found-or-404-store-not-found-error) |
| `429 Too Many Requests` | Rate limit hit, wait and retry | [Rate Limiting](#q-rate-limiting---too-many-requests-error) |
| `500 Internal Server Error` | Service is down, wait and retry | [Quota Exceeded](#q-quota-exceeded---hitting-free-tier-limits) |
| `Timeout` | Request took too long, retry | [Upload Timeout](#q-upload-times-out-even-though-my-file-is-small) |
| `Invalid Model` | Model name is outdated | [Model Not Found](#q-model-not-found-or-invalid-model-name-error) |
| `"No documents found"` | Store is empty, wrong store ID, or still indexing | [No Documents Found](#q-i-uploaded-my-pdf-5-minutes-ago-but-gemini-says-no-documents-found-whats-wrong) |
| `Loop Prevention` | Workflow calling itself | [Loop Prevention](#q-loop-prevention-triggered---workflow-stopped) |
| `API key missing` | Workflow field is empty | [API Key Missing](#q-hatch-tool-configuration---api-key-missing-error) |

---

## Related Documents

**For more information:**
- [Gemini Setup Verification Checklist](./Gemini-Setup-Verification-Checklist.md) - Verify your setup step-by-step
- [Gemini Cost Calculator](./Gemini-Cost-Calculator.md) - Estimate your API costs
- [N8N Workflow Troubleshooting Guide](./N8N-Workflow-Troubleshooting.md) - N8N-specific issues (not Gemini)

---

## Still Stuck?

**Next steps:**

1. **Search this FAQ** for your error message (use Ctrl+F)
2. **Ask Claude Code** with a prompt like:
   ```
   I'm getting a "[error message]" when trying to [action].
   I've checked [thing 1] and [thing 2].
   Can you help me debug this?
   ```
3. **Join the Slack channel** and describe your issue with the format above
4. **Attend office hours** - Friday sessions are for troubleshooting

**Remember:** Getting stuck is normal. This is complex stuff. The skill is learning how to ask for help effectively. You're doing great!

---

**Last updated:** January 30, 2026
**FAQ Version:** 1.0
**Total Questions:** 45+ real student issues
**If you find an issue not covered here:** Submit it via Google Form (instructor will add to FAQ)
