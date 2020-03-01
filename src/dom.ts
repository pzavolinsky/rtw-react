import { Prop, VElem, TEXT_TYPE } from './vdom';

type Elem = HTMLElement;

const setProp = (elem: HTMLElement, name: string, value: Prop) => {
  if (typeof value === 'function') {
    elem.addEventListener(name, value, false);
  } else {
    elem.setAttribute(name, value);
  }
};

export const render = ({ type, props, children }: VElem): Elem => {
  const elem = document.createElement(type);

  if (props) {
    Object.entries(props).forEach(([name, value]) =>
      setProp(elem, name, value),
    );
  }

  children.forEach(child =>
    elem.appendChild(
      child.type === TEXT_TYPE
        ? document.createTextNode(`${child.props?.value}`)
        : render(child),
    ),
  );

  return elem;
};
