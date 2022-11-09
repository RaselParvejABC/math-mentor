import { Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerDotted } from "spinners-react";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";

const AddAReview = () => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuth);

  if (currentUserLoadingError) {
    return (
      <Typography color="red" variant="h2">
        Please, Reload the Page to Add a Review!
      </Typography>
    );
  }
  if (currentUserLoading) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Typography color="blue" variant="h2">
        Please, Log In to Add a Review!
      </Typography>
    );
  }
  return <div>Now You can add a Review</div>;
};

export default AddAReview;
