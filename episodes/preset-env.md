---
title: "02: Jason Miller on Modern JavaScript and the Future of preset-env"
date: "2020-01-17"
time: "66"
description: "Jason Miller and Henry Zhu talk through a high level philosophy of transpilers, Babel's core mental model as the democratization of programming language design, and all nuances of the relationship between developers, TC39, browsers, tools. Let's look at the future of Babel.. through the future of preset-env with the newly released @babel/preset-modules started by Jason"
episodeLink: 9573de68
embedUrl: https://share.transistor.fm/s/7d1ee7fe
---

- [YouTube (video)](https://youtu.be/Hw1qScL1tAQ) since this was recorded in-person!

#### Transcript

<details>
<summary>Links

> Conversations may be edited for clarity. [(edit)](https://github.com/babel/podcast.babeljs.io/edit/master/episodes/preset-env.md)

</summary>

- [preset-env code](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
- [preset-env docs](https://babeljs.io/docs/en/babel-preset-env)
- On PhoneGap's [obsolescense](https://phonegap.com/blog/2012/05/09/phonegap-beliefs-goals-and-philosophy/): "The ultimate purpose of PhoneGap is to cease to exist." - Brian Leroux

</details>

#### Intro

**Henry**: This is the Babel podcast! This is the second episode, six months after the first one with Sebastian. I was going to do one every week, and I guess I got burnt out from all the other podcasts.

**Jason**: You can do one per year! (laughs)

**Henry**: I am willing to do a lot more, now that we have more ideas. I was in Boston and I figured I should meet up with Jason. Now we're recording a podcast. We're going to try video! (laughs)

**Henry**: Jason just worked with us to announce preset-modules, not preset-modern (we can talk about that too) (laughs)!

**Henry**: Thanks for letting me talk with you about this.

**Jason**: Happy to be here. Didn't have to go very far.

#### Background: An Interest in Tools

> After viewing traces of real world sites, Jason got interested in symptoms of large code size as a result of tools. It's a "solvable at scale" problem versus tuning the libraries themselves. Why do we not focus on the tools?

**Henry**: I don't know what we're going to have to call this thing, something like "Keeping JavaScript Modern", and that's why I accidentally typo'd preset-modern. This is going to be a temporary thing and it's going to be the future of preset-env. This whole thing doesn't really have to exist, but we want to test it.

**Henry**: Okay, we should just start with, how'd you get involved with this idea and why?

**Jason**: The backstory is, I work on the Chrome team as a devrel. One of the things that I find myself doing (no idea whether I'm supposed to do this), is combing through traces and bundle analyses of tons of different websites.

**Jason**: When I can get access to the source, building them, seeing what like wrong, combing through sourcemaps. I have built up mental lists and documents describing the problems that I seem to encounter.

**Henry**: The patterns that you're finding.

**Jason**: Yeah, exactly.

**Henry**: This is real world sites.

**Jason**: Right. For me, the things I'm most interested in are symptoms that show up as a result of tools.

**Jason**: It's less about "a developer needed to accomplish something that was difficult and so brought in a big library to do it". That's pretty justified.

**Jason**: It's more that the tooling was doing something behind the scenes that the developer may or may not have realized. When that starts to impact bundle size, bring in more code, or change the output, that's where I get really interested. It's potentially a "solvable at scale" problem.

**Henry**: Because it is a tool.

**Jason**: You fix the tool, you fix every configuration that uses it!

**Henry**: Right! So like if say Babel outputted something that was a bit bigger, and you were able to fix that for everyone, then that's a huge size win. I guess your goal is to reduce the code size for all websites.

**Jason**: You know, if I had a personal mantra, it would be to make the web smaller.

**Jason**: Which sounds quaint, but if you look at it from the perspective of making the web smaller without making the web less feature compliance.. to optimize the web in its current state, then that's actually a potentially useful thing to do.

**Jason**: Let's say I got all these traces and I went to the companies and people who are building those projects and I submitted a pull request to remove the little bit of code that got injected, I would have to do that a million times to have any success.

**Jason**: Versus if I can identify a potential improvement in a tool that that has widespread use. Every little change is magnified. A 200 byte size improvement in Babel is probably terabytes worth of network bandwidth. Which is kind of staggering.

**Henry**: I don't think we think about that as people that work on these projects. You're dealing with like these minutiae, but it's like it does affect a lot. Maybe as a community we've been focusing on the size of individual libraries or frameworks.

**Jason**: I'm certainly guilty of that. (laughs)

**Henry**: I guess especially you! Only recently have people gotten together to think about the tooling, like bundling and compilers. So Babel is a good example. Maybe it's like everyone's focusing on reducing that one time cost of the library versus the tools, which everyone is constantly using all the time.

**Jason**: I was thinking about it as like.. I'm terrible at math. The one thing I do remember is like the slope of a line formula

**Henry**: mx+b?

**Jason**: Yeah y=mx+b. It's easy to focus on that static base cost.
What's the size of this on desk? when I install a dependency, how much does it weigh? But when you've been working on an application for three years or 10 years that scaling factor starts to matter way more than any base costs.

**Jason**: Personally, I think there's worth on both sides. But oh man, if you're looking for value, especially if we have this notion that we've underinvested in tooling, then that seems like a huge reason to go and look at that scale factor.

**Henry**: I would say that it's lacking in the sense that usually there's a lot of activity around frameworks. There's the companies that support them, maybe in some sense own them? Or there's conferences like ReactConf, VueConf. There's no like BabelConf or WebpackConf. I was thinking we should do a ToolConf.

**Jason**: ToolConf. I'd love that. That'd be cool. I know who could be the band that plays at the end.

**Henry**: Ok (laughs). That makes sense.

**Jason**: Good luck getting them to come.

**Henry**: But yeah, we haven't focused on the tools and they just "work". In the majority of cases for something like Babel, you don't have to think about it. There's a point where something goes wrong, and you report the bug.. and no one has any understanding of how these work.

**Henry**: Hopefully with this podcast, we do more of this stuff and explain not just like literally how it works, but concepts, the philosophy behind certain things, and kind of the struggles that we're dealing with to even get to solving some of these problems, right?

**Jason**: Because if you're building something that sits on top of these tools, these are your problems.

**Henry**: Right. We don't have ownership over that, cause you just kind of hope that people have good will and are willing to continue to do this.

**Jason**: Maybe we don't.

**Henry**: Yeah, we do. But life gets in the way, anything could happen. You get health problems, you move, you go to school, you get out of school, you get married, you get kids. All these things happen. We're just relying on a few people to literally work on these things.

**Jason**: The maintainers of the infrastructure. But I think the weirdest part here, is for a gaggle of programmers (you could just look at the programming aspect) these are really interesting problems. So I'm always surprised when people don't

**Henry**: Why is it not more people?

**Jason**: Yeah. It's just like nice, meaty, fun, isolated challenges.

**Henry**: Right. Is it because they're so far removed from how it works? It's either too daunting or there's just no lack of context that you don't even know what questions to ask. I think one of the most important things I've learned is, how do you ask the right questions? Not literally getting the answers, but just being curious about how things work and getting involved, understanding the people behind the project rather than just using it. Like that's the whole thing, right? That was a good segue.

**Jason**: A good intro.

#### Thinking about programming language design

**Henry**: Hopefully that gives you a sense of the things that we're thinking about.
It's not always very technical.

**Henry**: There are philosophical implications behind things. Maintainers have different models. For the people that use them, they probably have a limited model of what like Babel does.

**Henry**: If we want to go back, what is Babel? A limited view would be, it turns my code from new JavaScript to old JavaScript, which is what it did before. That's still what it does but it's more broad. You were mentioning earlier, it's a general transformation.

**Jason**: Yeah. Looking at the model that somebody like you might have in their head of what Babel means, not just as a body of code, but as its purpose in the world, it's something more than just like a code transformer, right?

**Jason**: It is a tool that potentially enables developers who normally are required to work within the syntax boundaries to move beyond that and just sort of express themselves in ways that are not possible. If the only vector you have for producing programs is writing syntax.

**Henry**: As someone that works on it, my goal is to somehow.. how do you embody those models or values through the culture of the project and the content we put out?

**Henry**: Babel is not that reductive where it's just does that. Maybe one of my ideals is like, how do we create this community or platform? It doesn't even have to be Babel itself.

**Henry**: That's why I want to look beyond the project, of a way of allowing developers.. if you think that you can come up with a different syntax, then make it. If you can't, describe what's the limitations of the current syntax, and you can be a part of this process of TC39, making JavaScript better.

**Henry**: I think that no one's in that headspace cause I think we assume that something drops down from the sky, the JavaScript tablet of what syntax you can use. And I'm stuck with it.

**Henry**: Not that it's really easy to contribute, it takes a long time. But I'm just saying it is possible, unlike maybe other languages where there is no option for you to do it.

**Henry**: If anything, it's almost like Babel is this way of protesting against using whatever tell you to. If you wanted to, you could create your own language on it, "BabelScript". That doesn't mean everyone should do that. And just saying that you can, as a freedom.I don't think people are exercising that or understanding that's an option. You just kind of get it.

**Jason**: Right. Babel, the implementation, is the source code transformer. Babel, the reason for existence, is a democratization of language design. And it sounds grandiose, but that's very literally what the project is for.

**Henry**: Yeah. I would admit, I'm not doing the best job of figuring out how to say that. Cause it sounds too weird or what are you talking about?

**Henry**: But if you think about other languages and how they work, it's very different. And maybe we should embrace that.

**Henry**: Before I mentioned our conversation about this Pandora's box scenario. Well, if we open the floodgates of people able to do whatever syntax they want, it's going to make everything terrible.

**Henry**: But maybe we've gone too far in the other direction. Why did a lot of the stuff happened in ES6 and now optional chaining, CoffeeScript. That was because someone decided to do it and everyone adopted it.

**Henry**: We tried really hard to try to align ourselves with the committee in the process and that kind of limits the potential creativity of people, just regular developers. I mentioned the Tools for Conviviality book. How do we allow people, not people that have to be in a certain position to do that. It doesn't mean that everyone's going to be capable of doing it, and we need mentoring and teaching, but it's a freedom that someone can take advantage of that is not in like Java.

**Jason**: The tooling that underpins JavaScript; Babel's job there is to make that more accessible than other languages. To make the language itself more malleable and easier to reason about to somebody who otherwise might not have gotten involved with AST transformations.

**Henry**: The "rising tide lifts all boats" analogy. There's that balance because the problem with everyone doing it is the scenario where like you go on GitHub and it's a JS file, but like it's just random stuff.

**Jason**: You just append random letters to the end of JS!

**Henry**: That'd be funny. Maybe we should try it. And I think that's the experimentation part. But at the same time, we need to make sure that our platform is stable. Maybe it's like science. We allow people to contribute and maybe there are good things that we can take in. How do you make sure that people are experimenting but then not creating bifurcation of all these platforms.

**Jason**: It's like at some point you either need to codify that there exists a meta language level and then a language level and eventually we would like to migrate things to the language level when they prove their worth. Or we need to make that the culture that we have. Like we are all sort of working towards making a better language, but our vector for doing that is making other languages. Making extensions to our language and just recognizing that like these are builds to die.

#### Built to Die? preset-env

**Henry**: I think that the idea of "build to die" is super interesting. Maybe that should be a part of our philosophy as a project itself. I've heard of Brian saying PhoneGap was supposed to be like that.

**Henry**: Babel.. I mean, we can transition to a preset-env, that is the whole point of that project. Babel will continue to exist, but in different ways. Just like in our lives, we change our jobs or what we like or what we're working on.

**Henry**: Before it was 6to5, right? Turn ES6 to ES5, and then ES7 to ES5. But the assumption there is that if that's all you think Babel is, then you will never get rid of Babel because you're just always compiling all your code through it.

**Henry**: But what's happening over time is everything is moving forward. The browsers that you support are going to change. You're going to eventually drop old browsers that will implement new stuff. TC39 will add new syntax. The browsers will add the new syntax as well.

**Henry**: Once the browser implements arrow functions and you're still compelling about through Babel, then you don't need to. It would be in your interest to send less code.

**Henry**: Because one of our goals is to have less code for users. So then what is preset envy? It was a way for users to not have to figure out when to turn on and turn off plugins. Because of the way we implement each plugin independently. Ideally, the workflow would be that when in the browser implements a syntax natively, you should be able to drop the plugin, and you shouldn't have to think about when. Hopefully Babel does that for you.

**Jason**: So sitting on top of the fact that Babel evolved from being 6to5 to being a higher order tool end to end. This basically lets you define something in the nomenclature of a web developer, which is like I support Eedge 16+ and evergreen browsers. It takes that and generates the end, right? It's like we assume you're writing modern JavaScript (whatever the current spec version is), and we'll compile it to the best code we can, given the constraints of all the browsers that you need to support.

**Henry**: And that's a non-engineer piece of information. Meaning that if you're the program manager or the business person, they should know which browsers they support. If they don't, as an engineer you should ask them and they should figure it out. That way you could even tell them, if we are clear about what browsers we support, we could potentially send less code and make more money or whatever.

**Jason**: I don't know about you, but I've definitely been in the position in the past where that communication of the importance of supporting any given specific browser or browser version was very unclear.

**Henry**: Yeah, I think so.

**Jason**: And it's funny because as developers, we have this tendency to decry having to support older browsers. But I've totally been in positions in the past where I would have one side of my mouth saying, "Oh, you know, it sucks having to support IE8". And then I would find out a year later that I was the only one left who cared about supporting IE8. And it's like, "What? I've made work for myself". That's a weird thing to find out, but it's because there's a communication model.

**Henry**: There was no single source of truth about how that went. A lot of times you assume what browsers you support. It's seems like essential things to know.
Sometimes people will use preset-env, find out it breaks (in production) with reports, but you know that you don't support those browsers. It's right for it to break.

**Jason**: Your system is working as designed because the parameters that you put into it based on your business data. You had agreed to break those older browsers. It wasn't a technology failure. It was a common understanding that you would not choose to support those things.

**Henry**: Right. I guess the goal with preset-env is how can we prevent "unneeded compilation"

**Jason**: How do you prevent somebody saying, "I'm going to compile to ECMAScript 5 and then never going back to look at that again"?

**Henry**: If we want to go from the browser perspective, you work at a company that has a browser. If everyone is using Babel, and there is nothing like preset-env, then there is no real world application of people using native ES6 syntax. So browsers have an incentive to convince Babel to use preset-env.

**Jason**: Absolutely. This actually comes down to the prioritization for somebody who is building a JavaScript engine. It's really difficult to say, "we're going to optimize how fast arrow functions are" if, you know, in the wild, that's 5% of websites. Or would you rather optimize argument's access in sloppy mode because you know, that's 95%. And then it's weird, you have another option at your disposal there, which is to change the tooling that governs 80% of those sites.

**Henry**: Maybe you don't think that's an option because you have to interact with another project. Maybe a lot of the times we just observe the environment versus realizing we can act on it, meaning talk to people and work with them.

**Jason**: I've run into this in the past where I pull a trace of something that I have source access and I can just change something in the source to affect the change that I need on that project. But in doing that, I'm limiting myself in terms of scope. It's O(1). If I can find a way to to go a level further or find the root cause, now I'm looking at O(n).

**Jason**: So that's where preset-env is potentially a place to collect data that can then be used to shift the ecosystem more easily. Rather than identifying that Babel is producing feature X, we're going to do programming things to change that preset. preset-env is potentially a slip layer for us to be able to see, Babel is producing X, I can see why it's this browser version, we're going to just change the data. We're going to workaround the browser version.

**Henry**: preset-env is like the evolution of what Babel was in the beginning. That's an artifact of showing why Babel is a transitional tool. Unlike every other language where you can just upgrade, although now that's not really a good assumption because of an example of like Python 2 to 3..

**Jason**: We're almost there!

**Henry**: We realized that upgrading is really hard, and maybe JavaScript is the language where it has to be that way. (video comes back) That jump from ES5 to ES6 was a big jump, but we're always going to have new features coming down the line. If you needed to use that feature, how would you choose to do it in the most efficient way possible? How does this tool help the whole community move forward? Right? Like first convincing people that this syntax is even worth using in the first place.

**Jason**: Maybe arriving at what that syntax would be.

**Henry**: Oh yeah. Even beyond. So that's pre work, the whole Stage 0 process.
Prototyping. So Babel can help because we've established that with browsers, are you going to write that code in C++, and maybe it takes a long time.

**Jason**: How would you justify that investment?

**Henry**: Versus anyone can just make a plugin and share it with people. And it doesn't have to be on NPM. One of my ideals is.. our REPL should somehow allow you to fork the parser in-line just to test out some syntax, share it on Twitter.

**Jason**: I would love that, I mean we have the AST Explorer, which is something along those lines.

**Henry**: But at the syntax level.

**Jason**: If it was like a checkbox. Oh God.

**Henry**: That would be amazing. Like I want to just feel what it looks like to have two question marks for the optional chaining. I don't know. Like just to see it. Maybe it's a bad idea, but I think that's like where we all get into the theory.

**Henry**: If we can talk about how a committee feels very ivory tower-ish, but we all do that too, where we're just theorizing versus doing the work, which might not be that hard. We need to make it easier. Then you can look for yourself, then you can share it with people. Get feedback. Maybe you realized it was bad, and then you can explain to people why you thought it was bad. Everyone learns why this type of thing doesn't make sense. Or you can document that as the history of people that attempted this kind of thing. That's what we're supposed to be doing in every language. Where you're learning from each other. Right? But this is JavaScript itself.

**Jason**: So instead of having discussions where we trade theories and ideals, we could have discussions where we trade prototypes.

**Henry**: Right. Yeah. I guess that's a whole tangent (laughs).

**Henry**: But that was the purpose of Babel, even if you don't use Babel literally, as the artifact tool you install on npm. Babel should be still important to you. If you care about JavaScript or even if you want to go into programming language design. It doesn't mean that is the best way, the right way. That's just one way that it's playing out.

#### Support matrixes and preset-env

**Henry**: So Babel helps with the pre-work of language design. Then once it is Stage 4, you don't know if you can use it immediately based on your browsers. So that's literally what preset-env will help you with. If you support a browser that does support it, then Babel will not compile it. It won't touch it.

**Henry**: But if you have an old browser, then it will compile it down and you don't have to worry about it. Later when you decide to change your browser support, then it will also drop it and not compile. In the ideal situation, you just use it and you don't have to think about anything. You just write your code.

**Jason**: To me, the ideal for preset-env is always that percentage, right? Where it has a rough estimate of browser market share.
You just say, "I want my stuff to work in 90% of browsers". And that's the config.

**Jason**: But this is where we run into that situation: there are browsers that are taking a very very long time to upgrade or go away. This is, I think one of the things that preset-env might've predicted a little bit. But the way that it played out was unfortunate: it killed off some of the value that that percentage option had.

**Henry**: I didn't come up with the idea because I thought that the per browser and version idea made more sense to me because I was thinking from the program manager..

**Jason**: your browser support matrix, right.

**Henry**: They already have that, versus the percentage thing. No one thinks in that way.

**Jason**: Makes sense. Percentage of what though?

**Henry**: I guess now there are more browsers right. And some of them are based on Chrome, also in different countries.. there's mobile browsers. The matrix is already difficult, I guess that's the problem.

**Jason**: There's a weird permutation problem there, where if you say you want to support 98% of browsers, it might be that that means you could drop IE11 but support a bunch of very small market share browsers or you support all the smaller market share browsers and keep IE11. And really, if all you specify is a percentage, who decides that?

**Henry**: Right? It would be the browser list maintainers.

**Jason**: Yes. But that's just like super arbitrary,

**Henry**: Right.

**Jason**: If you're deploying for enterprise in North America, it turns out you probably want to IE11.

**Henry**: That gets into the issue of preset-env that we're going to talk about. There's just more that we don't know.

**Henry**: When you think about browsers, you just think about like Chrome, Firefox, Safari, Edge, Internet Explorer. And then later, all the mobile browsers. And then now there's like the app browsers,

**Jason**: Facebook's Webview.

**Henry**: Yeah, or IOT. How does that affect the support matrix level?

**Henry**: Maybe all those things are really old and then it's the same thing. The worst case scenario of using present-env is that it just compiles everything.

#### The complexities of transpilation

**Henry**: So let's get into what we've realized are problems that we didn't know upfront because we wouldn't have understood the implications.

**Jason**: So we touched on one, which was you have browsers that are not evergreen, but that doesn't go away. The IE11s of the world.

**Henry**: Oh, so we have to explain the conservative approach of preset-env, which is..

**Jason**: so supplying your browser versions.

**Henry**: meaning that when you make that list of versions, it does the least common denominator.

**Jason**: Right. Yeah. So Babel, can I make no assumption other than you will produce one set of JavaScript files. Because it is a tool that runs per module, right now. (laughs)

**Henry**: Right now. It makes sense that you would want to make multiple bundles based on which browser, like ideally every browser should have the optimized version. Assuming that's like the idealistic scenario where you don't have to worry about like caching or bugs in Babel.

**Jason**: Babel has no idea what your setup is. It's generally run as a tool is deeper in the chain than that.

**Henry**: So we just assume one build.

**Jason**: Yeah. So when you say, "I want to do a JavaScript bundle that supports current versions of Chrome, Firefox, Safari, and Edge, and IE11", you might as well just written IE11. Cause that's that's what the lowest common denominator is.

**Henry**: Yeah. So that's just a thing that I decided that made sense, but it has certain implications. Your always stuck supporting you IE11, you don't take any advantages from that.

**Jason**: That's if your browserslist never changes. The other one is if your browserslist does change or if you're doing bundles that support different grades of browser support.

**Jason**: A product or program manager might give you that browser support matrix and you'd have like A,B, and C grades of support if you're doing multiple bundles. Your lowest common denominators for each of those bundles may shift, but you're always going to have one.

**Jason**: And that's where we get into sort of the mechanics of how preset-env works. It is backed by browser compatibility data, but it would be somewhat unruly to take thousands of compat tests with names that test specific details of each syntax feature and match them up with a corresponding set of a thousand Babel transforms the transform those exact syntax features. Cause like you can imagine..

**Henry**: Every line in your code is associated with some test or something.

**Jason**: Yeah, literally.

**Henry**: A bunch of if statements everywhere.

**Jason**: And it seems like there'd be test coverage for 100% of a feature. Right.

**Henry**: Which is why we have some reason to use test262 which is the official test. There are literally thousands of times.

**Jason**: If it passes test262, it's valid JavaScript.

**Henry**: But test262 is just tests by the committee and someone has to create them. They can actually miss tests. Some of our team members have actually added tests because they found something.

**Henry**: That's a whole scenario in itself. How do you come up with a test to test your language feature?

**Jason**: Right, in the language.

**Henry**: I've talked to some people that work on it. Leo was saying they have generative tests, so they create code that will create more tests for them. Maybe that's an argument against adding syntax and why at the extreme level, lisp type stuff is good because it's just the parentheses, you create your macro system.

**Henry**: And then with us, every time you add a feature, you have to test against every other interaction with every other feature.

**Jason**: Yeah, combinatorial.

**Henry**: So our tests become impossible instead of do.This is more inside baseball, but we use snapshot tests; we called them fixtures.

**Henry**: It's just input output, right? And make sure they're the same. But that doesn't mean it runs.

**Henry**: And so we need executable tests. And those are the test262 tests, right? Those take longer to write and longer to run, but at least you can verify them. The problem with the snapshot, you just kind of like skim through it, you don't know if they're wrong.

**Jason**: This actually comes back to the problem that I kind of stumbled onto with preset-env.

**Jason**: Every once in a while you'll have preset-env doing something that looks absolutely logical, right? It would have generated, an arrow function inside of the class constructor, which for a given browser support target looks like it is absolutely good to go.

**Jason**: And then later on a bug report gets opened on the Babel repo saying, "Hey, this, this syntax is supposed to be valid in Safari 10?"

**Jason**: But as it turns out, when you run it, it throws. It's in a specific example: any arrow function inside of a class definition throws in Safari 10.

**Jason**: And that's where it's like, someone on Babel team would've had to run into this bug in order to put that in the data that powers preset-env. Ironically, you're probably not gonna run into the bug because you were transpiling before this became an option. (laughs)

**Henry**: So we need tests where you compile all the way down at every level in between. Ideally we have some sort of funding from companies that allows us to run all outputs for all browsers.

**Jason**: Every test262 tests in every preset-env configuration in every browser. And you can suck it back into preset-env and say, "I can guarantee that test262 passes with this configuration in Safari 10".

**Henry**: There's a lot of complexity, and it's like why we do even do this. (laughs)

**Jason**: Yeah, there's lots of people out there who say, "Okay, this is the reason why we shouldn't transpile." Just just write code, and if browsers can't run it then that's their browsers fault.

**Jason**: But I think this is where the situation gets really awkward. There are lots of browsers out there that are just never going to be updated. There's new versions of those browsers that are actively developed, but the ones that are released are end of life.

**Jason**: And taking the stance of not transpiling sort of punts the problem onto the shoulders of developers who just want to ship a product.

**Henry**: The core question of Babel should be, am I allowed to write this syntax or when is it okay to write it? And it doesn't have to be, is it physically possible to do it in the browser? It might not be efficient, it's not optimized cause the browsers have to take time to implement and pass the tests, but then transpilers are faster.

**Jason**: Right, which we've absolutely said in the past. Especially for a brand new syntax feature in a JavaScript engine, it's rarely going to have all the optimizations of the thing it is usurping.

**Henry**: Because the things that are optimized now are things that we've been writing for like five, ten years.

**Jason**: and they've been incentivized for optimization for those five to 10 writers.

**Jason**: I think it's interesting to look at the "let's not transpile thing".

**Jason**: Cause for me, especially having gone through preset-env/preset-modules, I mean I didn't know that an arrow function inside of a class constructor is broken in Safari 10.

**Jason**: I'm a person who might've considered writing untranspiled code, but I'm never going to find out that that's broken. I've just going to not get usage in that browser anymore.

**Jason**: Unless I'm maniacally studying my error logs and figured out that the weird cryptic error (that I maybe wouldn't even get in my tracking), I'm just never going to know that.

**Henry**: So even if you don't transpile, the data that we get from transpiling actually helps everyone.

**Jason**: We need the centralized knowledge of what works and what doesn't. It's more specific than just testing does a browser support arrow functions.

**Henry**: And what does it mean to support?

**Jason**: Does it support them everywhere? (laughs)

**Henry**: Every scenario, or is it just the basic case or does it just pass the syntax? There's so many scenarios and even compat-table is just a simplified version.

**Jason**: It's a window into that. The weird one I'm thinking of is.. Edge 16 almost every test for functions you can think of, but if you define an arrow function, like const foo equals an arrow function, the .name property on that arrow function won't be foo, it will be undefined. And for the 99% case if you're a developer, you don't care. You're not using the name property.

**Henry**: What even is name?

**Jason**: But then from Babel's perspective, do we bring in the arrow function transform?

**Henry**: So that's a scenario where I've always had this struggle.
We need a default. Then do we have options?

**Jason**: Ahh, this is loose versus strict. Write in if you know what loose and strict mode means. You may be the only one! (laughs)

**Henry**: Is the default that we should output the simplest thing possible, because 99% of people will only write that code? Or should we be spec compliant because someone's going to write something weird, not weird, different, the 1% thing. Would be weird for them to be like, "Why is this not working?"

**Jason**: If Babel said, "You can use arrow functions." And 99 people say, "Okay, that's cool. I can use my arrow functions as callbacks" and it works totally fine for them, but one person said, "No, it can't. They don't have a name property."

**Henry**: And that's in the spec or something.

**Jason**: Or I'm running something on my code that optimizes all of my anonymous functions to arrow functions, and I'm relying on name somewhere.

**Henry**: Right. Like minification or optimization. So how spec compliant should you be? You would think that should be a goal, but then also like there's certain tradeoffs, right?

**Jason**: There's huge tradeoffs. One is you end up shoveling boatloads of code into people's bundles to fix problems they don't have, right. Because we don't know what problems they have.

**Henry**: Are we okay with catering to the majority group, right? Or the more spec complaint thing. Maybe that's similar to the progressive enhancement versus a graceful degradation.

**Jason**: It's almost like, you access the .name property, if there was somebody who could catch that and say, "Hey, turn on strict mode. We've got you covered."

**Henry**: That was another idea, how we should analyze the outport or how they use it and then Babel would be smart enough to suggest, "you can save this much space."

**Jason**: The awkward thing here is true for a lot of AST based stuff. You probably wouldn't know from the AST that the.name property was being accessed on the function. The static analysis won’t be enough.

**Jason**: There's options there. Let's say Babel was doing more than per module transforms. You could have a dev mode, where arrow functions that got transformed would have a getter installed in the name property and if you tried to access it at runtime, it would throw. There's solutions there,
but every time you take a step towards being helpful, you might cross a boundary of how people are using Babel. Or that assumes too much about their end result. For a dev mode or a prod mode, maybe that's not a thing people are doing.

**Henry**: Then not knowing which one to lean toward you decide, “I'm going to go with (this is like most of life now), options.” You give everyone the freedom, the choice to do it, and then you realize that that's a really bad idea because no one wants to know. (laughs) No one knows the answer. They don't know what they want. And it's like people want you to choose for them in some sense.

**Jason**: Especially for preset-env. We've said, give us your browserslist and we'll give you the code that works. And the options are essentially an admission that like, we can't. Unless everything is going to be installed by default and we're taking the trade off to one extreme, we can't commit to saying that this code will run in every browser. Because I don't think developers, if they were forced to make that decision, would make that call every time. I think they would go for a middle ground. I certainly do. I mean, I’m a loose mode user, just give me whatever's the smallest.

**Henry**: The general thing I would say was, if you're a library author you can probably confidently use loose mode, unlike if you're in the app, maybe not.

**Jason**: If you constantly look at your output, by all means try loose mode and if it works, use it. Especially if you have error monitoring in place. It is an option that's there for a reason. Where that gets tricky is if you don't have good test coverage.

**Henry**: Yeah. Because what happens is you use loose mode and that will turn off the transforms, but you were relying on the loose mode behavior, while the native versions are spec compliant.

**Jason**: Yeah, you end up building code that only works when it's broken.

**Henry**: This gets me to think about optimization in general and is it worth it? You think about stuff like C compilers and how like the output has nothing to do with the input.
Because of the optimization and those have bugs. We see this problem in minifiers where it becomes unreadable. It's really hard to debug a minifier because they just says broken on a giant bundle. It’s almost impossible to find out.

**Jason**: Line 0, Character 65,010.

**Henry**: We need to make a judgment call on what kinds of optimization are worth it.
It's kind of premature optimization. It's not worth doing it because it's just making it really complicated and were making this assumption that we're never going to write bugs.

**Jason**: Yeah, sacrificing debuggability in order to have optimizations is a tough call.

#### How the problems was discovered

**Henry**: That's the implicit trade off that we don't think about.

**Henry**: But the point is, we have browsers in our targets which are not updated. Then people report bugs in those browsers. I think that's our approach, where if someone reports a bug, should we fix it? I think in most scenarios, if you're an open source maintainer, you'll fix the bug.

**Henry**: But then in our case, we're admitting that by fixing that bug, we have to decrease the target of that browser? Now everyone that has that browser is now outputting more code, even though they're not running into that issue.

**Jason**: Right. And it's difficult to bring the marketing along with that. The idea of preset-env, which is still largely intact, is it will open with the most minimal code possible for your browser support set. But with each quirky bug that gets reported, we get a little bit further from that goal.

**Henry**: Yeah. We decrease over time really slowly. And we don't really tell anyone, you don't really notice that. And I never noticed that. We’ll just fix a bug. But then when you look at the real world output of the code, why is it that in the worst case scenario that the output is the same thing as if you ran all of the transforms with Babel?

**Jason**: Yeah, so this is exactly where my journey with preset-modules started.

**Jason**: I was doing a bunch of work on module/no-module builds. For those that don't know, you create two bundles in your compile process. One that is targeted at the group of modern browsers that support ES6 modules (to clarify, you are not using ES modules, you're just using that as a cutoff point). It's roughly analogous to Edge 16, Chrome 60, Firefox 61, and Safari 10.1 on mobile or 10.3 on desktop. Why do I remember that? (laughs)

**Henry**: I don't even remember it. (laughs)

**Jason**: Those are the ones that support modules and there's a convenient thing where you could have script type="module", take your modern script there and then script nomodule and stick your legacy script there. And you don't do any work, you just get loading for old browsers and new browsers.

**Henry**: Because old browsers ignore the..

**Jason**: it ignores nomodule. If it supports module, it ignores type=”module”.

**Henry**: So you have two script tags where one of them runs.

**Jason**: And there's weird caveats to work around Safari, but by and large, this is the easiest way to do graded browser support, as long as you're okay with two grades.

**Henry**: And that's kind of like a practical step instead of the whole matrix of every

**Jason**: browser user agent.

**Henry**: Yeah figure out the user agent and then make a Babel compile for each one. So the thing that you found was that in some cases, nomodule/module, the two bundles were similar.

**Jason**: I had cases where they were byte for byte identical. which was weird. We weren’t using const and let. I found that the absolute highest value transforms that preset-env could be dropping, like async-await, generators, tag templates (of which the modern version of those things are like super optimized, fast to parse, smaller, and compress better), I kept finding those were being compiled to ES5. Tagged templates were getting compiled to strings and function calls. Async-await was getting compiled to regenerator, which is quite high cost. This sort of kept coming up over and over.

**Jason**: And originally I just thought, “people have misconfigured preset-env, right?” But this was what happened. I started digging and found that over the course of two or three years, a bunch of bugs had been opened, kind of what we described it. “I ran into this issue where I converted over to using arrow functions. And when I use Babel, my arrow functions in almost all browsers have a .name property, except for Edge 16.

**Jason**: Or more difficult, people would say, “I'm using preset-env with the es-modules option, which outputs this Edge 16+ build, and I keep getting this error where there's an exception thrown every time I instantiate a class that has an arrow function inside of it.

**Henry**: There’s all these edge cases, and I don't remember them. When you hear stuff like that, you’re like, “That's weird, I don't really want to fix it, but that's a problem for them.” Maybe none of the team focused on it and someone else decided to fix it, and of course we'll just merge it in.

**Henry**: The one I do remember, it was in a for loop and it only happened when the for-loop was over a million. And I’m like, “When is that ever going to happen?” And then we ended up merging that fix. I'm just like, “We just made the code way bigger for all these people. Why did we do that?”

**Jason**: Yeah. This is tag template call site tracking, and Safari 10 and 11 has two different weird bugs that get triggered at various States of optimization. But it's like, how would you test for that?

**Jason**: So foreshadowing here, when I did preset-modules, I had to write a test for this. You can mock the call site using bind, and that happens to trigger this bug. It doesn't trigger it the way that it was happening in the wild and the bug report, but it triggers the bug.

**Jason**: I think Justin, the guy who wrote lit-html found that cause it uses Tagged Templates, right? The outcome was disastrous, right? The tag template is always supposed to give you the same reference to an array of strings every time you call it. And this is super useful for caching. Store stuff in there, or use it as a key to map. And in Safari, it didn’t. It just gave you a new one every time.

**Jason**: Or a second bug that I found that wasn't even documented anywhere, Safari did an earlier version of the tagged templates spec. And if you had two different calls sites inside of the same parent function, they would get the same strings array, but they're different call sites so they can have different expressions in them. I can't imagine being somebody who was relying on tag templates. So literally you have a bunch of libraries now, even stepping aside the Babel problem, that implement their own tag template call site tracking. Because the cache is not reliable. And it just came down to this one browser bug.

**Henry**: I think the general thing is just browsers have bugs.

**Jason**: And that will always be the case.

**Henry**: It's hard to acknowledge that. What are the implications of what that means?

**Jason**: And each individual bug that gets reported is a small thing. And preset-env is actually really well designed in that it takes two seconds to change the data definition and recompile. It’s non-trivial, but it sort of buries the lead on that this is a huge de-optimization.

**Henry**: Because if it's Chrome 50 and now Chrome 49 and the config change is good, we don't see the input/output relationship when we change Babel that way.

**Henry**: The summary is that when browsers have bugs, Babel has to fix those bugs. That causes greater output for most people because they don't hit those bubbles. Basically over time preset-env gets worse. And this is abstract, so maybe it doesn't affect you at all. Or it might affect you a lot. So what is our way forward with that?

#### The solution via preset-modules

**Jason**: Yeah. So having sort of seen the bundles, I started to realize that we have sort of an out here. The bug is in a browser that has very good support for the syntax in question, except for in that one case.

**Jason**: There's a bunch of cases I started to just catalog. As sort of like, “Oh, I found this thing.” There was only six really specific pain points that had been logged to Babel or discussed online.

**Jason**: When I looked at them as a unit, I could go through and write syntax transforms that instead of taking a tag template and transpiling it to strings, I could just take the tag template and change the tag function to something that fixes the call site caching, which would a small 50 byte helper function. And I’ve now shipped tag templates in production, but they work in Safari.

**Jason**: Or an async arrow function inside of a class. You just turn the arrow function into a function. Babel already has a built-in method to do this, a one line transform, make it a function. The cost of that versus using regenerator is night and day.

**Jason**: If it didn't use this the this keyword or touch arguments, it's almost identical.

**Henry**: So it's finding these little patches. You can picture making a bunch of plugins and maybe that could be a preset. So I think this whole thing is a very natural evolution of observing the environment, evaluating the results, and eventually telling us we should work on this.

**Jason**: I understand preset-env here. It's just difficult if you've been working in the model the preset-env enabled to take a step back and say, “wait, could we do patching?” Is this completely different approach something we can incorporate when you have so much great infrastructure setup around that exact way of doing the conditional down leveling.

**Henry**: When I saw those issues, I was just like, “how do we fix this?”

**Jason**: Right. Do you fix it by starting a fundamentally new project? Probably not. (laughs)

**Henry**: So this is what that is, preset-modules. We had a discussion on the name which was difficult.

**Jason**: That’s why we keep getting it wrong,

**Henry**: Because then I think the first thing would be, “Oh, it compiles modules!”

**Jason**: Yeah. It doesn't, has nothing to do with module.

**Henry**: It has something to do with ES modules.

**Jason**: There's no modules transforms.

**Henry**: Oh yeah, we were going to call it babel-preset-fix-browser-bugs or something like that. (laughs)

**Jason**: Try and go as literal as humanly possible. Like an Apple length method name.

#### preset-modules is Temporary

**Henry**: I think the fact that it's really hard to come up with a name shows that this doesn't need to be a thing. I think we already described the preset, it's a bunch of bug fixes in the form of Babel plugins that transform the code in a way that isn't the whole transform. It's like the smallest possible change to fix the browser bug.

**Jason**: There's a transform to fix the function .name property, there’s a transform to fix the tag templates tracking. If you just look at the transform names, it's fix-transform-tagged-template-caching. They are laser-focused fixes. And you compare that to the transform names in preset-env, which is like transform tagged-templates?

**Jason**: So it’s a collection of transforms that they just do the patching. There was a marketing premise here that it does fulfill, which is if you were doing a compile that is targeting ES module supporting browsers, this is the minimum number of transforms required in order to reliably ship modern code. But the problem is if everybody would migrate from preset-env to this transform, this transforms just stuck in time. It doesn't fix bugs that are in Chrome 90 (if you’re not familiar with Chrome version numbers, that won't happen for another few years). Those bugs haven't even been written yet. (laughs) So what you don't want to do is pitch this like it’s the next 6to5, and we regress all the way back to the beginning.

**Henry**: This is just a snapshot in time. Preset-env was supposed to be for Babel a way to transition as well. It’s not really that this preset is what matters. The idea behind it and how to somehow integrate this back into Babel itself, which in this case is just preset-env. What we decided is that we want people to get the benefits now and get feedback. We need to figure out how to patch preset-env.

**Jason**: You and I have talked about those browser support cliffs that we have crossed. The ES modules browser support target remains a pretty good one because that's a pretty modern set of browsers, right? You're talking 80% percent market share and fairly recent browsers.

**Jason**: The further we go into the future, the less true that will be eventually. ECMAScript 50 will come out and it will have AI functions or whatever (I'm trying to make up something completely implausible), but that will be a cliff where it would be illogical to be using a preset that was written in 2019 that they couldn't self evolve, that you would have to use something else.

**Jason**: There needs to be some sort of a path for preset-modules to move back into Babel core and just become a behind the scenes feature. We talked about this in the Babel meeting, where we would take the browser compatibility data and overlay the patches that we know we had, right?
We know tag templates are busted in Safari 10, but we've got a patch for that. So don't consider them broken in Safari 10, because our output will account for that.

**Jason**: And we talked to like the browser support matrix, right? And it would be in the project's best interest and in all of our best interests to make sure that we are trying to contribute as much as possible into that patch substrate so that we can keep that baseline moving forward as best as we can.

**Jason**: The interesting thing is, there is prior art for this. Babel's code generator always wraps, I think it's await expressions in parens, to fix a Safari bug. So this has been done in the past. That's not an option you can set in the config. But there was a bug at one point and it's such a cheap operation to do

**Jason**: In that regard, Babel has never had to be like, “Oh, we can't use async await in Safari, because the parens.” So there's prior art there. The interesting thing is how does that scale up.

**Henry**: What we're asking for now is a process change for Babel to add these things. I thought that was like what jQuery was doing to. People talked about querySelector, but it also fixed browser bugs, right? And it gave you this API that it just works across all browsers. We're doing that with syntax.

**Jason**: For Babel, the key there would be, it needs to be such that if you're using preset-env you define your browser support target to be Safari 12+, you shouldn't get the tag templates transform. We want it to be there by default, when you need it, but not when you don’t.

**Henry**: I think that's a good explanation. How would you describe this scenario all the way down, right? There's a whole path: the proposal for the future, it gets standardized, it gets implemented in Babel, it gets into the browser, and then there's a bug in the browser. The browser bug could have been reported to the browser directly. Eventually someone points it to us and then we have to create the patch. How does that work? Right now everything is just so ad hoc.

**Jason**: My list of bugs was a mix of WebKit tracker, Chrome tracker, and Babel issues. Very few of them had both. Which was interesting because at some point it doesn't matter what happens, somebody who needs to know about this isn't going to.

**Jason**: Babel is not even the maintainer of that compat data, and it wasn't reported through the compact data because who is going to be a web developer using Babel, running code in a browser, but then know to report it over at all the kangax compat-table.

**Henry**: Either coordination effort, not that we need to make our own compat table. We do have a real reason to do that, in the interest of our project. I thought for a lot of people, the compat-table was just like a nice thing to look at it. But for us it's literally the data to make this work.

**Jason**: It’s what you what of written as code.

**Henry**: It is code for us. For other people, it's okay if it's kind of wrong.

**Jason**: For Babel’s purposes, you could make an argument that it would be nice to have that data in-house so that it can be mutated when fixes are produced.

**Henry**: At least in a way that we can manipulate. I would love to not maintain more stuff or have to recreate anything either. Can we work together to do that kind of thing?

**Jason**: And then you're bringing in the whole test262. Does Babel do the work of meshing all this data together or do we just need a centralized place for this data? Cause there's also the reporting aspect. I'm a developer using Babel, it might be the most logical place for me to go and file a bug. But then does Babel go a file a bug with the browser engine?

**Henry**: Or do you make a bot that does it?

**Jason**: Who's maintaining that infrastructure?

#### A Call for Feedback and Teaser

**Henry**: I think that basically covers it. Maybe you can mention this first bullet point?

**Jason**: So we published Babel preset-modules as its own independent thing. You're going to install it on npm, some products are already using it.

**Jason**: If you have a module/nomodule build setup, we want to make it easier. Please let us or let me know. File issues. Understand that long term, we would love for this to migrate back into preset-env. Thankfully that's just a configuration change. So it's super minimal overhead and you can try things out today. Definitely very interested in any feedback! Interested that you get any exceptions thrown. Production error monitoring. I want to to know.

**Henry**: What projects are you using it now?

**Jason**: Next.js ships it, which is pretty cool.

**Henry**: I did post on Twitter if people had things we should talk about. We can mention them and maybe they can be future episodes because it's a whole different topic. Vincent and a lot of other people were asking about compiling node_modules, so yeah.

**Jason**: Something, something, try running Babel on your output. Maybe topic for a second episode.

**Jason**: Vincent, it was on the outline. It was on our outline to put it on the second podcast. (laughs) It's a super interesting area, and I certainly in my own head, I've made a very compelling argument for running Babel twice.

**Henry**: I think you've written like at least two or three blog posts on the topic, and I wrote one a long time ago.

**Jason**: Those are just the public blog posts. You should see this stuff. I've pitched it people internally.

**Henry**: How do we get library authors to.. so all the problems we're talking about now are your own code.

**Henry**: Wait, a lot of the code that we run and ship is not even our own code, it's libraries. They are all on ES5 and we have this whole other problem.

**Jason**: What if it's too late, right? (laughs) Like quite literally. What if all the code that you're passing to Babel is already transpired to ES5. Does anything matter?

**Henry**: Why are you even worrying about your own code? That's a good teaser for the next

**Jason**: Find out next, on the Babel podcast!

**Henry**: Yeah. I think that's good then.
