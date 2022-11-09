import React from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/service/${params.id}`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();
  return responseBody;
}

const Service = () => {
  const service = useLoaderData();
  console.log(service);
  return <div></div>;
};

export default Service;
