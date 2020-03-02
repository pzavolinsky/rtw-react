// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, VElem } from './vdom';

interface PropTypes {
  items: string[];
  onAdd: () => void;
}

const Title = () => <h1>TODO app</h1>;

const SubTitle = ({ count }: { count: number }) => (
  <h2 style={`background: ${count % 2 === 0 ? '#ffaaaa' : '#aaffaa'}`}>
    item count: #{count}
  </h2>
);

const App = ({ items, onAdd }: PropTypes): VElem => (
  <div>
    <Title />
    <SubTitle count={items.length} />
    <button click={onAdd}>add</button>
    <ul>
      {items.map(text => (
        <li>{text}</li>
      ))}
    </ul>
  </div>
);

export default App;
