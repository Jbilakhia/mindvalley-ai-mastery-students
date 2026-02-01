# Sara + Tyler Session 1 Prep Meeting - Part 1
**Date:** December 2, 2025
**Duration:** 69 minutes
**Recording:** https://fathom.video/share/i2Pv1BUz9dyk57hyBerpjLR-fVHBge6w

---

## Meeting Overview
Pre-session planning call between Tyler and Sara to align on Session 1 content, slide deck, and delivery strategy for the AI Build Lab Brilliant Edition.

---

## Key Decisions Made

### 1. Teaching Approach: Hattie B's Focus
- Students will build alongside Hattie B's as the primary use case
- NOT teaching parallel paths (own business vs. Hattie B's simultaneously)
- Advanced students CAN adapt for their own business, but we won't hold hands through that
- Post-course Loom video option for "how to do this for your own business"

### 2. Async vs. Live Content Strategy
- Demo the "how to onboard" LIVE in class (not pre-requisite)
- Record Loom video AFTER class for async consumption
- Friday session = troubleshooting/onboarding catch-up for anyone stuck
- Don't assume students have completed setup before Session 1

### 3. Agent Team (The Agentic Department)
| Agent | Role | Equivalent In Foundations |
|-------|------|---------------------------|
| **Cinnamon** | Sentiment Analysis Agent | (New - processes emotional state) |
| **Hatch** | Expert Agent | Expert Agent (connected to Librarian + Exa) |
| **Sugar** | You've Got Mail Agent | You've Got Mail (brand voice writer) |
| **Bishop** | QA Agent | QA Agent (family name = stamp of approval) |
| **Holler** | Human in the Loop / Messenger | Gigawatt Unhinged (Slack briefer) |
| **Librarian** | Agentic RAG Tool | (New - connected to Gemini File Search) |

### 4. The Librarian Architecture
- NOT directly connected to vector store
- Is an AGENT connected as a TOOL to other agents
- Uses Gemini Flash 2.5
- Connected to ALL vector stores
- Returns citations and receipts
- Any agent needing KB access pings Librarian tool instead of direct vector connection

### 5. Hatch = Expert + Research Combined
- Has N8N simple memory tool
- Has Librarian tool (KB access)
- Has Exa web search as MCP tool
- Combines expert + research agent functions into one

### 6. Homework Strategy
**Week 1 Homework:**
- Run Echo workflows to analyze brand voice
- Add brand voice outputs to Gemini file store
- Update Sugar agent with XML snippet
- Optional: Rebuild Hatch and Holler agents (they already work, but good rep)

### 7. Slide Deck Updates Needed
- Add agentic team introduction slide
- Correct agent names/functions in existing slides
- Add "what are the tools" slide before "how it all connects"
- Update agenda to include agent template updates
- Frame: "Magic show" then "Behind the curtain"

---

## Action Items Extracted

### For Tyler
- [ ] Send N8N workflow JSON to Sara for slide deck visuals
- [ ] Send comprehensive tool list (VS Code, Claude Code, Claude Desktop, GitHub CLI, N8N)
- [ ] Record async Loom: Week 1 homework walkthrough (Echo, Stacks, Sugar, optional Hatch/Holler)
- [ ] Email Ileana: Explain Loom timing change (demo in class, send after)
- [ ] Draft step-by-step setup + homework docs and share with Sara

### For Sara
- [ ] Update slide deck with correct agent names/roles
- [ ] Add agentic team slide with who's involved and when
- [ ] Add Hattie B's framing to full disclosure slide
- [ ] Add RAG/Librarian connection explanation
- [ ] Add tools overview slide
- [ ] Update methodology section context
- [ ] Simplify/clean up remaining slides

### For Both (Pre-Session)
- [ ] Run through deck together (tonight or morning)
- [ ] Final alignment on demo flow
- [ ] Confirm what screens/tabs to have open

---

## Key Quotes

**On Teaching Philosophy:**
> "We're going to demonstrate to you to make you get the reps or whatever, using an example. At the end of the course, they get a loom recording to say, hey, now you've learned how to do this. If you want to do it for your own business, this is how you would do it." - Sara

**On Setup Reality:**
> "If they're not set up, none of this matters. None of it. So I think that's where we should be focusing our time." - Sara

**On Framing:**
> "This is the magic show. And this is behind the curtains." - Sara

**On Librarian Architecture:**
> "Any agent that needs to be connected to a vector store, it's not directly connected to the vector store. Instead, it's connected to a tool that's just like pinging another agent, the librarian that's connected to the vector store." - Tyler

---

## Transcript

0:00 - Sara Davison
  What? How are you? I'm here.

0:04 - Tyler Fisk (lightmagic.ai)
  I'm here. I'm good. Just all the things today like sickness and like all this work and then I get right to the finish line and there's always like some little thing that needs to be squashed. So that's what I'm working on still.

0:18 - Sara Davison
  Okay. It's all good. I got a game plan for it.

0:20 - Tyler Fisk (lightmagic.ai)
  So we're good.

0:21 - Sara Davison
  Okay. Where do you want to start?

0:26 - Tyler Fisk (lightmagic.ai)
  Um, I mean, I guess like where, where are we at?

0:30 - Sara Davison
  Um, what are we, like, I guess, where are we at? What are we, where are we going to end up at the objective of what we're teaching tomorrow? So I can also have that context and then we can talk about the slides just so while we're looking at the slides, I, I have that context to like change things up.

0:49 - Tyler Fisk (lightmagic.ai)
  Yeah. Yeah, for sure. Okay. And then I even like fed it in the clog code again with your new one to see what it says. And it says it's kind of like what you nailed. So I guess let's just like get into it. And then we'll go through it a bit, a bit. So it's the roadmap slide for Brilliant Edition. And then it, like, calls out all this stuff. This is exactly the framing type.

1:12 - Sara Davison
  Yeah, I actually changed it a lot up. So it's not that I've, like, it's a completely different slide deck. It's not changing up one or two slides. It's the one you sent over, right?

1:24 - Tyler Fisk (lightmagic.ai)
  Like, that's different?

1:26 - Sara Davison
  Yeah, the one I sent you just now is different than the one that you saw before. Or that you previously fed into it. That's why I'm like, yeah. Got you. So it is, like, it's 24 slides in it, right? Let me just double check. 25? Yeah. Oh, 25?

1:55 - Tyler Fisk (lightmagic.ai)
  Hold on. Share. Download. Okay, what's the one that I pulled down then? Interesting. Okay, let me do it again. Maybe you were still editing it or something? don't know, like when I pulled it down, had 24 on it.

2:13 - Sara Davison
  I literally just added a slide because I was like, we haven't even introduced the agentic team that they're building. And I just added that before.

2:20 - Tyler Fisk (lightmagic.ai)
  Got you. Also, I don't have it done, like I haven't sent them through yet, but I have some nano banana prompts that I can get you to make like our little agent images for them if you want to. Or I can do it or whatever. I just was saying like, I've got that if we want to. It's not like an important thing, but I know people like love that stuff on like our current stuff.

[Transcript continues in full meeting recording]

---

## Slide-by-Slide Review Notes

### Slide: Agenda
**Current:** Vision, tech stack, demo, setup, brain dump, voice, Q&A, homework
**Missing:** Agent template/system instruction updates
**Action:** Sara to update

### Slide: Roadmap (Agentic Department)
**Added:** Shows agents and when they're introduced
**Note:** Sara used TypingMind to generate visual
**Action:** Verify agent names match actual implementation

### Slide: Full Disclosure
**Content:** 4-week curriculum condensed into 2 sessions
**Add:** Why we're using Hattie B's as use case
**Add:** Option to adapt for own business after course

### Slide: Tech Stack Demo
**Update:** Add correct agent interactions visual
**Need:** N8N workflow JSON from Tyler for accurate diagram

### Slide: Tools Overview
**Missing:** This slide doesn't exist yet
**Add:** VS Code, Claude Code, Claude Desktop, GitHub CLI, N8N
**Action:** Tyler to send comprehensive list, Sara to create slide

### Slide: How It All Connects
**Current:** Shows integration
**Prerequisite:** Tools overview slide should come before this

### Slide: Methodology (Fisk/TOAST)
**Context for Sara:** These are embedded in Claude Code skills
**Teaching point:** Explain that methodologies are integrated into templates
**Note:** This is how we show methodology without giving away full IP

### Slide: Definitions (Agents, RAG, MCPs)
**Good placement:** After tech overview, before building
**Content:** Assume students DON'T know these terms
**Verify:** Check Vicente's curriculum for assumed knowledge

### Slide: Brain vs Library
**Add:** Connect to Librarian agent explanation
**Talking point:** Brain = base LLM, Library = vector stores, Agents = prompts on top

### Slide: Why RAG
**Keep:** Good explanation of the problem
**Connect:** Librarian as the solution

### Slide: Adding Books to Library (Section 4)
**Clarify:** They're adding to Gemini file store
**Include:** Both provided content AND their brand voice outputs

### Slide: Brand Voice (Echo)
**Demo needed:** Show megadoc creation process
**Demo needed:** Show Echo workflow execution
**Demo needed:** Show outputs going to KB + Sugar agent

### Slide: Personalizing Sugar
**Content:** How to update You've Got Mail agent
**Include:** Brand voice snippet insertion
**Include:** Analyses to vector store
