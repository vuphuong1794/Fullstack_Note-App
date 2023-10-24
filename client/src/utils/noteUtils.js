import { graphQLrequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
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

  const data = await graphQLrequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
      note(noteId: $noteId) {
        id
        content
      }
    }
    `;
  const data = await graphQLrequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};

export const addNewNote = async ({ parent, request }) => {
  const newNote = await request.formData();
  console.log({ newNote });
};
