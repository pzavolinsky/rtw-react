type Prop = string | EventListener;
type Props = Record<string, Prop> | null;
type Elem = HTMLElement;
type Child = Elem | string | number | boolean;

const setProp = (elem: HTMLElement, name: string, value: Prop) => {
  if (typeof value === 'function') {
    elem.addEventListener(name, value, false);
  } else {
    elem.setAttribute(name, value);
  }
};

const flatten = <T>(items: (T | T[])[]) => ([] as T[]).concat(...items);

export const createElement = (
  type: string,
  props: Props = null,
  ...children: (Child | Child[])[]
): Elem => {
  const elem = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([name, value]) =>
      setProp(elem, name, value),
    );
  }

  flatten(children).forEach(child =>
    elem.appendChild(
      typeof child === 'object' ? child : document.createTextNode(`${child}`),
    ),
  );

  return elem;
};
