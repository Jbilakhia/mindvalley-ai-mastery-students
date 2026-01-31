# L-20260130-001: n8n Workflow State Debugging Patterns

**Date:** 2026-01-30
**Category:** n8n, Debugging, State Management
**Severity:** Critical Bug Fix

---

## Context

During video recording of the Hattie B's email processing demo, discovered that the revised draft (v2) shown in Slack was NOT the version that got sent via Gmail. The SHIP action sent the original v1 draft instead.

## Root Cause Analysis

### The Bug Flow
```
1. W1 processes email → creates v1 draft → saves to Google Sheet → posts to Slack
2. Human replies "revise" → W2 routes to REVISE path
3. W2 calls SUB workflow → SUB creates revised v2 draft
4. SUB returns v2 to W2 → W2 posts v2 to Slack for approval
5. Human replies "ship it" → W2 routes to SHIP path
6. W2 calls "Get Draft from Sheet" → GETS v1 (BUG!)
7. W2 sends v1 to Gmail instead of v2
```

### The Missing Link
The SUB workflow returned the revised draft, and W2 posted it to Slack, but **nobody wrote v2 back to the Google Sheet**. When SHIP triggered, it pulled from the Sheet which still had v1.

## Solution

Added "Update Sheet with Revision" node in W2's REVISE path:

```
REVISE path (before fix):
Get Draft for Revision → Call SUB → Assemble SITREP → Post to Slack

REVISE path (after fix):
Get Draft for Revision → Call SUB → Assemble SITREP → Update Sheet with Revision → Post to Slack
```

### Node Configuration
```json
{
  "operation": "update",
  "columns": {
    "execution_id": "={{ $json.execution_id }}",
    "draft_subject": "={{ $json.revised_draft.subject }}",
    "draft_body": "={{ $json.revised_draft.body }}",
    "qa_score": "={{ $json.bishop_score }}",
    "qa_status": "={{ $json.bishop_status }}",
    "revision_count": "={{ $json.revision_count }}",
    "status": "pending_approval",
    "updated_at": "={{ $now.toISO() }}"
  },
  "matchingColumns": ["execution_id"]
}
```

## Debugging Tools Used

1. **n8n MCP tools** - Used `n8n_executions` to trace execution history
2. **Execution comparison** - Compared data at each node between REVISE and SHIP executions
3. **Connection tracing** - Verified which nodes connected to which via workflow structure

## Key Learnings

### 1. State Must Be Persisted Before Next Action Can Use It
When using Google Sheets (or any external store) as state management, every state change must be written before any subsequent action that reads state.

### 2. Multi-Step Approval Flows Need State Checkpoints
In HITL (Human-in-the-Loop) flows with multiple rounds:
- Each approval/revision cycle must persist state
- Never assume the next action remembers the previous action's output
- Treat each user interaction as starting from a fresh context that only knows what's in the database

### 3. Debug by Tracing Data Flow
When "wrong data" is sent:
1. Identify the node that sends the data
2. Trace backwards: where does that node GET its data?
3. Check: was the correct data ever written to that source?
4. If not: find the gap in the write chain

### 4. Expression Syntax for Nested Objects
When accessing nested data from previous nodes:
```javascript
// Accessing nested object property
"={{ $json.revised_draft.subject }}"

// Accessing data from specific named node
"={{ $('Parse Thread Data').item.json.execution_id }}"
```

## Files Changed

- `workflows/W2-Approval-Handler-FIXED.json` - Added Update Sheet with Revision node
- Production workflow `wyuE6DJqNXhX3K7B` - Updated via n8n MCP

## Related Issues

- Execution 2806: REVISE (created v2 but didn't persist)
- Execution 2810: SHIP (pulled stale v1 from sheet)

## Tags

#n8n #debugging #state-management #HITL #google-sheets #bug-fix
