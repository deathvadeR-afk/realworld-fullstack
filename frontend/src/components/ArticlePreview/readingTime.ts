const WORDS_PER_MINUTE = 200;

export function readingTime(body: string): number {
  const words = body.split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) {
    return 0;
  }
  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}
