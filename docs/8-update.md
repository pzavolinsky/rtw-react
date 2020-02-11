Less is more
============

Here's the code: [src/dom.ts](../../8-update/src/dom.ts) and
[src/index.ts](../../8-update/src/index.ts)

Or:
```bash
git checkout 8-update
```

Code highlights
---------------
- In our `constructor` we are creating `this.dom` using the `type` to tell
  between text VDOM nodes and proper VDOM nodes.
- `update` uses the `isText` type guard to handle the text case.
- My prop-updating code is very inefficient for many reasons, some of them
  include:
    - I'm interpolating `oldProps` and `newProps` just to get a unique set of
      keys
    - When both `oldValue` and `newValue` are present I'm always removing the
      old value and setting the new one. This makes sense for event handlers but
      is an extra `.removeAttribute` for all other props.
  
  Don't worry about these performance trade-offs, if the code makes sense we can
  always make it uglier (I mean _optimize it_) later.
- The children part is where the real pain is. My approach was the following:
    - First we iterate our old children and see if we can find a new child in
      the same array position (note that we don't support keyed children).
    - If we cannot find a new child this is a deletion, we remove the element
      from the DOM and later (after the iteration) we'll adjust the
      `renderedChildren` array with a `.splice`.
    - If we did find a new child but the types don't match (e.g was a `span`
      now is a `div`) we'll just remove the old rendered element from the DOM
      and replace it for a newly rendered DOM element based on the new VDOM
      child.
    - If we did find a new child and the types match, we just call `.update` on
      the rendered child.
    - Finally:
        - If some elements were removed we `.splice` the `renderedChildren` to
          remove references to removed nodes from our state (note that we
          already handled the DOM update before).
        - If some elements were added, we just append them both to the
          `renderedChildren` and the DOM.
    - Regardless of the path taken, we always remember the `velem` we just
      rendered (i.e. used for `update`) so that the next call uses fresh values.

Sixth challenge
---------------

Right now we have some diffing in place, for example:

```ts
const oldValue = oldProps ? oldProps[key] : undefined;
const newValue = newProps ? newProps[key] : undefined;

if (oldValue === newValue) return;
```

Soon enough we'll need more aggressive diffing and for that we need to be able
to tell if two `VElem`s are equal.

> Challenge 6: can you implement VDOM equality functions?
>
> In [src/vdom.ts](../../8-update/src/vdom.ts) implement the following three
> functions:
```ts
export const areEqual = (a: VElem, b: VElem): boolean =>
  a.type === b.type &&
  equalProps(a.props, b.props) &&
  equalChildren(a.children, b.children);

export const equalProps = (a: Props, b: Props): boolean => { ... }

export const equalChildren = (a: VElem[], b: VElem[]): boolean => { ... }
```
> Once you are done, see if it makes sense to call them in `.update` to avoid
> trivial DOM access.

[keep reading here](9-diff.md).