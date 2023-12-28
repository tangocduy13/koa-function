// id va data lai voi nhau
export default function prepareDocs(snapshot) {
  console.log("run prepare");
  let docs = [];
  snapshot.array.forEach((element) => {
    let doc = { id: element.id, ...element.data() };
    docs.push(doc);
  });
  return docs;
}
