import {
  Typography,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpinnerDotted } from "spinners-react";
import StarRatingComponent from "react-star-rating-component";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContextProvider/FirebaseAuthContextProvider";

const AddAReview = () => {
  const { firebaseAuth } = useContext(FirebaseAuthContext);
  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuth);
  const submit = useSubmit();
  const actionData = useActionData();
  const [shouldDialogOpen, setShouldDialogOpen] = useState(false);
  const { service } = useLoaderData();
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (actionData?.success) {
      setShouldDialogOpen(true);
    }
  }, [actionData]);

  if (currentUserLoadingError) {
    return (
      <Typography color="red" variant="h2">
        Please, Reload the Page to Add a Review!
      </Typography>
    );
  }
  if (currentUserLoading) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Typography color="blue" variant="h2">
        Please, Log In to Add a Review!
      </Typography>
    );
  }

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
    formData.append("userID", currentUser.uid);
    formData.append("serviceID", service._id);

    submit(formData, { method: "POST" });
  };

  return (
    <>
      <Typography variant="h2" className="text-xl mb-3">
        Write Your Review
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
        Submit Your Review
      </Button>

      <Dialog open={shouldDialogOpen} size="xs">
        <DialogHeader>Success</DialogHeader>
        <DialogBody divider className="text-black">
          Your Review has been added!
        </DialogBody>
        <DialogFooter>
          <Button
            color="green"
            onClick={() => {
              setShouldDialogOpen(false);
              setReviewText("");
              setRating(0);
            }}
            className="mr-1"
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddAReview;
