import React from "react";
import { Typography } from "@material-tailwind/react";
import MyNavLink from "./MyNavLink";

const MyNavItem = ({to, children }) => {
  return (
    <Typography
      as="li"
      variant="paragraph"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <MyNavLink to={to}>{children}</MyNavLink>
    </Typography>
  );
};

export default MyNavItem;
