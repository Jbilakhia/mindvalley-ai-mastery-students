# Master Workflow Inventory
## Hattie B's / Mind Valley AI Email Automation System

**Last Updated:** 2026-01-30
**n8n Instance:** https://aibuildlab.app.n8n.cloud

---

## Production Email Automation Workflows (Active System)

These are the 4 core workflows that power the Hattie B's email automation:

| Order | Name | ID | Status | Description |
|-------|------|-----|--------|-------------|
| **0** | Filter/Router (FIXED) | `Pl7ZdR3PNRcgfzMF` | **ACTIVE** | Gmail trigger → classify → route to W1 |
| **1** | W1 Pipeline (FIXED) | `C2KIpNrNjr5TPMq6` | **ACTIVE** | 6-agent pipeline → Sheets → Slack SITREP |
| **2** | W2 Approval (FIXED) | `wyuE6DJqNXhX3K7B` | **ACTIVE** | Slack handler → SHIP/REVISE/CONFIRM routes |
| **2a** | SUB Revision (FIXED) | `t8sUvZ8xzoqNfYH5` | **ACTIVE** | Revision subprocess with Holler briefer |

### Quick Access URLs
```
Filter:  https://aibuildlab.app.n8n.cloud/workflow/Pl7ZdR3PNRcgfzMF
W1:      https://aibuildlab.app.n8n.cloud/workflow/C2KIpNrNjr5TPMq6
W2:      https://aibuildlab.app.n8n.cloud/workflow/wyuE6DJqNXhX3K7B
SUB:     https://aibuildlab.app.n8n.cloud/workflow/t8sUvZ8xzoqNfYH5
```

---

## Gemini / Knowledge Base Workflows

| Name | ID | Status | Description |
|------|-----|--------|-------------|
| Librarian Tool v2 | `hAUZlEDljnO7uXnT` | Active | Multi-store RAG retrieval (Gemini Flash 2.5) |
| Gemini Ingestion Engine v2 | `iFn7brifjBPB9SvH` | Active | Upload documents to File Search stores |
| Gemini Drive Watcher | `QXiPAxGCnFSdSbhf` | Inactive | Auto-sync Google Drive → KB |
| Gemini Create Store | `4lXQVvpcLF0mnwGj` | Active | API endpoint to create stores |
| Gemini List Stores | `TnW5x7kBDf9kzFGI` | Active | API endpoint to list stores |
| Gemini List Documents | `6OBm0LYZrJ3yIffA` | Active | API endpoint to list docs in store |
| Gemini Upload Document | `ThwggKXYRQvI0BZB` | Active | API endpoint to upload docs |
| Gemini Delete Document | `doRVErMaI31ZSlWx` | Active | API endpoint to delete docs |

---

## Original/Backup Workflows (For Rollback)

| Order | Name | ID | Status | Notes |
|-------|------|-----|--------|-------|
| 0 | Email Classification Filter v1 | `tWpIoIqZoguxZTrL` | Inactive | Original - reactivate if needed |
| 1 | W1: Email Processing Pipeline | `mYpexsjCtMEja9Os` | Active | Legacy version |
| 2 | W2 Approval - FIXED | `ZlrDosILsC3vi4EC` | Inactive | Intermediate fix version |
| 2a | SUB: Revision Processor | `SElCzAg6yvRghOSP` | Active | Original SUB |

---

## Shared Resources

### Google Sheets
- **Sheet ID:** `1xTng5h4vCWzFRtEvs05FX1lwguB6Mob-2G_LTgicn4I`
- **Sheet Name:** Email Drafts
- **URL:** https://docs.google.com/spreadsheets/d/1xTng5h4vCWzFRtEvs05FX1lwguB6Mob-2G_LTgicn4I

### Slack
- **Channel ID:** `C0A0MBQ2L8P`
- **Channel Name:** #hattieb-approvals

---

## Credentials Reference

| Service | Credential ID | Name |
|---------|---------------|------|
| Google Sheets | `tc00kMyg3gyauixg` | Google Sheets account |
| Gmail (Trigger) | `WnfSppZMzrMsJHaO` | Gmail account |
| Gmail (API) | `WiXbjg5ZURlWNV65` | tyler@aibuildlab.com |
| Slack | `pUoczdoEq8xxIwx5` | Slack account |
| Anthropic | `lauTekowPX3kl6EG` | Anthropic account |

---

## Agent Configuration (W1 Pipeline)

| Agent | Model | Temperature | Purpose |
|-------|-------|-------------|---------|
| Cinnamon | Claude Sonnet | 0.3 | Sentiment analysis |
| Hatch | Claude Sonnet | 0.5 | Internal research (KB via Librarian) |
| Scratch | Claude Sonnet | 0.5 | External research (web) |
| Sugar | Claude Sonnet | 0.7 | Email draft writer |
| Bishop | Claude Sonnet | 0.0 | QA evaluation |
| Holler | Claude Sonnet | 0.7 | Slack SITREP briefer |

---

## Debugging Quick Reference

### Check Recent Executions
```bash
# Via n8n MCP tools:
mcp__n8n__n8n_executions action=list workflowId=<ID> limit=5
```

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Execution not found" | Wrong workflow ID | Check FIXED copy IDs above |
| Template syntax in output | Expression not resolving | Use `={{ }}` not template literals |
| Thread not posting | thread_ts not set | Use explicit node reference |
| Sheet update fails | Missing matchingColumns | Add `execution_id` to matchingColumns |

---

## n8n Instance Info

### Cloud Instance (Production)
- **URL:** https://aibuildlab.app.n8n.cloud
- **API Key:** `op://Development/n8n Cloud/api-key` (1Password)

### Self-Hosted Instance (Infrastructure)
- **URL:** https://n8n.srv761271.hstgr.cloud
- **API Key:** `op://Development/n8n Hostinger/api-key` (1Password)
- **Note:** Used for private/infrastructure automations

---

## Activation Order (For Fresh Setup)

1. **Activate Filter** (`Pl7ZdR3PNRcgfzMF`) - Entry point
2. **Activate W1** (`C2KIpNrNjr5TPMq6`) - Called by Filter
3. **Activate SUB** (`t8sUvZ8xzoqNfYH5`) - Called by W2
4. **Activate W2** (`wyuE6DJqNXhX3K7B`) - Triggered by Slack

---

## Deactivation Order (For Rollback)

1. **Deactivate Filter** (stops new emails)
2. **Deactivate W2** (stops Slack processing)
3. **Deactivate SUB** (cleanup)
4. **Deactivate W1** (cleanup)
5. **Reactivate original Filter** (`tWpIoIqZoguxZTrL`)

---

## Related Documentation

- `/Mind Valley n8n Care Package/IMPLEMENTATION_LOG.md` - Fix history
- `/Mind Valley n8n Care Package/TEST_PLAN.md` - Test scenarios
- `/Mind Valley n8n Care Package/HANDOVER_FIX_REVISE_PATH.md` - Expression fixes
- `/bridge/session-logs/learnings/L-20260130-001-n8n-workflow-debugging-patterns.md` - Patterns learned
