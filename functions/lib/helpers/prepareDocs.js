"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareDocs;
// id va data lai voi nhau
function prepareDocs(snapshot) {
  return snapshot.array.map(doc => {
    return todo = {
      id: doc.id,
      ...doc.data()
    };
  });
}
//# sourceMappingURL=prepareDocs.js.map