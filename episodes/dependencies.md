---
title: "03: Jason Miller on Compiling Your Dependencies"
date: "2020-02-28"
time: "45"
description: "Jason Miller and Henry Zhu do a follow up episode on the issues around running modern JavaScript for not just your own code, but rather your dependencies (what's in node_modules). Discussed are specific approaches by bundlers to change package.json fields like jsnext:main/module, general issues for library consumers and maintainers as well as browsers, and the hints of some ideas for the near and far future."
episodeLink: f732dbf9
embedUrl: https://share.transistor.fm/s/86ef270a
---

### Transcript

<details>
<summary>Links

> Conversations may be edited for clarity. [(edit)](https://github.com/babel/podcast.babeljs.io/edit/master/episodes/dependencies.md)

</summary>

</details>

**Henry**: So the last episode we talked about Modern JavaScript. We would recommend you listen to that first. The summary is that Babel handles compiling modern JavaScript for your own code, but this episode we're going to talk about how that's not enough, because you're not running just your own code, but your dependencies and the issues around compiling your dependencies.

**Jason**: Yeah, that's a great summary. So previously, we were discussing some of the benefits of using modern syntax, shipping smaller, a little faster to parse. But we kind of alluded to it last time, which is just you probably only write 10 to 15% of the code that ships in your production application, once you've identified everything. You know, for as much effort as we put into making all these things work in tandem, if we're optimizing 10% of an app, that could be a tiny difference. (laughs) So that's sort of the space that this carves out and it kind of makes it seem like a problem that needs to be addressed.

**Henry**: If it's only 10% and the rest of it's the library.. You talked about earlier, the thing that you want to work on; things that scale. And if this is dependencies, we're all using dependencies that are versioned, that don't change, they're cachable, then this is something that's more worth working on.

**Jason**: Exactly. I mean, if you're operating on the 90% and the 90% is shared code bases that you can go and tweak or change how shared code bases are used in bundlers or transpilers, like we were talking about earlier, that's a centralized, potentially fixable problem point. Other than saying, "Hey, everybody with your million Webpack or Babel configurations, please pull it this way." I guess there are fewer npm module authors than there are application developers.

**Henry**: Right. And those module authors have more code running than all the other companies.

**Jason**: Yeah, they're maybe a little bit more incentivized even to make these types of structural changes because at the end of the day, one of the ways we evaluate a module is its efficiency. And so if it's inefficient because it's very large or cause it's shipping like a C syntax. And most module authors would be incentivized to find ways to shift to something better.

**Henry**: I don't know if the trend is over time, people are using more dependencies. Not that that's necessarily a good thing, but that it means that this is important.

**Jason**: Yeah. It just means that that number is sliding even further towards 10% from 15 or even further than that, in some cases.

**Henry**: You were even telling me that if you're compiling your own code to ES6, but you're using library code with ES5 that might make it even worse?

**Jason**: Yes. So this was one of the more disappointing things when I was first investigating preset-env's output. And preset-env with the type modules output was somewhat similar, even though preset-env was generating definitely more modern, compact syntax. Because of the way compression works, like gzip and Brotil compression works, you would end up with your node_modules syntax as ES5 with the function, keyword and all this kind of stuff. And then you end up with your syntax compiled to arrow functions and let and const and you know, these sorts of different structures. And there would be significantly fewer runs of the same text in your code that there would be in the dependencies, and when you bundle them all into the same file, that's less repeated text, which means larger size over the wire when compressed. So we were to see a reduction in the raw byte size of bundles, but an increase in the gzip size of the bundles just because some of the syntax was not better. (laughs)

**Henry**: That is very surprising and really sad!

**Jason**: Yes. Yeah. Really sad, right? It's like, Oh, sweet. It is reverse incentivized, like you actually want to ship ES5 if that's the metric. So I mean, thankfully that was one of the things that that drove me to go, "Hey, how on earth could this possibly be larger?"
And then on the one hand, there was this different syntax causing poorer compression. But on the other hand, there was that issue we talked about last time of like, there was still regenerator or there was still compiled tagged templates. I think once we addressed that with preset-modules, were at least now in a position where it's still smaller, even with the compression working against us. (laughs)

**Henry**: Yeah. So I guess that kind of explains the problem that we're dealing with. It seems like at a very high level, the way we kind of solve this is that we would require that maintainers of these libraries to publish latest syntax. Cause a lot of times they will publish ES5. Although in some sense it's easier to publish the latest syntax because you kind of just run the output. The second thing would be that the tooling needs to expect that later syntax.

**Jason**: So it's like if we have this problem where we're shipping 10% modern syntax, even though we want to ship all modern syntax, aside from some stuff we might get into later, you can't really like work forwards from the past. Like you can't normalize that direction. Obviously, you could compile your syntax to legacy syntax. We know we can do that.

**Jason**: But really what we need is like the 2000 npm modules you have installed in your project all at some point need to move over to shipping. ES2017 or something like that. And this kind of sucks both for module offers and for people who are consuming modules, because before we could just fall back on this idea of like, yeah, modules, we'll ship JavaScript. And there was just the sort of, I guess, shared understanding the JavaScript was javaScript that works everywhere with the you know, the giant star, unless you're supporting IE9 because everyone's kind of forgotten about it. (laughs)

**Jason**: The world moved on from IE9 and then people were only supporting IE11+ and now there's still lots of vestiges of that, cause IE11 has like 2 or 3% market share still. But even when that goes away, as a module author, if I ship my JavaScript with classes, am I supporting Edge 16? Edge 16 doesn't have a lot of browser share, but it's a JavaScript runtime that supports classes. So do I need to ship code that works around bugs in that browser, or do I make the arbitrary decision of saying, "No, my library only works in Edge 18 or Edgium or whatever." I'm essentially as a library author, I'm giving you my support policy for my module.

**Jason**: And as a consumer, this makes no sense because you can't scan your node_modules directory and come up with a list of user agents that those modules will support. It's just a total Russian roulette, and it's even weirder cause like you might install a dependency and then years later you go and update it and they changed their build process or they, they started using public class fields or whatever and the dependency that works totally fine that at the time didn't happen to use a specific modern syntax that broke one of the browsers that you're required to support suddenly uses syntax, that breaks the browser that you're required to support. That's super frustrating and also ridiculously hard to track down.

**Henry**: And they might not do it in like a major version right?

**Jason**: No, of course not. Especially. So like you had mentioned Sindre who I think does get this a lot. This is super, super true in npm modules that are primarily used in a Node runtime because in Node, either using engines.node or as a result of the fact that there isn't one Node.js, there's sort of this idea of like you go, two LTSs back or four versions back or whatever.

**Jason**: And the whole community kind of slowly marches its support policy forward. Nowadays, you generally don't need to go out of your way to support Node 6. You probably do still support Node 8, but you're probably getting ready to drop support for Node 8. And so I can remember a specific example. It was some very small module that accomplished a task. There was a small refactor that did not change the public API at all and was just released at npm as a patch release. And as part of the refactor, they've moved from var to const. And at the time I was working at a code base that supported IE9 and that immediately broke my entire application because the const was bundled in and was invalid syntax in IE9 or 11 or whatever. And it was already minified, so I had no idea what module had caused this problem. It was like a patch update. So it just happened because we weren't using package locks. I think a lot of people get that.

**Jason**: And so on the flip side, as a package author, if I'm publishing my stuff to NPM, I'm basically by writing modern syntax in my module or by shipping modern syntax. When I compile my module, I am opening myself up to a flood of issues from the people who use my module, essentially saying, why did you choose not to support the browsers that I support? Which is awkward.

**Henry**: Right? Some author or module authors don't want to worry about that. So they only publish the latest thing, especially for Node, right? There's like this I guess unspoken rule around how many Node versions back you support? And then you also get other people that are too scared to do that, so they actually just support as much as possible and they'll never actually update to ES6 cause they want to support it all the way down. Here we're just trying to maybe acknowledge that we've always implicitly had this issue of, everyone has a support policy, but you never really had to talk about it.

**Henry**: And like you said before, everyone has just slowly dropped, IE9 or IE6. Maybe some people will slowly drop IE11. But for this kind of tooling, we need it to be very specific. You could wait X years to not support IE, but it's not the most efficient thing.

**Jason**: Right when there's also like a weird discrepancy where you'll have like a library's support target, which is this implicit thing that's not written down, usually it's just in the maintainers head or somewhere else down in the readme, and then you'll have the browsers that a library tests in. And that's really only if it's intended for the client.

**Jason**: So if you're bundling a module that is built for Node, you're kind of on your own. It's not necessarily true that the browser a library tests in is the extent of its browser support. It might just be like the ones that the author cared about or the ones that they perceive bug reports for.

**Henry**: Mmm, that's true. Because maybe you support a lot of browsers, but you just don't want to test that much or you can't test that many. That's funny cause even with Babel it's like we are still supporting Node 6 until Babel 8, right?

**Jason**: Right. And it's kind of hard, cause like if you're a command line tool, how do you define your support target? Well, I guess especially like Babel is in a super weird spot. Babel is a command line tool and a thing that even runs in the browser. You're straddling and saying like, you don't really have a browser support target, but a Node support target, and they might be totally different, right? You might be stuck on a node LTS from ages ago, but not care about shipping in old browsers because it's only used for the repl or whatever.

**Henry**: Right. And then I feel like in that case it would be better to have two separate things, one for browser, one for node.

**Jason**: Yeah. And so, and like we have packages now that, that will do a browser field versus a main field. It's one of the common ones. But even then for historic reasons, that tends to focus on the module format, right? Like browser is going to be UMD, and the default will be like CommonJS.

**Henry**: That's a good transition into this history of how people have attempted to do this in the past? We can talk about just the package.json fields, if you're not familiar with that, there's like name, repo, and even npm scripts, stuff like that. But one of the fields in package.json is called main and it's the the file that gets imported when you import the file?

**Jason**: I guess it's like the packages entry, right? If you import foo, and main is index.js, you get foo/index.js. It's how you take a module specifier like you would pass to require and convert it into a path that you find on disk.

**Henry**: And that's what Webpack uses, right, to resolve imports? But then in the last few years, people have been creating their own fields, and I guess Webpack has supported all of these different fields.

**Jason**: Yeah, for all the package.json has brought as having sort of a centralized nice point of collecting meta data. It also has this sort of free form database type thing that inherited where you can put any key in a package.json and they all look like they have the same meaning, even though some of them might be absolutely useless and not read by any tool. So the ecosystem.. First we just had main and it was always CommonJS cause we only cared about Node. Then browserify came along and started wrapping up npm packages for the browser and now main was still CommonJS, but it was also CommonJS in the browser and you run into weird situations where like if you were importing fs, like the file system module, obviously browserify is not going to inline Node's fs implementation, right? What would that even do? Which actually is still a good question, but putting that aside, right?

**Jason**: Like Browserify at some point wants to be like, actually we have this fake version of path. It could give you Node's path implementation, like the actual native path module in Node, but in the browser, when you package it up, it could give you a shim that happens to implement base name and dirname and all these things and just fakes out the properties that don't make sense there as you're not an actual file. And so we got main, we got browser and pretty much everything jumped on browser because Node didn't have to worry about browser cause it wasn't relevant there and all the tooling kind of had this one field. Then I think it was around the time when roll-ups started to get popular. Rich was like working with ES modules and everybody kind of collectively had acknowledged that the browser field pointed to like a big old bundle that was designed to kind of be chucked into the page as it was probably pre-minified, all the dependencies were inlined.

**Jason**: It was the thing if you were going to stick that library on a CDN. Like for Babel it might be babel-standalone. When Rollup would come in and encounter a module, it was actually totally capable of pulling in the original source for the module and not using this giant pre concatenated bundle. The pre concatenated bundle was actually a terrible thing to try and pull into a dependency graph cause it's a giant blob that you can't pull apart. Rich's solution was, "Let's add a new field, let's add this jsnext:main field." And I will say the one thing I'll fault him for on this is a colon in a manifest format, where colons have semantic meaning.

**Jason**: It's always weird when I say jsnext and main, I feel like you need to say jsnext:main, but I dunno. So that shipped, that was a thing in Rollup for awhile. It was essentially, you would point to something that was pretty much the same as your Node.js Source, but instead of using CommonJS, you were using ES modules. And Rollup is not a transpiler, it's a bundler. The focus of that original Wiki page that Rich had that explained what jsnext:main was for module authors. It was just on the module format, like shipping ESM. There wasn't anything in there to say what syntax level of JavaScript you should put in that field.

**Jason**: And so because we had this weird uneven surface, some people were shipping jsnext:main as modern JavaScript with classes and async and modules, and some people were shipping jsnext:main as ES5 with import statements, which was a weird, confusing, made up format that never technically existed. But we created the lowest common denominator of those two. And really the only reliable way to interpret that as a bundler was assume that it is in legacy syntax. So jsnext:main ended up becoming just the same syntax level as the rest of the package, which was always still going to be ES5, but with modules.

**Jason**: Which kind of sucks, right? We lost out on a chance there. Especially cause it was called jsnext, you would assume it'd be like some current version, which I mean, part of the problem is it's totally not Rich's fault at all. He was sort of the reason why we ended up with a module field, which replaced this. jsnext:main, as a field didn't contain enough metadata to express like, what do you mean when you say next?

**Jason**: Right? What was modern at the time when this package was published? If the package is five years old, modern at that point would have been, ES2015 not even, maybe, probably just before then. It would actually just be with const, versus a package published yesterday might be using, trying to think, Oh, what's that one?

**Jason**: The double question marks, I can't run the name of the spec. Nulllish coalescing? So as a consumer of that package, it's ludicrous that I would have no idea whether it's one or the other. Basically just like a guess. And it's not as simple as just like looking at the file.

**Jason**: As soon as you go into the territory of looking at the file, you are attempting to parse a file of unknown syntax and fall back to other parse modes, running through every possible ECMA version and seeing which one succeeds. Backwards compatibility obviously helps a little bit there, but it's not a perfect story.

**Jason**: So jsnext:main pretty much became the module field. Didn't change any of the semantics when we made that transition. It was just like a simpler name for the same feature. I thought it was also around the time when people realize, "Crap, okay, so the ship of producing modern syntax and putting it in this field, that ship has kind of sailed lets just double down on ES5 plus modules for this and we'll get the tree shaking benefits, but not modern syntax." And everybody kind of at this point has standardized on that with a couple of holdouts. It left the whole idea of a modern package in the dust.

**Henry**: In some ways it's kind of like the same problem that happened with preset-env regarding these common denominators.

**Jason**: Right? Yeah. Like preset-env, it launched it was like, "Oh, just use last two versions, and then last two versions was just the same thing every time, right?" So, it was just always IE11 and so we always end up with the original intent is this dynamic thing, and then as it turns out in the wild, we kind of just need to find a static thing.

**Jason**: And the static thing is always just going to be the simplest thing or the oldest thing or the worst thing. Like it has to be that lowest common denominator. So we lost that. And there's been a bunch of proposals since then to say like, if we were going to do a new thing that wasn't module, it wasn't main, what could it be?

**Jason**: What would we need in order to capture some of that dynamism to have like some representation of like, here's my entry point to my package and it is ES2017 or whatever. All of these have kind of been met with some difficulty because. If you're shipping JavaScript at the browser, you can't ship something called ES2017. I think we touched on this a little bit in the last podcast, but it's like you can't ship the spec version of the thing because browsers are kind of uneven and you'll end up with either a browser bug or an inconsistent implementation that means like ES2017 but not this feature, but you can ship this other feature from 2018, but you have to work around this one syntax bug and it's like you're never actually shipping a version of JavaScript. You're shipping the syntax that is supported by the set of browsers defined by a query or something.

**Henry**: So it's not as clear cut and it's like saying, this year, it doesn't work that way.

**Jason**: Yeah. I think there was a proposal at one point, it was like, Oh, like we'll have like a modern field. And you'll look at the published date of the package, and then you'll look at the ECMA spec for that year and like Math.floor it to the beginning of the year. So it'd be like last year's ECMA spec, we'll assume that the package contains this.

**Jason**: But you can come up with a bunch of strawman. So does that mean that my package, if I published it in 2017, can contain block scope let, because that breaks in Safari 10 and 11. Is that valid syntax for 2017? I think we'll see people who are shipping things to Safari 10 and 11 would say no, cause that would break Safari 10 and 11. And there's like a bunch of those, like if you get into things like tail call recursion, like he ES2015. Yeah, tail call recursion is a thing. And no one has implemented it. So was it really in the spec, is that part of JavaScript yet or is that part of the spec that that has not yet been implemented?

**Henry**: Right. So that's kind of more of what we were saying last time where there is a huge, or not huge, there is a gap between the spec and what's actually in browsers. And sometimes it's not transparent to the user where we just assume there are no issues and when you've worked on a tool like this, you realize that there are actual issues between these things. It's not just the bugs, what is the current reality of browser support? It's even hard to know what that is.

**Jason**: Yeah, and it's hard to know. It is hard to assess it. We don't have like a standardized website you can go to. I mean, we have the Kangax tables, which is about as close as you could get, but you can't like go to the Kangax tables and be like, show me this selection of features.

**Jason**: Okay. I'm going to call that something, you know, BrowserScript 2017. It's like JavaScript as implemented by browsers at the end of 2017 and so there was actually a really interesting proposal to say like, okay, let's set up a standards process and at the end of every year we will meet, we will list out all the features that shipped in browsers, and we'll say, this is the syntax that you can use as of the end of this year. And we'll give it a name. It will be 2017 syntax that's separate from the spec. I think it's called the most recently shipped syntax.

**Jason**: And the implication is like, that would also be the syntax that browser vendors would commit to fixing bugs in. So if you had a version of a browser that committed to shipping that syntax and then regressed, that would be a bug and you would fix that. But I mean, as you could imagine, a thing that proposes to get everybody in the same room and agree on something is obviously a very, very, very difficult thing to get consensus on, right? A spec that requires meetings every year is, I don't think there's, there's been a precedent for that.

**Henry**: The closest thing to that would be the test262.report. I don't know if you've seen that from Bocoup. That only works for five engines. You would need that for basically every browser and you would run that every day but I don't know if it's worth doing something like that.

**Jason**: Then you give it a name or whatever. I think it all would have worked. For me actually, the weirder question here was like, there's a lot of complexity in setting up that system. We know if that system were to be set up would be very effective cause it would move with us into the future.

**Jason**: There would be a shipping syntax as of 2025, it would be the current syntax. It would never be a thing holding us back, but it is a very high investment. There's a lot of speccing to do to make that work. And it's also like a spec that would then have tons of ongoing maintenance, which we would need to set a precedent for.

**Jason**: And so I think coming on the heels of that, getting the pushback that it did, we're back to the position of just trying to figure out.. what can we. We are so far past ES5 now, like we're many, many, many years past ES5? What is the simplest, most pragmatic balance of efficacy here that we can have that lets us at least ship something that is definitively modern, even if it's not ES2019 or there's something even super recent. Like what can we do to be able to ship class and async right? These like super valuable primitives. So kind of where we ended up. Is there a short step here that we could do? I've been looking at this through some stuff with microbundle.

**Jason**: Microbundle has a modern mode now. It's using preset-modules under the hood. For me, the obvious solution here has always been script type=module. So whereas we talked about that idea of all the browsers implemented these features at the end of 2017, we kind of have that in that if you are implementing the module nomodule pattern where you use script type module to ship modern to the browsers that support scripts like module and script nomodule to ship on other file to browsers that don't, that is a syntax cutoff point, right? And it so happens, it's kind of the good, syntax cutoff point that gives you access to async await and generators and tag templates and let and const, all these wonderful things in addition to modules. The beautiful part is, it has a spec that was never intended to be a syntax cutoff point, but it shipped! Like, it exists. It's there, it's in browsers. If you could double down on that, you get your syntax cut off point. You only get one. Right, we'll have to just invent another one in the future. I was actually just talking to somebody today about this. We think there's another one coming down the pipe in the form of import maps, which is absolutely fantastic to just know that there'll be another one of these. Maybe the cadence is once every five years, and as a community, we just have to acknowledge that like, that's okay.

**Henry**: Right? Cause it's kind of like we could've went this route with the best possible outcome of literally figuring out each individual feature for each browser. But like you were saying, that's like a good longterm solution that would take too long, so let's just go with something. Cause right now we are not doing it at all.
Right.

**Jason**: Right? Like if given the choice between shipping five in 2025 or shipping, yes, 2017 in 2025. There's only one answer, right? Like if those are the two options, ES5 is just not an acceptable trade off to make. And so even if this sort of sticks us at just yet another random point in time, I'll take the sooner point in time.

**Jason**: And this is also nice cause there's a bunch of other things that you can roll into this syntax cutoff point. Like you can assume that a browser that supports modules also includes fetch cause it's required by the module spec, so you don't need a fetch polyfill. Same deal for promises.

**Jason**: I can totally take Map for granted now. And the Delta between what we shipped today, which is like over polyfilled ES5 and what you can ship via script type module is this giant gap. So I figured, we'll cross that divide and then we'll be in such a better position having shipped differential serving of some kind that the next time there's a gap available, whether it's import maps or something beyond that, we'll know exactly the types of techniques to look at or it buys us the time to come up with something future-proof.

**Henry**: Right. So once we do the differential bundling or two different bundles, the next time something comes around, hopefully you should be able to just change a few lines of config.

**Jason**: Yeah. Like once we figure out what's the trick to loading the modern versus the legacy bundle, we're just basically reconfiguring our tools and figuring out like, is this going to give you that nice 90%/ 10% browser market share split. As a community, I think that would be a relatively easy decision for us to make since we'll already have the infrastructure in place to build those two bundles, we're just changing parameters.

**Jason**: I'm going to try and do a terrible segue here. Speaking of parameters, (laughs, you can delete that) the weird piece that's left over here is, there will be npm dependencies that are in our dependency trees for a long time that don't do any of these things. They don't ship modern syntax. They don't upgrade. Maybe there are modules that were published five years ago, right? And I think we are smart enough as a community to know that a module that is five years old but fulfills its task perfectly, maybe it's just a piece of software that works and it doesn't need to be updated every 10 minutes.

**Jason**: And I think at some point it's always good to roll something to the new version of JavaScript or whatever, but by and large, if you have a module that accomplishes a task and it does it well, maybe that's just fine. What we have to figure out is, how do you operate on node_modules, either transpiling node_modules or bundling node_modules, and shipping in the browser when node_modules is a jagged surface where some of your node_modules are ES2017, some of your node_modules are ES5. We can't really know that in advance. And for this, you had mentioned Lebab, or Lebab. And so that is a potential avenue here, and obviously one

**Jason**: I've been exploring personally and tweeted recently, for us to say, if we want to ship modern JavaScript, we can find techniques for inferring, almost like you were doing a refactor on the fly, like an automated refactoring approach saying, this module is using CommonJS, but it's like it's just doing module.exports equals a function and there's no other exports in the file. We can definitely take that and transform that to ES module, especially if it's not using like this in global scope, whatever.

**Jason**: Like there's a bunch of conditions where if the module satisfies those conditions, we can just sort of auto upgrade it. And that's also true for things like arrow functions. If the function is not leaked externally, it's just a callback. There's no this access, nothing's using arguments.

**Jason**: You could potentially convert a function to an arrow function. I think actually even terser has started having an option to do this. Or like if a function is creating an array, looping over the arguments object, sticking it in that array. We could probably infer that that is doing a rest perimeter. And I think if you pile up enough of those, kind of like reverse compilation techniques, maybe you get to a point where you can offset that gzip problem we talked about where it's like, I'm not gonna necessarily be penalized by the fact that this module was originally authored in an older syntax because I can mostly bring it to like current syntax for the syntaxes that that have some effect on bundle size.

**Henry**: Yeah, and I guess if it is automated, ideally there could be an opt in of like sending a PR into those packages, assuming they want to take those changes in.

**Jason**: Totally, like the transforms that would make this work, you could envision those also being usable as code mods. And so as a community it might be.. You know, this is still people talking to people about people doing things. So there's always going to be that human element not just robots. But I think maintainers armed with tools that help them move forward is always a better outcome waiting to happen, right?

**Jason**: I remember I tried to send a PR actually to one of Sindre's repos and I think he initially responded with a very intelligent and reasonable request to me, which is like, Hey, you know, I maintain like 2000 modules. It would be really good if there was like a tool that I could move this repo to. It would let me move to modern JavaScript or TypeScript or whatever. And kind of paved the cow path of like, okay, so we had this tooling stack, now we have this new tooling stack. And he can sort of replicate that on all of his ridiculously large number of modules that he's not maintaining 2001 one-off configurations for how to build these things.

**Jason**: So the same thing I think kind of applies to this idea of moving to modern syntax. If you can sort of apply a codemod to all of your modules and say, yes, I'll probably have to go in and fix some of these things by hand, but I'm not constantly looking at these arguments accesses and trying to infer whether I was using rest spread here or not. The tool had just do that for me. I don't need my human eyes to to achieve that task.

**Henry**: I was also thinking that doesn't even have to be for libraries but even people that want to move to modern syntax, we could still have a code mod for that. Right? It's like all the levels of upgrading. This is where I've mentioned that it would be nice to have a codemod for each proposal. So even when it's being developed, we already have something to help people test it.

**Jason**: Yeah. And that way you're not saying like, Hey, try out this new modern syntax that you currently to transpile, see if it works for you. You could just say, take an example app, take an open source application like OpenCollective or whatever, and compile all the stuff that could be done using nullish coalescing to nullish coalescing, and let's just run it, see if it works, see how it works.

**Jason**: I can even see a case where if you were a maintainer of a JavaScript engine and you wanted to do performance testing of a new feature. It would be fantastic to be able to say, "Use it, convert this code base to use it automatically, or on the fly or whatever. And let's just compare it to the transpiled version." We do it the other way round.

**Henry**: Yeah. It's funny that even though we've been focusing so much on down leveling, the opposite is just as useful.

**Jason**: Yeah, it is a harder challenge, right? Instead of 1 to n, you're doing n to 1. But I think for me, it kind of got my brain turning. Lebab has been around for awhile, but the thing that brought me back to thinking, Hey, we should, we should double down on this space, is realizing that like, there's only a couple of tools that actually control the syntax that gets shipped. You'll obviously have handwritten JavaScript to contend with, but the vast majority of the stuff that actually gets shipped to npm and to browsers is the output of Babel and TypeScript. If you can start with those two tools, and especially if you've got the substrate there where you can extend it to support the output of other tools relatively easily through pattern matching.

**Jason**: That seems like I like a great place for our community to collaborate.. Is on figuring out like what those reverse transforms are. Also been really interesting as a way to force myself to very deeply inspect the output of these tools and see like what tiny tweaks in source produce, you know, sort of de optimizations in the output.

**Jason**: Because there's like a class constructor that happens to access this, or a class constructor that does or doesn't call a super constructor. The output of those are wildly different. And doing the reverse translation, you're sort of forced to look at that and be like, wow, I might avoid calling super instructors in my code base if I'm transpiling it.

**Henry**: Also an incentive for engines to look at the output of the transpilers, which in the past, v8 has definitely sent in some PRs.

**Jason**: Yeah, for sure. We had something in the notes here about, node_modules being a jagged surface for syntax level, where you don't really know what module is going to be what syntax. So you were reminding me of how this sort of changed in Babel 7 right from the previous approach of just inspect everything to actually having a built in solution for applying different transforms to that jagged surface.

**Henry**: I was looking up how many times we've talked about this on online, on Twitter, and you can just search our name and then node_modules. And I found one, I'm sure there's an earlier one, but I found one from Jason, february 16th, 2017. It's kind of like a hack.

**Jason**: If you're a module and you published with jsnext:main or module entry point, I am going to transform you assuming your modern syntax. For me at the time this was like just after the whole jsnext:main to module transition thing and I was trying to resolve for myself actually for an internal code base I had that where all of our stuff was deployed to NPM.

**Jason**: Can I still use the module field to ship modern JavaScript? Cause I was doubled down on that, I was shipping JSX which is sort of not a good idea. But this was my way of saying, I have to have something like I can't just read my own code, even though it's deployed to npm, it's still first-party code, the same as I would lodash, right. Like I don't want to write everything. I don't want to run all of my stuff through Babel first, publish it, and then consume it, and then Babel out again. I wanted some way of knowing like, this package has something that isn't just CommonJS ES5. So yeah, this is a dirty hack. It does a bunch of file system access stuff. So it wasn't the most performance thing. I did ship it in production.

**Henry**: I felt like this when I was working at Adobe as well, where you control the code cause it's your own library, but you have to consume it via npm. And so that makes you kind of think why can't I use ES6 cause I'm writing it and then maybe it'll make you want to put everything into a monorepo and then not have modules. But the whole point of a library..

**Jason**: Yeah. You're sort of feeling of a microcosm of the maintainer-consumer package trade off we have, right? But you're both the maintainer and the consumer, so you get it from both sides. I've even actually seen this in a lerna based monitor repo. Where are you're sort of using npm as the conduit for this. You still end up having to special case your packages and be like exclude all of node_modules, but include @ my-company namespace because I really want to ship ES6 cause I'm not shipping it, I'm just importing it via NPM. It's super awkward. Right? So this is where that overrides option in V7 comes in. Cause the thing I had while it did have the ability to, to go and inspect the package.json, which is kind of nice, it was all happening outside of Babel. So every time Webpack would request a module and run it through Babel and it would go to the disk, it would go in and perform that look up. And I think I threw a cache around the package.json read, but it's not really going to help. So like the overrides option is sort of a slightly more low-fi version of that in that it's like you give it a path pattern, which I think is a red X or a mini match pattern.

**Jason**: And then the rest of the object is like overrides to apply to the Babel configuration. So I guess you can speak to this more than me, but it sort of feels to me like the same overrides technique that we have with the env option where you can do like env.test env.production, but now you can do it for like env. this file name. You can just like essentially have an overlay configuration that you apply per file, and creating that results configuration as much cheaper than going to disc.

**Henry**: I think it is similar to include. I got the name from ESLint as well, so they have a similar thing. It's a top level option in Babel config, and you can put in individual configs for each path that you want. So you could have different configs for different node_modules, or you could just make one for all of them. But the idea there is that you can compile your own code separately from you're node_modules code.

**Henry**: Another thing that we had to change in V7 was the config lookup itself. One of the issues was that a lot of packages published their babelrcs in the package. So then when you compile with node_modules, it will try to read that babelrc. And that has problems because that package might run a plugin that's not in your app package. With the new babel.config.js, it would run all your node_modules packages with your main config and resolve all the plugins through your main app. I mean, the other approach would be to have to download all the plugins for each package. And in some sense that that would be safer, I guess. Right? Cause you're compiling with what it's expecting, but that might not be what you want anyway.

**Jason**: Yeah. That's more this package is whatever syntax this package defined. You're not necessarily even getting JavaScript.

**Henry**: Right. It could be JSX or TypeScript or Flow or whatever it is.

**Jason**: Like, I think Parcel is doing something along those lines, or they're just trying to make sure that they support as much source variants as possible. But for a tool that's lower down on the stack, like Babel, it's like, that's at least for me, when I first encountered this, it was much more of an unexpected behavior. We have our Babel configuration for our test setup in preact-cli is in the package.json, and we weren't stripping it out on publish, so it would have like a CommonJS transform and like JSX and stuff and it's like, no, no, no please don't run any of these, like they are all totally pointless.

**Henry**: Right? Or you just have like some custom plugin that it doesn't make sense for it to try to resolve that where it's not in the dependencies. So these are all V7 changes that we made to kind of support this use case. The last one that I remember is regarding module and script mode.

**Henry**: And we actually mentioned that on the last podcast because we asked that people know what the difference is? So funny thing is that Babel assumes all files are in strict mode because it assumes all files are modules. And in some sense that's a bad thing, but I think it's ended up a good thing because we kind of wanted everything to be in strict mode.

**Henry**: But the problem is that if you import a file that is a script, you know, it could be like jQuery or just some kind of client library, then it would fail because it will compile it in strict mode when it's not, if it doesn't specify, it would add in "use strict" at the top, even inside of the functions and that would break it. And so we had to introduce a, another mode called unambiguous, where it actually tries to figure out whether it should be script or module. And that way you could potentially run Babel on all node_modules and not care.

**Jason**: Right? I think it basically just said like, is there an import or an export in the file? Okay, I want to compile this as a module. Yeah. Which is smart, that is like one of those features that helps you reduce that jagged surface of node_modules. Not necessarily for a syntax level, but at least for like, I'm not going to break top level this in a common JS module.

**Henry**: Right. If that is the main issue, how do we normalize it? We have no idea what we're looking at for your libraries so how do we upgrade everything so that it's at the baseline of the latest syntax and then using preset-env to downgrade everything back.

**Jason**: It's almost like a test to see that the system can produce a no-op.

**Henry**: Funny if we had to do the whole Google translate thing when you go back and forth and then it turns into just like, who knows.

**Jason**: Yeah. How many iterations of up level and down level does it take before we just give up and leave it as arguments. I'd be a good test for bugs actually though. Run it through a bunch of times and be like, Oh, you know, that's funny, the index for the rest parameter transpiled offset. They incremented by one each time you compile it. Fun bug.

**Henry**: Do you want to mention the polyfilling stuff.

**Jason**: Yeah. I've run into this twice separately for different reasons in the past year, everybody always thinks of polyfills as being like a thing that you can remove. Naively, let's say you're configuring Webpack, you pull in a module, that module is importing a promise polyfill, you've already got one.

**Jason**:So you would just substitute a shim package or delete a package or whatever and just say like, Oh, there's a module that exports equals window dot promise. There are lots of packages where that works. There are also a lot of packages where rather than shipping a common JS or ESM file, that imports a polyfill, the polyfill is just inlined. This is especially true for smaller polyfills, promises maybe not the best days, but certainly like some of Babel's helpers, like the extends helper is one that's always in there.

**Henry**: `Object.assign`.

**Jason**: `Object.assign`. Yeah, like the worst I've ever seen. I think there was 11,000 copies of `Object.assign` In the bundle I was looking at. And if there was a common JS code base, they never get deduped. And this is one of those cases where like, it also breaks code splitting. Like if Webpack is coming through trying to do it's code splitting or Rollup trying to to do it's code splitting it cannot statically assert that the all those source identical `Object.assign`, you know, local shims are the same physical thing.
So if it's doing its job and being a lossless compiler, it actually can't remove any of them.

**Henry**: That'd be funny, if you take the source text, you hash it, and then just check it or something.

**Jason**: I actually, I think that may have been one of the avenues that the team I was on before tried. We definitely have done some hashing foo and some regex foo with a little bit of success. And the reason why Webpack can't is like, maybe by the time the second module closure in a bundle has run, Object.asign has been tainted or nulled.

**Jason**: Oftentimes it's not just like, if this API doesn't exist, substitute it with this, sometimes it'll be like, if this API doesn't exist, or if this API has this weird bug that is asserted by this test that I have over here, then substitute it. And as soon as you run into the territory of like evaluating a function to see whether something could happen, static analysis is basically just out with window.

**Jason**: So that's where like it breaks tree shaking, it breaks module concatenation. In some of the bundle analysis I was doing, I was seeing not just the runtime helpers, but like a lot of these modules falling into the bucket of like, people just wanted to ship something to work by default, especially if they're targeting like a script that you can hotlink from the browser.

**Jason**: So they'll just inline the polyfills. it's sort of the surefire way to guarantee that that Promise polyfill's going to be there. I know it sucks because it's one of those other things that sits in the way of you shipping modern syntax cause you installed the dependency and it's just like it is too late to work back from that already fully filled state.

**Jason**: So one of the things I've been working on as part of a project, I think we're going to get it in the next podcast, but like one of those sub features is identifying what the patterns are that in source code represent a polyfill, or a ponyfill, which is a whole bunch of different variants of like an assignment to a known native or from a known native, that falls back to some blob of code.

**Jason**: And when you pull together enough pattern matching and impartial evaluation, you can actually get to the point where you can somewhat reliably determine, I'm fairly certain that this is an `Object.assign` ponyfill and is a helper of name underscore extends. And once you've got that as a Babel transform, in the case of what I've implemented, you can start running that on all the modules.

**Jason**: And now that thing that was completely impossible because you know, like the arguments transform, it was like the result of a thing that it was not reversible, starts to become, at least in certain cases that don't de opt, somewhat reversible. Even if the end result is you remove the polyfill at the call site, have it use the native thing.

**Jason**: And then as a concern for you, the application developer, you determine whether that polyfill is necessary. Right? Like you might put your. Promise and fetch polyfills in a node module chunk. But that's one of those cases where like the author of the npm module has no idea where you're running this code, so they really can't tell you.

**Jason**: And you as the app dev are kind of the one who, who has the more informed viewpoint there. And you can determine whether you need the police fill or not. So in as many cases as possible, you want to like bring these already shipped, already transpiled, already polyfilled things that are on npm sort of forward in time to the point where they're not a burden themselves with more code than need be shipped. Basically you don't want to ship a bunch of dead code even when static analysis fails.

**Henry**: Yeah. And even from the library side, you shouldn't have to put your polyfill in the library right? Because it does affect everyone else. But then you kind of don't want to tell the user, do you need this polyfill cause it's more work for them. So like the whole thing is kind of a mess to deal with.

**Jason**: Yeah. Anything that gets in the way of somebody just npm installing something and then going ahead and using it is a roadblock, right? If it's like npm install it and then go and read the docs to see what all the esoteric requirements are for using this module, all of a sudden the value of being able to use that reusable package just kind of reduced. And also some people just won't do it. They'll npm install it, pull it in, ship it, and then be like, Oh crap. You know, I didn't have a Map polyfill. I support IE11 or whatever.
And it's not always clear, like Map is actually a great example. So this library relies on Map, Map exists in IE11. Oh, but it relies on Map.clear And that API doesn't exist in IE11. We're all not capable of scanning the thousands of dependencies we have and coming up with those lists of things we need.

**Henry**: I guess we didn't really talk about solutions, but that's the next episode.

**Jason**: Where we come up with a solution that may or may not exist.

**Henry**: Cool. I think that was a good overview of the issues that we face right? All right. Tune in next time.
