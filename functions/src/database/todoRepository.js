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
  return prepareDocs(snapshot.docs);
}

export async function create({ title }) {
  const res = await todoRef.add({
    title: title,
    completed: false,
  });
  const newTodo = { id: res.id, title: title, completed: false }; // ko get lại dữ liệu vừa tạo
  return newTodo;
}

export async function updateTodos(array) {
  await Promise.all(
    array.map(async (docId) => {
      await db.runTransaction(async (t) => {
        const doc = await t.get(todoRef.doc(docId));
        const updatedStatus = !doc.data().completed;
        t.update(todoRef.doc(docId), { completed: updatedStatus });
      });
    })
  );
}

export async function removeTodos(array) {
  const batch = db.batch();

  await Promise.all(
    array.map((docId) => {
      let docRef = todoRef.doc(docId);
      batch.delete(docRef);
    })
  );

  await batch.commit();
}
