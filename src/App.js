import { Outlet } from "react-router-dom";
import FirebaseAuthContextProvider from "./contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";
import auth from "./firebase/Auth/Auth";
import MyNavBar from "./components/MyNavBar/MyNavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <FirebaseAuthContextProvider value={{ firebaseAuth: auth }}>
      <MyNavBar />
      <Outlet />
      <Footer />
    </FirebaseAuthContextProvider>
  );
};

export default App;
