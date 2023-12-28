"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareDocs;
// id va data lai voi nhau
function prepareDocs(snapshot) {
  console.log("run prepare");
  let docs = [];
  snapshot.array.forEach(element => {
    let doc = {
      id: element.id,
      ...element.data()
    };
    docs.push(doc);
  });
  return docs;
}
//# sourceMappingURL=prepareDocs.js.map