import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerDotted } from "spinners-react";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";

const PrivateRouteProtector = ({ children }) => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuth);

  const location = useLocation();

  if (currentUserLoading) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="100" />
      </div>
    );
  }

  if (currentUserLoadingError) {
    throw currentUserLoadingError;
  }

  if (!currentUser) {
    const from = location.state?.from?.pathname || location || "/";
    return <Navigate to="/login" state={{ from: from }} replace />;
  }
  return <>{children}</>;
};

export default PrivateRouteProtector;
