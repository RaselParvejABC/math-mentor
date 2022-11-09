import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import StarRatingComponent from "react-star-rating-component";

const ServiceCard = ({
  service: { _id, title, image, price, description },
  getDescriptionComponent,
  bigCard,
}) => {
  const [averageRating, setAverageRating] = useState(null);

  useState(() => {
    const fetchAverageRating = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_MathMentorServer}/service/${_id}/rating`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseBody = await response.json();
      setAverageRating(responseBody["average"]);
    };
    fetchAverageRating();
  }, [_id]);

  return (
    <Card className={!bigCard ? "w-96" : null}>
      <CardHeader color="white" className="relative h-56">
        <PhotoProvider
          speed={() => 800}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        >
          <div className="foo">
            <PhotoView src={image}>
              <img src={image} alt="Service" className="h-full w-full" />
            </PhotoView>
          </div>
        </PhotoProvider>
        <img src={image} alt="Service" className="h-full w-full" />
      </CardHeader>
      <CardBody className={`text-center h-min`}>
        {!bigCard && (
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
        )}
        {getDescriptionComponent && getDescriptionComponent(description)}
        {!getDescriptionComponent && <Typography>{description}</Typography>}
      </CardBody>
      <CardFooter divider className="flex flex-col justify-between py-3 h-fit">
        <div className="flex flex-row justify-between items-center">
          <Typography
            className={`${
              bigCard ? "justify-self-center" : null
            } text-xl font-bold`}
          >
            {price}
          </Typography>
          {!bigCard && (
            <Link to={`/service/${_id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          )}
        </div>
        <div className="mt-4 text-left">
          {!averageRating && <Typography>Not Rated Yet</Typography>}
          {averageRating && (
            <StarRatingComponent
              className="text-left text-2xl"
              name="rating"
              value={averageRating}
              editing={false}
              starCount={10}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
