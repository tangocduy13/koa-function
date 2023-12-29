"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareDocs;
function prepareDocs(querySnapshot) {
  return querySnapshot.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
}
//# sourceMappingURL=prepareDocs.js.map