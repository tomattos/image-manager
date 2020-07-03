export enum Placement {
  RIGHT = 'right',
  LEFT = 'left',
  TOP = 'top',
  BOTTOM = 'bottom'
}

export interface Tooltip {
  name: string;
  color: string;
  placement: Placement;
}
