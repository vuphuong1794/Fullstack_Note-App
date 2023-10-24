import { GRAPHQL_SERVER } from "./constants";

export const graphQLrequest = async (payload, options = {}) => {
  if (localStorage.getItem("accessToken")) {
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

    if (!res.ok) {
      // 403 lỗi forbidden (token hết hạn)
      if (res.status === 403) {
        return null;
      }
    }

    const { data } = await res.json();
    return data;
  }
  return null;
};
