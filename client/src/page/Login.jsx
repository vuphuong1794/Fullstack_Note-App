import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLrequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  //khong dung useNavigate khi khong su dung useEffect
  //const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLrequest({
      query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid, name: $name){
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("register", { data });
  };

  // kiem tra neu user co thuc hien dang nhap thanh cong thi moi chuyen huong sang trang homepage
  if (localStorage.getItem("accessToken")) {
    //navigate("/");
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="contained" onClick={handleLoginWithGoogle}>
        Login with google
      </Button>
    </>
  );
}
