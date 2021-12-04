export function validLink(link: string) {
  // eslint-disable-next-line no-useless-escape
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(link)
}

export function validateLink () {
  return (link: string) => validLink(link);
}

export function exactLength(link: string, len = 5) {
  return link.replace(/\s/g, '').length === len;
}

export function validateLength(len = 5) {
  return (link: string) => exactLength(link, len);
}

export function validate (text: string, valFns: [(val: string) => boolean]) {
  for (let fn of valFns) {
    if (!fn(text)) {
      return false
    }
  }
  return true;
}