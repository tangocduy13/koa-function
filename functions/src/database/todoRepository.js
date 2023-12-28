import admin from "firebase-admin";
import serviceAccount from "../serviceAccount.json";
import prepareDocs from "../helpers/prepareDocs";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const todoRef = db.collection("todos");

export async function getList() {
  const snapshot = await todoRef.get();
  let todos = [];
  snapshot.forEach((doc) => {
    let todo = { id: doc.id, ...doc.data() };
    todos.push(todo);
  });
  return todos;
}

export async function create({ title }) {
  const res = await todoRef.add({
    title: title,
    completed: false,
  });
  const newTodoSnapshot = await res.get();
  const newTodo = { id: newTodoSnapshot.id, ...newTodoSnapshot.data() };
  return newTodo;
}

export async function updateMany(array) {
  array.forEach(async (docId) => {
    await db.runTransaction(async (t) => {
      const doc = await t.get(todoRef.doc(docId));
      const updatedStatus = !doc.data().completed;
      t.update(todoRef.doc(docId), { completed: updatedStatus });
    });
  });
}

export async function removeMany(array) {
  const batch = db.batch();
  console.log(array);
  array.forEach((docId) => {
    let docRef = todoRef.doc(docId);
    batch.delete(docRef);
  });

  await batch.commit();
}
