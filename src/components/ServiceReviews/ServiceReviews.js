import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import StarRatingComponent from "react-star-rating-component";

const ServiceReviews = () => {
  const { reviews } = useLoaderData();
  return (
    <section className="mt-12 flex flex-col gap-20">
      <Typography variant="h4" color="blue">
        Reviews on this Service
      </Typography>
      {reviews.map((review) => {
        return (
          <Card cla>
            <CardHeader>
              <StarRatingComponent
                className="text-center md:text-left text-2xl"
                name="rating"
                value={review.rating}
                editing={false}
                starCount={10}
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography>{review.reviewText}</Typography>
            </CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-3"
            >
              <Typography variant="small" color="gray" className="flex gap-1">
                {review.displayName}
              </Typography>
              <Avatar src={review.photoURL} alt="avatar" />
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};

export default ServiceReviews;
