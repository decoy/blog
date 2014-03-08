title: I Broke Subversion
date: 2014-03-08 14:48:06
tags: [svn, development]
---

This week I accidentally broke SVN.  Or, more appropriately, SVN broke me.

We recently moved a folder from a project to a shared location and setup an [svn external](http://svnbook.red-bean.com/en/1.0/ch07s03.html) to point to this new location.

Steps taken:
* Make a copy of `trunk\ProjectA\ui` to `trunk\ui`
* Delete `trunk\ProjectA\ui`
* Add external to `trunk\ProjectA\ui` for `..\ui`

There were some other steps in the middle of all of that, but that's the short version.

Everything worked fine until we needed to switch back to a branch that was not sharing the folder.  What resulted was something of a mess.  I'm not the first person to notice this problem, and you can see another post about it here: http://samwilson.id.au/2011/12/28/svn/.

And here's a quick script to recreate the problem, including the workaround at the bottom:
<script src="https://gist.github.com/decoy/596c8d5afd7217ddaacd.js"></script>

## Tortoise SVN Cleanup

I'm a big fan of Tortoise's cleanup options.  I go through this dialog every time I get ready to do a merge, just to make sure the workspace is as clean as it can get without checking out a fresh copy.

{% limg img/tsvn_cleanup.png title="Clean all the things" %}

Unfortunately, running the cleanup with those options and then switching resulted in this...

{% limg img/tsvn_switch_error.png title="Break all the things" %}

I couldn't recreate this exact error from the command line, so I'm not sure if it's a Tortoise specific, or just something odd with the way it does the cleanup.

## Conclusion

So I threw in the towel on this one.  The "ui" folder was renamed to "lib" and everything is happy.  The problems experienced above are entirely due to the external replacing a folder of the same name.

Otherwise, I've found SVN Externals to be a good fit for our need at this point.  A couple of things to keep in mind, though:
* Commits including externals are not atomic.  (The external commit will happen separately from the rest of the commit.)
* If you peg a relative path to a revision you will likely get errors about that folder not existing.  (../lib at revision 455 will not exist on a branch that was just created in revision 502, for example.)
