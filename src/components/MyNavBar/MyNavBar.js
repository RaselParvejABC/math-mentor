import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaCompress } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerRoundFilled } from "spinners-react";

import Logo from "./logo.png";
import MyNavItem from "./MyNavItem";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";
import LogOutButton from "../LogOutButton/LogOutButton";

export default function MyNavBar() {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const [user, loading, error] = useAuthState(firebaseAuth, {
    onUserChanged: (user) => {
      if (!user) {
        localStorage.removeItem("jwt");
        return;
      }
      console.log(user);
    },
  });

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const loginButtonOnClick = () => {
    navigate("/login", {
      state: { from: location.state?.from || location.pathname || "/" },
    });
  };
  const loginButton = (
    <Button size="sm" onClick={loginButtonOnClick}>
      Log In
    </Button>
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
      <MyNavItem to="/">Home</MyNavItem>
      <MyNavItem to="/services">Services</MyNavItem>
      <MyNavItem to="/blog">Blog</MyNavItem>
      {loading && <SpinnerRoundFilled size="30" />}
      {!loading && error && <span>Reload the Page</span>}
      {!loading && !error && user && (
        <>
          <MyNavItem to="/service/add">Add a Service</MyNavItem>
          <MyNavItem to="/my-reviews">My Reviews</MyNavItem>
          <Tooltip
            content={user.displayName}
            className="bg-blue-900 text-white"
          >
            <Avatar size="xs" src={user.photoURL}></Avatar>
          </Tooltip>
          <LogOutButton />
        </>
      )}
      {!loading && !error && !user && loginButton}
    </ul>
  );

  return (
    <Navbar
      fullWidth={true}
      className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 border-0"
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="p"
          variant="h2"
          className="cursor-pointer py-1.5 font-bold flex-1 align-middle"
        >
          <Link to="/" className="flex items-center align-middle">
            <img src={Logo} alt="Logo" className="max-w-[4%] inline mr-3" />
            <Typography as="span" variant="h2" className="text-xl">
              Math Mentor
            </Typography>
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <FaCompress /> : <FaBars />}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}
