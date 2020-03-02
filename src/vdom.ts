export type Prop = string | EventListener;
export type Props = Record<string, Prop> | null;
export interface VElem {
  type: string;
  props: Props;
  children: VElem[];
}
type Child = VElem | string | number | boolean;

export const TEXT_TYPE = '#text';

const createText = (value: string): VElem => ({
  type: TEXT_TYPE,
  props: { value },
  children: [],
});

const flatten = <T>(items: (T | T[])[]) => ([] as T[]).concat(...items);

export const createElement = (
  type: string,
  props: Props = null,
  ...children: (Child | Child[])[]
): VElem => ({
  type,
  props,
  children: flatten(children).map(child =>
    typeof child === 'object' ? child : createText(`${child}`),
  ),
});

export const areEqual = (a: VElem, b: VElem): boolean =>
  a.type === b.type &&
  equalProps(a.props, b.props) &&
  equalChildren(a.children, b.children);

export const equalProps = (a: Props, b: Props): boolean =>
  (a === null && b === null) ||
  (a !== null &&
    b !== null &&
    Object.keys({ ...a, ...b }).every(key => a[key] === b[key]));

export const equalChildren = (a: VElem[], b: VElem[]): boolean =>
  a.length === b.length && a.every((va, i) => areEqual(va, b[i]));
