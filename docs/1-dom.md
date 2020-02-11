Refactoring away the DOM verbosity
==================================

We'll start by writing some trivial DOM.

Open [src/index.ts](../../1-dom/src/index.ts) and write the following:

```ts
const root = document.getElementById('root');
if (!root) throw new Error('root not found');

const div = document.createElement('div');
root.appendChild(div);

const h1 = document.createElement('h1');
h1.textContent = 'This is the title';
div.appendChild(h1);

const h2 = document.createElement('h2');
h2.textContent = 'This is the subtitle';
h2.setAttribute('style', 'background: #ffaaaa');
div.appendChild(h2);
```

or just run:

```bash
git checkout 1-dom
```

You can check that this works by running:

```bash
npm run dev
```

And browsing [http://localhost:8080](http://localhost:8080) (note that the port
might vary depending on which ports you have already bound, check Webpack's
terminal output just in case).

First challenge
---------------

So that works, but, as you can see in [src/index.ts](../../1-dom/src/index.ts),
there is quite a bit of repetition and syntactic noise for each element we
create (e.g. `createElement`, `textContext`, `setAttribute`, `appendChild`, etc.
).

> Challenge 1: can you refactor the code in
> [src/index.ts](../../1-dom/src/index.ts) to reduce duplication?
>
> Write a function called `createElement` that abstracts all the pains of DOM
> interaction.
>
> Bonus points if you use this signature:
```ts
type Prop = string;
type Props = Record<string, Prop>;
type Elem = HTMLElement;
type Child = Elem | string | number | boolean;

const createElement = (
  type: string,
  props: Props,
  children: Child[],
): Elem => {
  // write your code here
};
```

Once you are done, [keep reading here](2-create-element.md)!
