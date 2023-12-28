// id va data lai voi nhau
export default function prepareDocs(snapshot) {
  return snapshot.array.map((doc) => {
    return (todo = { id: doc.id, ...doc.data() });
  });
}
