Summary
=======

Here's the code: [src/app.tsx](../../10-components/src/app.tsx),
[src/dom.ts](../../10-components/src/dom.ts) and
[src/vdom.ts](../../10-components/src/vdom.ts).

Or:
```bash
git checkout 10-components
```

Code highlights
---------------
- We define a `Component` as a function that takes props and `children` and
  returns a `VElem`. Note that I gave up on the typing here and had to use an
  `any`. Proper typing for this is quite involved and would require a lot of
  gymnastics with generics.
- We change the `RenderedElem` to have a `ref` that can either be a child
  component (i.e. other `RenderedElem`) or a DOM `Elem`.
- We have a `.dom` getter that just returns `ref` for simple DOM `Elem`s, and
  calls recursively for components.
- In `.update` we have a special case for component `ref`s.

A note about components
----------------------

Even though the code for components is pretty short, adding components to the
mix generates quite a bit of complexity.

The first thing to consider is that a component `VElem` is a special case
because it maps a `VElem` into other `VElem`.

That is:
```ts
const newVelem = velem.type({ ...velem.props, children: velem.children });
```

When dealing with component `VElem`s we always need to call the `.type` function
to map the outer `velem` into the `newVelem`. This `.type` function is actually
the `render` function of your component so calling it is a must.

An easy mistake to make is, in `.update`, forget to call `.type` and just pass
`velem` as in:
```ts
this.ref.update(velem); // WRONG! we should be using newVelem!
```

Last comments
-------------

This was our toy React implementation, some parts were pretty straight forward,
others complete nonsense.

A lot of this can be improved to make it more efficient, more readable or both.

We intentionally stayed away from some things like:
  - `class` components
  - state in `class` components (i.e. `this.state` / `this.setState`)
  - hooks
  - context
  - batching and efficient DOM manipulation
  - pure components (technically we built this in, so I should be saying here
    _impure_ components)

If you are suffering from coding inertia and you hands need more code to write,
give some or all of those a try.

Some might be pretty easy to code, others a demonic nightmare.

These are probably symptoms of our simplified design, but they might also be
hints as to complex APIs we should probably try to stay away from in proper
React.

Hoped you enjoyed this, I certainly have!

Feel free to leave comments in issues or PRs, do know that I probably won't
merge nor address any of them, but other readers might benefit from them anyway.

Thanks for reading,
Cheers!