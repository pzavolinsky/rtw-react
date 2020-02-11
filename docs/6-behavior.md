Virtual DOM
===========

Here's the code: [src/app.tsx](../../6-behavior/src/app.tsx),
[src/dom.ts](../../6-behavior/src/dom.ts) and
[src/index.ts](../../6-behavior/src/index.ts)

Or:
```bash
git checkout 6-behavior
```

Code highlights
---------------
- We now have event handler props so we need to change our `Prop` type to
  include `EventHandler` as a possible value.
- Because of the change above, [src/dom.ts](../../6-behavior/src/dom.ts)
  complains that `.setAttribute` doesn't work with `EventHandler`s so we need to
  fix it by moving the prop-setting code to a `setProp` function that checks the
  type of the prop value and calls `.addEventListener` whenever appropriate.
- [src/index.ts](../../6-behavior/src/index.ts) now needs to call `App()`
  passing some state (i.e. the props), so we need to define the app state here.
- The `onAdd` implementation is of special interest because we not only need to
  alter the app state (by adding a new item) but we also need to re-render our
  `App`. For now I'm resorting to a very nasty hack: I just destroy the whole
  DOM and generate a new one for each element we add. We'll solve this issue
  soon.

Let's go virtual
----------------

We now have a working TSX processor that generates DOM elements via the
`createElement` function.

To work toward our React implementation we need to change `createElement` to
return _virtual_ DOM elements.

A _virtual_ DOM element is just a JS object that contains all the information we
need to create or update a DOM object later in the future.

Since all our DOM interaction is hidden inside `createElement` it would make
sense for us to define our virtual DOM element as just the arguments we were
passing to `createElement`.

Fourth challenge
----------------

Create a file called `src/vdom.ts` and copy from 
[src/dom.ts](../../6-behavior/src/dom.ts) all the type definitions and the
`createElement` function.

Then change the type definitions like this:

```ts
export type Prop = string | EventListener;
export type Props = Record<string, Prop> | null;
export interface VElem {
  type: string;
  props: Props;
  children: VElem[];
}
type Child = VElem | string | number | boolean;
```

And change the `createElement` signature to:

```ts
export const createElement = (
  type: string,
  props: Props = null,
  ...children: (Child | Child[])[]
): VElem => {
  // your code here
}
```

Note that we defined `children` in `VElem` as a flat `VElem[]` as opposed to the
`(Child | Child[])[]` in the args of `createElement`.

> Challenge 4: can you implement a virtual dom in `src/vdom.ts`?
>
> Change [src/app.tsx](../../6-behavior/src/app.tsx) to import `createElement`
> from `./vdom` and return a `VElem`:
```tsx
const App = ({ items, onAdd }: PropTypes): VElem => (
  // ...
);
```
>
> In [src/dom.ts](../../6-behavior/src/dom.ts) rename `createElement` to
> `render` and change the signature to receive a `VElem` instance:
```ts
type Elem = HTMLElement;

// ...

export const createElement = ({ type, props, children }: VElem): Elem => {
```
> also remember to remove all unused types (e.g. `Prop`, `Props`, `Child`, etc.)
> from [src/dom.ts](../../6-behavior/src/dom.ts) and import the ones you need
> directly from `src/vdom.ts`
>
> In [src/index.ts](../../6-behavior/src/index.ts) make sure you fix the 
> compilation errors by calling the `render` function imported form `./dom`

That was a lot of work, once done [keep reading here](7-vdom.md).