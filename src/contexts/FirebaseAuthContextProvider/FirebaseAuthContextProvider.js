import React from "react";

export const FirebaseAuthContext = React.createContext();

const FirebaseAuthContextProvider = ({ children, value }) => {
  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthContextProvider;
