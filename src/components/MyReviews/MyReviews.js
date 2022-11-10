import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import MyReviewCard from "../MyReviewCard/MyReviewCard";
import useDocumentTitle from "../../custom-hooks/useDocumentTitle";

export async function reviewEditDeleteAction({ request }) {
  const requestBody = Object.fromEntries(await request.formData());
  let endpoint = `/review/${requestBody.reviewID}`;
  if (request.method === "PATCH") {
    requestBody.rating = parseInt(requestBody.rating);
  }

  delete requestBody.reviewID;

  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}${endpoint}`,
    {
      method: request.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const responseBody = await response.json();
  return responseBody;
}

const MyReviews = () => {
  useDocumentTitle("My Reviews");
  const actionData = useActionData();
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
  }, [actionData]);

  if (error) {
    return (
      <Typography className="text-center" variant="h4" color="red">
        {error}
      </Typography>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-start mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  if (!reviews?.length) {
    return (
      <Typography className="text-center mt-6" variant="h4" color="blue">
        You have added no reviews yet.
      </Typography>
    );
  }

  return (
    <div className="container mx-auto my-12">
      <Typography variant="h3" color="blue" className="text-center">
        MY Reviews
      </Typography>
      <div className="grid lg:grid-cols-3 items-start gap-5 gap-y-10 container mx-auto my-12">
        {reviews.map((review) => (
          <MyReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
