const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "before",
  "being",
  "but",
  "by",
  "can",
  "could",
  "do",
  "does",
  "did",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "here",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "may",
  "might",
  "must",
  "not",
  "of",
  "on",
  "or",
  "our",
  "out",
  "over",
  "she",
  "should",
  "so",
  "that",
  "the",
  "their",
  "them",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "under",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

export function getPostImageUrl(post, { width = 1200, height = 800, forceFallback = false } = {}) {
  if (post?.image && !forceFallback) {
    return post.image;
  }

  const sourceText = [post?.title, ...(post?.tags || []), post?.body]
    .filter(Boolean)
    .join(" ");

  const query = sourceText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .slice(0, 8)
    .join(",");

  const fallbackQuery = query || post?.tags?.[0] || post?.title?.split(" ")[0] || "blog";

  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(fallbackQuery)}`;
}
