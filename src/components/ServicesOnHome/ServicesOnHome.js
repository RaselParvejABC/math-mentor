import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { Button, Typography } from "@material-tailwind/react";
import ServiceCard from "../ServiceCard/ServiceCard";

const ServicesOnHome = () => {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setError(null);
    setLoading(true);
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
              limit: 3,
            }),
          }
        );
        if (!response.ok) {
          throw new Error();
        }
        const responseBody = await response.json();
        setServices(responseBody);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Typography variant="h4" color="blue" className="text-center">
        Please, Reload the Page.
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

  if (!services) {
    return (
      <Typography variant="h4" color="blue" className="text-center">
        No Services
      </Typography>
    );
  }

  return (
    <section className="container mx-auto my-20 text-gray-700 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Services</h3>
        <p className="mb-6 pb-2 md:mb-12">My Mentorship Services</p>
      </div>

      <div className="px-6 grid md:grid-cols-3 gap-12 text-center">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            getDescriptionComponent={getDescriptionComponent}
          />
        ))}
      </div>
      <div className="text-center mt-10">
        <Button size="lg">
          <Link to="/services">See All Services</Link>
        </Button>
      </div>
    </section>
  );
};

export default ServicesOnHome;
