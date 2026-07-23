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


const imageMap = {
  1: motherAndSonImage,
  2: expertImage,
  3: daveImage,
  4: candybarImage,
  5: hopesImage,
  6: snowAndNakedImage,
  7: loveImage,
  8: cookImage,
  9: secretImage,
  10: rushedImage,
};

function getSeed(post) {
  const text = [post?.title, ...(post?.tags || []), post?.body]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getPostImageUrl(post, { forceFallback = false } = {}) {
  
  if (post?.image && !forceFallback) {
    return post.image;
  }

  
  if (imageMap[post?.id]) {
    return imageMap[post.id];
  }

  
  return imagePool[getSeed(post) % imagePool.length];
}