"use strict";

import contentType from "content-type";

function hasContentType(headers) {
  if (!headers) {
    return;
  }
  let contentTypeRight;
  Object.keys(headers).map(key => {
    if (key === "content-type") {
      contentTypeRight = "content-type";
    }
    if (key === "Content-Type") {
      contentTypeRight = "Content-Type";
    }
  });
  return contentTypeRight;
}

export default () => (handler, next) => {
  if (!handler.event.headers) {
    next();
  }
  const content = hasContentType(handler.event.headers);
  if (!content) {
    next();
  }
  const { type } = contentType.parse(handler.event.headers[content]);
  if (type === "application/json") {
    try {
      handler.event.body = JSON.parse(handler.event.body);
    } catch (err) {
      console.log('erro ao parsear', err)
    }
  }
  next();
};
