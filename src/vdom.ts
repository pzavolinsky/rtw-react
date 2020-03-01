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
