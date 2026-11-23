export const demoMemoji = "/memoji/Race.png";

export const memojis = ["/memoji/Bki.png", "/memoji/Nkkr.png", "/memoji/Race.png"];

export function randomMemoji() {
  return memojis[Math.floor(Math.random() * memojis.length)];
}
