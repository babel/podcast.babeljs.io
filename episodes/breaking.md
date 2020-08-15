---
title: "04: Fred Schott on Breaking Changes"
date: "2020-08-13"
time: "52"
description: "Fred Schott joins Henry to have a discussion around the topic of breaking changes in programming. We chat about Snowpack and Babel's major versions, different vision means a new name (Rome), semver, RFCs, BDFLs, breaking changes as bug fixes, forking, and more! (recorded in April)"
episodeLink: f3f8f885
embedUrl: https://share.transistor.fm/s/5820d3ef
---

### Transcript

<details>
<summary>Links

> Conversations may be edited for clarity. [(edit)](https://github.com/babel/podcast.babeljs.io/edit/master/episodes/breaking.md)

</summary>

</details>

#### Intro: What is a Breaking Change?

[00:00] **Henry**: So we already recorded this podcast and I messed up the recording. Might not be the same topics, but today I have with me Fred Schott, and we're kind of just talking a lot about open source and particularly this idea around breaking changes and what that means and how that affects things, why we do them, that whole thing.

[00:20] **Fred**: Henry. Don't worry. I got a word for word script memorized of what we talked about, so don't worry. We got this.

[00:27] **Henry**: Yeah. I think the first thing you brought up was how, I didn't know this, but you worked on request with Mikeal. I guess there's a lot of news around how it was deprecated recently and it was created in a time when Node was first out, and then now things have changed a lot, and so maybe it's not even worth changing it in a way that seems like it's a completely different project. Right.

[00:47] **Fred**: Yeah. Yeah. I think that's a very like, very top of mind kind of story for me. And I don't know if it's Babel's looking down the road at like what a Babel 8 looks like or how that works. But you know, what is a breaking change?

#### What is Snowpack: V1 to V2

[00:57] **Fred**: So for context, I think you're pretty well known and people are listening to your podcast, but I've been working on this project called snowpack, which started as a way to essentially install npm packages so that you didn't need to use a lot of other tooling for web development.

[01:11] **Fred**: So didn't need a bundler, don't need Webpack, parcel. You could essentially just set up a static file server and then load these dependencies that snowpack had installed instead of trying to load them from your node_modules directory. So sort of like a NPM alternative for web developers that sat on top of NPM, so it was like kind of this really confusing dance.

[01:29] **Fred**: Most of our feedback was, this is hard to use, how do I use this with npm? It's an after tool or a before tool? Just kind of that interplay. So I know that we're looking at a V2 where we try to address those kinds of difficulties in using it. So we're actually now a full replacement for npm. Essentially running snowpack gets you dependencies from scratch that running in the browser.

[01:52] **Fred**: And now the other question people had was, how do you use this. So starting to become a lot more opinionated about how you do development with snowpack versus being this hands-off tool. It never touched your source code.

[02:02] **Fred**: So in my world, that's a pretty big shift in terms of intention. It's still does everything that v1 did, but now it's less dependency install tool and much more web build tool, holistically.

#### When is a Breaking Change Just a New Package?

[02:12] **Fred**: So I've been thinking a lot about that story. What Mikeal had to face, which is at what point is request, this thing that everybody uses, this package that is the number three most dependent on package, at what point is a breaking change too much to ask everyone, where it actually just kills the ecosystem or forks the ecosystem. At what point is a breaking change just a new package?

[02:29] **Henry**: Right. And I guess that is the same question that Babel would face if we are, I guess we are doing a version 8, but we're trying to do minimal breaking changes. The definition of bringing change is so weird. We're not trying to do a whole different project.

[02:41] **Henry**: All we're doing is.. Say there's a syntax that's a bug, but if we fix it now, then it's going to break people. So then we're going to fix that bug as a breaking change, which is weird to say because it should just be a patch, but then it kind of disrupts everyone. So we have to do it in a major version.

[02:56] **Henry**: Or are we kind of redefine semver, which is what a lot of compilers do. Like they'll have breaking changes in their minor versions and people are okay with that. So maybe that's another proposal.

[03:06] **Fred**: I feel like redefined semver is the nicest way to put that. I think they're just not following semver.

[03:11] **Henry**: Yeah. The idea of redefining semver doesn't even make sense because semver itself has to be fixed. Once you change it semver doesn't mean anything anymore. That's weird cause semver itself is just a convention, right? You can't really enforce a lot of this stuff. And a lot of times we have bugs and then we just put them in any way, cause we know that no one's using this code, so you might as well just fix it. That happens all the time, right.

[03:34] **Fred**: Yeah. Request I remember, cause I was doing some work on that early on in my kinda JavaScript experience. Request didn't really follow semver either. It was kind of like everything was too, again, this, once you get to that size, it's like a 3.0 Release is so hazardous to the community, right.

[03:49] **Fred**: You all of a sudden you basically have two copies of requests as your ecosystem upgrades. So whether that was the right decision or not, we would pretty regularly push really small, but definitely known breaking changes that weren't really expected to hit anyone. If we were really following some semver correctly, technically that should have been a 3.0 or it should have been just to be solved later.

[04:08] **Henry**: Hmm. That's a really interesting point too, depending on the library's size too, right? If your API is one parameter and they change it to something else, it's actually very different than what people expect. But if you're a whole tool with all this stuff, all these little small breaking changes, maybe people don't really use that thing. So it doesn't feel as bad cause like it's not hitting you or whatever.

[04:27] **Fred**: Yeah. When, when you have millions of users, right? Even changing something that was unexpected behavior, not really defined. Still there's probably one person out in the world who this will break. And how do you balance that across every change you want to make.

[04:39] **Henry**: Right? Cause say there's this really esoteric syntax bug, and someone complained about it and so we fix it. But then it also causes other people to complain about that problem being fixed and they were relying on that bug then do we not change it just because, or do we change it just because it's supposed to be spec compliant and we're supposed to do that? That's hard. You kind of have to make a judgment call on every single one of those things.

#### Re-Defining Semver?

[05:02] **Fred**: Yeah. That was a really useful experience for me cause it was very much early in my career. And just being an engineer working with other people and understanding these trade offs. In my mind I was like, no it has to be semver, it has to be the right way to do it. So using these rules as these really rigid, ways to work and then really understands , no when you have a million users, all of a sudden that rigid rule maybe doesn't actually help the community.

[05:24] **Fred**: You start to have to think holistically and start to make these trade offs. I'm sure some people much further in their career than I would say, no you still follow the rules as they're written by the letter, but you know, I definitely saw that trade off play out across an ecosystem.

[05:37] **Henry**: I think it's cool when you're kind of discovering these trade offs. They were there before, but they were assumptions that we had. And then I think with experience or time, we kind of see that, Oh, it's not as black and white a lot of times.

#### Famous Coder, Bruce Lee

[05:48] **Henry**: One way to describe it I got from like Bruce Lee, which is kinda funny.

[05:51] **Fred**: Famous coder, Bruce Lee.

[05:54] **Henry**: Famous philosopher, coder. He has this thing called the three stages of cultivation, like three stages of learning. It's similar to in coding or anything, like knowledge, right?

[06:04] **Henry**: The first stage, he calls it the primitive stage where you don't know what you're doing, right? You don't have a teacher, in martial arts you have some kind of master or something.

[06:11] **Henry**: So that would be like, you're learning to code, but you haven't taken a class or you haven't read the book or watched a YouTube video. You just kinda like, do whatever you find errors, you fix them. For fighting, you don't know how to fight, but at least you are using your personality, your intuition. You're like going with the flow of what you know, and eventually you're like, Oh, you, you realize I don't know what I'm talking about and so I'm going to learn it from somebody. So you researched some stuff, you get a master, you take a class, right? You take a read a JavaScript book or something, then you get to the second stage.

[06:41] **Henry**: Oh, it's called the mechanical stage. You memorize a bunch of stuff, you know that there's the way of doing things, right. Semver is this, the spec is this. That's cool because now you feel like you know something, but then you kind of lost your personal sense of how you think it should be, cause you're just following someone.

[07:00] **Henry**: That means the third step is just artlessness or something, where it's like you kind of soak in or embody those things so that you don't really have to think about them anymore. So in terms of fighting, you don't have to think, Oh, I should punch here. You kind of just do it naturally.

[07:15] **Fred**: It becomes like instinct, nature. Yeah.

[07:17] **Henry**: So with coding, maybe it's similar. I kind of understand what semver is to me, and I don't have a rigid definition. It kind of changes and I kind of learned what that is.

[07:27] **Fred**: Yeah, I remember prototyping something at an old company and my boss looking at my code and being like, what are you doing? No one writes code like this.

[07:34] **Fred**: I'd like put JavaScript like inline in the HTML to like modify.. It was really hacky code, but this is the fastest way I know how to move. I don't really think about this being right or wrong. I see sometimes myself doing that. Yeah, I can relate to that, although I'm sure everyone thinks that they're at that final enlightenment stage and we also all have so much room to grow.

[07:52] **Henry**: Oh yeah, for sure. I think we turn towards the second stage because it makes it feel like we're right or it's complete. And the third stage, it's about like living it out, right? The things that you believe, and I think that's where we realize we're either a hypocrite or we don't know as much as we know, right. It's a humbling stage, I think. I would hope at least.

[08:11] **Henry**: So deciding the smallest things , someone reports this bug and you should release it. Should it be a patch, should it be a minor, should be a major. That is like really stressful. And sometimes you accidentally merge something and it should have been a patch or the opposite and you're like, Oh, whatever.

[08:27] **Fred**: Definitely.

#### Commit: "fix stuff"

[08:28] **Henry**: It's kind of like if you're making your first pull request, you try really hard to make sure the title is good and the body and all this stuff, and then later, when you're doing open opensource maintenance the commit is just like "fix stuff" or something, right.

[08:40] **Fred**: I'll get silly. I'll just have like a really generic commit message and then whatever I'm ready to check in code, I'll just like press up to grab that commit message. Just like update, update, update. Yeah. It's pretty gross.

[08:49] **Henry**: Yeah, exactly. So I think it's interesting that when you're in this beginning, you're really afraid, which is normal, but then later you kind of relax and then I think maybe it's bad that we forget what it's like to start off and then we need to tell people, we can help you get started.

[09:04] **Fred**: Yeah. I don't know if everyone thinks the same way about this, but in my mind this is still open source. Most of us are doing it because we like it. Not we get fired if we don't do it well or if something breaks, you know?

[09:13] **Fred**: That's the nice part about being a maintainer of an open source project. It's like we're all kind of just working on this thing for fun and to help people. I think I definitely, early on in my open source, I was buttoned up, here's exactly, like you said, a purely written out pull request, because I really wanted to do a good job and not break anything. But mistakes happen and it's a part of it.

#### On RFCs

[09:32] **Henry**: Yeah, I guess it's like how do you balance that? Cause one extreme would be kind of just don't care about anything. But now we kind of know that open source where you can do whatever you want doesn't work because you know it's the same issue. I mean if you want to get into governance in general of the whole laissez-faire type deal or top down approach where we actually do need some kind of organization when your project is older.

[09:52] **Henry**: Actually, this happened recently, so our project is really big and you might want to make changes that it might not be breaking, but just add new features. And I made like an RFC repo, requests for comment, like four years ago, but we never used it, and now we finally have one. That's like a formalization that before it was just making an issue, you make a PR and you would just release it. And then now it's like, I want feedback before we even start working on it.

[10:15] **Fred**: Yeah, I mean, Babel is definitely the size where that makes a ton of sense. Can't just be like whatever you want or whatever any maintainer wants. Yeah. I think that makes sense, especially that size.

[10:25] **Henry**: Right. It just feels irresponsible otherwise, unless you.. One way of doing it is you decided to make the prototype anyway, sorta like with preset modules, right? Jason did that on his own. He didn't really talk about it, decided to share it and then get feedback from us, and then we decided to work together to put it under the Babel org first, release, and then merge it into our monorepo and then merging into preset-env. So there's like a whole transition period that kind of just played out and it worked out pretty well.

[10:51] **Henry**: In Babel eight, that would be a breaking change where we would just enable that flag on by default. So our new approach with breaking changes in terms of this project, which we want to be more stable, is most the banking changes probably won't affect anyone, or it will just be various small things. And then turning off and on certain flags that we want to be by default because we think it's better behavior, right.

[11:14] **Fred**: Yeah, that makes sense. I mean, I'm sure you can have people on who are like thinking about governance all the time of open source. Like that is not at all my like main thought or at least my main focus, but I see that a lot where it's like early on you have someone who has a vision and the whole open source project is really just by a numbers problem.

[11:33] **Fred**: They're doing a lot of the work. They're leading that vision. They're kind of like doing that v1 right? And then there's like that middle period where it's like now other people are using it and they have feature requests, but it's still that main person controlling, dictator for life, right? Thumbs up, thumbs down, what gets in.

[11:47] **Fred**: And then at a certain point, that person probably no longer has a full vision of how their code is being used. They have lost sight or maybe that vision is now complete. So they just kinda like, lose it. Great, I did what I was going to do.

[11:59] **Fred**: Well, now that's where that RFC becomes so important because it's like now the people using it actually like really have insight into how it's being used and have real needs that they've fleshed out and probably have the best insight into what the best development is. I don't know, it sounds like you guys have done a pretty good job with transitioning vision to actual, governance of a group of people using something. But that's a tough transition.

#### Project Vision: BDFLs and more

[12:22] **Henry**: I mentioned before that I joined the project by accident; a lot of other people just kind of was there. Sebastian kind of let the project go and we had to figure it out. So none of us created the project and didn't really understand a lot of the code. I think that attitude's different where it's like you try not to change anything by default, right. I didn't want to break anything cause I don't know how that would affect people.

[12:45] **Henry**: And I think it's important for people to know what state they're in and how that affects things. Cause one scenario you had was if you're the BDFL, the dictator for life, and then you don't really have a lot of collaborators, but a lot of people are using it. And so the problem is that you're not really using your code to the extreme where all these other people are, and they're the ones trying to ask for feature requests.

[13:07] **Henry**: But another scenario is that you get enough users such that some people are willing to even help out and they become collaborators and then they have a different mental model of the project than you, and then the features that they come up with or what they PR or don't align with what your vision is and you have to figure out how to communicate that.

[13:25] **Henry**: Right. And that's what happens when you have multiple maintainers, right? Like in Babel's case, we will have that, and that doesn't mean we're all aligned on that. And it doesn't mean we don't work together, but I'm just saying that the actual model, it might be different.

[13:38] **Fred**: Right. Yeah. I think Twitter is like a really interesting example, I think they lost their visionary, right? I think Jack left or was kicked out or whatever, and for awhile they struggled to make any change at all. When you lose the person with the vision, it's like, Oh, well who am I to say what the new vision is? I think for forever they weren't gonna touch, tweet count, character count, images, all these different things that they were too scared to touch because what happens when you lose the vision? How'd you get that back?

[14:02] **Fred**: If there's been someone else who always kind of gave the thumbs up on that and then that person's gone. I could see that being very hard to get back the ability to make any breaking change, because is this the right freaking change? I've always had someone else kind of make that call.

[14:16] **Henry**: Right? I actually felt the exact same thing where, it just feels like when you have the leader and they say yes, you feel better about it. It's sorta like you can still do the same work without being.. actually, someone told me this in small group for church. Cause I was saying I can do all these things as a just "regular" person.

[14:32] **Henry**: But he was saying that if you do it as a leader, it's the same action, but as a leader people take it more seriously or whatever. So I guess having that person that all they do is just say yes or no. I mean, it's enough, it's important to have that because otherwise you have the whole, if everyone disagrees and you just argue a lot, or everyone just does whatever they want, and from a coding point of view, it becomes this mess, everyone adds their own feature that don't actually make sense together, right.

[14:57] **Fred**: Yeah. I think that's right. I think knowing the vision is a big part of that. That confidence in knowing exactly without being like, Oh, is this right or is this right? I think that's what I've been trying to do a lot with snowpack is at least like, here's the vision and then we'll make breaking changes that move us towards that vision. And that being the hueristic, kind of like as we go, deciding what a 2.0 release by just like grabbing out of a bag and no there's a thing we're trying to accomplish. And then trying to pull in breaking changes that support that.

[15:21] **Henry**: I think it's hard to kind of build that confidence of making these decisions where from the technical point of view, you could always revert things. Once you release people expect certain things and it's hard to take that back, I guess, unless you kind of figure out flags or something.

#### On Removing Babel's TC39 Stage Presets

[15:34] **Henry**: I mentioned there are a few things that we did that break that people were not expecting, removing the stage presets. All the tutorials online and videos, they're all referencing that. And then in a breaking change where like, Oh, we just got rid of it. You're just going to be like, why?

[15:47] **Fred**: You all did that with a like a warning, right? At least like a deprecation or something.

[15:52] **Henry**: We did a lot of things.

[15:53] **Fred**: Okay, good. That helps.

[15:54] **Henry**: I think we made a warning on the current version, so Babel 6, that we're going to remove it later and this is how you would do the equivalent. Because in that case, the preset is just a list. So you could just manually specify that stuff yourself.

[16:07] **Henry**: And the reason why we did that was because we want you to know what syntax you're allowing, cause they're not standard. So it makes sense that if they break, then that you opted in and they don't complain to us when something changes cause you opted in. And then in 7 it's still there, I think we just do an error that tells you what to do. I even wrote a whole blog post about that specific change, removing presets, that's how serious that it was. I thought least. And it seemed like it was fine. I didn't hear a lot of buzz around that. Maybe no one really cared cause it's just a list, right.

[16:38] **Fred**: Yeah. Well, it's also having that warrant, if you can put some sort of instruction in the CLI that when it breaks, it says, do this instead. For a lot of people, at least, whenever I see a breaking change and there's no help for how to solve it, that's when I'm like, Oh no, what do I do? But if it's like, Hey, this has gone, use this instead, and if that's a simple change that I'm like, okay, that makes sense.

[16:58] **Henry**: When it's just some config stuff anyway, we need to tell you how simple this thing actually is, and so you can do it yourself. It was a convenience on our part that we had to maintain that. Sort of like, Babel polyfill is just an import of core-js, it's just an alias.

#### Communicating Breaking Changes: React, Yarn, etc

[17:12] **Fred**: Yeah. The React team I think is like probably the best with this, where it's like they'd never have a breaking change. It's just always new feature and then deprecation notice, and then strict mode and all these different things that can kind of help you move forward. I think they keep supporting basically anything that ran in the original 16.0 whatever, they're on 13.

[17:29] **Henry**: Which was good. I guess we've all collectively learned from, you could say certain mistakes and all these other different things people reference all the time, right?

[17:37] **Henry**: The problem is with the tooling, we still do break stuff. So it would be nice if like. Well, one of the problems is with plugin system, I guess you can have a plugin Babel of five, six, seven, eight, and they all might not work in the new one. So that sucks.

[17:51] **Fred**: I wonder where yarn fits into this conversation. I'm trying to now find examples of things that I've just described would have been good and maybe weren't as great, yarn clearly had a vision for their Yarn 2, but there was a vision that people maybe weren't ready for or maybe it didn't align with what the community wanted out of yarn at that time, or at least it pushed too far too soon.

[18:10] **Fred**: I don't know what the general kind of consensus on that is, but it seemed to be a lot of pushback when they said no, we're getting rid of node modules where everything is in this internally managed place, and then you have to use yarn to run your node code so that we can point those imports correctly.

[18:25] **Fred**: I think at the time that got a lot of pushback. Okay, this is pretty wild vision. That seems like a really interesting direction, but I'm not ready for this. Like, my tools don't work with this. I don't work with this. And like, maybe they were just like in this position where they felt they had to push at some point, but was that the right moment?

[18:39] **Henry**: Yeah. That's like the huge communication aspect of all this stuff and react is doing a good job of that. If everything is a minor and is a new feature, then I think that's better than being like, Oh, this is the new way.

[18:51] **Henry**: They go out of their way to say, you can still use the old way, but we recommend this way, assuming that it's good people will actually switch. So the thing that maybe with yarn is that like maybe it actually is better, but it's so different and I guess they weren't able to communicate that enough that people aren't even willing to try at all, right?

[19:08] **Fred**: And communicating the why, right? Like as a library author, I totally get now instead of having a thousand copies of my package everywhere across your machine, there's only going to be one. That sounds good. But like as a user, it's like now I'm trading uncertainty for a solution to a problem, I maybe didn't even realize I had. Or even if I realized that maybe it's not that bad. Versus all this uncertainty of will my tools work now versus will they not work? How do you communicate to the actual person who has to, at the end of the day, install yarn? How do you communicate that benefit to them? And like, really is there a benefit maybe for a lot people, there wasn't much of one.

#### Are the Changes We Make Even Helpful?

[19:40] **Henry**: I mean, that's the problem. I think a lot of times, most of the changes we make are not that helpful to people.

[19:46] **Fred**: Yeah, right. That's a great point.

[19:49] **Henry**: Why are we even going out of our way to finish that, do that work then? I don't know if it's like sort of this completionist attitude. You know in games, where you try to do a hundred percent of the game. It's the same with the issue count or your notifications and just because someone told me there's a bug, it doesn't mean I don't want to help them, but the answer isn't necessarily fix that thing, right.

[20:09] **Fred**: Yeah. It's like your vision that you want to kind of drive towards has to both match the real. It has to be useful to the person who at the end of the day is using what you're using and then you have to get there in a smart way. Snowpack, the first version was just like, this is a cool vision. This is not me being humble, but like I thought the vision was very cool. And then I don't know if it actually got users to where I'd hoped it would, right. Where it's like, this is cool. It installs packages, but like building an app is so much more than just having packages. It's like, how do I transform my source code? How do I connect it all together? Luckily it was a v1, so it's like use it or don't. But if I've had existing users and then launched that.. Well, I don't know if this actually solves my problem yet. It was essentially incomplete versus what we're shipping in the v2. So you kinda need both. You need to solve a problem and also have a clear vision that communicates why you're going that way.

[20:56] **Henry**: Yeah. Cause if you just said, all it does is help you with your dependencies, maybe that would change how people use it. I don't know if there's like a natural inclination to increase scope, right? Oh, it's a compiler and now it's a bundler and now it's whatever.

#### Different Vision, Different Name

[21:10] **Henry**: And that's what Rome is, but that's a whole different vision. Right? But maybe you started out with something specific and then it does everything or something.

[21:18] **Fred**: Right. Just because you want to be something doesn't mean it's like the right fit. It goes back to that, would it have made sense for requests to have like drop this whole interface in exchange for a promise based interface because like you think that's the right thing, but you can also just build a new version of request under a totally different name, which I think is what Mikeal ended up doing. I can't remember what it's called.

[21:37] **Henry**: There's a bunch, he made a lot of them actually.

[21:39] **Fred**: That sounds about right. This idea of like, you can still pursue that vision, that idea that you want to see come into the world, but maybe it's just not right for the project that you're using, even though it has a bunch of users and you think you could have a ton of impact. Could Yarn 2 have been a different package manager entirely?

[21:54] **Henry**: I remember I watched some Rich Hickey talk about this, which was interesting. He had a rant about like semver basically, and he was saying in, I don't know if it was in Java land cause Clojure. Right ? The way they do things sometimes is they don't make breaking changes. They just make a new package name or a new method. So it could just be method two, method three. And so nothing ever breaks. You just tell people to change.

#### React 17, Babel 8?

[22:18] **Fred**: I mean think of the chaos if React ever did release a version 17 right? Like every dependency within a react project that had expected 16 you know, it had been pinned to that version. Cause that's the default, right? It's like I want you to have a peer that is just like this major version.

[22:34] **Fred**: I don't know what the next major version is, so I don't like wanna make assumptions. I'm just going to pin my thing to rely on react 16. Like the whole ecosystem is built that way. So if you have a real launch, they react 17 it's like now everything within a react project would want you to install both 17 and 16. It might be smart for them to never release a breaking change ever again because of like how do you outweigh that cost of like chaos of having two different versions of React in your project.

[22:59] **Henry**: Well, yeah, that's why I don't think I want to make a Babel 8, even though we're doing that. I'd rather not. Even if all you have to do is change the number to seven to eight. You don't actually have to do that because your dependencies are all on the other one.

[23:11] **Fred**: Oh yeah. The Babel six to seven. I remember that being like a tricky transition, not because of my own code, but just every plugin that I had wasn't built for it. So now it's like trying to use both and it's an expensive transition when you're the size of a Babel or react or angular.

[23:26] **Henry**: Yeah, I guess for eight, I looked at lot of the stuff that we're changing. It's like a lot of weird stuff. We have a bug with the way we handle JSX. Like if you put a less than sign inside of JSXText, like the contents of JSX, we allow you to have that symbol and it's not allowed, so we get rid of it.

[23:44] **Henry**: But probably nobody is doing it. If you are the replacement is you have to do the brackets with quotes. Just wrap it, so it's a really easy change. But even that, if one random package does that, we have to ask them to fix it and they have to update. So it's the most trivial change for that one package, but.

[23:58] **Fred**: I think that the ecosystem would be in a lot worse position if every time that decision had to be made, it was always strictly, Nope, one person's broken. We might not even know if that's true, but we think it might be true. So we have to cut a new package.

#### Rationalizing Breaking Changes as Bug Fixes

[24:10] **Henry**: I think that's the weird thing where it's like, that is so small. I feel like we could have just made that in a patch and just deal with it. Because probably no one would complain.

[24:18] **Fred**: Well, That's the mental trick, right? That's like the way you rationalize it is. No, no, no. This isn't a breaking change. This is a bug fix. You shouldn't have been doing that and now we're going to break if you do it instead of just being undefined. I get that. I think that makes a lot of sense in a lot of cases.

[24:33] **Henry**: Right? I think that would be one of those cases, but we're just being safe. So that's the trade off too, because eventually you just have accumulation of all these small little things. And actually in some sense, it would be better if you slowly break like over time instead of break a bunch of things at once, which is kind of odd to think about.

[24:52] **Henry**: If these are all library code, dependencies, then we need something similar to what GitHub's doing with security. If we make this breaking change, I want to be able to run that code on all the libraries to update them before we even release it to users so that it's breaking, but then it actually doesn't hit anyone because we already fixed it.

[25:12] **Fred**: There's an underlying kind of other story here, which is that the npm ecosystem could be a lot more powerful. This was one thing I was trying to tackle with the registry. Pika is the open source project that all this stuff I'm doing is under like as an umbrella.

[25:23] **Fred**: And one of the things we launched was this idea of a new registry. There's a world where the registry is a lot more interactive in that like you can publish a new version or publish a PR for a new version of a Babel plugin and the ecosystem could go out and basically update that for everyone who will get it and then report back to you the results of that

[25:40] **Henry**: Yes, yes, exactly.

[25:42] **Fred**: Really what that means is the connection of source code to package code, which had been, npm owns a package, GitHub usually, or Bitbucket or Gitlab owns the source code, but they're disconnected. GitHub. owning npm now introduces a lot of opportunity for that problem to be solved. You could essentially confirm that there were no breaking changes, at least as powerfully as everyone's CI testing setup was. Which is a really powerful idea for an ecosystem.

#### Breaking Changes and Plugin Ecosystem

[26:09] **Henry**: Yeah. That would be amazing, honestly. Another idea was if we standardized making a Babel plugin, say there's incentive to use some package to test a Babel plugin. In that package we could update it to be like, you should change this because we're going to fix it in seven. That way it only affects plugin authors rather than everyone that uses it. So the problem is I don't want random user to get this error message. I only want the plugin developer to get it so they can make a fix in the patch and then it would propagate.

[26:36] **Fred**: Yeah. Like that kind of logging control for different consumers. There's probably a sneaky way to do that, right? Like check the file that's running this, and if it's in node module, I don't know. I would love to see better plugin logging control. I mean, my use case was really specific. It's like I'm piping files through standard in. And then taking the result of the Babel CLI as standard out. So any console log message inside of a plugin becomes like a part of the final file. Which is like such a specific use case that most people don't see. So it's like plugins were written just to log whatever, but you could see Babel controlling that in such a way where it's either providing your own logger or like overriding console log where you could like totally a deprecation notice or something like that inside of a plugin. Essentially control that environment of how the plugin communicates to the user.

[27:20] **Henry**: That's a lot of stuff that.. Initially you wouldn't probably think about any of this, but we're in a place where we can think a little bit farther than just like making plugins and making proposals, but how to help people. Like the whole Codesandbox stuff. I'm trying to work on with like making a plugin on the website so you don't have to install anything, right. It just works. Maybe it should be able to publish from that code, that kind of stuff.

[27:42] **Fred**: Yeah. There's nothing wrong with the vision being like, okay, we're doing this pretty well now let's just do it like the best it possibly could be. You could get like a lot of mileage out of just really honing in on the plugin experience, documenting the types. Maybe even simplifying the types. I know I've always had a lot of trouble with what is this Babel types object, that has always been a little bit of a kind of and error for me.

[28:03] **Henry**: Auto-complete that kind of thing. There's also some interesting stuff that people probably don't know about. I think we mentioned Babel template before. So before, if you want to create an AST. I want to inject a code that creates a function or something you'd have to do like t.function and pass all this stuff in. And so you can use Babel template. It's like a template string, but with a plugin, you literally type out function as a string and then it'll create that node for you.

[28:28] **Henry**: The opposite is also difficult, which is like asserting something. So I want to only change something if this is true. So like in a code mod, I'm trying to find an import statement or require. I have to do a bunch of if statements, like if the type is this, and then if it has this value and this name, and it's a bunch of ifs, right?

#### Reverse Transforms for All Proposals

[28:44] **Fred**: Oh my God. Yeah. Henry, if Babel could ship with like every plugin that made a transformation, had to also shift the reverse transformation, like essentially a database migration, right? You have to provide both up and down. That would be amazing because then you could basically power an exactly perfect version taking this compile code and reverting it back if they're something in your node modules, that's been transpiled that would be amazing.

[29:06] **Henry**: I wanted that. I don't know how that would work, but my desire was like every proposal should have the backwards and forwards version because the forwards version will allow existing code to automatically upgrade to the new syntax so that it's easy to try out that code. And then you should also be able to get rid of the proposal as soon as possible because if it breaks or it changes, then it seamless, no one has to be afraid of using a proposal because they might go away or it might change.

[29:36] **Henry**: If we had a transformation, then it would be easy to try it, and then more people are willing to use it. That means the committee gets more feedback on usage. that kind of thing. There's less churn. The problem is it's just so generic and vague that there's just so many edge cases and that kind of stuff. It's like impossible.

[29:52] **Fred**: Yeah. Like I wonder if like comments maybe could help, but then do those get stripped out? Like if you could somehow add like a little comment being like, this is the original block.

[29:59] **Henry**: You can totally inject. I know a lot of tools like Webpack definitely does that and we don't do that at all. We could do like, this got changed because of this function or something.

[30:09] **Fred**: Yeah. Like, I mean, Babel is not going away anytime soon, so I think it's such an interesting, amazing position that the tool is in where it's like an improvement inside of Babel, like literally affects everyone essentially. Like that project that Jason worked on to fix some problems in older browsers instead of having to like essentially saving bytes across an entire ecosystem. That's like the entire internet becomes faster when you make that change within Babel.

#### Project Sustainability and Sponsorship

[30:29] **Henry**: Exactly. The part of the problem kind of is that we just don't have a lot of people working on it. Even though Jason did that and is a good one time thing, that's just like the current bugs that we're fixing. Obviously over time they're going to be more bugs. This is like literally a whole new feature. Who's gonna work on that? How do we prioritize all these, I think that's hard. Jason is working on this uncompiler thing, or at least he was, I don't know if he's still doing it. In theory whatever you want to call it.

[30:56] **Fred**: Yeah. I think that's interesting to hear from you because I think of like Babel, Webpack, like some projects is having like not unlimited resources, but like. Man, if these projects can't solve it, then like what are the rest of us doing? Like I feel like it's such a testament to like, I don't think we know how to incentivize open source work correctly.

[31:16] **Fred**: Like sponsorship is an option, but it requires a lot of outreach and what you're doing right now I think. Everyone in their mind just wants this idea of like, Oh, I'll just work on open source and like, I'll get money for it from this like amorphous community. But really, you kinda have to become this person who goes out and sells yourself as a sponsorship.

[31:31] **Henry**: Right?

[31:31] **Fred**: This Instagram personality for coders. It's very strange.

[31:34] **Henry**: Yeah. So I think that's a good point where it's the whole amorphous community, and it's like the idea is that you get money from random people, but actually the way you get money is you have to know them. Random people aren't going to give you money, especially in this..

[31:46] **Fred**: And meanwhile, then companies keep getting all the value out of open source without really ever contributing back, at least adequately. I think some companies do this pretty well, but it's be good sports. How do we, yeah, it's definetely an unsolved problem.

[31:58] **Henry**: It's very similar to YouTube or Instagram. The thing about YouTube and and them getting money from patron is that people that use, if you want to use the word you use, I guess they watch or they listen to these people. They know those people very well, because for YouTube, they see their face and they're here hearing them every day. For podcasts, they're hearing them all the time. Instagram, they're seeing whatever they're doing, they're blogging or something.

[32:21] **Henry**: Open source, you don't see the people working on it at all. The whole point is that you don't need to know. That's the good thing. The bad thing is that that makes it hard to raise money because no one knows who you are. So maybe, yeah, you feel like you have to become some kind of celebrity or whatever, or try to attempt to be, but I don't like doing that. That's why I don't like tweet that much. it's not that fun, I guess, to me.

[32:43] **Fred**: Yeah. It depends on what you like.

[32:45] **Henry**: Yeah, it depends on what you like. And I think some people, they like using Twitter a lot. I mean, if you use Twitter more, you'll have more followers, you have more engagement and all that stuff. I do want to talk to people. I think I don't like the broadcast way of doing a lot of this stuff. Although it's not like I'm not doing it at all, cause you kind of have to, if no one knows who you are, you can't do any of this. But how much are you focusing on that stuff?

#### Streaming Coding

[33:07] **Fred**: Have you ever like live streams yourself? Coding?

[33:10] **Henry**: I did it like, I think two or three times. I haven't done it enough to, I think a big part of it is just like when you do anything new, you feel uncomfortable. So I had this problem of feeling awkward, not seeing who I'm talking to cause I'm just talking to the screen and people might say something on the chat, but you have to pay attention to that. So I just got someone else on the team or just someone else to be on this call while I'm coding so you could talk. just have someone there.

[33:39] **Fred**: It's like left brain and right brain at the same time. That's always tough to do. If you can like kind of let someone else be the right brain while you're just like.

[33:46] **Henry**: But then you have the scheduling of like, Oh, they have to be free when you're free kind of thing. The nice thing about one person, you just do it I guess. We have done like these coding sessions with the team, so it's sort of like an evolution of that where we have maybe a simpler PR that we can explain. And then we all just work on it together using vs code live share.

[34:03] **Fred**: Oh smart. Yeah. It's more like a pair programming session live, so it's less like you having to talk to this amorphous again, audience, it's less that and more like, Oh, this is us working on something together. Come be a part of that.

[34:15] **Henry**: Right, you the fly on the wall while we're doing it. That was fine. We did like at least three or four of those so far. It's sort of feels a grind cause you're already doing that anyway, but it's more fun. I'd rather code when there are other people. Personally. Some people for sure, they just want to code, but I like when we could talk through stuff. I think that's cool. Live streaming in that way, but I haven't really done it much.

[34:34] **Fred**: Yeah. It's definitely more work, but I've thought about that. Same here. I haven't really pulled the trigger on it, but I liked the idea of a pair programming session that's live. I think that kind of solves my concern of , I'm too left brain when I'm coding. I don't know if I'd be able to like juggle a conversation and the work.

[34:49] **Henry**: Yeah. Because that person can help prompt you and be like, Oh, what are you working on here? Or can you explain this, cause I'm not familiar with the code or something like that. I see a lot YouTubers do that, like MPJ. He'll ask someone else to come on that's an expert in something and he'll code it and then they'll help him.

[35:05] **Fred**: That's a great idea. Yeah.

[35:06] **Henry**: He would like write a Babel plugin, but I would help them like write it or something. But I think that'd be cool if we did that on other people's projects. If I wanted to contribute to Webpack or snowpack or rollup or or react or whatever it is, I'd be kind of interesting cause every project wants more people to contribute. There's docs and stuff, but walking through the code and seeing how things work, I think that would be nice. From someone that is not familiar but maybe is experienced in open source or coding in general, but they don't know that domain.

[35:33] **Fred**: Yeah. It doesn't even have to be like, Oh, look at this famous person helping Fred or Henry. It could just be like, Hey, does anyone know Babel plugins? I need some help with the snowpack one. And then like that would be the episode or whatever. We end up calling that.

[35:45] **Henry**: Exactly. Actually, we did this once. This is kind of cool. We made like a good first issue to I guess update a plugin or something, and we asked the person that volunteered to do it if they wanted to join the call, and we did the same thing except we just helped them work on it basically, and then we just record that. As long as they're okay with that.

[36:03] **Fred**: Oh, cool. That worked? Nice. Would you do that again?

[36:07] **Henry**: sure.

[36:07] **Fred**: Okay, there you go. I was like, Oh, great. There's the test.

#### The Difficulty of Reaching Out

[36:11] **Henry**: It's sort of like meeting up with people in this time where you're like, you have to be intentional about like, Hey, let's do it. It's so funny, I feel like this is true for almost everything. You just need one person to just say like, let's do it. And everyone's suddenly, they're all waiting. Everyone's waiting for someone to ask them.

[36:26] **Fred**: yeah. I think that's right. I mean, we wouldn't be talking right now if you hadn't reached out, so it definitely proves that point.

[36:32] **Henry**: Yeah. And I have a lot of fun and just like kind of chatting, so I feel more productive when I can like talk through things. I think maybe the point is that like, we don't really do that a lot in open source. I think I've said this before, people talk a lot about stuff on Twitter. They interact on GitHub, but people aren't really like collaborating in the open, I guess, kind of making a call. That's why like nobody understands how anything works.

[36:55] **Fred**: Yeah. We all kind of choose our little islands. Oh yeah. I had to, I did write a Webpack plugin. I was just like, I should know how to do this, and I don't.

[37:03] **Henry**: But we never think like, Oh, why don't I just ask Sean or Tobias can you walk me through this or something. I mean, not that they need to say ok.

[37:11] **Fred**: I think you're also probably in a better position to, like, I even feel starstruck around like big, big community members. I don't knokw if I would have like the guts

[37:20] **Henry**: Yeah, I guess I feel very comfortable just asking people. At least from the wanting to learn more about the project, like if someone asked me and they wanted to learn about the project, like I want more people involved.

#### Scaling Your Time, Managing Your Attention

[37:30] **Fred**: Yeah, I think, I think the problem is always like, does your time scale to support that? But like I think all of these conversations are related. You could probably like, okay, yeah, I'd love to help you. Let's live stream at, or like, let's record it so that this isn't just a one to one help. This is actually helping multiple people and then the next person who asked this question, I can be like, Oh, there's someone just like you that I helped out.

[37:51] **Henry**: Yeah. It's similar to the whole, like. People like DM you on Twitter or Slack and they're like, fix this thing for me. And you're like, why do you ask me directly? You can ask them.

[38:00] **Fred**: Yeah, that's a hundred percent what I pictured happening. If I go to Shawn and be like, Hey, help me with this Webpack plugin. It's like, no, I don't have, not that he's mean, but more like my time doesn't scale that way. I can't help every person.

[38:13] **Henry**: right, right. I guess it's like, yeah, if you feel then they'd be like, you feel like it's okay. but like even that, it's like, that could have been streamed or something and then other people can learn.

[38:22] **Fred**: Sometimes I feel if I see official Twitter accounts, like the roll up Twitter account will like find someone who said like, Hey, I need help with this roll up thing. And they'll just like share that, retweet it. I think sometimes that's like a really, you can go and ask for help. You just need the kind of broadcast like amplification of that message. If you don't have as many followers, there's some way that you could probably support the people asking without actually answering questions yourself. Disconnecting them. Yeah. I don't know. None of this is solved, so this is all just like, yeah, that sounds like it might work.

[38:53] **Henry**: mean, I guess there's no definition, this is kind of like, how do you handle it?

[38:57] **Fred**: there's a lot of similarities to like customer service in a lot of ways where it's like, there's not really like that as a problem. It's never solved. It's always just like, how well are you serving? Like the people who connect with your open source project, do they feel like they came away, like heard? Did they solve their problem?

[39:13] **Henry**: Yeah. The, the win would have to be something like weird. Like I decided not to answer anything, so I want, because I'm not gonna sppend my time.

[39:28] **Fred**: Yeah. That's one way of, yeah. That's the other problem, right, is you can think that you've won. And everyone else is like, man, that is not a fun project to work with.

[39:36] **Henry**: Right. The other winning is that you answer every single thing, but then now you feel like you have no time and then you get depressed or whatever. I don't know. Like you just feel like the whole project is a burden and then in the end you lose because you decided you got burnt out.

[39:51] **Fred**: That's a really good point. Like helping every single person as a goal could leave you just like destroyed. it's like, yeah. How do you then balance that condition? Would you also enjoying the work you're doing and feeling fulfilled and not getting burnt out.

[40:05] **Henry**: Exactly. And I think these are the kinds of things that, like when you're getting started open source, and then maybe you get a popular project or you join a popular project, you're not thinking about that. And so it does creep up on you. It's like basically inevitably going to happen because in the beginning, you don't have a lot people asking you for things. Maybe it makes you feel better. It's good because you get to help people and eventually you get there, you have some limit. We're, we're not people that have infinite time or energy. So at some point you're gonna hit it and like, because of that, you know how you're going to deal with that.

#### The Freedom of Contributors To Join and Leave

[40:35] **Fred**: Yeah. That's one thing. I wonder if you see this on Babel, cause I see this in my work and I have even been on the other side of this where. So much of open source, like I'll work on a project and I feel like this is my saying that I'm working on, so I will work on it over a long period of time. A lot of contributors I see like come in, they get really excited.

[40:52] **Fred**: They feel fulfilled doing it, but then like naturally they'll kind of then start stepping back, you know? So they'll come in with maybe like one big PR they wanted, they'll maybe review a few others. I think there's a natural kind of flow of contributions where it's like. There's a time and a place to become a longterm contributor is a really big ask of someone because maybe they don't feel like ownership over the vision. I've always had trouble, or maybe not. If this is something that I'm doing wrong, then I've had trouble with it. Or maybe this is just a natural part of open source contributions where it's there's an ebb and flow of people getting interested, contributing, feeling fulfilled, and then like moving on to whatever their next interest is. Again, it's not work, so it's not like. Oh, why are they leaving? It's like, no, that's what they wanted to do. I gotta respect that.

[41:32] **Henry**: Yeah, no, that totally is what happens. we have a team page which has never updated, but it looks like there's 50 people on Babel and it's not like they are the day to day are working on it. Maybe that's something like the core team, what do you want to call it? a lot of people just kind of like show up. They do their contributions. Maybe they get a job. Maybe they use open source to get a job. Not that that's bad.

[41:54] **Fred**: Oh, No, that's great. That's an incredible, yeah. Everyone should do that.

[41:58] **Henry**: I contributed to Babel and now I work at Facebook or Google or whatever, and that's cool. They're not obligated to help us or help the project or anything. But they spent their time, and that's fine.

[42:08] **Henry**: And there are other people that are very, like dedicated and they've been working on it for a long time. And then he's just decided to step down because of various life things or a new job as well. Like he's been a core team member for a super long time and he made most of the changes, the big changes in belt seven. And he got a job, working on the Firefox dev tools, which uses Babel, which is funny too. So I guess he's still babble, but like, he's not contributing to the core anymore. So they use like Babel to kind of transform your code handle, like breakpoints source maps. But he's not involved anymore. And he was a core part of the team and Sebastian, the creator, he's not been a part of it for a super long time. You don't know what will happen, right. Something could happen like. I don't know. Family stuff or people just leave the whole language, right? They're like TJ.

[42:52] **Fred**: Right. It's open source. We're doing it all for fun at the end of the day.

[42:56] **Henry**: And so it's hard to like not take it for granted, and then appreciate all that stuff and make the best use of it. But you also don't want to take it too seriously either. Right? Yeah. I think in the end, like, I mean, obviously I thought you enough to like continue to do this, but I think it's good that it feels transactional. It's your choice in the end. What does accountability look like in open source is very different. Yeah, you can't get fired. You can definitely do things wrong, but depending on what that is, like if it's a technical thing and you can change things and what are people going to fault you for? They're not in your position where you have to take care of some project. I mean, that's the fear where I think I'm going to make this thing that's going to cause everyone project or me or whatever. And so that's why I don't make any changes or something.

#### The Value of Forking

[43:51] **Fred**: Yeah, I mean, I guess forking is the firing of the current team and this is what we're doing instead of like the community has spoken. Which I think is a useful power that the community can have. But rarely, again, going back to Yan, I think when they announced, I think that people are like, no, this is crazy. We're forking Yarn. And it's like, I don't think if you're just forking a project to like make a statement, merge one PR that you wanted and then like call it a day. But then Node and io.js, like that was a really serious fork that was like, this isn't just one feature. We actually totally disagree with the governance and the direction and they put a lot of work into making that happen and then they can kind of peacefully merged back in. It's both like, so super powerful, but also like not you really have to.

[44:32] **Henry**: Right? I guess fork, like it's broad in the sense of like, you can fork just to make a PR. Technically that's a fork, right? That's not a malicious fork. That's just like, I wanna help you. And so I'm working. There's also the fork where I want my one thing, so I fork it.

[44:48] **Henry**: The big part is that the people that work on io.js Were people that worked on Node before. So they're basically the core team. So they are incentivized to care about this thing. Voluntary versus like a random person that's like, I don't like your project. I want to get rid of some feature. They're not going to maintain it. They don't know anything about how it works.

[45:05] **Fred**: Yeah. My favorite standard JS is that code formatting tool where it's essentially like zero options, just like, here's my opinion. It's that, and then people would just fork that and be like, it's standardized, but with this one rule I care about. So it's we're going to follow, we're going to track them forever with just one commit over it saying, I actually liked semi-colons. I thought that was so funny cause it's like that's not malicious. It's just like. I disagree and we're not actually going to do any real work on top of yours. We're just going to keep sitting on top of you with this one.

[45:32] **Henry**: Right, right. It's like a patch. But forever. Yeah. Okay. That's interesting. but Yeah, long maintained forks are really difficult. But that's like all the more reason why you would want to support the people that work on the project, that's even you like them because I think in the end, the only reason why people fork most of the time for the long running thing is because they don't agree with the people working on it. And there aren't, there aren't able to come to like a conclusion or compromise.

#### Platform Funding, Sponsorship

[45:58] **Fred**: Yeah. I think tide lift is probably.. I hope that that goes well, that experiment with essentially getting open source maintainers into a program where companies pay time with Thailift pays open source maintainers to essentially have a direct support line. That's interesting because companies don't want to like fork it because they want to own it.

[46:15] **Fred**: They just want their patch in. So how do you connect them where they have money to open source maintainers who have the ability to get that patch in? there's, I think that's a really interesting model that kind of goes counterintuitive to like the open source sponsorship model.

[46:29] **Henry**: Yeah, it is. Well, they're like a middle man sort of thing, so it's for our project we don't really need it because we can do the work ourselves I guess, and mean might be willing to. package and you're not going to be like, Hey, you should give us money.

[46:46] **Fred**: Yeah. I don't know why more people aren't upset that, like I would have said GitHb and npm, but really like GitHub. Like think of how much of their value is based on the fact that like all open source development happens there. Think of like how many billions of dollars at that company within Microsoft is worth and they give.

[47:04] **Fred**: So little on that scale back, like they matched donations, I think, which is interesting. But like they also have all the data on usage. Like they could see if they wanted to, they could like, essentially like equate downloads to dollars if they want it to.

[47:20] **Henry**: They had dependencies too, which is even more

[47:25] **Fred**: right, right. They like see all of that. So it's. I feel like I've never really heard anyone actually like make that case and like maybe I'm complaining about something that I haven't done myself, but it seems like they really are getting by easy by making all of this money off the books and sorts without ever being asked to give that back.

[47:42] **Henry**: I think the, well, I know a lot of people that work on it,

[47:44] **Fred**: Yeah. And I think like to be clear, sponsorship is a good step in the right direction, but it's still like you give money and then we get money, which is very different than like we are supporting. This engine that is so important to our company.

[47:56] **Henry**: Right. I think it, yeah. You mean like GitHub itself should be giving money? The matching is only up to a certain amount. So it's like, I think it was 5,000. They did remove the fees. It was supposed to only be the first year, it looks like it's just always going to have no fees, covering that as well. yeah, I don't know what they're working on coming down the line, but hopefully more of that. I know they have the data, like what you said, I've mentioned that to them before but I feel like a lot of the money stuff, there's a lot of legal issues.

[48:27] **Fred**: This is something we saw on the request package a lot. How would you incentivize work with money? It's usually the bounty source model where it's like, I want to basically like for someone to fix they get like a hundred dollars. What we saw was that we'd usually like have to retroactively grant that. Again, who's the person who gets to decide when money gets allocated. It's essentially like one person's job, like the, the main lead person. And maybe they've forgotten that that feature exists. Maybe they did it once and they forgot about it. So we'd have this like funded money.

[48:54] **Fred**: But like whenever we had the idea of like, this person, Oh, this was a great PR, we want to like give them this money to thank them for that work. It's like the person already did the work. You're not really incentivizing contributions, which is I think what those are always pitched as. It's like more just like rewarding after the fact. grant

[49:12] **Henry**: Yeah. I think the grant is cool.

[49:14] **Fred**: Yeah. Where you could like apply for money.

[49:17] **Henry**: Cause you would propose I want to do this. I've only seen this in the crypto space and I'm not really in that. I mean they have a lot of money and so they re they are able to use that money to ask people to develop stuff. We don't have a lot of money, and so hours of work, it doesn't even feel worth it.

[49:36] **Fred**: Yeah, exactly. I think we had like maybe a thousand dollars in some account with bounty source and it's like, okay, cool. That's. I have to have a PR. If we're really trying to incentivize someone to do a meaningful, like serious hard work.

[49:47] **Henry**: Yeah, the level of money you have does kind of determine how you want to spend it. Cause otherwise it just doesn't seem like it means anything. The bounty goes on things that no one wants to do. People are less willing to do it because no one wants to do anyway. It seems like it would be better to use that money for internships or something.

#### "Babel Pika Fellowship"

[50:02] **Fred**: Yeah, no, there's definitely.. I tried early on with pika, was trying to get this going and couldn't. It's, it's hard cause it's a dance, but there's four parties involved. It could all fit together theoretically.

[50:10] **Fred**: So here's an idea, someone go do this. Students or interns want experience. Open source developers want contributions. Companies want to be connected to people who want to be hired and by virtue of brand or whatever reason, they also want to support open source. There's a way to connect.. There was a fourth one I'm forgetting. So let's just go with three. You could connect those three people in this way where companies provide the money, open source contributors provide the structure, and students or interns provide the time. And then everyone gets something that they need out of that relationship. Yeah. That would be really cool to see, and I wanted to do it, and I haven't done it, so now I'm just giving that out.

[50:49] **Henry**: That makes sense. The company should be paying the interns and the open source project. And then they get a contact to that student, right.

[50:59] **Fred**: And to the open source developer too.

[51:02] **Henry**: That too. Right, and even better, if you make the project about what you want and you're like, I want this feature, open source project says, we're willing to implement it. Then it's win win for everyone.

[51:13] **Fred**: Ok the Babel Pika fellowship has been born . Now accepting applicants.

[51:18] **Henry**: Yeah, we've done Google Summer of Code and Rails Girls.

[51:23] **Henry**: But that has a lot more structure and that's good. It's just there's part of you that wish people would stay. And then obviously the same thing with open source, they might not stay. So it's sort of like what you were saying before, if someone asks you for help, that you're only going to help them if they're going to stay, but that's what you feel like, right? If they just put in like hours of work and at the end they just leave. Then you feel like defeated.

[51:44] **Fred**: Oh, interesting. I get that. If you've been working well with someone and then they like, no, this has been fun, but I have other things going. It's like, Oh, okay. I'll just be here. Yeah I have definetely felt that before.

[51:54] **Fred**: We got to work on our starts and our ends. I think I joked this before, more people just need to end podcasts with just like bye.

[51:59] **Henry**: Bye.

[52:00] **Fred**: And that's it. Then you cut.
