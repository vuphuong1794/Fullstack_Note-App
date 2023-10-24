import { graphQLrequest } from "./request";

export const foldersLoader = async () => {
  const query = `query Folders {
      folders {
        id
        name
        createAt
      }
    }
    `;

  const data = await graphQLrequest({ query });
  return data;
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphQLrequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};
