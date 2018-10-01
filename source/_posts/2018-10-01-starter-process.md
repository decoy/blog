title: Starter Process
tags:
- agile
date: 2018-10-01 08:55:43
---

The goal of this post is to present a relatively simple agile-like development process to get started with.

The main audience is new Project/Product managers or developers trying to wrangle a chaotic development cycle.

A good primer on the reasons why you need a process can be found here: [Negotiating a Process](/2018/10/01/negotiating-a-process/).

Good? Let's get started then.

<!-- more -->  

# The cardwall

The most common home-grown 'ticket system' that I've seen has been the spreadsheet. A list of things that need to be accomplished with some columns text and statuses.

A cardwall takes those items and places them in a more human-friendly view.

{% limg img/starter-process/cardwall.png title="A cardwall" class="contained" %}
_(An agile process just isn't the same without the cardwall.)_

Each card represents the product 'vision' from the product manager.

Each column represents a status in the development process of a particular item.

First, let's talk about the cards.

# User Stories and sharing a vision

A card should define the problem that's trying to be solved and any additional constraints around it. These definitions come from the product management team.

It's important to try not to _solve_ the problem within the card itself, just define it.

A common way to do this is with a 'user story'. Describe the who, what, and why of the root problem, and solutions naturally follow.

For example, in the [negotiating a process](/2018/10/01/negotiating-a-process/) post, I described 'wants' for my process like this:

"As a product manager: I want to know how long a request will take to implement, because I need to set customer and stakeholder expectations."

This story doesn't define any solutions, but attempts to explain the problem with enough context.

A good user story feature has valuable by itself (letting it stand alone without other features). It should also be 'bite sized', meaning that it can be accomplished within a relatively small amount of time (think days, not weeks or months). Preferably, all the stories should be about the same size.

Like most things in life, writing good user stories take practice. The more you write, the better you'll get at communicating your product 'vision' as a set of problems to be solved in reasonable time frames.

# Estimates

Once a story is written, it is sent off to the development team to estimate the effort involved.

In Agile, estimates are relative, meaning stories are compared to previous stories to determine the effort required. "This is more effort than the last feature" or "This is really easy compared to the last feature."

When you're first getting started, though, I recommend t-shirt sizes, with rough 'day' estimates.

- "Extra-small": 0.5 days
- "Small": 1 day
- "Medium": 3 days
- "Large": 5 days
- "Extra-large": 10 days

You'll notice that with each size increase the range of days grows. This is because the more complex a solution that is required, the more unknowns that can derail it. This uncertainty is represented by larger time frames in the estimations.

{% limg img/starter-process/estimates.png title="Estimates graph" class="contained" %}

> Over time, actual metrics can be used to determine the real world days required for features, and you can use previous features as references on sizes. It's very common for the meaning of the sizes to change over time as the teams and processes change.

If you're a product manager, be ready for surprises. What's "easy" and what's "hard" is often difficult to explain in the software world. Ask questions to understand, but trust their judgement.

> xkcd's take on complexity: https://xkcd.com/1425/

# Planning

Now that you have stories with estimates, what's actually going to be worked on can be planned.

This part requires both teams, product management and development, to sit down and discuss the next items. Stories are gone over and prioritized. Questions are asked and answered.

In the end, you'll have a week or two of work sorted onto the 'todo' column of your card wall.

## Special considerations

There are always 'exceptions' in a process. To keep this one simple to start with, flag exceptions visibly on the cards with colored markers or tags.

Things like specific due dates ("A customer needs this feature by next week!"), or priority problems ("if this isn't fixed ASAP the office will flood"), should be visible to everyone.

You may also have ruled out certain solutions, or have constraints beyond the basic user story. You can put these on the card, but keep them as minimal as possible while still communicating them to everyone.

# TODO - Breaking it down

Alright development team, it's time to figure out how to get these done.

> It's best to have the product manager available to answer questions when you do this part. But product managers, keep in mind that this is the dev team's process. Just like you are responsible for the user stories, they're responsible for the implementation. The autonomy of the team is important for them to be engaged, productive, and "agile".

First, look at each individual story and write down what steps are necessary to implement it. These are your 'tasks'.

A task might be something specific like: "Update v12 of the database update script to handle this new problem", or something vague like "Test it works". Just make sure it defines what needs to be done in enough detail for a team member to actually accomplish the task.

How you represent tasks on your card wall is largely a preference of the team.

If you're using a digital tool, like Trello, checkbox style tasks are built in. You can accomplish something similar on a physical card by writing the task list on the back.

Later, you might have a separate 'tasks' cardwall for keeping track of who is working on what and where it is in the process. The life of a task is often different than the life a feature.

# Doing

When a card is in 'doing' that means the tasks are actively being worked on.

This is an important step to track. You want to know how long cards stay in this column over time, so you can improve your time estimates.

One thing to keep in mind: You want to limit the amount of work in each column. This is called the "Work In Progress" or "WIP" limit in KANBAN. (Another Agile method like SCRUM). This limit will change depending on your team size, but the goal is for each team member to only work on one thing at a time. To pull something new, the current card has to be completed.

When you're first starting, try pulling in card and once everyone has something to do, then use that as your initial WIP limit.

Once all the tasks of a card is complete, it can be moved into the Review column.

# REVIEW

"Review" consists of the product manager and other feature stakeholders checking out the implementation and providing feedback, or approving it for release.

Especially when you're first getting started, this stage can create a lot of back and forth with the developer team. Solutions won't quite work, bugs will be found, the user story was wrong or missing some vital piece of information, quality won't be what people expect, etc. It's important to keep any criticism productive, and keep in mind that changes will have a time cost as well.

An item doesn't get to move into "Done" until all tasks are completed and it has gone through review and been accepted by the product manager and stakeholders.

# DONE

It's done! Hurrah! 🎉

You'll want to keep the list of completed items for a review with the team later, but after that, you can archive them, or even tear them up.

(Getting to rip them up is one of the joys of having a physical cardwall.)

# Communicating and standups

An important part of the cardwall is the visibility it gives everyone into the process. However, we go out of our way to limit the amount of communication into each cards. This is intentional. The goal is for people to _talk_ about these things.

With that in mind: The dreaded standup. Whenever I talk to someone about agile practices, the standup is always the most vilified part.

A standup is a quick daily meeting to describe: What you worked on yesterday, what you plan on working on today, and if you have any 'blockers' that impact your expected deliveries.

A standup is _not_ a place to _discuss_ any of those things. It's all about visibility into the process. If any of those three things need to be talked about, create another meeting, or form another group to discuss the issues, but don't go into details during the standup.

The first problem every group runs into when they start holding standups is the talker. We'll call them "Bob" (I was always the "Bob" in the early days). "Bob" likes to talk about the details of those three things. They always go over their time slice and everyone else has to be extra brief to make up for it.

This is, of course, a problem. That doesn't mean you should throw out standups, however. Instead, there are approaches to limit how much one person can derail things.

"Time boxed" standups at 15 minutes. If you go over, hangup/walk away. If you have a "Bob", make sure they go last so they have incentive to be more succinct. If you manage a "Bob", talk to them about communication strategies, hold standups before they get their second cup of coffee, or just otherwise work it out.

Treat problems in the process like any other type of problem. Work out the constraints and solve it. This leads us nicely into iterating your process.

# Iterating

Every other week or so, you need another meeting (oh no!) to discuss how the process is working for everyone and to discuss successes and failures.

The goal isn't to cast blame, or anything crazy like that. Instead, you want to identify things that aren't working and determine if you need to change your process to fix them.

To give you an example: When a team I worked on first switched to agile, the QA tester didn't interact much with the rest of the team, and we had difficulty keeping them updated on testing tasks. Instead, we added a new column for "QA" on the cardwall. It was much more visible and easier to track separately. This also ended up highlighting a bottleneck in QA to the higher ups that watched our cardwall, and we hired a new tester as a result!

When iterating, try to keep changes small so people can integrate them into their workflows. Every change has a cost in time and thought that has to be allowed for.

When you first get started, you'll see _lots_ of problems that need to be solved, but try to sit on them for a bit. You'll find many solve themselves through talking and habits, while others need some kind of representation in the process to correct.

Once you have a good idea how your team works within these constraints, you'll have a better idea if it's time to switch tools, etc.

# Recap

Alright, the above had a lot of text, so let's do a quick summary of roles and schedules.

Who: Project Managers
When: Continuous
What: Creating and improving user stories. Cards with the who, what, why.


Who: Developers
When: Weekly
What: Estimate user stories. T-Shirt sizes relative to previous work.

Who: Project Managers and Developers
When: Bi-weekly
What: Plan out the 'next' work. You want a bit more than two weeks prioritized and ready to be pulled.

Who: Developers
When: Continuous
What: Pull new work, task it out. Get it done.

Who: Project Managers
When: As stories are completed
What: Review, give feedback and/or accept the work.

Who: Everyone
When: Bi-weekly
What: Retrospective. Go over the previous time frame and decide if any changes to processes are necessary. Celebrate your successes.
