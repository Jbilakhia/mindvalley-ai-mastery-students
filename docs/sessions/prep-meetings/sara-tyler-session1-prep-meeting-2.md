# Sara + Tyler Session 1 Prep Meeting - Part 2
**Date:** December 2, 2025
**Duration:** 34 minutes
**Recording:** https://fathom.video/share/sInYfCcjhYNwJcEXu1i-VIwI6iEnFjYX

---

## Meeting Overview
Continuation of Session 1 prep - focused on The Stacks UI demo, workflow demonstration, and final alignment.

---

## Key Topics Covered

### 1. The Stacks UI Deep Dive
- Tyler built custom UI for managing Gemini file stores
- Students can drag-and-drop files to upload
- Shows document status (processing/ready)
- Provides search/query testing interface
- Activity log tracks all operations

### 2. N8N Workflow Demonstration
- Tyler walked Sara through email processing pipeline
- Showed agent node configuration
- Demonstrated Librarian tool connections
- Explained the revision loop (Sugar → Bishop → revise if needed)
- Showed Slack integration for HITL

### 3. Demo Flow Confirmed
1. Show incoming email (test trigger)
2. Watch N8N process through agents
3. Show Librarian searching KB
4. Show Sugar drafting response
5. Show Slack notification arriving
6. Demonstrate approval → send flow

### 4. Stacks UI as Teaching Tool
- Primary: Show drag-and-drop simplicity
- Secondary: Demystify what's happening in Gemini
- Tertiary: Give students confidence they can manage their KB

### 5. Session Structure Finalized
1. **Vision** - What you're building (outcome first)
2. **Demo** - Show it working (magic show)
3. **Tech Stack** - The tools (behind curtain)
4. **Setup Overview** - How to get ready (don't do live, provide async)
5. **Brain Dump** - Knowledge base concept
6. **Stacks Demo** - Show UI for KB management
7. **Voice** - Echo workflow intro
8. **Q&A** - Address confusion
9. **Homework** - Clear assignments

---

## Action Items from Part 2

### Pre-Session Technical Checks
- [ ] Verify Stacks UI is accessible and working
- [ ] Test Gemini file store connection from UI
- [ ] Confirm N8N workflows are active and ready for demo
- [ ] Test Slack channel receives messages
- [ ] Have test email ready to trigger demo

### Demo Preparation
- [ ] Have VS Code open with Claude Code ready
- [ ] Have N8N open to email processing workflow
- [ ] Have Stacks UI open in browser tab
- [ ] Have Slack open to #hattieb-approvals channel
- [ ] Have test email drafted and ready to send

### Content Finalization
- [ ] Sara: Update remaining slides based on walkthrough
- [ ] Tyler: Confirm all file locations Sara needs for screenshots
- [ ] Both: Final run-through morning of session

---

## Key Quotes

**On The Stacks:**
> "The stacks is the library. It's the file store UI that I built so students can see what's in their knowledge base and manage it without touching code." - Tyler

**On Demo Strategy:**
> "Show the magic first. Let them see the outcome. Then we peel back the layers." - Sara

**On Student Anxiety:**
> "They're going to be scared of the setup. That's why we show the payoff first." - Tyler

---

## Technical Details Confirmed

### Stacks UI Location
- Tool path: `tools/kb-manager/`
- Main file: `index.html`
- Runs locally via VS Code Live Server or direct file open

### N8N Workflow IDs (For Demo)
- Email Processing Pipeline: W1 (primary demo workflow)
- Approval Handler: W2 (shows human approval flow)
- Librarian Tool: Sub-workflow (shows KB queries)

### Gemini File Store
- Store name: `hattie-bs-knowledge-base`
- Contains: brand-voice, faq, locations, menu, policies
- Query test: "What heat levels do you have?"

### Slack Channel
- Channel: `#hattieb-approvals`
- Bot: Holler
- Shows: Draft email + approve/reject options

---

## Sara's Outstanding Questions (Addressed)

1. **Q: Where does The Stacks actually store files?**
   A: Gemini File Search (Google's managed RAG). Stacks is just the UI.

2. **Q: How do students get their own Gemini store?**
   A: They create it with their own API key. We provide the steps.

3. **Q: What if Echo workflow doesn't work for them?**
   A: Backup plan exists - can manually paste outputs.

4. **Q: Do they need N8N paid plan?**
   A: N8N Cloud free tier works for learning. May need paid for production.

---

## Transcript Excerpts

[Opening - continued from Part 1]

Tyler: "Let me show you The Stacks. This is actually something I'm pretty proud of."

Sara: "Is this what typing mind thought was an app you built?"

Tyler: "Yeah, it is an app I built. But it's just a UI on top of Gemini file search. Makes it so students can see their knowledge base without touching code."

[Demo of Stacks UI]

Tyler: "So you drag a file here, it uploads to Gemini, processes it, and now it's searchable. Watch..."

*[Shows query returning results]*

Sara: "Oh that's actually really intuitive. They can see what's in there."

Tyler: "Exactly. And the activity log shows everything that's happened. So if something goes wrong, they can see where."

[N8N Workflow Walkthrough]

Tyler: "Okay so here's the email pipeline. Email comes in here, goes to Cinnamon for sentiment, then Hatch for expert analysis, Sugar writes the draft, Bishop QAs it..."

Sara: "And if Bishop fails it?"

Tyler: "It goes back to Sugar for revision. If it fails twice, it pings us instead of auto-sending."

Sara: "Smart. Safety net."

[Final Alignment]

Sara: "Okay so tomorrow, we show the magic, explain the tools, demo the stacks, walk through homework, and Friday we catch anyone who's stuck."

Tyler: "That's it. And the Loom videos will cover anything we move too fast through."

Sara: "I feel better about this now."

Tyler: "Same. Let's do a final run-through in the morning?"

Sara: "Yes. Let's do 30 minutes before we go live."
