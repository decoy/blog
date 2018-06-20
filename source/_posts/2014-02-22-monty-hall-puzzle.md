title: Monty Hall Puzzle
date: 2014-02-22 10:33:03
tags: [javascript, css3, angularjs, web, codepen]
thumb: img/montyhall_thumb.png
description: Simulates the Monty Hall "puzzle" using javascript, css3, angularjs and codepen.
---

Wikipedia has an excellent article on the “probability puzzle” know as the [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem).  

It’s based around the concept of a game show where a contestant must pick one of three doors.  Behind one of the doors is the prize.  When the contestant picks the door, the host opens one of the other doors that doesn’t have the prize and then asks the contestant if they want to switch their choice.  The question: Do you switch or not? 

<!-- more --> 

{% limg img/montyhall1.png title="Goat" %}

At first, most people guess that it doesn’t matter.  There are two closed doors, so your chance must be 1:2 to guess correctly, right?  The correct answer:  You should always switch.

## Simulation

For some reason, instead of reading through the rest of the Wikipedia article, I decided I needed to recreate this simulation in javascript (of course), so you can play along.

First, here’s the game. It will track when you switch doors and when you don’t and spit out your winning stats.  You can also press the "Simulate" button to automatically "play" the game so you can see the odds of winning for yourself.

Try it yourself:
<p data-height="550" data-theme-id="4105" data-slug-hash="qdkFp" data-default-tab="result" class='codepen'>See the Pen <a href='https://codepen.io/decoyahoy/pen/qdkFp'>Monty Hall Problem simulator</a> by kp (<a href='https://codepen.io/decoyahoy'>@decoyahoy</a>) on <a href='https://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

You can see that when simulating play, the odds roughly come out to be 1:3 when staying, and 2:3 when switching doors.

{% limg img/montyhall2.png %}

## Different way of thinking

For me, breaking a concept down in order to turn it into a program often helps me see that concept differently.

In this case, after building the program I realized that you can think of the switch as getting to pick two doors instead of just the one.  You’re picking the door you _don’t_ want to open.

You can enable that behavior instead by choosing the game mode "Open Others" at the bottom.  Every play is the equivalent of “open both doors that aren’t this one.”  You can also flip the switch to "Open Selected" to change the behavior to the opposite: where the door you pick is the one that’s opened.

You can also change the number of total doors.  If you set it to something like 20 (where your odds are now 1:20 for staying and 19:20 for switching) it might help visualize the what's going on here.  Here's a quote from Marilyn vos Savant from that Wikipedia article.

> <cite>Yes; you should switch. The first door has a 1/3 chance of winning, but the second door has a 2/3 chance. Here's a good way to visualize what happened. Suppose there are a million doors, and you pick door #1. Then the host, who knows what's behind the doors and will always avoid the one with the prize, opens them all except door #777,777. You'd switch to that door pretty fast, wouldn't you?</cite>

## Conclusion

There are many other simulations of this puzzle out there (and youtube videos, articles, dance interpretations, etc...), but hopefully the code sample is useful to someone, or someone learned something new.

For me, it was a fun way to spend a few hours playing with https://codepen.io trying to make a ‘door’ animation in CSS.

One thing to note: I wrote the front end in [AngularJS](https://angularjs.org/ Angularj).  I'll blog about that more later, but using the framework easily halved the code necessary to display the UI.

For some more reading about the css doors:
https://24ways.org/2010/intro-to-css-3d-transforms/

Cheers!