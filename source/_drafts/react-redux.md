title: React and Redux
tags:
  - web
  - javascript
  - react
  - redux
---



For the longest time after React was released I had difficulty really understanding how it was supposed to be used.  Coming from years of MVC/MVVM experience in Java, C#/WPF, and Angular, React seemed really strange.  The basic tutorials and examples showed 'how' you do something, but never why, and there was pretty much no separation between view and controller logic.  

Eventually I sat down and wrote something using React and Redux, following the 'best practices', to slowly understand the decisions that went into the frameworks and how they could be used.

> This article is very much a high level view of React and Redux, focusing on giving a feel for the the architecture rather than specific code examples.  


# Components

So what did I learn?

First, React is a different way of thinking of applications, but also, it's almost entirely concerned with view and view state.  MVC generally separates the view state from the view and keeps it in the controller along with other application state information.  In MVVM, the entire purpose of the 'VM' ViewModel is to keep track of view state.  But in React, these two are combined into one abstraction called a "Component".

Components are surprisingly simple.  They contain the logic for rendering your view to the page given a view state, and optional methods for changing that state. 

A simple 'stateless' component, is just the render logic.  These can be represented by just a simple function that take a "props" object.

``` javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

> I'm using JSX in these examples.  It's a layer on top of your javascript that lets you write HTML-like code elements that are compiled into regular javascript.  I recommend reading [the JSX intro](https://reactjs.org/docs/introducing-jsx.html) for more information.

Components can contain other components, creating a component 'tree'.  In this way, it's just like HTML, where an HTML element can contain other elements.

``` javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
} 

function TimeDisplay(props) {
  return <h2>It is {props.time}.</h2>;
}

function Greeter() {
  return (
    <div>
      <Welcome name="World">
      <TimeDisplay time={new Date().toLocaleTimeString()}/>
    </div>
  );
}
```

Stateful components that have states that can change are generally more complicated and derived from a 'Component' base class.  State updates are triggered by external events (usually UI) by using the setState() function.

This example will update on every interval "tick" creating a clock.

> This example is pulled almost entirely from the React documentation on [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class).  

<p data-height="300" data-theme-id="4105" data-slug-hash="wXJbzz" data-default-tab="js,result" data-user="decoyahoy" data-embed-version="2" data-pen-title="Hello World in React" class="codepen">See the Pen <a href="https://codepen.io/decoyahoy/pen/wXJbzz/">Hello World in React</a> by kp (<a href="https://codepen.io/decoyahoy">@decoyahoy</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


# Updates, rendering, and the Virtual Dom

When a component updates its state, it causes a re-render.  The current component and its children will update.

// tree update graph

Instead of directly updating the DOM, components update the "Virtual DOM", which is simply a DOM tree in memory.  It's not rendered directly to the browser.  This virtual DOM is then compared against the 'real' DOM and the real DOM is updated with just the changes between the two.

// vdom graph

Combined with the 'reactive' component updates (the component only updates in reaction to setState()), this makes React quite good at only updating what's necessary and minimizing the page updates (generally the most computationally expensive part of a change.)

The trade-off for this performance is higher memory use:  The application's component tree is in memory twice.  Because this is all abstracted away from the application developer, though, it allows the framework to optimize performance and is generally not something the developer needs to think about.


# What about the rest of the app?

React's simple pattern is quite flexible, allowing for state, view, and events, but it's also quite limiting.  The component tree pattern requires your dependencies to be passed through the entire tree to get to child components.

This can get especially awkward if you introduce a new UI component that needs to reference a piece of application state logic that's not used in that area of the UI.  You have to either add it to the all the parent components or alternatively use some kind of js 'global'.  Neither is a good solution.  Your _application_ state rarely mirrors the UI.

# Redux for application state

The solution to this problem is to move the application state into a separate store.  The most popular is [Redux](https://redux.js.org/), though there are plenty of [other options](#Other-Thoughts).

Redux provides three main things:

  1. An application level state store.
  2. A way of updating that store from anywhere in the UI.
  3. A way of updating the view state of components when the store is updated.

Redux is unidirectional, meaning events always go through it in one way.

// React Event => Dispatch (action) => Store update (reducer) => Component update (connect)
// then loops

Let's go through this flow in order.

An event can be generated from anywhere, but is generally a UI event like a mouse click.

``` javascript
function GoFasterButton(props) {

  function moreSpeedClick(e) {
    e.preventDefault();
    console.log('zoom');
  }

  function lessSpeedClick(e) {
    e.preventDefault();
    console.log('mooz');
  }

  return (
    <div>
      <div>{props.currentSpeed}</div>
      <button onClick={moreSpeedClick}>
        More Speed
      </button>
      <button onClick={lessSpeedClick}>
        Less Speed
      </button>
    </div>
  );
}
```

This event creates a Redux Action.  Actions are simple objects that describe what update needs to happen in the store.  

```javascript
// make it go faster by an increment of 1
{ type: "faster", increment: 1}
```

This action is 'dispatched' through the dispatcher.  The dispatcher is passed to the component in its properties and passes action objects to redux. 

``` javascript
function SpaceShip(props) {

  function moreSpeedClick(e) {
    e.preventDefault();
    props.dispatch({ type: "faster", increment: 1});
  }

  function lessSpeedClick(e) {
    e.preventDefault();
    props.dispatch({ type: "slower", decrement: 1});
  }

  return (
    <div>
      <div>{props.currentSpeed}</div>
      <button onClick={moreSpeedClick}>
        More Speed
      </button>
      <button onClick={lessSpeedClick}>
        Less Speed
      </button>
    </div>
  );
}
```

The 'store' itself is a plain javascript object.  Unlike Angular, the store object directly manipulated or observed by Redux and can be arranged in anyway that makes sense to the application. 

When an action is dispatched to the store, they're passed through functions called 'reducers' which take the previous state and an action, and then returns an updated state object.  The common pattern is to use a switch statement on the 'type' of the action objects.  Because this is just a function and plain javascript objects, however, you can use whatever you want.

``` javascript
function spaceshipReducer(state, action) {
  switch (action.type) {
    case "faster":
      state.speed += action.increment;
      return state;
    case "slower":
      state.speed -= action.decrement;
      return state;
    default:
      return state
  }
}
```

One of the recommendations of Redux application is that your store be "immutable".  This means that instead of updating existing objects, you entirely replace them.  This allows you to do simple reference comparisons that can greatly impact the performance of larger applications.  The downside is it can make your reducers considerably more difficult to read.

``` javascript
  // this does the same thing as the 'faster' case above
  return Object.assign({}, state, {
    speed: state.speed + action.increment
  });
```

> Read more in about immutable changes in the [redux basics tutorials](https://redux.js.org/basics/reducers#handling-actions).


After any action is received by the store, it fires an update event.  React components are wrapped in a container component that triggers updates when the store updates.   A component is wrapped using the redux 'connect' function that maps the application store to the component properties.  If you use best practices (immutable), this map is bright enough to tell when that section of the state is different or not.  Other than that, the wrapper component doesn't do much magic.  It simply subscribes to the store 'update' event and uses setState() when something changes to trigger the update.

``` javascript
import { connect } from 'react-redux';

function mapStateToProps() {

}

function mapDispatchToProps() {

}
​
const SpaceShipContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceShip);

```

It's also common to map the dispatch actions to properties rather than passing the entire dispatch object in.  

// full example with proper map


# Redux Middleware and async

This covers the basic cases of reacting to UI events, but doesn't help with working with web services and AJAX callbacks.  In the Angular world, these things usually placed into services that are injected into your controllers.  In general, Redux doesn't provide a solution for this, but what it does provide is a centralized way of passing messages around.

With Redux, the only things that are injected to a component is the state and dispatcher.  The state is just a plain object, but the Redux provides a way of extending the capabilities of the dispatcher through the use of "Middleware".

Middleware is just a function that is called before the action is passed on to the reducer.  One of the simplest and most commonly used middlewares is redux-thunk, which allows you to dispatch async actions.  Instead of passing an action object, you pass in a function to the dispatcher.  Redux-thunk sees the function and calls it, passing in the dispatcher and state.

// entire redux-thunk src (or at least main function)

// and in use:  dispatch(function(dispatch, getState()) { });

This simple pattern acts a lot like dependency injection at the function level, or the command/mediator pattern.  If you need additional 'services' you inject them through the "extra Parameter" in thunk.

// example

From here, you can call your async methods, then use the dipatcher and getState() functions to fire off the correct 'real' store update actions as appropriately.

I have somewhat mixed feelings on this pattern, since it's mixing your store updates and mediated command messages, but passing everything through the dispatcher does keep things simple.


# Other thoughts

Redux is worthy of an entire article.  It’s both opinionated, but flexible.  I recommend reading through their entire documentation page to really get a handle on how it can be used.  Also, by learning Redux you'll have a lot of the basic React concepts reinforced. 

There are also plenty of alternatives.  Checkout [MobX](https://mobx.js.org/) for something more similar to Angular (more magic), or even roll your own (no magic)!

It should also be mentioned that [Angular](https://angular.io/) and [Vue](https://vuejs.org/) are both component heavy now, having taken a lot of cues from React.  Learning one will likely help you with the others.

Finally, I want to mention that react is _verbose_.  It does very little to hide the logic that happens

Good luck, and happy coding!