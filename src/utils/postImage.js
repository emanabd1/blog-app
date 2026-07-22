import candybarImage from "../assets/candybar.png";
import cookImage from "../assets/cook.png";
import daveImage from "../assets/dave.png";
import expertImage from "../assets/expert.png";
import hopesImage from "../assets/hopes.png";
import loveImage from "../assets/love.png";
import motherAndSonImage from "../assets/mother and son.png";
import rushedImage from "../assets/rushed.png";
import secretImage from "../assets/secret.png";
import snowAndNakedImage from "../assets/snow and naked.png";

const imagePool = [
  motherAndSonImage,
  expertImage,
  daveImage,
  candybarImage,
  hopesImage,
  snowAndNakedImage,
  loveImage,
  cookImage,
  secretImage,
  rushedImage,
];

function getSeed(post) {
  const text = [post?.title, ...(post?.tags || []), post?.body]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getPostImageUrl(post, { forceFallback = false } = {}) {
  if (post?.image && !forceFallback) {
    return post.image;
  }

  const sourceText = [post?.title, ...(post?.tags || []), post?.body]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/(mother|son|family|child|parent|home)/.test(sourceText)) {
    return motherAndSonImage;
  }

  if (/(expert|tech|code|react|developer|programming|computer|ai|innov)/.test(sourceText)) {
    return expertImage;
  }

  if (/(dave|name|person|man|woman|story)/.test(sourceText)) {
    return daveImage;
  }

  if (/(candy|sweet|dessert|cake|cookie|chocolate)/.test(sourceText)) {
    return candybarImage;
  }

  if (/(hope|dream|inspire|inspiration|bright)/.test(sourceText)) {
    return hopesImage;
  }

  if (/(snow|winter|cold|ice|nature|mountain|travel|journey)/.test(sourceText)) {
    return snowAndNakedImage;
  }

  if (/(love|heart|romance|relationship|kiss|friend)/.test(sourceText)) {
    return loveImage;
  }

  if (/(cook|food|recipe|meal|drink|coffee|kitchen|eat)/.test(sourceText)) {
    return cookImage;
  }

  if (/(history|crime|murder|secret|mystery|detective|american|ghost|unknown)/.test(sourceText)) {
    return secretImage;
  }

  if (/(rush|hurry|deadline|stress|panic|late|door|time)/.test(sourceText)) {
    return rushedImage;
  }

  return imagePool[getSeed(post) % imagePool.length];
}
