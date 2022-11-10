import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";

const MyReviews = () => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MathMentorServer}/user/my-reviews`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Response is not OK.");
        }
        const responseBody = await response.json();
        setReviews(responseBody);
      } catch (err) {
        setError("An Error occured while loading Your Reviews!");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (error) {
    return (
      <Typography className="text-center" variant="h4" color="red">
        {error}
      </Typography>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  if (!reviews?.length) {
    return (
      <Typography className="text-center mt-6" variant="h4" color="red">
        You have added no reviews yet.
      </Typography>
    );
  }

  return <div>{reviews.length}</div>;
};

export default MyReviews;
