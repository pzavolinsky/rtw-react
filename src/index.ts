const root = document.getElementById('root');
if (!root) throw new Error('root not found');

type Prop = string;
type Props = Record<string, Prop>;
type Elem = HTMLElement;
type Child = Elem | string | number | boolean;

const createElement = (type: string, props: Props, children: Child[]): Elem => {
  const elem = document.createElement(type);

  Object.entries(props).forEach(([name, value]) =>
    elem.setAttribute(name, value),
  );

  children.forEach(child =>
    elem.appendChild(
      typeof child === 'object' ? child : document.createTextNode(`${child}`),
    ),
  );

  return elem;
};

const div = createElement('div', {}, [
  createElement('h1', {}, ['This is the title']),

  createElement('h2', { style: 'background: #ffaaaa' }, [
    'This is the subtitle',
  ]),
]);

root.appendChild(div);
