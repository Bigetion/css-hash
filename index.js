function phash(h, x) {
  let i = x.length;
  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i);
  }
  return h;
}

function hash(x) {
  return phash(5381, x);
}

function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
}

function generateAlphabeticName(code) {
  const charsLength = 52;
  let name = "";
  let x;
  for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }
  return (getAlphabeticChar(x % charsLength) + name).replace(
    /(a)(d)/gi,
    "$1-$2"
  );
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function generateHashId(str) {
  return generateAlphabeticName(hash(str) >>> 0);
}

function addStyleSheet(css) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.setAttribute("type", "text/css");
  style.setAttribute("data-inline-style", hashId);
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

function cssHash(getCssString) {
  let hashId = "";

  if (typeof getCssString === "function") {
    const tmpId = generateId();

    const cssString = getCssString(tmpId)
      .replace(/\n/g, "")
      .replace(/\s\s+/g, " ");

    hashId = generateHashId(cssString.split(tmpId).join(""));

    const hashCssString = cssString.split(tmpId).join(hashId);

    const existElements = document.querySelector(
      `style[data-inline-style=${hashId}]`
    );
    if (!existElements) {
      addStyleSheet(hashCssString);
    }
  }
  return hashId;
}

module.exports.cssHash = cssHash;
