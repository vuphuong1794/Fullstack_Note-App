import { graphQLrequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes{
          id
          content
          updatedAt
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
  const query = `query Note($noteId: String!) {
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
  //chuyển đổi formData thành kiểu dữ liệu bình thường để submit lên backend
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ newNote, formDataObj });
  const query = `mutation Mutation($content: String!, $folderId: ID!){
    addNote(content: $content, folderId: $folderId){
      id
      content
    }
  }`;
  const { addNote } = await graphQLrequest({
    query,
    variables: formDataObj,
  });
  console.log({ addNote });
  return addNote;
};

export const updateNote = async ({ parent, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ updatedNote, formDataObj });
  const query = `mutation Mutation($id: String!, $content: String!){
    updateNote(id: $id, content: $content){
      id
      content
    }
  }`;

  const { updateNote } = await graphQLrequest({
    query,
    variables: formDataObj,
  });
  console.log({ updateNote });
  return updateNote;
};
