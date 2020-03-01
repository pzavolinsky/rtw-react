const root = document.getElementById('root');
if (!root) throw new Error('root not found');

import App from './app';

let count = 0;

const state = {
  items: ['first'],
  onAdd: () => {
    state.items = [...state.items, `item ${++count}`];
    update();
  },
};

const update = () => {
  // this update implementation sucks because we are erasing the whole DOM tree
  // and creating everything again for each change. This is the opposite of what
  // we want to accomplish.
  //
  // Oh well, at least it works
  //
  root.innerHTML = ''; // this is a disgrace!
  root.appendChild(App(state));
};

update();
