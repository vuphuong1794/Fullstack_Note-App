import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Home from "../page/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../page/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { addNewNote, noteLoader, notesLoader } from "../utils/noteUtils";
import { foldersLoader } from "../utils/folderUtils";

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
            loader: foldersLoader,
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                action: addNewNote, //bất cứ submit nào khác với method GET thì sẽ thực thi action
                //danh sach note trong folder
                loader: notesLoader, //loader dùng để load dữ liệu, action dùng để thay đổi dữ liệu
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    loader: noteLoader,
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
