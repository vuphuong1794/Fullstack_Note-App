export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes{
          id
          content
        }
      }
    }
    `;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId,
      },
    }),
  });
  const { data } = await res.json();
  console.log("Note List", { data });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  console.log("[loader]", { noteId });
  const query = `query Note($noteId: String) {
      note(noteId: $noteId) {
        id
        content
      }
    }
    `;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId,
      },
    }),
  });
  const { data } = await res.json();
  console.log("Note List", { data });
  return data;
};
