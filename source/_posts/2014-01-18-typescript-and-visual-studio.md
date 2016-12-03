title: Typescript and Visual Studio
date: 2014-01-18 20:26:35
tags: [typescript, javascript, microsoft, visual studio, web]
---

First:  I'm a C# developer by day.  I spend a lot of time in the Visual Studio IDE.  To me, coding outside of a full IDE feels like trying to write an email without spell check.  I spend a lot of time hunting down typos, or reading through documentation to figure out the format of particular functions.  (OK, so not exactly like writing an email.)  A good IDE provides the tools to make a lot of that much simpler. (See [Intellisense](http://en.wikipedia.org/wiki/Intelligent_code_completion).)

With that in mind: 

>[Typescript](http://www.typescriptlang.org) is a language for application-scale JavaScript development. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open Source.

<!-- more --> 

I really like typescript and the vision it has for the 'future' of javascript.  It gives us a preview of the actual future of javascript in a way that can be used today.  (See the wikipedia article: http://en.wikipedia.org/wiki/TypeScript#ECMAScript_6_support).

And specifically, it gives us 'typing'.  The typing is what allows your IDE to do advanced things like safely change the name of a function everywhere it's used in your code.  It allows you to start typing a method name and get the documentation and full list of parameters expected.  You would be amazed how much time it can save you when you don't have to open up the source code to a library to figure out how to use it.

## Visual Studio

Typescript is developed by Microsoft.  Because of this, it has brilliant integration in Microsoft's Visual Studio.  (If you haven't used Typescript with Visual Studio in awhile, give it another shot.  A lot of the quirks have been worked out.)

If you've used Visual Studio, working in typescript will feel pretty normal.  You'll create a class, instantiate it, type in `foo.` and get your expected list of methods.  

{% limg img/ts_intellisense.png %}

Visual Studio has options to "Compile on Save" which means the compiled javascript is created as soon as you save the file, making it immediately available in your project.  At one point, this compile action was a little slow, and could cause a delay in your save > refresh workflow.  This hasn't been the case in the newest versions.

By default, Visual Studio will even generate a map file for you that tells debuggers like Chrome how to line up the javascript file with the typescript file.  I've actually found this particular feature in the Chrome browser to be annoying, and instead disable this option in the project settings. 

{% limg img/ts_sourcemaps.png %}


Why?  Well, this the feature exists to make it easier to 'debug' your javascript, but when your typescript looks like this:
``` javascript
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}
```

and your javascript output looks like this:
``` javascript
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerHTML = new Date().toUTCString();
        }, 500);
    };

    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
```

It's not a big deal to debug....

Unlike [Dart](http://www.dartlang.org) or [CoffeeScript](http://coffeescript.org/), there's no new language to learn.  It simply adds some nice 'extras' to a language most of us are already familiar with. When you compile typescript it boils down to almost identical javascript, making it very easy to debug and work with in a live environment.


### Future

The future of typescript is still pretty uncertain.  Microsoft's involvement with it has been both good and bad.  Good in that it's gotten the attention of a lot of Microsoft stack programmers and that it gives has corporate backing.  Bad in that Microsoft has never had a good reputation in the open source world...

My personal hope is that ECMA 6 will have all the features I've learned to enjoy with typescript, and the problem will just go away.

In the meantime, enjoy this chart:

<script type="text/javascript" src="//www.google.com/trends/embed.js?hl=en-US&q=typescript,+coffeescript&cmpt=q&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330"></script>


