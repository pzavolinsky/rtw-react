Getting started
===============

Clone the repo
--------------

Remember, if you want to follow along, clone this repo:

```bash
git clone https://github.com/pzavolinsky/rtw-react.git
```

Scaffolding
-----------

We'll start with some scaffolding, for this project we'll need TypeScript,
Webpack and some other stuff so let's get that:

```bash
git checkout 0-empty
npm ci
```

A note about structure
----------------------

Well, this is pretty straight forward, we have:

- [public/index.html](../../0-empty/public/index.html) this is the static HTML
  page for out project.
  The only two interesting bits of this file are these:
  ```html
  <div id="root"></div>
  <script src="bundle.js" type="text/javascript"></script>
  ```
  That is:
    - a _div_ with known as `root` where we are going to put our code
    - a reference to `bundle.js` that is the file that results from compiling 
  [src/index.ts](../../0-empty/src/index.ts)

- [src/index.ts](../../0-empty/src/index.ts) a (currently empty) file that will
  hold our code.

Keep reading
------------

Ready for the first challenge?

[Keep reading here](1-dom.md)!
