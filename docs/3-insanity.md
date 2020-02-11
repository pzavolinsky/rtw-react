Cleaning things up
==================

As always, [here's my code](../../3-insanity/src/index.ts).

Or:
```bash
git checkout 3-insanity
```

Code highlights
---------------
- The nullable `props` are easy, just an `if` in the right place.
- The array-of-array children is the painful one. I solved this by exploiting
  a property of [Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
  that allows us to call `.concat` with spread arguments that can be either
  values or other arrays.

Recap
-----

With that out of the way, lets clean things up a bit.

After all that `createElement` nonsense I feel we need it.

Moving things around
--------------------

Before we start there is no challenge here so if you'd rather skip ahead you can
just:

```bash
git checkout 4-split
```

All that `createElement` stuff has very little to do with our app, so let's move
it to [src/dom.ts](../../4-split/src/dom.ts). Remember to `export` the
`createElement` function. 

Then move the `div`, `h1`, etc. into [src/app.tsx](../../4-split/src/app.tsx).

If this was a React stateless component our:

```ts
const div = createElement(...);
```

would be:

```ts
const App = () => createElement(...);
```

You'll need to `import` the `createElement` function from `./dom` and 
`export default App`.

After all that, just change [src/index.ts](../../4-split/src/index.ts) to
`import` (and invoke) `App` from `./app`.

The cleanup is done, [keep reading here](4-split.md)!
