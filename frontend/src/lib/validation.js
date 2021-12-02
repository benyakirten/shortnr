export function validateLink (link) {
  // eslint-disable-next-line no-useless-escape
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  return regex.test(link);
}

export function exactLength(link, len = 5) {
  return link.replace(/\s/g, '').length === len;
}

export function validate (text, valFns) {
  for (let fn of valFns) {
    if (!fn(text)) {
      return false
    }
  }
  return true;
}