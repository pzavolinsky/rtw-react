Adding some props
=================

Here's the code: [src/app.tsx](../../5-jsx/src/app.tsx) and
[src/index.ts](../../5-jsx/src/index.ts)

Or:
```bash
git checkout 5-jsx
```

Code highlights
---------------
- In [src/app.tsx](../../5-jsx/src/app.tsx) we just replace our code with the
  TSX snippet
- In [src/index.ts](../../5-jsx/src/index.ts) we now need to call `App()` since
  our app is now a function that returns a DOM element.

Oh, behave!
-----------

Lets add some behavior to our app so that we can explore more complex scenarios.

Start by changing your [src/app.tsx](../../5-jsx/src/app.tsx) like this:

```tsx
interface PropTypes {
  items: string[];
  onAdd: () => void;
}

const App = ({ items, onAdd }: PropTypes) => (
  <div>
    <h1>TODO app</h1>
    <h2 style="background: #ffaaaa">Item count: #{items.length}</h2>
    <button click={onAdd}>add</button>
  </div>
);
```

(just like the `style` in our last code, the `click` in React would be 
`onClick`, let's ignore that difference as well).

Now, of course, our [src/index.ts](../../5-jsx/src/index.ts) complains that
we are not passing props to our `App`.

Third challenge
---------------

> Challenge 3: can you implement the props in
> [src/index.ts](../../5-jsx/src/index.ts)?
>
> Clicking the `add` button won't work straight away, can you spot why?
>
> Hint: you need to change `createElement`, the `Prop` type and re-render `App`
> in [src/index.ts](../../5-jsx/src/index.ts) in the `onAdd` function.

Once you're done [keep reading here](6-behavior.md).