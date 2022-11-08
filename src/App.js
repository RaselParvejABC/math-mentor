import { Outlet } from "react-router-dom";
import FirebaseAuthContextProvider from "./contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";
import auth from "./firebase/Auth/Auth";
import MyNavBar from "./components/MyNavBar/MyNavBar";

const App = () => {
  return (
    <FirebaseAuthContextProvider value={{ firebaseAuth: auth }}>
      <MyNavBar />
      <Outlet />
    </FirebaseAuthContextProvider>
  );
};

export default App;
