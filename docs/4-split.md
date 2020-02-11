A brief detour
==============

Have you ever wondered what happens to all that TSX or JSX you write?

Surely all those `<` and `>` are not a part of our bundle, right?

This is a mystery waiting to be solved!

Under the hood
--------------

If this was React, our [src/app.tsx](../../4-split/src/app.tsx) would look
something like this:

```tsx
import { createElement } from './dom';

const App = () => (
  <div>
    <h1>This is the title</h1>
    <h2 style="background: #ffaaaa">This is the subtitle</h2>
  </div>
);

export default App;
```

(in React the `style` attribute is a fancy object rather than a string, for
simplicity's sake, let's ignore that minor difference).

If we were to compile that TSX above what would we get?

Well, we can always just compile the thing and look!

Save the following to a file called `src/test.tsx`:

```tsx
declare const createElement: any; // ignore this, is just to keep TS happy

const App = () => (
  <div>
    <h1>This is the title</h1>
    <h2 style="background: #ffaaaa">This is the subtitle</h2>
  </div>
);

console.log(App);  // ignore this, is just to keep TS happy
```

And then run:

```bash
./node_modules/.bin/tsc --jsx react --jsxFactory createElement --outFile /dev/stdout src/test.tsx 
```

The output is almost exactly our [src/app.tsx](../../4-split/src/app.tsx)!:

```js
var App = function () { return (createElement("div", null,
    createElement("h1", null, "This is the title"),
    createElement("h2", { style: "background: #ffaaaa" }, "This is the subtitle"))); };
```

You know what that means, right? We just coded our own TSX/JSX processor!

Cool, right? Only the cost of getting here was all that insane signature for
`createElement` from before.

Now that we know TSX works, we can stop using `createElement` explicitly and
get one step closer to actual React.

Try it yourself and then [keep reading here](5-jsx.md).