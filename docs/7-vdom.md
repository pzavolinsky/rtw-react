Updates
=======

Here's the code: [src/app.tsx](../../7-vdom/src/app.tsx),
[src/dom.ts](../../7-vdom/src/dom.ts),
[src/index.ts](../../7-vdom/src/index.ts) and
[src/vdom.ts](../../7-vdom/src/vdom.ts)

Or:
```bash
git checkout 7-vdom
```

Code highlights
---------------
- We defined our `VElem` type (a node of our virtual DOM) and we took two
  important design decisions here:
    - We are solving the nested children at this stage (i.e. the ugly children
      signature of `createElement` does not leak into our `VElem`)
    - We are normalizing all types of children (e.g. strings, numbers, other 
      `VElem`s, etc) into `VElem`s. We do this by using the special (i.e.
      hardcoded) `TEXT_TYPE` type.

  These two decisions will impact performance because we expect to run
  `createElement` a lot more than our DOM interacting `render` function.
  
  It would probably be more efficient to just make a trivial `createElement`
  that stores its arguments in the virtual DOM and let `render` worry about
  insanity.
  
  I chose to address these issues here to make the `render` code a little less
  hostile.
- The changes in [src/dom.ts](../../7-vdom/src/dom.ts) are minimal, we just
  import stuff from [src/vdom.ts](../../7-vdom/src/vdom.ts) and now all the
  `render` args come packed in a `VElem` object.
- We also kept the `Elem` type to be `HTMLElement` (the return value of 
  `render`).
- Perhaps the most significant changes in `render` (formerly `createElement`)
  are these:
    - We no longer need to call `flatten` on the `children` (because the virtual
      DOM takes care of this).
    - We still need to check if a child is a text, but now we do it by checking
      `.type` of our `VElem` child.
    - When `child` is not a text we can no longer do `.appendChild(child)` 
      because `.appendChild` does not take `VElem`s. Fortunately, a recursive
      call to `render` solves the issue.
- Finally we need to make a very small change in
  [src/index.ts](../../7-vdom/src/index.ts) to call `render(App(state))` instead
  of just `App(state)` for the same reason as above (`.appendChild` does not
  take `VElem` arguments).

Winds of change
---------------

Cool, now that we have a virtual DOM  it's time to address that nasty hack we
coded into [src/index.ts](../../7-vdom/src/index.ts) a while ago.

We need to start doing some selective updates now and later we'll try some 
full-blown diffing.

Clearly we need some way to group _virtual_ and _real_ DOM elements together so
that when the _virtual_ DOM changes, we can apply those changes to the
corresponding _real_ DOM element.

Fifth challenge
---------------

So far our functions where pretty pure (DOM manipulating functions aside).
Unfortunately those times are likely over. We need to keep some state, namely
the mutable _real_ DOM element along with our virtual DOM element.

While it's possible to keep a functional style throughout this whole thing, I'm
going to go with a `class`.

Feel free to try the functional approach, it might work for you. My initial
implementation was functional but in retrospective I find a `class` easier to
understand and explain.

Here's the interface for my class (and some helper stuff for free):

```tsx
type Elem = HTMLElement | Text;

const isText = (e: Elem): e is Text => e.nodeType === Node.TEXT_NODE;

class RenderedElement {
  private dom: Elem;
  constructor(velem: VElem) { ... }

  public update(velem: VElem): void { ... }

  public static renderInto(root: HTMLElement, velem: VElem): RenderedElem {
    const elem = new RenderedElem(velem);
    root.appendChild(elem.dom);
    return elem;
  }
}

// last line of `dom.ts`
export const render = RenderedElem.renderInto;
```

> Challenge 5: can you implement the `RenderedElem` class?
>
> Change [src/index.ts](../../7-vdom/src/index.ts) to use `renderInto`:
```tsx
const state = {
  items: ['first'],
  onAdd: () => {
    state.items = [...state.items, `items ${++count}`];
    app.update(App(state));
  },
};

const app = render(root, App(state));
```
> Keep in mind that `update` must handle:
>   - text node updates
>   - prop changes
>   - updated children (same array index, same type)
>   - updated children (same array index, different type)
>   - removed children
>   - added children
>
> Also consider the following:
>   - you'll have to keep track of the _previously_ rendered `velem`
>   - you'll have to keep track of the _rendered_ children (i.e the
>     `RenderedElem` instances that represent each child in `velem`)
>   - if you pick your state carefully you can call `.update` in your
>     `constructor` and save yourself a lot of trouble

You know the drill by now: [keep reading here](8-update.md).