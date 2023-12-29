"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getList = getList;
exports.removeTodos = removeTodos;
exports.updateTodos = updateTodos;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _serviceAccount = _interopRequireDefault(require("../serviceAccount.json"));
var _prepareDocs = _interopRequireDefault(require("../helpers/prepareDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(_serviceAccount.default)
});
const db = _firebaseAdmin.default.firestore();
const todoRef = db.collection("todos");
async function getList() {
  const snapshot = await todoRef.get();
  return (0, _prepareDocs.default)(snapshot.docs);
}
async function create({
  title
}) {
  const res = await todoRef.add({
    title: title,
    completed: false
  });
  const newTodo = {
    id: res.id,
    title: title,
    completed: false
  }; // ko get lại dữ liệu vừa tạo
  return newTodo;
}
async function updateTodos(array) {
  await Promise.all(array.map(async docId => {
    await db.runTransaction(async t => {
      const doc = await t.get(todoRef.doc(docId));
      const updatedStatus = !doc.data().completed;
      t.update(todoRef.doc(docId), {
        completed: updatedStatus
      });
    });
  }));
}
async function removeTodos(array) {
  const batch = db.batch();
  await Promise.all(array.map(docId => {
    let docRef = todoRef.doc(docId);
    batch.delete(docRef);
  }));
  await batch.commit();
}
//# sourceMappingURL=todoRepository.js.map