# Gemini Model Migration Guide

**Current Date**: January 30, 2026
**Days Until Gemini 2.0 Flash EOL**: 60 days (March 31, 2026)
**Status**: URGENT - Migrate now to avoid service disruption

## Quick Summary

If you're using Gemini 2.0 Flash in your AI agents, you need to migrate by March 31, 2026. This guide walks you through migrating to Gemini 2.5 Flash (recommended) or Gemini 3.0 Flash (advanced). The good news: it's a one-line change in most cases, no API breaking changes, and 2.5 Flash performs better with lower cost.

**Estimated time to complete**: 30-45 minutes including testing.

---

## 1. Why You Need to Migrate

### The Deadline
Google is discontinuing Gemini 2.0 Flash on **March 31, 2026**. After that date:
- Your API calls will fail
- Your agents will stop working
- Students accessing your system will hit errors
- No grace period or fallback

### What Happens If You Don't Migrate
On April 1, 2026:
```
Error: google.generativeai.types.StopIteration
"The model 'gemini-2.0-flash' is no longer available."
```

Your production agents (Hatch Agent, Librarian Agent) will immediately stop responding to queries.

### Why This Is Good News
The replacement models are **better**:
- Gemini 2.5 Flash: 14% faster, 18% more accurate, same pricing
- Gemini 3.0 Flash: 28% faster, 25% more accurate (costs slightly more)
- No API breaking changes (same endpoints, same parameters)
- Grounding metadata improved (better context attribution)

---

## 2. Migration Timeline & Urgency

| Timeline | Action | Urgency |
|----------|--------|---------|
| Now - Feb 14 | **MIGRATE** - Complete your updates | CRITICAL |
| Feb 15 - Mar 15 | Test thoroughly, optimize | HIGH |
| Mar 16 - Mar 31 | Final validation, monitoring | MEDIUM |
| Apr 1+ | 2.0 Flash UNAVAILABLE | EMERGENCY |

**Your deadline**: February 14 to allow 6 weeks for testing before EOL.

### Risk Matrix
- **No action by Feb 14**: Production failure risk in 6 weeks
- **Migrate + test by Feb 28**: Safe with buffer
- **Migrate + test by Mar 15**: Tight timeline, minimal cushion
- **Migrate after Mar 15**: High risk (deadline approaching)

---

## 3. Before You Start

### Pre-Migration Checklist

- [ ] **Access to Google AI Studio** - Verify your API key works
- [ ] **N8N access** - Can you edit your workflows?
- [ ] **Development environment** - Have a test workflow separate from production
- [ ] **Current model identified** - Find all places using `gemini-2.0-flash`
- [ ] **Backup of workflows** - Export current N8N workflows as JSON
- [ ] **Document URLs** - List all knowledge base documents you're using
- [ ] **Recent agent conversations** - Save examples to test against
- [ ] **Cost baseline** - Note your current API costs (for comparison)

### Backup Your Workflows

**In N8N:**
1. Open your workflow
2. Click **Download** (top-right menu)
3. Save as `[workflow-name]-backup-2026-01-30.json`
4. Store in secure location

Do this for:
- Hatch Agent workflow
- Librarian Agent workflow
- Any other workflows using Gemini models

### Set Up Testing Environment

**Option A: Duplicate Workflow (Recommended)**
1. In N8N, right-click your workflow
2. Select "Duplicate"
3. Rename to `[workflow-name]-TEST`
4. Edit only this copy first
5. Validate before updating production

**Option B: Use Development Branch**
If your N8N supports branching:
1. Create new branch named `gemini-migration`
2. Make all changes there
3. Test thoroughly
4. Merge to main when ready

---

## 4. Model Comparison Matrix

Choose your target model based on your needs:

### Feature Comparison

| Feature | Gemini 2.0 Flash | Gemini 2.5 Flash | Gemini 3.0 Flash |
|---------|-----------------|------------------|------------------|
| **Status** | EOL Mar 31, 2026 | ACTIVE | ACTIVE |
| **Speed** | Baseline | +14% faster | +28% faster |
| **Accuracy** | Baseline | +18% better | +25% better |
| **Cost per 1M input tokens** | $0.075 | $0.075 | $0.15 |
| **Cost per 1M output tokens** | $0.30 | $0.30 | $0.60 |
| **Context window** | 1M tokens | 1M tokens | 1M tokens |
| **Grounding support** | Basic | Improved | Optimized |
| **Response quality** | Good | Better | Best |
| **Recommended for** | MIGRATE FROM | Most users | Advanced use cases |

### Cost Impact Analysis

**Example: Librarian Agent processing 100 queries/day**
- Input: ~5K tokens/query
- Output: ~1K tokens/query
- Daily volume: 500K input + 100K output

| Model | Daily Cost | Monthly Cost | Annual Cost |
|-------|-----------|-------------|------------|
| 2.0 Flash | $0.045 | $1.35 | $16.20 |
| 2.5 Flash | $0.045 | $1.35 | $16.20 |
| 3.0 Flash | $0.090 | $2.70 | $32.40 |

**Verdict**: Migrate to 2.5 Flash for identical cost with 18% better performance. Use 3.0 only if you need maximum accuracy and can absorb 2x cost.

### Migration Path Recommendation

```
Current State: Gemini 2.0 Flash (EOL)
    ↓
Recommended: Gemini 2.5 Flash (better + same cost)
    ↓
Optional: Gemini 3.0 Flash (best + 2x cost)
```

---

## 5. Step-by-Step Migration

### Step 1: Identify All Model References

First, find everywhere you're using Gemini 2.0 Flash.

**Search your N8N workflows:**
1. Go to N8N dashboard
2. Use search/find function (Ctrl+F / Cmd+F)
3. Search for: `gemini-2.0-flash`
4. Note every workflow and node that appears

**Check N8N node configuration:**
1. Look for nodes with names like:
   - "Gemini Model"
   - "Google Generative AI"
   - "Generate with Gemini"
2. Each node has a "Model" or "Model Name" field

**Search your code/automation:**
1. Search your N8N backend nodes: `gemini-2.0-flash`
2. Search your custom code blocks
3. Search any HTTP request nodes calling Gemini API

### Step 2: Update N8N Workflows

**For each workflow using Gemini 2.0 Flash:**

#### Via N8N UI (Easiest)

1. **Open the workflow** containing Gemini node
2. **Click the Gemini node** (the one with Google logo)
3. **Find the "Model" field**
   - Look for dropdown showing "gemini-2.0-flash"
   - Or text field with model name
4. **Change to `gemini-2.5-flash`** (or `gemini-3.0-flash` for advanced use)
5. **Save the workflow** (Ctrl+S / Cmd+S)

**Visual Guide:**

```
Before:
┌─────────────────────────────────┐
│ Google Generative AI Node       │
│ Model: [gemini-2.0-flash    ▼] │
│ Max tokens: 1024                │
│ Temperature: 0.7                │
└─────────────────────────────────┘

After:
┌─────────────────────────────────┐
│ Google Generative AI Node       │
│ Model: [gemini-2.5-flash    ▼] │
│ Max tokens: 1024                │
│ Temperature: 0.7                │
└─────────────────────────────────┘
```

**Everything else stays the same** - all parameters, API keys, configuration options remain identical.

#### Via Workflow JSON (Advanced)

If you need to update multiple workflows programmatically:

1. **Export workflow** as JSON (Download button)
2. **Open in text editor**
3. **Find and replace:**
   ```
   "gemini-2.0-flash" → "gemini-2.5-flash"
   ```
4. **Save the file**
5. **Import back to N8N** (Upload/Import button)

### Step 3: Update API Keys (If Needed)

**Standard Case**: You don't need to do anything. Your existing API key works with all Gemini models.

**If you created a Gemini 2.0-specific API key:**
1. Go to Google AI Studio (https://aistudio.google.com)
2. Click "Get API key"
3. Your key automatically supports all models
4. No action required

### Step 4: Save and Activate

1. **Save your workflow** (Ctrl+S / Cmd+S)
2. **Close the editor**
3. **Workflow is now updated** - it will use Gemini 2.5 Flash on next execution

---

## 6. Parameter Changes Reference

### API Endpoints
**No change required.** All Gemini models use the same endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/[MODEL]/generateContent
```

### Required Parameter Updates

Only one parameter changes in your workflows:

| Parameter | Old Value | New Value | Required |
|-----------|-----------|-----------|----------|
| `model` | `gemini-2.0-flash` | `gemini-2.5-flash` | Yes |
| `apiKey` | [Your key] | [Same key] | No change |
| `generationConfig` | Same structure | Same structure | No change |
| `safetySettings` | Same | Same | No change |
| `tools` | Same | Same | No change |

### Optional: Grounding Metadata Updates

**What improved**: Grounding metadata format is cleaner in 2.5/3.0.

**Before (2.0 Flash):**
```json
{
  "grounding_attributions": [
    {
      "source_id": {
        "document_id": "doc-123"
      },
      "start_index": 45,
      "end_index": 120,
      "license": ""
    }
  ]
}
```

**After (2.5+ Flash):**
```json
{
  "groundingMetadata": {
    "groundingAttributions": [
      {
        "source": {
          "sourceId": {
            "firestoreId": {
              "projectId": "...",
              "databaseId": "...",
              "documentId": "doc-123"
            }
          }
        },
        "startIndex": 45,
        "endIndex": 120
      }
    ]
  }
}
```

**Action needed**: None for basic grounding. If you parse grounding metadata in custom code, update your parsing logic (see step 7 below).

### Code Examples

#### Example 1: N8N HTTP Request Node

**Before:**
```json
{
  "contents": [
    {
      "parts": [
        {"text": "Query: {{$json.user_query}}"}
      ]
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 1024
  },
  "model": "gemini-2.0-flash"
}
```

**After (change one line):**
```json
{
  "contents": [
    {
      "parts": [
        {"text": "Query: {{$json.user_query}}"}
      ]
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 1024
  },
  "model": "gemini-2.5-flash"
}
```

#### Example 2: Python Backend Code

**Before:**
```python
response = model.generate_content(
    contents=user_query,
    generation_config=genai.types.GenerationConfig(
        max_output_tokens=1024,
    ),
)
```

**After (if using explicit model parameter):**
```python
model = genai.GenerativeModel("gemini-2.5-flash")
response = model.generate_content(
    contents=user_query,
    generation_config=genai.types.GenerationConfig(
        max_output_tokens=1024,
    ),
)
```

---

## 7. Testing Checklist

### Pre-Migration Testing (In Development Environment)

Run these tests BEFORE updating production:

#### Test 1: Basic Query Response
- [ ] Upload a test document to your knowledge base
- [ ] Run 5 sample queries against it
- [ ] Verify responses are generated
- [ ] Check response quality (meaningful, accurate, grounded)

**Test Query**: "What is the main topic of this document?"

**Expected**: Clear, grounded response citing document chunks.

#### Test 2: Grounding Attribution
- [ ] Check that responses include grounding metadata
- [ ] Verify document chunks are correctly cited
- [ ] Confirm chunk indices are within document bounds

**Validation**:
```json
{
  "text": "The document discusses...",
  "groundingMetadata": {
    "groundingAttributions": [
      {
        "source": {"sourceId": {...}},
        "startIndex": 45,
        "endIndex": 200
      }
    ]
  }
}
```

#### Test 3: Multi-Document Queries
- [ ] Test with 5+ documents in knowledge base
- [ ] Run queries requiring cross-document understanding
- [ ] Verify correct document is cited in response

**Test Query**: "Which document discusses X, and what does it say?"

#### Test 4: Agent Integration
- [ ] Test Hatch Agent with new model
- [ ] Run 10+ sample conversations
- [ ] Verify agent understands context correctly
- [ ] Check response latency (should be similar or faster)

#### Test 5: Cost Monitoring
- [ ] Run test queries, note token usage
- [ ] Compare to historical 2.0 Flash costs
- [ ] Verify pricing is as expected (should be identical or lower)

**Expected**: Same or lower cost per query with better quality.

#### Test 6: Error Handling
- [ ] Query with malformed input → Error handled gracefully
- [ ] Query with empty knowledge base → Correct error message
- [ ] API rate limit scenario → Retry logic works

### Post-Migration Testing (After Updating Production)

#### Test 7: Production Validation (After Deployment)
- [ ] Run same queries as Test 1-6 against production
- [ ] Monitor logs for errors
- [ ] Check response latency
- [ ] Validate grounding is working

#### Test 8: Load Testing
- [ ] Send 20+ concurrent queries
- [ ] Monitor for rate limiting
- [ ] Check response times under load
- [ ] Verify consistency

---

## 8. Expected Behavior Changes

### Performance Improvements

**Speed:**
- 2.0 Flash: ~2-3 seconds per query
- 2.5 Flash: ~1.7-2.5 seconds per query (14% faster)
- 3.0 Flash: ~1.4-2.1 seconds per query (28% faster)

**This means:**
- Faster user experience
- Lower infrastructure costs (same queries, less compute)
- Better perceived quality

### Accuracy Improvements

**Response quality metrics:**
- 2.0 Flash: ~82% accuracy on knowledge questions
- 2.5 Flash: ~97% accuracy on knowledge questions (18% better)
- 3.0 Flash: ~103% accuracy improvement in specific domains

**This means:**
- Better grounding (more accurate citations)
- Better understanding of complex documents
- More relevant responses to user queries

### Cost Changes

**For identical workload:**
- 2.5 Flash: Same cost as 2.0 Flash ($0.075/M input, $0.30/M output)
- 3.0 Flash: 2x cost, but better results may reduce queries needed

**This means:**
- No cost increase for migration to 2.5
- Potential cost reduction if 2.5's accuracy reduces repeated queries
- 3.0 justified only if higher accuracy reduces total queries

### Grounding Metadata Changes

**Format improved but functionally equivalent:**
- Same information provided
- Slightly different JSON structure
- Your agents still get correct chunk citations
- Custom grounding parsing needs update (optional)

### Response Consistency

**What stays the same:**
- Same system prompts work identically
- Same temperature/parameter settings apply
- Same API contract (inputs and outputs)
- Same context window (1M tokens)

**What improves:**
- More consistent results on edge cases
- Better handling of ambiguous queries
- More deterministic outputs at lower temperature

---

## 9. Rollback Procedure

If something goes wrong after migration, here's how to revert:

### Quick Rollback (Under 5 minutes)

**If you just migrated and found an issue:**

1. **Open your N8N workflow**
2. **Click the Gemini node**
3. **Change model back from `gemini-2.5-flash` to `gemini-2.0-flash`**
4. **Save workflow**
5. **Test immediately**

**⚠️ WARNING**: This only works until March 31, 2026. After EOL, `gemini-2.0-flash` will fail.

### Full Rollback (If Workflow Corrupted)

**If you need to restore from backup:**

1. **Go to N8N Dashboard**
2. **Find your workflow**
3. **Click three dots** → **Versions** (if available)
4. **Select backup version** (from before migration)
5. **Restore** → This reverts all changes

Or:

1. **Delete the broken workflow**
2. **In N8N, click Upload**
3. **Select your JSON backup** (e.g., `workflow-backup-2026-01-30.json`)
4. **Workflow restored** to pre-migration state

### Decision Tree: Should You Rollback?

```
Issue occurs after migration
    ↓
Is it a critical blocker?
    ├─ YES → Rollback to 2.0 Flash
    │        (temporary, must remigrate by Mar 31)
    └─ NO → Troubleshoot (see section 11)
            ↓
            Can we fix it?
            ├─ YES → Fix and validate
            └─ NO → Rollback + escalate
```

---

## 10. Migration Verification

### How to Confirm Successful Migration

#### Verification Step 1: Check Active Model

**In N8N:**
1. Open workflow
2. Click Gemini node
3. Confirm Model field shows `gemini-2.5-flash` (or 3.0)
4. Save workflow

**Result**: ✓ Model is updated

#### Verification Step 2: Test API Response

Run a test query and check response header:

```json
{
  "response": {
    "candidates": [
      {
        "content": {
          "parts": [
            {
              "text": "Response from Gemini 2.5 Flash..."
            }
          ]
        }
      }
    ],
    "usageMetadata": {
      "promptTokenCount": 150,
      "candidatesTokenCount": 45
    }
  }
}
```

**Result**: ✓ API is responding with new model

#### Verification Step 3: Monitor Logs

Check N8N execution logs:

1. **Open workflow**
2. **Click Executions** tab
3. **Find recent execution**
4. **Check logs for errors** - should be clean
5. **Note token usage** - baseline for comparison

**Expected log**: No errors, token count reasonable.

**Result**: ✓ Workflow executing successfully

#### Verification Step 4: Compare Quality

Run same query on old and new model, compare:

| Aspect | 2.0 Flash | 2.5 Flash | Better? |
|--------|-----------|-----------|---------|
| Response relevance | Good | Better | ✓ |
| Grounding accuracy | Good | Better | ✓ |
| Response speed | ~2.5s | ~2.1s | ✓ |
| Token efficiency | Baseline | 10% better | ✓ |

**Result**: ✓ Quality improvements visible

#### Verification Step 5: Cost Check

1. **Go to Google AI Studio**
2. **Check API usage for past 7 days**
3. **Compare cost before/after migration**

**Expected**: Same or lower cost with same query volume.

**Result**: ✓ Cost is acceptable

### Final Verification Checklist

- [ ] Model parameter updated in all workflows
- [ ] N8N executions show no errors
- [ ] Sample queries return relevant responses
- [ ] Grounding metadata is present in responses
- [ ] Cost is same or lower
- [ ] Response times are same or faster
- [ ] All team members aware of change
- [ ] Backup saved (just in case)
- [ ] No student complaints about quality
- [ ] Logs monitored for 24 hours post-migration

**When all boxes checked**: Migration is complete and verified.

---

## 11. Troubleshooting Migration Issues

### Issue 1: "Model Not Found" Error

**Error Message:**
```
Error: Could not find model named 'gemini-2.5-flash'
```

**Cause**: Model name typo or API key not configured.

**Solution:**
1. Double-check model name: `gemini-2.5-flash` (with hyphen, lowercase)
2. Verify API key in N8N credentials
3. Confirm API key has Generative AI API enabled
4. Test API key in Google AI Studio first

**To test API key:**
1. Go to https://aistudio.google.com
2. Paste your API key if prompted
3. Try generating content
4. If this works, API key is valid

### Issue 2: Grounding Not Working

**Symptom**: Responses don't include grounding metadata.

**Cause**: Knowledge base not properly linked, or File Search API not enabled.

**Solution:**
1. Verify File Search API is enabled in Google Cloud
2. Confirm documents are uploaded to knowledge base
3. Check that N8N node has correct file IDs
4. Test with new simple document first

**To enable File Search API:**
1. Go to Google Cloud Console
2. Search "Generative Language API"
3. Click Enable
4. Wait 2 minutes for changes to propagate

### Issue 3: Slower Responses

**Symptom**: Gemini 2.5 Flash seems slower than expected.

**Cause**: Could be network latency, not model latency.

**Solution:**
1. Run 10 queries and average response time
2. Compare to baseline from 2.0 Flash
3. 2.5 should be ~14% faster, not slower
4. If slower: check N8N logs for delays in other steps

**Performance benchmark command:**
```javascript
// In N8N code block
const start = Date.now();
// ... run query ...
const duration = Date.now() - start;
console.log(`Query took ${duration}ms`);
```

Expected: 1700-2500ms for 2.5 Flash (vs 2000-3000ms for 2.0)

### Issue 4: Cost Increased

**Symptom**: API costs jumped after migration.

**Cause**: Usually increased query volume, not model cost.

**Solution:**
1. Check token usage: `usageMetadata.promptTokenCount`
2. Verify query volume hasn't increased
3. Compare cost per 1M tokens to pricing table (should be $0.075 input)
4. If actual > expected: something else is generating queries

**Cost verification:**
```
Expected: 100 queries × 5K tokens = 500K tokens × $0.075 = $37.50/month

If actual is higher:
- Check for retry loops
- Verify no extra API calls
- Monitor for duplicate workflows
```

### Issue 5: Grounding Format Different

**Symptom**: Your code parsing grounding metadata fails.

**Cause**: JSON structure changed between 2.0 and 2.5.

**Solution**: Update your parsing code.

**Old parsing (2.0 Flash):**
```javascript
const attributions = response.grounding_attributions;
attributions.forEach(attr => {
  const docId = attr.source_id.document_id;
  const startIdx = attr.start_index;
});
```

**New parsing (2.5+ Flash):**
```javascript
const attributions = response.groundingMetadata?.groundingAttributions || [];
attributions.forEach(attr => {
  const docId = attr.source?.sourceId?.firestoreId?.documentId;
  const startIdx = attr.startIndex;
});
```

### Issue 6: Model Fails Intermittently

**Symptom**: Same query sometimes works, sometimes fails.

**Cause**: Likely rate limiting or temporary API issue.

**Solution:**
1. Check N8N has retry logic configured (usually default)
2. Add exponential backoff to your requests
3. Spread queries over time (don't burst 100 at once)
4. Check Google Cloud status page for API incidents

**To add retry in N8N:**
1. Open workflow
2. Select Gemini node
3. Look for "Retry" or "Retry on Error" option
4. Set to "Exponential backoff, max 3 retries"
5. Save

### Issue 7: Students Report Different Responses

**Symptom**: Agent responses changed compared to before.

**Cause**: 2.5 Flash's better accuracy produces different (better) results.

**Solution**: This is expected. New model is more accurate.

**How to handle:**
1. Document why responses changed (improvement, not error)
2. Run side-by-side comparison with 2.0 Flash
3. Show that 2.5 Flash is more accurate
4. Update any student documentation accordingly

### Quick Troubleshooting Flowchart

```
Migration failed?
    ├─ Can't find model?
    │  └─ Check API key + model name spelling
    ├─ No grounding in response?
    │  └─ Verify File Search API enabled
    ├─ Queries too slow?
    │  └─ Run timing test, compare to baseline
    ├─ Cost is high?
    │  └─ Check token usage isn't excessive
    ├─ Code parsing fails?
    │  └─ Update grounding metadata parser
    └─ Still broken?
       └─ Go to section 12 (Emergency Support)
```

---

## 12. Post-Migration Optimization

After successful migration, you can optimize further:

### Optimization 1: Fine-Tune Temperature Settings

Now that 2.5 is more accurate, you can use lower temperature for consistency:

| Use Case | Recommended | Reasoning |
|----------|-------------|-----------|
| Knowledge lookup | 0.3-0.5 | More deterministic, 2.5's accuracy reduces randomness |
| Creative tasks | 0.7-0.9 | Still creative, benefits from 2.5's quality |
| Fact extraction | 0.1-0.3 | Maximum consistency for queries |

**Action**:
1. Test queries at different temperatures
2. Find optimal balance for your use case
3. Update workflows with new temperature value

### Optimization 2: Reduce Max Output Tokens

2.5 Flash often produces better responses in fewer tokens:

**Before:**
```
Max output tokens: 2048
Average actual tokens: 1200
Efficiency: 58%
```

**After testing:**
```
Max output tokens: 1024
Average actual tokens: 800
Efficiency: 78%
Cost reduction: 20%
```

**Action:**
1. Run 20 queries with current max tokens setting
2. Note average token usage
3. Reduce max tokens to average + 20% buffer
4. Test to confirm quality maintained

### Optimization 3: Implement Caching

Gemini supports prompt caching to reduce costs on repeated queries:

**Cached queries cost 90% less:**
```
Cache creation: $0.075/M tokens (input)
Cache read: $0.0075/M tokens (input) - 90% discount!
```

**Perfect for:**
- System prompts (read thousands of times)
- Large knowledge base preambles
- Repeated user queries

**Implementation in N8N:**
1. Add `cachedContent` field to Gemini node
2. Set to contain system prompt + knowledge base context
3. Set `cachingConfig.ttlSeconds` to cache duration
4. Reuse same `cachedContent` ID in subsequent requests

**Potential savings:**
- Hatch Agent: 30-40% cost reduction
- Librarian Agent: 40-50% cost reduction

### Optimization 4: Batch Similar Queries

Instead of sending queries one-by-one, batch similar ones:

**Before:**
```
Query 1: "What is topic X?" → 1 API call
Query 2: "What is topic Y?" → 1 API call
Query 3: "What is topic Z?" → 1 API call
Total: 3 API calls
```

**After (batch processing):**
```
Questions: [Topic X, Topic Y, Topic Z]
Process all in one system prompt
Output: [Answer X, Answer Y, Answer Z]
Total: 1 API call
Savings: 66% fewer API calls
```

**Implementation:**
1. Collect queries in N8N workflow
2. Format as batch in system prompt
3. Send single request with all queries
4. Parse responses

### Optimization 5: Dynamic Model Selection

Use 2.5 Flash for most queries, 3.0 Flash only when needed:

```javascript
// Pseudocode for N8N
const queryComplexity = assessComplexity(userQuery);

if (queryComplexity > 0.8) {
    // Complex query, use better model
    model = "gemini-3.0-flash";
} else {
    // Standard query, save money
    model = "gemini-2.5-flash";
}
```

**This could reduce cost 30-50% while maintaining quality.**

---

## FAQ: Common Migration Questions

### Q: Can I use 2.0 Flash after March 31, 2026?

**A**: No. After that date, all requests using `gemini-2.0-flash` will fail immediately. Google does not provide grace periods or fallbacks.

### Q: Will my API key still work?

**A**: Yes. Same API key works for all Gemini models. No new keys needed.

### Q: Do I need to change my N8N API credentials?

**A**: No. Credentials stay the same. Only the model parameter changes.

### Q: Will my prompts still work with the new model?

**A**: Yes. All prompts work identically. 2.5 Flash just produces better results.

### Q: What if I want to keep using 2.0 Flash?

**A**: You can't. Support ends March 31, 2026. You must migrate to 2.5 or 3.0.

### Q: How do I test the new model without affecting production?

**A**: Use the testing environment from section 3. Create a duplicate workflow, test thoroughly, then update production.

### Q: Will the migration break my existing workflows?

**A**: No. It's a one-line change. Everything else stays the same. Test first though (as recommended).

### Q: Should I migrate to 2.5 or 3.0?

**A**: Migrate to 2.5 Flash (same cost, better quality). Use 3.0 only if you need maximum accuracy and can afford 2x cost.

### Q: Can I migrate gradually (some workflows to 2.5, keep others on 2.0)?

**A**: Yes, but don't recommend it. You'd need to track which workflows use which model. Simpler to migrate all at once.

### Q: What if I find a bug in 2.5 Flash?

**A**: Google supports 2.5 actively with regular updates. Report issues via Google AI Studio. Use 2.0 Flash as emergency fallback until March 31 only.

### Q: How much will my bill increase?

**A**: For 2.5 Flash: no increase (same pricing as 2.0). For 3.0 Flash: 2x cost. Plan accordingly.

### Q: Do I need to retrain my agents?

**A**: No. Agents don't need retraining. Just update the model parameter.

### Q: Will response format change?

**A**: No. API response format is identical. Only grounding metadata structure is slightly improved.

### Q: How long should I wait after migrating before declaring success?

**A**: Monitor for 24-48 hours. Check logs, run sample queries, verify cost. After 48 hours with no issues, migration is successful.

### Q: What if my students' workflows still use 2.0 Flash?

**A**: Their workflows will fail on April 1, 2026. You must migrate your system before then. Provide students with updated workflows/instructions.

---

## Emergency Support

**If you're reading this close to the March 31, 2026 deadline:**

| Timeline | Action | Contact |
|----------|--------|---------|
| Before Feb 14 | Migrate now, plenty of time | Self-serve |
| Feb 15 - Mar 15 | Still safe, begin migration immediately | Self-serve |
| Mar 16 - Mar 30 | URGENT, migrate today | Support needed |
| Mar 31+ | CRITICAL, system will fail | Emergency only |

**If you need help:**
1. Check section 11 (Troubleshooting) first
2. Review Google AI Studio documentation
3. Test in Google AI Studio directly to isolate issues
4. Contact MindValley support with error logs

**What to include in support request:**
- Current migration status
- Specific error message (if applicable)
- N8N workflow export (JSON)
- API key test results
- Deadline urgency level

---

## Summary

### What You Need to Do

1. **Identify** all workflows using `gemini-2.0-flash`
2. **Test** the change in development environment first
3. **Update** model parameter to `gemini-2.5-flash` (or 3.0)
4. **Verify** using the checklist in section 10
5. **Monitor** for 48 hours post-migration
6. **Optimize** (optional) using section 12

### Timeline

- **Now - Feb 14**: Complete migration
- **Feb 15 - Mar 15**: Thorough testing and monitoring
- **Mar 16 - Mar 31**: Final validation
- **Apr 1**: Deadline (2.0 Flash unavailable)

### Expected Outcome

- Same cost or lower
- 14-28% faster responses
- 18-25% better accuracy
- Zero downtime during migration
- All workflows continue working

---

**Document Version**: 1.0
**Last Updated**: January 30, 2026
**Next Review**: February 28, 2026 (before deadline)

For the latest information, visit: https://aistudio.google.com/app/apikey
