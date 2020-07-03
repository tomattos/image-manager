/**
 * @description this utility function is not pure,
 * we need it to emulate unique id for our entities
 * */
export default function generateId(): string {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}
