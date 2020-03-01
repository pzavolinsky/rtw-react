import { createElement } from './dom';

const App = () =>
  createElement(
    'div',
    null,
    createElement('h1', null, 'This is the title'),

    createElement(
      'h2',
      { style: 'background: #ffaaaa' },
      'This is the subtitle',
    ),
  );

export default App;
