import React, { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";

const LogOutButton = () => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);

  const navigate = useNavigate();

  const logOutButtonOnClick = () => {
    signOut(firebaseAuth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Button size="sm" color="red" onClick={logOutButtonOnClick}>
      Log Out
    </Button>
  );
};

export default LogOutButton;
