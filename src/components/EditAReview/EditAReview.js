import { Typography, Textarea, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSubmit, useLoaderData } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

import StarRatingComponent from "react-star-rating-component";

export async function loader({ params }) {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/review/${params.id}`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();
  return responseBody;
}

const EditAReview = () => {
  const submit = useSubmit();
  const review = useLoaderData();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!review) {
      return;
    }
    setReviewText(review.reviewText);
    setRating(review.rating);
  }, [review]);

  const handleReviewTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length > 300) {
      setReviewText(newText.substring(0, 300));
      return;
    }
    setReviewText(newText);
  };

  const onSubmitButtonClicked = async () => {
    setError(null);
    if (reviewText.length < 30) {
      setError("Minimum 30 Characters needed!");
      return;
    }
    if (reviewText.length > 300) {
      setError("Maximum 300 Characters Allowed!");
      setReviewText(reviewText.substring(0, 300));
      return;
    }

    if (rating < 1) {
      setError("Give a rating please!");
      return;
    }

    const formData = new FormData();
    formData.append("reviewText", reviewText);
    formData.append("rating", rating);
    formData.append("reviewID", review._id);

    submit(formData, { method: "PATCH", action: "/my-reviews" });
  };

  if (!review) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Typography variant="h2" className="text-xl mb-3 text-center">
        Edit Your Review
      </Typography>
      <Textarea
        className="h-fit"
        size="lg"
        label={`${reviewText.length}/300 Chars`}
        value={reviewText}
        onChange={handleReviewTextChange}
      />
      <StarRatingComponent
        className="text-left text-2xl my-2 inline"
        name="rating"
        value={rating}
        onStarClick={(newValue) => setRating(newValue)}
        starCount={10}
      />
      {error && (
        <Typography className="mb-3" variant="h6" color="red">
          {error}
        </Typography>
      )}
      <Button fullWidth onClick={onSubmitButtonClicked}>
        Update
      </Button>
    </div>
  );
};

export default EditAReview;
