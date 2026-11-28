const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(body: string): number {
  const trimmed = body.trim();
  if (trimmed === '') {
    return 0;
  }
  const wordCount = trimmed.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
