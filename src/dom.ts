type Prop = string;
type Props = Record<string, Prop> | null;
type Elem = HTMLElement;
type Child = Elem | string | number | boolean;

const flatten = <T>(items: (T | T[])[]) => ([] as T[]).concat(...items);

export const createElement = (
  type: string,
  props: Props = null,
  ...children: (Child | Child[])[]
): Elem => {
  const elem = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([name, value]) =>
      elem.setAttribute(name, value),
    );
  }

  flatten(children).forEach(child =>
    elem.appendChild(
      typeof child === 'object' ? child : document.createTextNode(`${child}`),
    ),
  );

  return elem;
};