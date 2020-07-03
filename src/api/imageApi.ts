import { Image } from '../types/image';
import generateId from '../utils/generateId';

function getFromStorage<T>(name: string): T | [] {
  const storageData = localStorage.getItem(name);
  return storageData ? JSON.parse(storageData) as T : [];
}

function setToStorage(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}

function emulateRequest<T>(payload: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(payload)
    }, 500);
  });
}

function findIndexById<T extends { id?: string }>(data: T[], id: string): number {
  return data.findIndex((item) => item.id === id)
}

export function createImage(payload: Image): Promise<Image> {
  /* TODO: in case of interacting with the backend we won't need id from client
  *   also we can change request emulating with fetch API or axios */
  const id = generateId();

  return emulateRequest<Image>({ ...payload, id });
}

export function fetchImages(): Promise<Image[]> {
  const images = getFromStorage<Image[]>('images');

  return emulateRequest<Image[]>(images);
}

export function updateImage(payload: Image): Promise<Image> {
  const images = getFromStorage<Image[]>('images');
  const index = findIndexById<Image>(images, payload.id as string);

  images[index] = payload;
  setToStorage('images', images);

  return emulateRequest<Image>(payload);
}

export function removeImage(payload: string): Promise<string> {
  const images = getFromStorage<Image[]>('images');
  const index = findIndexById<Image>(images, payload);

  images.splice(index, 1);
  setToStorage('images', images);

  return emulateRequest(payload);
}
