'use strict';

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
  return Math.random().toString(36).slice(2).slice(0, 9);
}

function generateHashId(str) {
  return generateAlphabeticName(hash(str) >>> 0);
}

function addStyleSheet(attributeId, attributeValue, cssString) {
  const isElementExist = document.querySelector(
    `style[${attributeId}=${attributeValue}]`
  );
  if (!isElementExist) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    head.appendChild(style);
    style.setAttribute("type", "text/css");
    style.setAttribute(attributeId, attributeValue);
    if (style.styleSheet) {
      style.styleSheet.cssText = cssString;
    } else {
      style.appendChild(document.createTextNode(cssString));
    }
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
    addStyleSheet("data-inline-style", hashId, hashCssString);
  }
  return hashId;
}

function classNames(...args) {
  return args
    .filter((item) => {
      if (typeof item === "string") {
        return item.trim() !== "";
      }
      return false;
    })
    .join(" ");
}

exports.classNames = classNames;
exports.cssHash = cssHash;
