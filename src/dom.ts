import { VElem, Prop, TEXT_TYPE, Props } from './vdom';

type Elem = HTMLElement | Text;

const isText = (e: Elem): e is Text => e.nodeType === Node.TEXT_NODE;

const setProp = (elem: HTMLElement, key: string, value: Prop) => {
  if (typeof value === 'function') {
    elem.addEventListener(key, value, false);
  } else {
    elem.setAttribute(key, value);
  }
};

const unsetProp = (elem: HTMLElement, key: string, value: Prop) => {
  if (typeof value === 'function') {
    elem.removeEventListener(key, value, false);
  } else {
    elem.removeAttribute(key);
  }
};

class RenderedElem {
  private dom: Elem;
  private oldProps: Props = null;
  private oldChildren: VElem[] = [];
  private renderedChildren: RenderedElem[] = [];

  constructor(velem: VElem) {
    this.dom =
      velem.type === TEXT_TYPE
        ? document.createTextNode(`${velem.props?.value as string}`)
        : document.createElement(velem.type);
    this.update(velem);
  }

  public static renderInto(root: HTMLElement, velem: VElem): RenderedElem {
    const elem = new RenderedElem(velem);
    root.appendChild(elem.dom);
    return elem;
  }

  update(velem: VElem) {
    const { oldProps, oldChildren } = this;
    const { props: newProps, children: newChildren } = velem;

    const { dom } = this;

    if (isText(dom)) {
      if (oldProps?.value !== newProps?.value) {
        dom.textContent = newProps?.value as string;
      }
      this.oldProps = newProps;
      return;
    }

    // update props
    Object.keys({ ...oldProps, ...newProps }).forEach(key => {
      const oldValue = oldProps ? oldProps[key] : undefined;
      const newValue = newProps ? newProps[key] : undefined;

      if (oldValue === newValue) return;

      if (oldValue !== undefined) unsetProp(dom, key, oldValue);
      if (newValue !== undefined) setProp(dom, key, newValue);
    });

    // update children
    oldChildren.forEach((oldChild, i) => {
      const newChild = newChildren[i];
      const oldRendered = this.renderedChildren[i];

      if (newChild === undefined) {
        // remove
        dom.removeChild(oldRendered.dom);
        return;
      }

      if (oldChild.type !== newChild.type) {
        const newRendered = new RenderedElem(newChild);
        dom.insertBefore(newRendered.dom, oldRendered.dom);
        dom.removeChild(oldRendered.dom);
        this.renderedChildren[i] = newRendered;
        return;
      }

      oldRendered.update(newChild);
    });
    if (oldChildren.length > newChildren.length) {
      this.renderedChildren.splice(newChildren.length);
    }
    if (oldChildren.length < newChildren.length) {
      newChildren.slice(oldChildren.length).forEach(newChild => {
        const newRendered = new RenderedElem(newChild);
        dom.appendChild(newRendered.dom);
        this.renderedChildren.push(newRendered);
      });
    }

    this.oldProps = newProps;
    this.oldChildren = newChildren;
  }
}

export const render = RenderedElem.renderInto;
