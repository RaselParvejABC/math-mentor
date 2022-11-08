import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import * as EmailValidator from "email-validator";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { SpinnerDotted } from "spinners-react";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";

const Register = () => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [error, setError] = useState(null);
  const [profileNeedsUpdate, setProfileNeedsUpdate] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [createUserWithEmailAndPassword, , loading, firebaseError] =
    useCreateUserWithEmailAndPassword(firebaseAuth);

  const [updateProfile, updateLoading, updateError] =
    useUpdateProfile(firebaseAuth);

  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuth);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (currentUserLoading) {
    return null;
  }

  if (currentUserLoadingError) {
    throw currentUserLoadingError;
  }

  if (currentUser) {
    if (!profileNeedsUpdate || profileUpdated) {
      return <Navigate to={from} replace />;
    }
    return null;
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    setError(null);
    if (password !== passwordConfirmed) {
      setError("Passwords don't Match");
      return;
    }
    if (name.trim().length === 0) {
      setError("Names cannot be empty!");
      return;
    }
    if (photoURL.trim().length === 0) {
      setError("PhotoURL cannot be empty!");
      return;
    }
    if (!EmailValidator.validate(email)) {
      setError("Email Format Incorrect!");
      return;
    }
    if (password.length < 6) {
      setError("Password needs to be at least 6 Characters!");
      return;
    }
    createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setProfileNeedsUpdate(true);
        updateProfile({ photoURL, displayName: name }).then(() => {
          setProfileUpdated(true);
        });
      })
      .catch();
  };

  return (
    <div>
      <div className="flex flex-col items-center pt-5 sm:justify-center bg-gray-50">
        <div>
          <h3 className="text-4xl font-bold text-blue-500">Math Mentor</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Full Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="pic"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Profile Pic URL
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(event) => setPhotoURL(event.target.value)}
                  value={photoURL}
                  type="text"
                  name="pic"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(event) => setPasswordConfirmed(event.target.value)}
                  value={passwordConfirmed}
                  type="password"
                  name="password_confirmation"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                onClick={handleSubmission}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
                disabled={updateLoading || loading}
              >
                Register
              </button>
            </div>
          </form>

          {(error || firebaseError) && (
            <div className="mt-4 text-center text-red-500">
              {error || firebaseError.message}
            </div>
          )}

          {loading && (
            <div className="flex flex-row justify-center mt-6">
              <SpinnerDotted size="100" />
            </div>
          )}

          <div className="mt-4 text-grey-600 text-center">
            Already have an account?
            <br />
            Or, want to Log In with Google? <br />
            <span>
              <Link
                className="text-purple-600 hover:underline"
                to="/login"
                state={{ from: from }}
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
