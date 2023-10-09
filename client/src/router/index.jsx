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
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
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
