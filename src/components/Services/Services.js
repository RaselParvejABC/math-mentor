import React, { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { Typography } from "@material-tailwind/react";
import ServiceCard from "../ServiceCard/ServiceCard";
import usePagination from "paginact";
import { useLoaderData } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import useDocumentTitle from "../../custom-hooks/useDocumentTitle";

export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/services/count`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();
  return responseBody;
}

const Services = () => {
  useDocumentTitle("Services");
  const totalNumberOfItems = useLoaderData();
  const {
    itemsPerPage,
    numberOfPages,
    currentPageIndex,
    setCurrentPageIndex,
    offset,
  } = usePagination(totalNumberOfItems, 6);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getDescriptionComponent = (description) => {
    let modifiedDescription = description;
    if (modifiedDescription.length > 97) {
      modifiedDescription = modifiedDescription.substring(0, 97);
      modifiedDescription += "...";
    }
    return (
      <Typography className="text-left" variant="paragraph">
        {modifiedDescription}
      </Typography>
    );
  };

  useEffect(() => {
    if (!currentPageIndex && !offset) {
      return;
    }
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MathMentorServer}/services`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              limit: itemsPerPage,
              offset: offset,
            }),
          }
        );
        const responseBody = await response.json();
        setServices(responseBody);
      } catch (err) {
        setError("Cannot Load Data. Please, reload the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemsPerPage, offset, currentPageIndex]);

  if (error) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <Typography>{error}</Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <SpinnerDotted size="70" />
      </div>
    );
  }

  return (
    <section className="container mx-auto my-20 text-gray-700 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">All Services</h3>
        <p className="mb-6 pb-2">My Mentorship Services</p>
      </div>

      <Pagination
        currentPageIndex={currentPageIndex}
        numberOfPages={numberOfPages}
        onChangeCurrentPage={(newPageIndex) =>
          setCurrentPageIndex(newPageIndex)
        }
      />

      <div className="px-6 grid md:grid-cols-3 gap-12 text-center">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            getDescriptionComponent={getDescriptionComponent}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
