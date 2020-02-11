Components
==========

Here's the code: [src/vdom.ts](../../9-diff/src/vdom.ts)

Or:
```bash
git checkout 9-diff
```

Code highlights
---------------
- My `equalProps` implementation has the same performance shortcomings as the
  `.update` implementation: interpolating `a` and `b` to get the unique set of
  keys, etc. We can improve this code later.

Seventh challenge
-----------------

The last thing we'll code in this project is Components. More precisely
_stateless functional components_.

If you play around a bit more with TSX/JSX and check the generated code you'll
see that when we use a lower-case tag (e.g. `<div>`) the calls to
`createElement` have  a string type, but when we use a capitalized tag (e.g.
`<MyComp>`) the call to `createElement` passes a `MyComp` reference as the type.

> Challenge 7: can you implement components?
>
> In [src/vdom.ts](../../9-diff/src/vdom.ts) change the following:
```ts
export interface VElem {
  type: VType;
  props: Props;
  children: VElem[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Component = (props: Record<string, any> & { children: VElem[] }) => VElem;
export type VType = string | Component;

// ...

export const createElement = (
  type: VType,
```
> and fix [src/dom.ts](../../9-diff/src/dom.ts).
>
> also change [src/app.tsx](../../9-diff/src/app.tsx) to create some components
> so that we can test our code:
```tsx
const Title = () => <h1>TODO app</h1>;

const SubTitle = ({ count }: { count: number }) => (
  <h2 style={`background: ${count % 2 === 0 ? '#ffaaaa' : '#aaffaa'}`}>
    item count: #{count}
  </h2>
);

const App = ({ items, onAdd }: PropTypes): VElem => (
  <div>
    <Title />
    <SubTitle count={items.length} />
    <button click={onAdd}>add</button>
    <ul>
      {items.map(text => (
        <li>{text}</li>
      ))}
    </ul>
  </div>
);
```

Almost there, [keep reading here](10-components.md).