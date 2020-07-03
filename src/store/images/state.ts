import { createEntityAdapter } from '@reduxjs/toolkit';
import { Image } from '../../types/image';

export const imageAdapter = createEntityAdapter<Image>()
