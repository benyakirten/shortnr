import { LINK_REGEX } from './constants';

export function validateLink (link: string) {
  // eslint-disable-next-line no-useless-escape
  return LINK_REGEX.test(link);
}

export function validateLength (short: string, len: number = 5) {
  return short.replace(/\s/g, '').length === len;
}