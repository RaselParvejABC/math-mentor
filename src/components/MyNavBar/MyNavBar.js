import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaBars, FaCompress } from "react-icons/fa";

import Logo from "./logo.png";
import MyNavLink from "./MyNavLink";

export default function MyNavBar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <MyNavLink to="/">Home</MyNavLink>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <MyNavLink to="/services">Services</MyNavLink>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <MyNavLink to="/blog">Blog</MyNavLink>
      </Typography>
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
            <Typography as="span" variant="h2" className="text-2xl">
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
