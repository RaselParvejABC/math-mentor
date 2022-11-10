import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSubmit, useActionData, Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import StarRatingComponent from "react-star-rating-component";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MyReviewCard = ({ review }) => {
  const submit = useSubmit();
  const actionData = useActionData();

  

  useEffect(() => {
    if (actionData?.deleted) {
      confirmAlert({
        title: "Success",
        message: "Deleted!",
        closeOnClickOutside: false,
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    }
    if (actionData?.edited) {
      confirmAlert({
        title: "Success",
        message: "Edited",
        closeOnClickOutside: false,
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    }
  }, [actionData]);

  const handleDeleteButtonClick = () => {
    let confirmed = false;

    const submitDelete = () => {
      if (!confirmed) {
        return;
      }
      const formData = new FormData();
      formData.append("reviewID", review._id);
      submit(formData, { method: "DELETE", action: "/my-reviews" });
    };
    confirmAlert({
      title: "Confirm to Delete.",
      message: "Are you sure to do this?",
      closeOnClickOutside: false,
      afterClose: submitDelete,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            confirmed = true;
          },
        },
        {
          label: "No",
          onClick: () => {
            confirmed = false;
          },
        },
      ],
    });
  };

  return (
    <Card>
      <CardHeader>
        <Typography variant="h6" className="font-bold text-center" color="blue">
          {review.serviceTitle}
        </Typography>
      </CardHeader>
      <CardBody className="text-center">
        <Typography className="text-left mb-3">{review.reviewText}</Typography>
        <StarRatingComponent
          className="text-center md:text-left text-2xl"
          name="rating"
          value={review.rating}
          editing={false}
          starCount={10}
        />
      </CardBody>
      <CardFooter
        divider
        className="flex items-center justify-between py-3 h-fit"
      >
        <Link to={`/service/edit/${review._id}`}>
          <Button variant="outlined">
            <Typography>
              <CiEdit color="blue" />
            </Typography>
          </Button>
        </Link>
        <Button variant="outlined" onClick={handleDeleteButtonClick}>
          <Typography>
            <RiDeleteBin5Fill color="red" />
          </Typography>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyReviewCard;
