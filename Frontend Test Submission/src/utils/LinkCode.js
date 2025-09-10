const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomCode(len = 6) {
  let result = '';
  for (let i = 0; i < len; i++) {
    result += CHARS[Math.random() * CHARS.length | 0];
  }
  return result;
}

export function createUniqueCode(store) {
  let code = randomCode(6);
  let tries = 0;
  while (store[code] && tries < 3) {
    code = randomCode(6 + (tries >> 1));
    tries++;
  }
  if (store[code]) {
    code += Date.now().toString(36).slice(-2);
  }
  return code;
}