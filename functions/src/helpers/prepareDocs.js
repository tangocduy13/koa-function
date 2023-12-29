export default function prepareDocs(querySnapshot) {
  return querySnapshot.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}
