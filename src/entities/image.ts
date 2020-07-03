import { Image } from '../types/image';
import { Placement, Tooltip } from '../types/tooltip';

export class ImageEntity implements Partial<Image> {
  constructor(
    public readonly id?: string,
    public readonly name: string = '',
    public readonly src: string = '',
    public readonly tooltip: Tooltip = {
      placement: Placement.TOP,
      color: '',
      name: ''
    }
  ) {}
}
