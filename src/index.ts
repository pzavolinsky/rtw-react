const root = document.getElementById('root');
if (!root) throw new Error('root not found');

import App from './app';
import { render } from './dom';

let count = 0;

const state = {
  items: ['first'],
  onAdd: () => {
    state.items = [...state.items, `item ${++count}`];
    app.update(App(state));
  },
};

const app = render(root, App(state));
