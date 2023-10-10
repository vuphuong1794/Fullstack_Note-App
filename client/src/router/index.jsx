import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Home from "../page/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../page/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            //danh sach folder
            loader: async () => {
              const query = `query Folders {
                folders {
                  id
                  name
                  createAt
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
                }),
              });
              const { data } = await res.json();
              console.log({ data });
              return data;
            },
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                //danh sach note trong folder
                loader: async ({ params: { folderId } }) => {
                  console.log("loader", { folderId });
                  const query = `query Folder($folderId: String) {
                    folder(folderId: $folderId) {
                      id
                      name
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
                },
                children: [
                  {
                    element: <Note />,
                    path: `note/:notId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
