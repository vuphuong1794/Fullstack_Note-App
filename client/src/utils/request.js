import { GRAPHQL_SERVER } from "./constants";

export const graphQLrequest = async (payload, options = {}) => {
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...options,
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  console.log({ data });
  return data;
};
