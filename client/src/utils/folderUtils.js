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
