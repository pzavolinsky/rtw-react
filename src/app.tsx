// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from './dom';

interface PropTypes {
  items: string[];
  onAdd: () => void;
}

const App = ({ items, onAdd }: PropTypes) => (
  <div>
    <h1>TODO app</h1>
    <h2 style="background: #ffaaaa">Item count: #{items.length}</h2>
    <button click={onAdd}>add</button>
  </div>
);

export default App;
