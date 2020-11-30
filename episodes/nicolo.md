---
title: "Core Team Chats: Nicolò Ribaudo"
date: "2020-11-23"
time: "22"
description: "Nicolò Ribaudo talks about his life as a math student, learning jQuery before JavaScript, doing oss on the side, his experiences in oss, doing an internship, participating in TC39, and some thoughts after three years of being on the team"
episodeLink: dd57a4f6
embedUrl: https://share.transistor.fm/s/63614a0e
---

### Transcript

<details>
<summary>Links

> Conversations may be edited for clarity. [(edit)](https://github.com/babel/podcast.babeljs.io/edit/master/episodes/nicolo.md)

</summary>

</details>

#### Intro

[00:00] **Henry**: All right, so this is Henry. I figured we could do a podcast where we talk with other people on the Babel team.. Maybe their background, why they work in the project, and just like how they think about things. So getting to know the team. 

[00:12] **Henry**: So Nicolò's the first person we're talking with. But yeah, thanks for.. I feel like I asked you to do this a long time ago, before you gave some talks. And I think you were not sure if you wanted to do it, right.

[00:23] **Nicolò**: Yeah, I think it was something like six months ago, at least, that you asked me? Maybe even more. 

[00:28] **Henry**: I'm pretty sure it was even longer because that was before the pandemic.

[00:31] **Nicolò**: Okay. So I suppose before November last year, so it's exactly one year now since you asked me.

[00:36] **Henry**: How do we want to start? I think most people don't even know who works on Babel. Maybe some people might know that you're a student, you can talk about that.

#### This is just applied math

[00:43] **Nicolò**: Okay. I'm one of the main five Babel maintainers now. I've been doing that for three years, more than three years now. And apart from that, as you mentioned, I'm a student in math. I'm now doing my third year, which could be the last one. Or it could also be followed by other years of studying. 

[01:03] **Henry**: Why did you choose math to study? Maybe some people might be confused cause they might be thinking you'd be doing, you know, computer science.

[01:11] **Nicolò**: Yeah. I mean, from my point of view, it was hard to choose between them because I really enjoyed doing computer science stuff. But I've always wanted to study math since I was like 10, I think. I initially thought that I would have studied pure math, but now I'm studying kind of applied math.

[01:31] **Nicolò**:I mean, it's in an engineering school. And also I'm already doing computer science. Like I'm already programming in my free time. And doing that first 30 hours a week at school and then learning that after school, probably it would have been too much. 

[01:47] **Henry**: Yeah, I agree. I think it's really cool when you have different interests, even if they're not related at all, it just helps you kind of think differently. It's not like direct, but it kind of helps you, right.

[01:58] **Nicolò**: Yep. Yeah. It gives me different point of view on things.  

[02:02] **Henry**: What do you mean by like applied math versus.. What was the other one? 

[02:06] **Nicolò**: Pure maths or theoretical maths. 

[02:08] **Henry**: In some sense, I'm like, how is math not, pure math. Like applied math actually kind of sounds weird, you know? I think most people it's kind of abstract already.

[02:19] **Nicolò**: So like pure maths is about completely abstract things, such as algebra or topology, where you build your own concepts. You build like some kind of maths on top of those concepts. I mean at the end, everything humans do is related somehow to the physical world. But I feel like this is the most abstract thing that I could study somehow.

[02:44] **Nicolò**:While applied math is more like the math that is obviously useful, which is not like, for example, proportions for cooking, but more something like statistics or math applied to computer science. Like how to optimize computations and how to work with numbers.

[03:04] **Henry**: Okay. So it has a more direct application to engineering or something about efficiency. I'm kind of reminded.. I think I shared you the XKCD with the different fields right? Or what was it?

[03:15] **Nicolò**: Yeah. Like the line with all the fields in order, like biology, chemistry, physics, and math, I think.

[03:21] **Henry**: Yeah, it was like, this is just applied this and then math is at the very end, like, Hey. I love that.

[03:28] **Henry**: Yeah, I guess are you more interested in the theoretical or the..

[03:33] **Nicolò**: Yeah, I prefer the theoretical one. I'm studying kind of applied math now because, in my city we have both universities and I like this a bit more.

[03:43] **Nicolò**: Also in high school, I didn't really know about the different aspects of math, so I couldn't really choose. But if I continue studying, I'll do something more theoretical. 

[03:55] **Henry**: Do you know why you liked that or just..

[03:59] **Nicolò**: I'm not sure. Maybe because you can work with your own rules. You can work with your axioms, but they do not feel constrained by the real world. 

[04:08] **Henry**: And you think that it kind of gives you more freedom. Actually, it's funny because maybe that's also why a lot of people like programming. Or software at least, instead of hardware, because it's like, Oh, I don't have to have a lab or all these things, I can just code on my computer.

[04:24] **Henry**: Recently on hacker news, someone was saying they became like a woodworker and everyone was like, yeah, I want to do that. And it's, it's funny that all of us want to do this abstract stuff, but then we also find ourselves wanting to do like the stuff that affects reality.

[04:41] **Nicolò**: Yeah probably when working at the computer all day, you need something else to do.

[04:46] **Henry**: You need it to be like physical to involve like the body or something. Yeah, that's cool.

#### Starting in open source

[04:51] **Henry**: So you're doing math. How did you get involved in Babel or open source? It's been three years, maybe it's hard to remember. Like, I don't even remember how I..

[05:02] **Nicolò**: Yeah. I feel like I already explained this to someone like every six months so that I don't forget about it. 

[05:10] **Nicolò**: And so it all started, I think, more or less five years ago. I was discovering this open source thing because I was developing some Chrome extensions or Firefox extensions to cheat in some online games. I mean, it was not really cheating, but automating some things that they would have to do. 

[05:32] **Nicolò**: I remember that I was using jQuery to do that. And somehow I discovered all the different plugins. I mean all the jQuery plugins that I used were open source. And I discovered about that GitHub thing.

[05:44] **Henry**: I'm assuming then you already knew how to code.

[05:46] **Nicolò**: Yes. I mean, I learned web development when I was I think in middle school. I was like 13, maybe, because a friend of mine, convinced me to build a Facebook competitor. So it didn't end up well, but at least I learned HTML and CSS and some PHP.

[06:08] **Henry**: Oh, wow. So you learned it on your own. It's pretty similar to me too, where you use something and then you realize it's open source.

[06:16] **Nicolò**: Yeah. I learned jQuery before learning JavaScript.

[06:19] **Nicolò**: But then at some point I was bored with my browser plugins and I started looking for something else to do. And I'm not real good at having ideas to build things. I usually get ideas from others. 

[06:33] **Nicolò**: And so this thing about open source where you can just find the random project and help was like the best way for me to learn. And I remember that I started contributing to the Adobe Brackets extensions because it was the editor I was using. And then I moved to contribute into other projects. I remember I opened a few PRS to JSHint.

[06:55] **Nicolò**: At some point I found Babel. I was already using Babel and I tried opening a PR also for that cool project that everyone was using. And I remember that my PR and got closed.

[07:09] **Henry**: Oh, really? Was that me?

[07:12] **Nicolò**: No, it was Sebastian, I think. 

[07:14] **Henry**: Oh, that was back then. 

[07:15] **Nicolò**: It was like "no, this is not the correct way to do this". But then I somehow opened a second PR for a completely different thing a few months later, even if my first one was just closed with a single comment. And so then my PRs start getting merged and then you asked me if I wanted to do more. And so that's how it started.

[07:41] **Henry**: Well, I mean, that's good for people to hear I hope. Just like me too, we all started with like this really simple stuff and we kept going. 

#### Why Babel?

[07:48] **Henry**: I guess maybe a question would be like, why did you want to keep going? I mean, that might not have been like a bad experience, but you could have done other projects or even different languages too right.

[07:58] **Nicolò**: Yeah. I mean, JavaScript was my language, the language I like now. But yeah, I'm not really sure why I stick with this project. Even after the first PR was rejected, but I guess it's because I was already opening some PRS to JSHint, so I already knew how parsers works.

[08:17] **Nicolò**: And so I started with Babylon, the old Babel parser, so I could already apply my knowledge to that project somehow.

[08:28] **Henry**: Right. That's similar because I worked on a linter before I worked on this. How did you learn about like parsers then?

[08:35] **Nicolò**: Just by trying doing things in JSHint. Like I did not read books about that or had a formal introduction, it was just trying to fix bugs.

[08:47] **Henry**: Yeah, that's awesome. I feel like that's true for like basically everyone on the team. None of us took a class on compilers or parsers. We just learned it by doing it right. 

[08:58] **Henry**: And I think we can admit that it is a complicated subject, but, there is a way to get into it. And it's over years, right. And so it's not just like suddenly we knew how to do it. There's plenty of things we still don't know how to do right.

[09:12] **Nicolò**: Yeah. Like, I feel that now I could build a parser from scratch. But it took me a really long time to finally get like how all the different parts work together and what is the best, I mean, not the best, but a good working way to do something in a parser.

[09:29] **Henry**: Yeah. Let's talk about why you continue to work in open source and this project. I don't know if you've thought about that much, but.

[09:36] **Nicolò**: Not really. I guess one reason is that since I'm studying, I do not have a job. Because I'm studying, I wouldn't have time for both things. Open source is a very good way for me to keep doing this programming stuff I like.

[09:53] **Nicolò**: And I think that even if it's not a good reason to stick with Babel, but it's that I already have the necessary knowledge to work on that. While if I just quit the team and started contributing to a different project, I would have to learn everything from scratch again. 

[10:12] **Nicolò**: I mean, I usually do like some small stuff to learn, but for what takes most of my time, I prefer to stick with something that I already kind of know, or at least that I know how to research, how to learn about some specific things.

[10:27] **Henry**: Yeah, I don't think that's weird. We're just used to the project that you work on. You're not going to spend the time to do something else. And I mean, especially for the project that we work on, you know, it's not like there's a lack of stuff to do, or a lack of stuff to learn either, right. 

[10:43] **Henry**: So not just because there's lots of work, we don't need to do work just because it needs to be done, but it's still interesting. It has something to do with JavaScript and the language, right.

[10:52] **Nicolò**: And also, Babel is big enough that when you get bored about what you're doing, you can just move on a different part of the project for a few months. And everything is still fine. Like I used to work a lot on the parser in the past. They have moved to building all the class features, plugins, or reviewing them like, I worked a lot on decorators. 

[11:13] **Nicolò**: When now I think that that's not written a plugin for at least like six months now. And I'm mostly working like either on small bug fixes or doing big things in Babel core, like in config loading. Also like the polyfill stuff. And just moving around in the project by doing completely different things every few months.

[11:34] **Henry**: Yeah, and I think that's great. Cause people make that comparison with startups and big companies. But in open source you can kind of. I mean, you should be able to do whatever you want in some sense. At least you have the freedom to suggest that to the team and that's appealing. Also you get to participate in the committee too, right? So TC39 and that whole thing. 

[11:57] **Nicolò**: Yeah, this is probably one of the best things that Babel gave me because I didn't really know about language design before working on Babel, but then I found out that it's something that I really enjoyed doing. Not only like designing the language itself, but I discovered that you'll have to collaborate with a lot of people to get ideas and somehow to make them work together. And this is human aspect that I really didn't expect.

[12:24] **Henry**: Mm. You can't just add a bunch of features and smash them together. And I think that that's a good point though, this language design aspect involves people. And that's a part of open source that your have learned to appreciate more, right? I think same with me too.

[12:38] **Nicolò**: Yeah. It's completely different than just like developing it as a small, personal project on your laptop. It is a completely different thing when you start collaborating.

#### What matters now?

[12:49] **Henry**: Maybe we can talk about that too. Since it's been three years, the things that you do in Babel are different than when you started. And the things that you even think about, what do you care about, how has that changed?

[13:00] **Nicolò**: Yeah. Like when I started, I felt like a part of the team, but not really felt like I needed to manage somehow the team. Well now I like to make sure that everyone working on Babel is doing well. Like I sometimes just write to other people in the team, checking how they are, just have random chats with the other.

[13:21] **Nicolò**: I mean, I think I started feeling like doing this one year ago. I think it was more than one year ago that I started proposing team members and started reaching out to people outside of the team. 

[13:32] **Henry**: Do you know what made that change? What clicked to make you think like, Oh, there are these other things I can spend my time on that aren't just like fixing bugs and stuff.

[13:42] **Nicolò**: I think that it's because like the team was changing. Like when I first started working with y'all, there were like a lot of people now doing something else. Like Logan, Sven, also Daniel. And at some point I felt like I was one of the people that have been in the team for most time of the remaining people. And I guess that at that point is when I started caring for the team as a set of people and not just like some people that have their own things and not just like people I work with for the project.

[14:22] **Henry**: Yeah. It might actually be a function of people coming. And you feel that way everywhere. Like you go to a company, open source. You're like, you thought you were the new person. And then now you're like, wait, I'm one of the last people. and then almost like, kind of, it is sort of like a forcing thing where you realize like, Oh, maybe I can step up and do these things. Not that like you necessarily wanted to, but you kind of eventually felt like, Oh, this is a good idea, right? That's awesome.

[14:49] **Nicolò**: Here's a random question? How do you feel about open source now? Do you feel like you are more jaded because a lot of people will say that or are you still excited about what we're doing? Not just Babel, like open source. 

[15:04] **Nicolò**: Well, I feel like every time I learned about a new project, I feel like there are a lot of things that I don't know, and that I probably will not have time to learn all of them. While when I started, I was like, Oh cool. I can learn just everything I read and everything I find. I felt much more powerful in the past than now, I guess. 

[15:28] **Henry**: That's pretty hard to say, you maybe realize you have less time, but maybe just like. you are more focused on certain things. You realize what you like even.

#### Open source and Internships

[15:37] **Henry**: So you just did an internship with Bloomberg, right? Maybe you could talk about that experience. Cause you were saying that you haven't worked at a company before.

[15:45] **Nicolò**: I did this internship this summer from July to September. It was my first experience in a company. Which was completely different. Like the structure, having a manager and then there was like, the manager's manager, was completely different from what there was used to with Babel.

[16:01] **Nicolò**:So like during this internship, I've been still working on stuff related to what I was already doing with Babel, because I've helped developing a JavaScript proposal, which was Record and Tuples. It's now stage two and it reached Stage 2 while I was doing this internship. So it was like a super exciting moment for me.

[16:24] **Nicolò**: Rob Palmer, which was my manager that probably many people in the JavaScript community know, asked me if I was interested because he taught that since I was already working on language stuff and I was really enjoying that. And he thought that this was the perfect opportunity for me to do an internship in something that I actually liked. I mean, he was the right.

[16:48] **Henry**: That's awesome. You told everyone on the team and we were really excited for you too. Makes sense. You're already doing all this stuff in Babel and now you get to make the proposal.. See it through maybe to the end, when it actually gets in instead of just like implementing what someone else made, right.

[17:01] **Nicolò**: I was already participating to some TC39 meetings as an expert in the past. I mean, I still participated as an invited expert while I was doing the bloomberg internship. Like I was participating for me and they didn't really expect me to actually go to the meeting. Well, join on Zoom in the meeting. But I felt like I owned part of the proposal, like I really helped moving it forward. 

[17:29] **Henry**: Yeah. And I think that might be like a similar thread in, you know, talking about when you first started in Babel. What is the difference between being a contributor and a maintainer? And maybe now you kind of feel like you have some kind of ownership in where the project is going, right.

[17:45] **Nicolò**: Yeah, you feel like you can actually shape the direction of the project.

[17:50] **Henry**: Yeah. And I think it's not measurable, you know, you kind of just feel that I think. I think it has a lot to do with the team too. Just because on paper you're a contributor, right. And you know, we add a lot of people to the team, right. They can merge things, but they don't feel like they can actually do it. So like, there's that point where you feel like people can actually take that action, right?

[18:13] **Nicolò**: Yeah. I remember that when I joined the team, I wasn't actually managing my PRs even after they were approved, because I didn't really want to take the responsibility of managing my PRS.

[18:24] **Henry**: That is a really good observation. I feel like that people have that fear too, like this project is popular and it's used by all these people. And I don't want it to be like my fault or something like that if everything goes wrong.

[18:37] **Nicolò**: I mean, then I prepared some PRs that break everything. Like I remember one time that one PR of mine broke Gatsby and create-react-app. So like at some point you learn how to deal with your errors.

[18:51] **Henry**: Yeah. We all want to be perfect, but we realize that we're going to make mistakes. And the other option is just don't do anything ever, because then you'll never make mistakes. But you gotta learn to move forward. It doesn't mean we're gonna move fast and break things, right. We're not purposely trying to break things, but we can own the mistakes that we make. And that's hard. I still feel that too.

[19:14] **Nicolò**: Like we do not have like management layers. So even if we break something, we can just fix that. So, I mean, we learned that even if we make mistakes, we can fix them rapidly.

[19:25] **Henry**: Yeah, there's some level of like, not that it's not your fault, but you can recover. 

#### Maintenance Boredom

[19:29] What do you think are sort of the not so nice things about doing open source and how do you deal with that?

[19:34] **Nicolò**: Okay. Well whenever I spend too much time dealing with issues or always doing small bug fixes, sometimes I get bored and I lose motivation to work on that. So like when it happens, I just look for like something maybe big to do.

[19:52] **Nicolò**:For example, like after my internship, when I started working again on Babel, by the end of September, for some reason, I wasn't really excited to come back. So I started doing like a bunch of different things. I wrote that yarn plugin that we now use to manage releases. I had the opportunity to focus on something completely different to get back my energy and then to work again on what I usually do.

[20:22] **Henry**: Yeah, that's awesome. If anything, I would encourage people to do that more. I think what I want to challenge is this assumption that most of the time you're doing maintenance you have to be fixing bugs and looking at issues when.. Not that we shouldn't ever look at issues.

[20:37] **Nicolò**: But it's sort of like, you're always distracted. I would call that the distraction, the issues and the bug reports. And not actually getting the work done that might take a long time to think through and to, to flesh out and make into something, right. We could spend time making this new thing that maybe it gets rid of that kind of issue entirely, potentially. And I think that would be a better use of time than just like just the issues, because we feel obligated to answer all of them, right.

[21:05] **Nicolò**: Yeah you somehow have to balance between just doing routine maintenance and actually moving the project forward. I mean, both are necessary. You can just focus on one thing, but you have to figure out how to currently balance them.

[21:22] **Henry**: Yeah, it's definitely difficult. How have you found how to do that? It seems like it's just natural. You're like, Oh, I don't want to do this.

[21:30] **Nicolò**: Yeah. I do not really decide what I want to do. Sometimes I just like want to fix a quick issue and just look in the bugs list to check if it's something that interests me. Other times, I have a ton of WIP branches locally, like experimenting with possible new features.

[21:50] **Nicolò**: And most of them never get actually pushed, but at least I have the opportunity to explore things and maybe I discover like a new way of doing something. So even if I do not actually proposing those features, I feel like these experiments are still helping me giving a direction to the project.

[22:10] **Henry**: I mean, I think those could be things we could try to stream or talk through if we do want people to learn about what we're thinking. You know, it's still a work in progress. It's not planned to be like a feature, but we're coming up with new ideas, stuff like that. Yeah. Thanks for joining me today to chat about all this.

[22:26] **Nicolò**: Yep. Thanks for finally interviewing me.
