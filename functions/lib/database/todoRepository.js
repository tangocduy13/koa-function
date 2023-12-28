"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getList = getList;
exports.removeMany = removeMany;
exports.updateMany = updateMany;
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
  let todos = [];
  snapshot.forEach(doc => {
    let todo = {
      id: doc.id,
      ...doc.data()
    };
    todos.push(todo);
  });
  return todos;
}
async function create({
  title
}) {
  const res = await todoRef.add({
    title: title,
    completed: false
  });
  const newTodoSnapshot = await res.get();
  const newTodo = {
    id: newTodoSnapshot.id,
    ...newTodoSnapshot.data()
  };
  return newTodo;
}
async function updateMany(array) {
  array.forEach(async docId => {
    await db.runTransaction(async t => {
      const doc = await t.get(todoRef.doc(docId));
      const updatedStatus = !doc.data().completed;
      t.update(todoRef.doc(docId), {
        completed: updatedStatus
      });
    });
  });
}
async function removeMany(array) {
  const batch = db.batch();
  console.log(array);
  array.forEach(docId => {
    let docRef = todoRef.doc(docId);
    batch.delete(docRef);
  });
  await batch.commit();
}
//# sourceMappingURL=todoRepository.js.map