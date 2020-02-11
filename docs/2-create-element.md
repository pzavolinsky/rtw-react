Embracing insanity
==================

Cool, you can check my code [here](../../2-create-element/src/index.ts).

Or:
```bash
git checkout 2-create-element
```

Code highlights
---------------
- We need to create the DOM element
- We need to set the attributes
- We need to append all children
- We need handle the special case when children are plain values (e.g. strings)
  using `createTextNode`. We are not using `.textContent` as before because we
  want to support mixed content (i.e. elements that have both text _and_ other
  elements as children)

Recap
-----

As reasonable persons that we are, this function signature for `createElement`
makes a lot of sense:

```ts
const createElement = (
  type: string,
  props: Props,
  children: Child[],
): Elem => {
  // ...
};
```

And the implementation code was not too ugly...

...but in the world of JS sometimes we cannot afford the luxury of sanity.

Second challenge
----------------

> Refactor your beautiful `createElement` to have the following demonic
> signature:

```ts
type Prop = string;
type Props = Record<string, Prop> | null; // note the `null` here!
type Elem = HTMLElement;
type Child = Elem | string | number | boolean;

const createElement = (
  type: string,
  props: Props = null, // default value
  ...children: (Child | Child[])[] // spread and array of array of children
): Elem => {
```

I've marked the changes in the snippet above with comments.

If you feel a mixture of perplexion, anger and sadness at this signature, know
that I'm sorry and I'm right there with you, but just bear with me for a little
while and it all will make (some) sense shortly (hopefully).

Once you are done with the nastiness (or gave up on us coders),
[keep reading here](3-insanity.md)!
