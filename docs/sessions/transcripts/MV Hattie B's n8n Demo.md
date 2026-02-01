# MV Hattie B's n8n Demo

[00:00:00] 

[00:00:00] **Tyler Fisk:** Hey y'all. I'm back and I'm excited to show you all of this end-to-end Hattie B's AI team system that we have put together here. This is the entire thing that we built using Claude Code, just like you saw back in our Mindvalley Mastery sessions that we did back in December.

[00:00:17] **Tyler Fisk:** And today, I'm gonna show you exactly how it works end to end, so that you're gonna know how to build this for yourself. and what you're gonna get is the complete export of all of the different JSONs from every single workflow that we've made. Full documentation around what was built, all of our agent system instructions and prompts, the librarian tool to go ahead and get that connected into the stacks.

[00:00:41] **Tyler Fisk:** For your knowledge base that you're gonna be building out here, so that you're gonna have everything that you need to get up and running and have Claude Code go and build this for you. And then once that's done, you'll be able to use this as an example to go and replicate this system for a completely different organization, whether [00:01:00] it's gonna be yours or for a client or whatever it might be.

[00:01:02] **Tyler Fisk:** Alright, so let's go ahead and get into it.

[00:01:04] **Tyler Fisk:** So first things first, we're gonna pop over here into Gmail because I have all of this demo set up between my business account and my personal account, just to get it up and rolling. I've got an email here that we're gonna go ahead and send through. It's someone trying to find out for this coming Saturday.

[00:01:19] **Tyler Fisk:** what's the hours of the Midtown location for the Hattie B's in Nashville? So we're gonna go ahead and send this through.

[00:01:27] **Tyler Fisk:** that'll take just a moment. But once our AI team gets this email from the workflows in, n8n and then they reason. Collaborate and work together. Look through the knowledge base research on the internet and write this email that's in our brand voice. It's QA and exactly what we have in mind.

[00:01:45] **Tyler Fisk:** It's gonna send this to me at a human in the loop checkpoint in a Slack channel that we have set up right here. And I've already even got our n8n account set up. So when this agent Holler comes and chimes in with us, it's gonna show up here in just a moment.

[00:01:58] **Tyler Fisk:** So this takes just a [00:02:00] second to run. So while it's doing that, let's go walk through and look at some of the architecture of the system that you're gonna be building.

[00:02:05] **Tyler Fisk:** Let's start out right here with our Gmail trigger here. I like to call this a generative filter, if you will. And what's happening is that when we get emails in our inbox, they might not all be emails that we actually want to have our AI team respond to. And so this is responding off what's called a polling trigger, and I have it connected to my Gmail account so that anytime it gets a new email in here.

[00:02:29] **Tyler Fisk:** It's gonna go through, extract all of the different information that we need from that email, and then run it over here to this AI classification node. Now we're using a really inexpensive and fast model for this. That's Gemini Flash, 2.5. It could be the later model of 3.0 or a different model of your choice.

[00:02:47] **Tyler Fisk:** essentially all it's doing is it's looking at this new email that hit the inbox and it's determining does this pass go or not. if it does pass go, then you're gonna see it's gonna log it and the classification into a [00:03:00] Google sheet system that we have.

[00:03:01] **Tyler Fisk:** It determines if it is a customer email And if it is, it's gonna go ahead and exit this workflow and send it on over into the next workflow where our AI team will start their work. This is a key part of our system because this prevents us having our AI team spend compute and time and money and then cluttering up our slack inbox with all sorts of emails that might be coming through from vendors or spam email or marketing, like who knows what, like anything that we don't want.

[00:03:31] **Tyler Fisk:** This filtration system right here looks at the email, classifies it, and determines if it gets to pass go or not.

[00:03:39] **Tyler Fisk:** If it passes go, that's when we land over here into this workflow. This is the inbound email. It's got all six agents in it, and this is the main pipeline right here. So I know this is big to look at, but I wanted to show this zoomed out version just so you get a sense of how much is going on in here.

[00:03:57] **Tyler Fisk:** But if we zoom in. You'll see that this [00:04:00] information is now coming in from that filter. It's Pasco. These first few steps are basically getting the data ready to rock and roll, and then it hands it to our first AI agent right here. Cinnamon. Cinnamon is our sentiment analysis agent, and what it's doing is it's 

[00:04:16] **Tyler Fisk:** taking in the email and it's doing a complete vibe check of it. and then once it's complete doing that sentiment analysis, it's gonna pass it on downstream here To a formatting step. This is a de squish node that you'll see multiple of them in here.

[00:04:32] **Tyler Fisk:** And the reason that I have this here is because it makes our lives a lot easier if we can take the output and turn it into a structured format that's more machine parsable with some of the code steps that we have in our workflows. But I also want to see the agents complete kind of plain language reasoning.

[00:04:52] **Tyler Fisk:** On what it wrote, it's just much easier for us during evaluations. And it's more extensive in its explanation [00:05:00] of what it thought about the task it was doing and why, and then the actual output. But that's unstructured data and it makes it a little bit harder to work through the mechanics of our workflow in here.

[00:05:11] **Tyler Fisk:** And so that's the reason why you'll see these de squished nodes in here is that, we joke and say that you need to get comfortable with ai. Because it's a bit squishy. It's not as easy as A plus B equals C every time, because these are not deterministic outputs and we're getting a generative type output.

[00:05:31] **Tyler Fisk:** And even though we can account for every sort of situation, this is a really good use case of taking AI to take some sort of data. And then turn it into a structured output that matches a schema that we might need to run code on to, to format it, to put it into different locations, all sorts of different reasons.

[00:05:50] **Tyler Fisk:** But that's what you're seeing here. And we do this with a really inexpensive model by using Anthropic's Haiku 4.5.

[00:05:58] **Tyler Fisk:** So once we get our sentiment [00:06:00] analysis and it's done all this work, it then is gonna pass it over to our expert agent which is an expert in all things Hattie B's hot chicken. It knows about all of their restaurants, all of their locations, their menu. It's connected here to multiple different tools.

[00:06:15] **Tyler Fisk:** You can see these lines down here where it comes down to the librarian, which is our. Rag knowledge base agent that's connected to our file store that we create over in Google, Gemini's file, search rag system, and basically Hatch is able to think about. Questions, it needs to look into our internal database.

[00:06:35] **Tyler Fisk:** Send that to the librarian agent. This librarian agent can then go look through all of the information in our vector stores over there and return that information back to the hatch agent so it can do its job. Now, each of these agents can do multiple turns, which in their individual step, meaning that hash could send messages back and forth to the librarian.

[00:06:55] **Tyler Fisk:** It can log that into its short-term memory. It can use its research [00:07:00] tool to go out on the internet with this E-X-A-M-C-P tool that I have plugged in to go and find out more recent information because maybe someone's asking about, coming in to eat this Saturday, and maybe this Saturday happens to be a holiday weekend.

[00:07:14] **Tyler Fisk:** Or maybe we want to go and gather more information. Hey, the time that they're saying they're gonna come. Are there any other events going on maybe in downtown Nashville that would cause a surge in like the weight or parking or things of that nature? Being able to have both tools here to look on in our more static internal information in our rag knowledge base, and also go out on the internet and research this online with our MCP tool here using EXA, then that gets us really the best of both worlds.

[00:07:45] **Tyler Fisk:** So Hatch does all of this work, and then it passes it on down the line to the rest of the AI agent team. You'll see that we use the de squish note again to try and get that data structured and ready for the downstream agents. And now we're going over to our [00:08:00] sugar agent, which is our email copywriting agent.

[00:08:03] **Tyler Fisk:** So this agent is trained on my brand voice analysis. So if you remember, you've done your Echo voice, you've done your echo personal voice, So if you remember back in class we did our Echo brand voice analysis where we tried to understand how is it that I communicate and how do I show up in the world I have taken and written into the system instructions the way that I want my sugar agent to sound, and if that's using part of my brand voice.

[00:08:32] **Tyler Fisk:** Some blend of my voice and Hattie B's whatever sort of like dial you wanna mix in there. That's what we can do here with our sugar agent. Now it is also connected to the rag store and the knowledge base, but not necessarily everything. It's primarily trying to ask questions to ensure that it sounds authentic and on brand to Hattie Bs and to me, and I basically wanted to have this be some sort of a balance and sound like me, Tyler Fisk, [00:09:00] working as an employee.

[00:09:01] **Tyler Fisk:** Four Hattie Bs when it generates these responses. Now, nowhere in here is it gonna say that it's replying as me. It's gonna just be replying as Hattie Bs is the way that I have it set up, but it has the essence of me rolled into this in some degree. Now, this is subjective and you get to play and choose with this.

[00:09:19] **Tyler Fisk:** This is something you could work with Claude Code if you don't necessarily like. The vibe of the output that you're getting in your emails. That's something we would cover here in eval. That's something we would cover in evaluations and we'll talk on, and we'll talk about a little bit later on in our video in here.

[00:09:35] **Tyler Fisk:** But essentially the sugar agent at this point is getting the inputs from the previous agents. It's getting the original email information. It's getting the sentiment analysis from Cinon. It's getting the expert analysis and internet research from our hatch agent, and now it's passing that into our email agent to write the V one version of the email to our customer.

[00:09:56] **Tyler Fisk:** Now, it doesn't know that it's writing the V one version. It thinks it's game [00:10:00] time, but we're not gonna tell it that, and it's gonna write that email, pass it on to the de squished node to get that extracted into a structured format. And now we're ready to move on down the assembly line here. Now, if you remember the Toast Method from back in class, this is a big deal.

[00:10:17] **Tyler Fisk:** It's this idea of iterative improvement or meta prompting. It's take your output, observe it, analyze it, stick it back in and test it again. It's this idea that if you let yourself in the workflow and AI, when it's doing work to try a task. Self-reflect on what it's done well, what it's done poorly, ways that it can improve if it's adhered to any boundaries or guidelines that you have in place.

[00:10:44] **Tyler Fisk:** All of this sort of stuff. And then you have it. And then you have it basically print a report on, Hey, here's how we can do this better next time. And then you give it back to the agent and let it try it again. So we give it back to maybe our sugar agent or some other combination herein, and it tries the work [00:11:00] again.

[00:11:00] **Tyler Fisk:** It's gonna do a better job the next time around. This is the TOAST framework in practice, but we also do that here with our backstop in line as our bishop, who is our in line QA agent, it's able to go and connect into everything back over here in our internal rag database. To fact check things. It's also able to go and look at all of the work that the previous agents have done and determine is this actually valid?

[00:11:28] **Tyler Fisk:** Is it correct or not? And then it's gonna pass on its results through the de squish node

[00:11:34] **Tyler Fisk:** that then turns this into our structured data that we need. And then we hit this little. Like fork in the road here, if you will, and it's trying to determine is this passing, whatever the criteria level is that we want it to, it's assigned it a score basically. And for us, we, if I remember, and for us, we have got in here that if it is scoring like a 70% or better, we're gonna let [00:12:00] it pass, go and go on downstream to the rest of the agents.

[00:12:03] **Tyler Fisk:** If it's scored below a 70, that means we need to probably do some sort of a revision and what kind of revision do we need to do. So that's when we come down here to this next little agent. That's a really simple one, and its whole job is to determine, hey, we've made a revision choice here. Now based on this revision choice and what the bishop agent said.

[00:12:23] **Tyler Fisk:** Is there research needed or is this just something that it needs to be rewritten better so it sounds more on brand or more empathetic or something in that nature? Because then we're gonna hit this next fork in the road that if we need to do online research or look back into our internal rag knowledge base in the library.

[00:12:42] **Tyler Fisk:** Then we're gonna take this path down here. We're gonna go back to our expert agent, and it now gets the benefit of seeing everything it did before it gets the original emails, all of the outputs from the previous agents, the review from our bishop agent, and it knows now what it did [00:13:00] well, what it's missing, what additional information it needs to go get, and it does that at this step.

[00:13:05] **Tyler Fisk:** We then run through our de squished node here to get that structured again, and then we come back up here to our sugar agent. Now if for some reason we hit the revision node and we decided, hey, we don't need to go and do any more research, we just need to rewrite this thing. that's where this fork in the road goes straight over here to our sugar agent.

[00:13:24] **Tyler Fisk:** So either way, if we're coming into the revision path. We're definitely having to rewrite the email if we're down here, but we might save ourselves some money if we don't need to go out and do research or look in the internal rag again. So that's why we have this sort of like sub fork down here in this process.

[00:13:41] **Tyler Fisk:** And so now we have, given and so now we're down here in the revision path and we have given our sugar agent a lot of really good information. This is the toast method in. This is the toast method in action. It's giving it its original email, it's giving it the vibe check from [00:14:00] Cinon, the original hatch, the revision hatch if it happened, the QA from the bishop agent, and it understands what it needs to do better this time, and it's writing the finalized V two version that's going to be passed on to the human in the loop checkpoint.

[00:14:16] **Tyler Fisk:** Which is gonna bring it to us over in Slack. So it writes the new email version, it then de squishes it again and gets it ready. we log all of this into Google Sheets because here's the thing, since we have multiple different workflows, we don't necessarily carry over information or memory from one workflow to the next.

[00:14:37] **Tyler Fisk:** And so we need a system of record, is what it's called. And it doesn't have to be anything complex. We're just using Google Sheets here. We are gonna provide y'all with the exact template and schema that we use, and I'll go show it to you here in a minute. That logs everything that happens in this workflow that does two different things for us.

[00:14:55] **Tyler Fisk:** It helps keep all of the information that we've done from a workflow. Think of it as like [00:15:00] an audit trail so that when we go do evaluations. We can see what actually happened in the flow itself, and then we can improve on the system and make it better and select Hey, these are really good runs. We could use these as golden examples for shot prompts.

[00:15:15] **Tyler Fisk:** If you remember SAR and I talking about that back in class. Then we can also now use this as a memory bank as well, because you'll see in the downstream workflows, some of the agents will come back into here to extract the rows of information that it needs to pull over what's the email id, what did the agents in this workflow right here do during their run?

[00:15:38] **Tyler Fisk:** Because that's not necessarily persistent information that carries over if we don't log it into something like this. Now, after, now outside of this, you could totally swap out Google sheets for some other sort of database architecture. This could be Airtable, it could be notion,there's literally a lot of, there's literally so many choices here.

[00:15:56] **Tyler Fisk:** But just to standardize this, we've gone with Google Sheets because it makes [00:16:00] it really simple to understand and easy to set up. Once it has now logged this information, now we're moving over to our Holler agent. If you remember, Holler is like our human in the loop checkpoint agent. It is the agent that understands everything that's done.

[00:16:17] **Tyler Fisk:** it understands if it got it right on the first pass and did the V one draft and that pass go and went on this upper high road here. It knows that if it went on a revision path. And if so, which path in the revision did it have to go through? And it gets all of that information and it gets all of that information.

[00:16:35] **Tyler Fisk:** And its whole job is to write us a message. Because at this point we've just been drinking coffee, we haven't even had to do anything yet. And now hollers gonna bring this to our attention in Slack and tell us the TLDR or the skinny on what's happened, how we thought about it. The draft of the email that we have, the original email from our customer, and it sends that to us so that we can review it and [00:17:00] determine if we're ready for it to go ahead and be sent, or if there's some sort of revision or additional research that needs to be done.

[00:17:06] **Tyler Fisk:** And And so that now leads us into our next part of the workflow here. This is our Slack approval workflow, and it's basically going to watch in the same channel that Holler messages us that inin the same channel that Holler is going to message us in over in Slack. Whenever we respond to that's gonna kick off this workflow. And what then happens is it gets the data ready and then it comes up to do an, and then it comes up here to do an intent classification. And it's basically trying to determine a few different things,

[00:17:41] **Tyler Fisk:** and it's basically trying to determine a few different things. Did I suggest in plain language, I don't even have to explicitly say it that, hey, this is email to say, Hey, this email is perfect and it's ready to go ahead and send it. Please go ahead and email this on and reply to the customer. It would take a path up [00:18:00] here in the ship path.

[00:18:01] **Tyler Fisk:** If I said, or alluded to that there's some sort of revision or research that needs to be done, that's gonna take a different path. That's gonna go down the revised path right here. Then it's going to send that to another workflow that we'll see because now we need to give it back to our agents or some subset of them to go and do some sort of revision work.

[00:18:21] **Tyler Fisk:** And then once that workflow completes, it'll come back over here and send it back to us in Slack to review where we start this whole process over again. Because if, and this will probably make a lot more sense when I show you the demo the rest of the way here in a moment, but.

[00:18:37] **Tyler Fisk:** But that's what happens here on our revised path. And then the last one is going to be the confirmation path. This is a backstop. It's basically comes in and it prevents the workflow from getting into an infinite loop where if an agent comes in and chimes in, where if holler comes in and chimes into the slack channel, and for some reason that happens to slip through the cracks, wind [00:19:00] up in here and trigger this workflow, it's not going to.

[00:19:03] **Tyler Fisk:** It's not gonna rerun the whole architecture again, it's gonna log it as a confirmation step and update our system of record in Google Sheets. That's what you're seeing in these other different nodes in here, and depending on if it goes shipped, it's gonna actually send the email for us, update the Google sheet that it's been sent right here.

[00:19:21] **Tyler Fisk:** I actually have this one deactivated. This is an optional step. You could toggle this back on, but to do you need to have the label set up in your Gmail account. That's a key thing. Otherwise it'll air out. But basically it could go back once it's sent an email and put a label or a tag on it saying that, Hey, this was sent by the Hattie B's AI team.

[00:19:42] **Tyler Fisk:** And it is responded to like obviously a shorter tag, but I think you get the gist. And then once it does all that, it sends back that confirmation message to us in Slack so that we know that everything is hunky dunking and we're good to go. If it goes through the revision path now, that's where it logs [00:20:00] that it's gonna do a revision.

[00:20:01] **Tyler Fisk:** This is carryover information, and you'll see right here we have an exit door. That's because we're gonna go over to a sub workflow or a sub-process to this one. So let's go take a look at that.

[00:20:11] **Tyler Fisk:** All right, so here we are over in the sub workflow, and for those of y'all who are counting, this is workflow number four just in the production flows. So this is a comprehensive system that we're gonna be building out and. It makes it so much easier when we're able to do this in Claude code versus wiring all this together, getting all the parameters and the schemas together all manually.

[00:20:34] **Tyler Fisk:** I can tell you for sure I've done it both ways, for a long time and using Claude code as our,and us becoming more of an agent Orchestrator is such an easier path.

[00:20:45] **Tyler Fisk:** So again, in this fourth workflow right here, this is only getting called upon if we get the first message from Holler in Slack and we decide that we need to do some sort of revision. Now, whether or not that we need to have it. [00:21:00] Research something more or just rewrite it or whatever it might be. It's gonna end up here.

[00:21:06] **Tyler Fisk:** This gives it back to our hatch agent, our expert agent that's connected into our internal rag system and the web research tool in EXA again, so it can go do that. If it's called upon to do that, it can then pass it over to our sugar agent that's going to write the final draft of the email. Hopefully, if it gets it right here.

[00:21:26] **Tyler Fisk:** It's then going to take all this, parse out the information to get it ready for downstream use, and then give it back to the bishop agent so it can do a QA of this work. And then it hands all that back to our hauler agent to write its briefing for us on what happened. So ultimately it'll bring it back to us in Slack with the revised draft and what happened here in this sub workflow.

[00:21:50] **Tyler Fisk:** So once this. Happens here in two A then and it exits back out. We go back over to that previous workflow

[00:21:59] **Tyler Fisk:** [00:22:00] here, and this is where it jumps back out of the exit door, and this is where it jumps back out. The exit door gets formatted and assembled, ready to rock and roll and sends it to us in Slack with that revised output. And then that's where we would have our, another human in the loop checkpoint and we could look at this and if it wrote the improved email that time and did the research and we were happy with it, we could go ahead and tell it, Hey, this is perfect.

[00:22:26] **Tyler Fisk:** Yeah, please go ahead and send this on to the customer. And if we do. It would hit this workflow again, and that's when it would now hit the ship path. Go ahead and log all the details, send the email, and then message us back in Slack the, Hey, it was done. If for some reason it came back on that second pass and we still weren't happy with it, or maybe, it got a little worse in some ways for whatever reason it could be, then we could tell the Holler agent again, Hey, like this is.

[00:22:52] **Tyler Fisk:** We're getting there, but you forgot to do this or you didn't quite get this information in there. There's some revision still needed if we do [00:23:00] that. The hauler agent will then trigger this workflow again and send us back the revision path, and so we can get stuck in this infinite loop of getting this working and dialed in just perfect if it's necessary.

[00:23:12] **Tyler Fisk:** Hopefully we have our system, so well put together that it's writing really good quality outputs, and when it brings it to us the first time, it's just ready to go ahead and send. But just like any good AI system, if you're doing this well, if you're doing this right, you always want to continuously improve on it.

[00:23:29] **Tyler Fisk:** That means that there's gonna be things that it just doesn't know. And because we're not trying to get to perfect before we get to production, that's the whole reason for our human in the loop checkpoint, that for this flow we have set up in Slack, because that gives us a way to have a stop gap that we're not gonna have, That we're not gonna have emails sent out to our customers that are not in alignment with what our expectations are. And it also gives us a real time place to go in and make corrections, see what happened before that because we've [00:24:00] captured it all in our Google sheet and we have this complete audit record here, and we can do valuations on that to continuously improve and update our system as we have it out in production.

[00:24:11] **Tyler Fisk:** All right, so enough talk in here. Let's go check in our Slack channel and see if we've got a message from our hauler agent. 'cause we definitely should at this point.

[00:24:17] **Tyler Fisk:** Awesome. We do. So holler message back over here and you'll notice it gives me my sit rep. All of the formatting and vibe of this, we have baked into the hauler agent, but this is where you could bring your own personality or what, whatever sort of persona that you want to bake into your agents. You can have fun with it here.

[00:24:35] **Tyler Fisk:** You can see like we've even got the chicken emojis. some important notes though is that we have our execution ID up here in the top. That's an important thing because this basically is giving a breadcrumb, if you will, for when we respond to this and it goes back to those workflows. It's able to know where in the Google sheets it needs to go and pull the information from so we can go get any past historical [00:25:00] information of the V one run of revision run if we've done it.

[00:25:03] **Tyler Fisk:** and this basically is like a, this basically is a identifier that helps go pull all that information for the AI agents so that they're fully up to speed.

[00:25:12] **Tyler Fisk:** Alright, so Holler here is telling us the quick breakdown. A friendly customer. We've got a friendly customer planning ahead for a Saturday visit with straightforward questions about opening time. Reservations and wait times. It's a routine operational inquiry that it gives us our customer vibe here.

[00:25:29] **Tyler Fisk:** The heat level here is pretty low, meaning it's not urgent. It's just a thoughtful visitor getting oriented. It even adds in the complete and total original email and their email address right here. We have the draft version of our response to 'em. We have the TLDR breakdown of what Bishop, our QA agent had to think about it, and then it's giving us, its hot take on.

[00:25:52] **Tyler Fisk:** Should we go ahead and ship this and send it or not? Now we can agree with this or disagree with it, but this is just something that the system is [00:26:00] trying to tell us. So let's read through this email just to see what we have here. hey Sarah, so glad you're planning ahead to visit this Saturday. We're excited to meet you at the Midtown location.

[00:26:09] **Tyler Fisk:** Here's what you need to know. We open at 10:45 AM on Saturdays. We're counter service style, which means we don't take traditional reservations, but that's actually part of what makes Hattie B special. Everything is made fresh to order, so you're getting authentic Nashville hot chicken at its best. No sitting around waiting for a busy kitchen.

[00:26:26] **Tyler Fisk:** You order, we cook. You eat. Now about Saturday wait times. You're smart to ask. Saturdays are definitely our busiest day, especially from about 10:30 AM through early evening. Typical peak time, peak, typical peak wait times run 60 to 90 minutes depending on the time. But here's the thing that, but here's the thing.

[00:26:45] **Tyler Fisk:** But here's the thing, that weight is a sign of something good, and it is, it's for really amazing food. People come back for Hattie B's because it's worth it. if you want to beat the rush, here's a few solid options. Head in right when we open at 10 45 for a [00:27:00] much shorter weight. Afternoons around two to 4:00 PM tend to be quieter if you prefer that timing.

[00:27:05] **Tyler Fisk:** You can also check Google Maps for real time to see what the current weight is before you head over it updates throughout the day and it gives you a good sense of where we're at. That's actually a real useful tip. Saturdays are gonna be great. Y'all are going to love the experience, the heat levels, and everything about it.

[00:27:21] **Tyler Fisk:** If you have any other questions before you visit, just reach out. Can't wait to welcome you to Hattie B's. Cool. So that's a really, so that's a pretty solid email. But let's say that there's something that, I wanted to revise about it. I could now come in and just click on this thread and respond to our hauler agent and tell Hey, this is perfect.

[00:27:40] **Tyler Fisk:** Yeah, go ahead and send it. I could agree with it, but that would be the easy path to show y'all the full demo. Let's have it go do a revision. We can see what happens underneath the hood, and then we'll come back and see what we get from our agents once they've done that revision work. So I'm gonna open up my thread here and let's just talk to Holler and let's just talk to Holler like we [00:28:00] were talking to someone on our team.

[00:28:01] **Tyler Fisk:** Hey, holler. This is amazing. Thank you and the team for doing such good work. I think that this email is really exceptional. I just have a few things I wanted to give you, as pointers for an edit I want to make. First off, I think it's a really awesome tip to give to this person that if they use our online ordering and order ahead.

[00:28:20] **Tyler Fisk:** They could also cut down their wait time 'cause they could order ahead, select the time they'd like the food to be ready, and then walk straight up to the counter, pick it up. And now they're only looking for a seat at a table to sit down. So that still might take a minute because Saturdays are busy and that's our flagship location.

[00:28:37] **Tyler Fisk:** But that's a pro tip that locals know to skip the lines when all the tourists are in town to eat hot chicken. The other thing I would say is that we need to have an email sign off as well. I didn't see that in this. which is fine, but I think we need to have Hattie B's team or something like a normal signature at the bottom and maybe include, like the address for that location and the phone [00:29:00] number, something like that in the sign off too.

[00:29:01] **Tyler Fisk:** And then I think we're perfect. So go do that revision work and bring it back to me and we'll see what we.

[00:29:06] **Tyler Fisk:** Alright, so I just use Mac Whisper on my computer, like y'all remember, if y'all remember that from back in class, that allows me to just talk in plain language, record that have it transcribed locally on my computer. Then I can inject that anywhere that I have my cursor placed. So I do that all the time.

[00:29:23] **Tyler Fisk:** Y'all, normalize talking to your AI bots. I really don't type a ton anymore because I find that, once you use this, it's hard to go back because it's a pretty good job. And the really interesting thing is that even though I don't have. Perfect transcription. You can see holler is misspelled because of my southern accent.

[00:29:42] **Tyler Fisk:** Plenty of things get mistranscribed, but it's able to infer from the context of the total, like of the total situation and the message that I'm sending to it. What it is that I'm trying to say, it's basically as if I misspelled something when I was typing. It doesn't matter. These models [00:30:00] are so good, they get it.

[00:30:02] **Tyler Fisk:** So let's go in. So let's go back over to our workflows in n8n, just to show you what would be happening right now.

[00:30:09] **Tyler Fisk:** So at this stage, since I responded back in the thread of that slack message, that kicks off this trigger here for the Slack approval workflow that we looked at a moment ago. And if we click up here in the middle on the executions tab and you refresh it. You can actually see that it's running. That's this workflow that we just did.

[00:30:26] **Tyler Fisk:** So what's happening now is it's making its way through the pipes. It would've classified it, it understands that I said revision. And so now it would've taken this path. It would've exited to that other sub workflow. That goes back to the hauler agent, the sugar agent, the bishop agent to the hatch agent, the sugar agent, the bishop agent, and then ultimately to holler.

[00:30:49] **Tyler Fisk:** So write me up the update and then bring me the revision back in Slack so I can check it again and see if it's closer to what I had in mind.

[00:30:57] **Tyler Fisk:** So depending on the models that [00:31:00] you're using and the complexity of your tasks and the emails, all of the above, this isn't necessarily an instant process. It could take a few minutes.

[00:31:09] **Tyler Fisk:** Again, this is something, and depending on what you're trying to optimize for, that's where model selection comes in play. So you'll see in our systems that we're sharing with you, we use a lot. We use a combination of multiple models. In here. We're using Anthropics Sonnet 4.5. KU 4.5, Google Geminis Flash, 2.5 and 3.0.

[00:31:29] **Tyler Fisk:** That's not to say that you can't use plenty of other models. There's, OpenAI has a ton of models we could swap out in here if you prefer them. There's a lot of reasons that we could, there's a lot of nuanced and honestly Personal taste and opinion on which models are best for the job. And so we talked a lot about that back in our classes in December, so I don't wanna get caught up on that now, but I do have one additional pro tip is that when you're doing this and you push this out into production, like even beyond rebuilding this as a part of [00:32:00] the class, check out some of the models through Open Router.

[00:32:04] **Tyler Fisk:** Some of the newer models that have come out recently or as recently as of making of this video are the Kimmy K two five. Model that's out of one of the Chinese AI labs. There's also the GLM 4.7 flash, the deep seek 3.2 or the minimax models. Now AI model names are terrible, but go look into those because they're able to get the same sort of reasoning.

[00:32:30] **Tyler Fisk:** And throughput and output quality that you might expect from an Opus 4.5 or open AI 5.2, like some of their latest flagship models, they're benchmarking as close, if not closer. They're benchmarking really close, but at a fraction of the cost to actually use them. And if you use them through an API provider, like open router, like we talked about back in December, that's a good way to use those models in a safe and secure way, [00:33:00] cut down on your cost and not sacrifice quality in here also.

[00:33:04] **Tyler Fisk:** So hopefully that's a useful pro tip to you. Now let's go see if we've got a response back over in Slack from our haul agent.

[00:33:10] **Tyler Fisk:** All right, perfect. Its message is back right here, and it actually just sends it as a new message in the channel. That's just a personal preference. You could have this set up to inject it back in the same thread that I'm in, but I don't like reading in these tiny little threads in here. So when it gives me the full breakdown back, I just want it to come back as a new message in channel, and that's what I stick with.

[00:33:31] **Tyler Fisk:** So let's see what we have to say. You can see we still have the execution id and now it's marked it as revision one, and it's got my original feedback in the short form. What changed here? We added a professional signature block with location details and phone number. It expanded the out online ordering section as a pro tip as I requested.

[00:33:50] **Tyler Fisk:** It created the policy conflicts because now it's blocking shipment. oh. It's probably doing that because, they don't necessarily want you to order ahead and then dine [00:34:00] in. They want you to order ahead and take it out. But I can tell you for a fact, like everyone does this exact thing. so we still have the customer vibe and then the heat level here.

[00:34:08] **Tyler Fisk:** We also get back the original customer email and then our revised draft, and then bishop's set up here and then bishop's review of this new and then bishop's review of this updated draft here. So let's read through the draft and see how it's different. So glad you're planning ahead to visit us. So glad you're planning ahead to visit us this Saturday.

[00:34:28] **Tyler Fisk:** We're excited to meet you at the Midtown location. Here's what you need to know. We're open at 10 45 on Saturdays. We're counter service style, which means we don't take traditional reservations. That's actually part of what makes Hattie be so special. Okay? So I'm not even gonna, I'm gonna skip through this part 'cause it's basically the same.

[00:34:43] **Tyler Fisk:** And then here it's saying now, Saturday wait times. You're smart to ask. Saturdays are definitely the busiest days. Okay? We know this typical peak time. We know about that and we know that it's worth for more. If you want to beat the rush, here's the new one. Here's some solid options. Here's a pro tip local [00:35:00] use order ahead Through the online ordering system, you can place your order in advance, select exactly what time you'd like to it to be ready, and then walk straight up to the counter.

[00:35:08] **Tyler Fisk:** Pick it up. No waiting in line. You'll skip that 60 to 90 minute wait entirely. And the only thing you'll need to do is find a table to sit down. And yeah, that might still take a minute on a busy Saturday at our flagship location, but it's way better than standing in. It's way better than standing in line with all the tourists are in town for hot chicken.

[00:35:26] **Tyler Fisk:** you can also head in right between 10 45, which much shorter wait time, like I said earlier, and then the earlier afternoon times. Cool. It's left in the Google Maps. I really like that. It's a good suggestion. Saturdays going to be great. Y'all are gonna love the experience, the heat levels and everything about it.

[00:35:43] **Tyler Fisk:** If you have any other questions before you visit, just reach out. Can't wait to welcome you at Hattie B's. Then it added the signature this time with the Hattie B's team, the location data and the phone number. So it did that perfectly. Let's see what Bishop's beef is on this. I'm betting it's fussing about us giving that little [00:36:00] local tip in there because.

[00:36:01] **Tyler Fisk:** It's probably against company's official policy, but we'll see. so the revision successfully addresses one of the two human requests. Professional signature block is perfect and maintains the excellent brand voice and tone that the reviewer loved. However, it contains a critical factual error that creates a failed condition.

[00:36:19] **Tyler Fisk:** The email suggests that customers can order online and skip the line and then dine in the restaurant, but Hattie B's policy explicitly states that online orders. For offsite consumption only. I told y'all it's being prude about this. So this right here is basically a case of it's good that we have bishop's backstop in here because once this system becomes more autonomous, and we want this to be an exception to the rule where a human overrides that policy at this checkpoint and is Hey, we want to give the, we like this person, we want to give this in them this insider tip.

[00:36:54] **Tyler Fisk:** And even though it's like breaking the rules. We're not gonna get that upset about it. 'cause I can tell you for a fact [00:37:00] that people do this at every location that I've ever been to because the lines at all of their restaurants, if you've ever been to one, are bananas. It doesn't matter what time of day it is, it's usually really busy.

[00:37:11] **Tyler Fisk:** And so this is something that we frequently do. And so this is something that is frequently done, but Bishop knows that's a against official company policy. So when this system becomes more autonomous and we wanna allow it to delegate and have, we want to delegate some more of this decision making to it as we build more trust and reliability, because remember, agency and autonomy are a sliding scale.

[00:37:36] **Tyler Fisk:** Just like when you hire a person on your team, you don't give 'em the keys to the kingdom to make high level decisions in your organization on day one. They have to earn that through work and trust and like time served. Usually that's no different than the way we think about treating our agents here, but once our system is more proven, this is a good sign to me that it's not gonna make this recommendation like I just did.[00:38:00] 

[00:38:00] **Tyler Fisk:** That's good because that guardrail should be in place. That's a business decision. And we don't wanna be telling everyone, Hey, go skip the line and order ahead and then go, wait on a table and go snag it. 'cause if we did that as if we did that as not the exception, but the rule that they followed all the time, we'd have some pissed off customers.

[00:38:17] **Tyler Fisk:** I digress. I'm giving 'em the pro tip. We're gonna let it go, and now we're able to come in and tell 'em, Hey, this is great. Let's go ahead and send it. I'm gonna overrule the bishop's suggestion because ultimately we get to say what we wanna do in here. All right. Holler. This is amazing. Let's go ahead and please send this email.

[00:38:33] **Tyler Fisk:** It's good to go. I understand that it's saying stuff about ordering ahead, and Bishop was a little bit frustrated about that, but I'm overriding bishop's, thoughts about this and we can go ahead and send this email back to the customer, please. Thank you.

[00:38:46] **Tyler Fisk:** All right, so now I'm sending this back through. Then this is going to go back to that workflow that we looked at a minute ago, and let's go take a peek in here. It's going to hit the approval workflow and Slack approval, and then [00:39:00] now it's gonna take a different path as it runs through. If we look at the executions, it's now gonna take the ship path where it's gonna go, log all the information in Google.

[00:39:09] **Tyler Fisk:** In Google Sheets, it's gonna extract the, it's gonna extract and format the email that was written, send that as an email, update Google Sheets to confirm that it was actually sent and when it was sent. If we have our labeling system here turned on and set up, we could have it labeled that email and then send us the confirmation message back over in Slack when everything's all said and done.

[00:39:32] **Tyler Fisk:** Now this generally happens pretty quickly at this stage all of the time or latency in these systems. Come in the, like the V one version in any sort of like recursive revisions that we might go do, but more things of just coming in, classifying and then updating all the systems of record and then sending out the emails generally happen pretty quickly.

[00:39:54] **Tyler Fisk:** And that's exactly what's happened. Like even in that short amount of time that I was there explaining it, it's gone ahead [00:40:00] and told me that the email was sent successfully. So let's go look at it back over in Gmail real quick.

[00:40:04] **Tyler Fisk:** All right, cool. Here we are. So we're back over here.

[00:40:07] **Tyler Fisk:** Oh. If it did not log that V two version. Fuck.

[00:40:11] **Tyler Fisk:** Alright, cool. So here we are back over into the test account that I sent it from.

[00:40:14] **Tyler Fisk:** Cool. So here we are back over in my email account and you'll see we now have a response in here. So our system has worked end to end, it's reasoned and worked through all of our different AI agents. It's contacted us as a human in the loop and now it's done all this work for us. This works much faster when I'm not trying to work, when I'm not trying to show this in a demo.

[00:40:35] **Tyler Fisk:** And the way I generally suggest doing this is setting up time blocks where you come in. Talk to your agents and handle batches of emails at a time, and most of them are hopefully going to be, just telling it to ship it. You don't necessarily need to have it, revise it, because in this first email that it sent over, it was actually good enough.

[00:40:54] **Tyler Fisk:** I should have just gone ahead and sent it. I should have just gone ahead and sent it as is, but because I wanted to [00:41:00] add in that tip and also do the rest of this demo, we added on a little bit of time here. this speeds up so much work and the run cost of doing this is really inexpensive compared to the amount of work it would take a customer service rep to other team members to answer some of these complicated questions that we might get in our system in here, and to go research this and think about.

[00:41:22] **Tyler Fisk:** And to go research this and gather all the information to come back and write a really good on-brand customer service response. That's what our AI team is doing now, and the more we run this after we get it set up and we run evaluations on it. If that's when we can give the system much more autonomy, or maybe we tell it that if it scores a certain amount and it's this kind of email, then we can go ahead and auto send it so it doesn't even come in and say, Hey, here's this email for your review.

[00:41:53] **Tyler Fisk:** Instead, it comes in and says, Hey, here's some emails that we sent out and here's the ones that we already did. They auto [00:42:00] shipped. We just wanted to let you know that it happened. Everything's recorded, just so that we have a summary of those batches that are done. Now, that's not something that the system now, that's not something that the system does now, that's not something that we build into the system out of the gate.

[00:42:14] **Tyler Fisk:** this is an upgrade. We can go back in and add later with some pretty easy. This is something we can go back in and add later, is a pretty easy module that Claude Code could help you build. Once we have more trust and reliability into our AI team that we have here.

[00:42:30] **Tyler Fisk:** So now that we've seen this demo and we've seen a lot of the workflows n8n, let's talk about a few of the.

[00:42:36] **Tyler Fisk:** Now that we've seen the production workflows run, let's go look at a few of the other ones and talk about.

[00:42:42] **Tyler Fisk:** And before we jump over and start looking at the stacks or the knowledge base setup that we have built out for y'all, let's take a quick detour here and come look. At our Google sheet that we have set up. So we provide this as a schema that you can use and it has multiple different tabs in it.

[00:42:58] **Tyler Fisk:** And this basically [00:43:00] records every single run of every single step in the workflow that we need to keep records of. To be able to do evaluations and hand that information over to the AI team members as they're jumping in between workflows. It's that longer term memory to be able to go and pull that from this system of record here and what's in our workflow.

[00:43:20] **Tyler Fisk:** It's going to read, write, and update information or insert it into the system so that we're always good to go.

[00:43:27] **Tyler Fisk:** That now brings us over here to the stacks because we paid a lot of attention to the production system that's out there happening. But let's not forget the setup that we need to do beforehand. We need to be able to make the library and curate the information. We're gonna populate into our stack system here in Google Gemini, and this is just a little front end that we built out and where we can come in and choose to add in new file stores, upload files, delete them, and we even provide you all the information that you're going to need [00:44:00] already to populate your Hattie B's knowledge base.

[00:44:03] **Tyler Fisk:** In the repo so you can work with Claude Code to go get this front end set up to make it so it's a little more visually appealing and easy to go Look at the information if you'd like. If you don't want to, that's okay. You could bypass this and actually have Claude code. Add the information into your Gemini file stores on your behalf.

[00:44:24] **Tyler Fisk:** It's not quite as cool or in. It's not quite as cool and you don't have the ui ux, but it can go place the information into your library and then it could also go set up all of your workflows over here that make that possible in the future.

[00:44:39] **Tyler Fisk:** Brings us to the, that brings us to the next set of templates that you're gonna be getting in the librarian tool. This is when it goes, and

[00:44:47] **Tyler Fisk:** that's when we get these other sets of innate workflow templates that we provide y'all that go through the librarian tool, the ingestion. The ingestion process here of actually taking new information and adding it [00:45:00] up into our Gemini file store and our rag knowledge base

[00:45:03] **Tyler Fisk:** if we need to create a new store in there. So think like a new section of the library. That's what this workflow is gonna be doing.

[00:45:10] **Tyler Fisk:** If we needed to just list all of the different stores that we have in there, this workflow is able to enable that. This workflow is able to enable that feature for us.

[00:45:21] **Tyler Fisk:** We also have a list documents workflow right here that's able to list all of the work, all of the information within a certain store.

[00:45:28] **Tyler Fisk:** Then we have a simple upload workflow and a delete workflow as well if you go in and want something to be deleted from your account in there. So again, this all connects as the back end. Into what's happening over here in the stacks, and ultimately what populates the information that our librarian agent in our production workflow is connected to.

[00:45:52] **Tyler Fisk:** And then it's able to go and pull books from the shelves in here, read through it, whether that be website scrapes or YouTube transcripts, [00:46:00] internal documentation, all sorts of different kinds of info that you could put into here, and then it's going to retrieve that. Pass that information back to the AI agents in production so that they have that context when they're doing their work.

[00:46:14] **Tyler Fisk:** So now that we've talked through the entire system, let's think about the checklist of prerequisites, depending on where you are. You're gonna need to do to get all of this set up with Claude Code, you're gonna need to have VS code, which is free installed on your computer. That is basically a coding IDE, and it looks a little bit scary, but I promise it's not as bad as you might think.

[00:46:37] **Tyler Fisk:** And then in that you're gonna need to install the Claude Code extension and you're gonna need a claw. Anthropic Max plan. You can do it with a pro plan, but you might hit rate limits. spending the $100 to get on a max plan, not only for this, but to just start exploring what's now possible with Claude Code.

[00:46:56] **Tyler Fisk:** I cannot recommend that enough. It, I've been in the AI [00:47:00] space for a while now, and it is the closest thing to a GI or artificial general intelligence that we have, what we have been able to build. Using Claude Coat as our partner for that has been just mind boggling, so I really encourage you to go check that out even beyond the course.

[00:47:18] **Tyler Fisk:** You're also gonna need your NAN account. you have some options there. I generally recommend you just start out on the cloud account because it's much easier. You just go pay a monthly subscription and you get it set up. But beyond the class, but beyond class. And even if it's, and even if you want to jump into it head first, you could self-host it yourself on something like hosting her.

[00:47:41] **Tyler Fisk:** With, because inate in is actually open sourced. When you're paying them the monthly subscription, you're paying them to manage the infrastructure in here for you. But if you were to purchase a server, on something like hosting or and installate in on there, it's not terribly difficult. But that way you own your [00:48:00] infrastructure more and it's much more secure because it's running on your own devices.

[00:48:03] **Tyler Fisk:** Instead of the shared devices in here. That's not to say that the cloud account is not secure. 100% is it just gives you, it just gives you a lot more, it just gives you an air gap between other people's systems and you're able to like, and you're able to run it and you're able to do a lot more.

[00:48:21] **Tyler Fisk:** Interesting. It advanced things in there when it's on your own type account. You're also going to need the Google Cloud project set up for Gemini and for Gmail and for the Gemini file search. That's basically going and getting those API keys. And we covered a lot of that back in class, so I don't want to re, so I don't want to get into the weeds on some of that stuff.

[00:48:42] **Tyler Fisk:** In this video. We also have extensive documentation that's in the student repo, so on these sorts of things or literally any kind of question that you need to ask. Ask Claude code, ask it to go look in the repo or go research it online. I can't tell you how amazing it is to use Claude [00:49:00] Code as a thought partner to go do some of this work in class for sure.

[00:49:04] **Tyler Fisk:** But even beyond that, so if you're stuck on trying to figure out like, Hey, Tyler and Sarra said we need to go set up this rag knowledge base in Gemini, can you see what it says about that in the. Internal repo that I have pulled down in here. And also, can you walk me through what do I need to do to actually get this thing set up and rolling and it'll walk you through this whole process.

[00:49:24] **Tyler Fisk:** Then last but not least, you're gonna need a Slack workspace because that's what we have our human in the loop checkpoint set up for. Now, you don't have to leave it like this beyond our templates here. You could totally swap that out for something like Telegram or Google Chat or literally like pretty much anywhere you would want it to show up to you and swap that out with the different nodes that it's applicable for in here.

[00:49:48] **Tyler Fisk:** Again, this is something that you could talk to Claude Code with and it could make the swaps. I would really suggest for your first. Build with this, build it based off of our templates and infrastructure and follow the blueprint design [00:50:00] that we have in place. Once you get this working yourself and you get to see how all these parts and pieces, and see how all these parts and pieces really work together, that's when you could think about coming back in and upgrading it or updating it or changing it, like putting your own flavor and taste into this thing.

[00:50:16] **Tyler Fisk:** But I would really, but I really strongly suggest building it as we're suggesting to begin with. And with that slack workspace also, you're gonna need to go through the process of generating a bot token. This is basically the permissions or OAuth permissions and scopes around what we're gonna allow Slack to be able to do with our innate end system.

[00:50:38] **Tyler Fisk:** again, Claude Code has all the documentation around that and can walk you through that part of the process when it's time to go get it set up.

[00:50:45] **Tyler Fisk:** All right, y'all then for this last little part, I wanted to come over and just do a quick walkthrough of VS. Code and Claude Code and what you need to do depending on. Where you are in this process, if you have already got VS code set up and [00:51:00] Claude Code installed, and you even have the repo pull down and you're like really far along, then all you need to do is come in and open up your Claude Code tab and ask it to go pull the latest version of the student repository down from GitHub.

[00:51:16] **Tyler Fisk:** And it will be able to know what that is. Go pull the latest downloads and you'll get all of the recent assets, which have all of the JSONs for n8n, the system instructions, any new documentation and guides. It'll literally just go, it's like going up to Google Drive and pulling down the latest of everything that you haven't synced locally is what's gonna happen there.

[00:51:38] **Tyler Fisk:** But if you have not done that yet and you're trying to get this set up, I want to just do a quick walkthrough here on how do you do this in VS. Code. So you would have this downloaded once you open up vs code. Over here on the left hand side, you'll see these little boxes right here.

[00:51:55] **Tyler Fisk:** This is the extensions section, and you're gonna want to search for the [00:52:00] Claude Code app. And I've already got it installed, but it looks like this right here. And when you click on it, make sure that you are downloading the anthropic check marked official version. And then I've already done this, but you would go ahead and click install.

[00:52:15] **Tyler Fisk:** It's going to do that. And then once it completes the install, what you next have to do is go in, connect it to your Anthropic or Claude account. Now, when you do that process, please make sure that you connect it to your Max plan or your Claude Pro plan because if you don't and you choose API usage, you could totally do that, but now you're paying per token that you use 

[00:52:40] **Tyler Fisk:** versus if you use your pro or max plan, you have like X number of messages that you get to send through, and it's like all included in that one price. So highly recommend do that. Recommend doing that. I personally am on the $200 max plan and I use the daylights out of Claude [00:53:00] code all day, every day, plus the other Claude apps as well.

[00:53:04] **Tyler Fisk:** And I've like very infrequently hit the rate limiting even in the way that I'm using it. So depending on where you're at and what your budget is like, you might need to use the $20 plan, which is pro or go up to the first part of max, which is I think a hundred dollars at the current rates. and that will get you set up, but connect that to the extension when you do your setup.

[00:53:26] **Tyler Fisk:** Once that's done, you're gonna have a little icon show up here, and this is the little clawed icon. When you click on that, it's gonna open up one of these tabs. You can have more than one tab open too, which is super useful. I generally have boatloads of them open and I'm working in four or five of them actively at the same time, which is what you're able to unlock with this kind of agent work in here.

[00:53:47] **Tyler Fisk:** And you want to go to the Claude Code agent and ask it to pull down the repo that the Mindvalley team will provide you in the documentation or any sort of their messaging that they send out. And [00:54:00] it's just a URL address that you're telling Claude Code to go pull this down if you've never done it before, and copy a version of this public file store from GitHub onto your local machine.

[00:54:12] **Tyler Fisk:** And that basically takes a copy from the cloud and makes it. It makes it copied from the cloud and brings it down, and you have your own copy here on your local device,

[00:54:21] **Tyler Fisk:** So again, all you'd to do is come in here, tell Claude in plain language, Hey, I need you to go and check and see if I have this repo on my computer already. If I don't, please go to this URL and pull this down. So I have a copy that I can now open up here in the VS code and it'll go do all that work. It's gonna pop up and ask you some permissions potentially, and you're gonna walk through doing that process.

[00:54:45] **Tyler Fisk:** once you pull that down, then you're gonna have a folder on your computer. So you can come in here and click open folder. navigate to where it is that it's placed it, and then it'll just open it up here on the left hand window pane. Now you're able to come in and have all of the most [00:55:00] recent information that we have pushed up there that has all the different systems in here, and then you can start to walk through and have Claude configure and set up, depending on where you are in the process to pick up and understand the latest information that has come in.

[00:55:14] **Tyler Fisk:** And what are the changes that you need to be making in here and Claude will walk you through and even do a lot of that work for you. Now, the other credentials, it's gonna have you help set up, it might be that you need to have the GitHub CLI tool set up. If you have not done that yet, Claude can do that for you.

[00:55:31] **Tyler Fisk:** If you need to have the skill package installed for your Claude agent so it better understands how to build in n8n, it could totally do that as well. Just ask it, it can go set that up for you. same thing for n8ns MCPs, so it can connect in and actually go do the work for you over in your account in n8n and do these builds.

[00:55:52] **Tyler Fisk:** just for a quick demo, I jumped back over here into our developer version of this repository that has, some more of our like, [00:56:00] internal stuff that we worked on to get this shipped for y'all. Just to show you what this looks like when you're interacting with Claude. Hey, Claude, can you do me a favor and go look in my n8n Cloud account and check the latest run of my production workflow and ensure that it actually fired properly?

[00:56:19] **Tyler Fisk:** End to end, please. Thank you.

[00:56:21] **Tyler Fisk:** and because you would've worked through the process of getting your Claude set up. And connected to all the tools which it knows about. From that repository that you pull down, it's now able to go and do this work for you. So it's asking now to go and look in my N eight in account, which it can go and look at.

[00:56:39] **Tyler Fisk:** It can pull down all of the workflows. It could see specifically these Hattie B's workflows that we provide y'all, if they exist in there yet, how your version might be different or compare to the newer versions that it's just pulled down.

[00:56:53] **Tyler Fisk:** it can even go and trigger them to actually run the workflow and then QA it to see if something's breaking [00:57:00] or you don't have a credential set up in there yet for maybe your Gmail or Slack. It can understand that, diagnose it and then you and Claude Code together can actually go and make that fix.

[00:57:10] **Tyler Fisk:** And if you get stuck at any point throughout this, think of Claude Code as your helpful companion in here. It not only is a really smart agent that is like best in what it does right now, in my opinion, but it's that plus equipping it with the skills that we're providing you in the repo and all of the knowledge base that lives in that repository as well.

[00:57:32] **Tyler Fisk:** Claude is super well equipped to help you get this entire system set up, end to end and up and running.

[00:57:38] **Tyler Fisk:** So I would suggest that once you pull down the latest version of the student repository. To have Claude explore with subagents. And this is a key phrase because there's so much information in there that means that it'll send out multiple different agents underneath it to go and look through all the new info that came in versus what you've been building or working on.[00:58:00] 

[00:58:00] **Tyler Fisk:** And then have it come up with a game plan on what we need to do and a priority list to go and ship all of these fixes. And it will do that. It'll come up with a game plan to do all of this work. And then that's where we're gonna start working through that task list one by one. And you can have your Claude agents and yourself to complete this setup end to end.

[00:58:21] **Tyler Fisk:** and then once you finally get to a state where you have all of your workflows up and running, you have your information connected in your Gemini files store, and you're ready to start doing actual end-to-end testing. that's where Claude can even help with that. It can write you emails to go and test the system with.

[00:58:37] **Tyler Fisk:** you can then go and have it. Send the email to kick it off and try it and then qa it alongside of you because as you're learning to become a better evaluator and AI practitioner yourself will cause already a really exceptional at a lot of that stuff. What it can't do though, as it doesn't know your subjective, nuanced taste on, if you like the way that it's [00:59:00] responding to emails, if it missed something that you thought it should have answered.

[00:59:04] **Tyler Fisk:** And so going in and giving it that feedback and having it think through what are the minor changes? Research integrated solution pathway illuminated and ready. Sorry, y'all. That's my Claude code. As that's also in the repo. You can have it talk to you when it's done,but you can have Claude help you think through any sort of updates or changes based on what you're seeing during your evaluations.

[00:59:25] **Tyler Fisk:** Evals are key. Even giving it access as simply as just downloading that Google sheet after a bunch of runs. And adding that into your downloads folder, telling Claude that, Hey, go check my downloads folder and look at that spreadsheet. You can see all the run data. Help me determine where in this system we're doing really well and things that we might wanna work on, and help me run evals on these so we can dial in this Hattie B's system to be more in alignment with my expectations.

[00:59:54] **Tyler Fisk:** That is the amazing process here, is working collaboratively with AI as an orchestrator yourself. [01:00:00] Across multiple different agents.

[01:00:02] **Tyler Fisk:** And then last but not least, I just want to thank y'all on behalf of myself and Sara. Thank you so much for your patience with us back in December. We hit a ton of issues. With our n8n account that blocked us and we had time blocked out,all the time to be with y'all and get all this taught right before the holiday season.

[01:00:20] **Tyler Fisk:** And our account never got fixed until after the new year. and then life happened and the craziness started back up here in 2026. And so thank you so much for being patient with us. For getting this information to you. If you have any questions at all, please feel free to reach out to the Mindvalley team and have them relay those questions to us.

[01:00:39] **Tyler Fisk:** Or you can reach out to Sara or I on LinkedIn is probably the best way or via email in our hello at AI build lab account and we're happy to help walk you through any of this stuff. If you get stuck or just have questions or just wanna say hey, all of the above, we would love to do that.

[01:00:55] **Tyler Fisk:** And then the last thing I would say is that once you have this system [01:01:00] put together, even really, like once you have the student repo downloaded, you could instantly go to Claude and say, Hey, this is a system that's built out for Hattie B's hot chicken. And I own a business AI build lab, and I want to build an AI workflow system with this team for my business.

[01:01:18] **Tyler Fisk:** Can we look at this, study it. We don't have to reinvent the wheel. We might change some parts and pieces. Let's have a conversation, come up with a plan, and then build that new version of this system that's influenced by this one. But customize to our new use case for our new business or new tech stack parts that we need to plug into, whatever it might be.

[01:01:41] **Tyler Fisk:** But that is a really key thing here, is using your past work to serve as an influence or shot. Prompt example, if you wanna use the fancy word for it, for your new builds. I do this all of the time. Our team does this all of the time, and it's what we teach because it's a process that works. That way, every build gets easier [01:02:00] and easier, and you're building up this catalog of AI agents and agentic teams and agentic workflows that can now not only actually serve their purpose when they're in production, but when you're back in the Mad Scientist lab in here building, you can use them to help guide your new builds, and you're not starting from zero again every time.

[01:02:20] **Tyler Fisk:** So that's it for this one, y'all. We thank you so much and we wish you an awesome 2026. We can't wait to see what you've built. In fact, tag us, we'd love to see it. Email us, hit us up on social media. We can't wait to see what you build with Claude Code and in your n8n account. It's gonna be an amazing year and an even more amazing year in ai.

[01:02:40] **Tyler Fisk:** And we wish y'all the best. So that's it for this one, y'all. I'll see you later. Peace y'all. 

