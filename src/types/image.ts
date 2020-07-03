import { Tooltip } from './tooltip';

export interface Image {
  readonly id?: string;
  readonly name: string;
  readonly tooltip: Tooltip;
  readonly src: string;
}


