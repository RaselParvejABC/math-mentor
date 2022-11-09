import React from "react";
import { useLoaderData } from "react-router-dom";
import ServiceReviewSection from "../ServiceReviewSection/ServiceReviewSection";
import ServiceCard from "../ServiceCard/ServiceCard";

export async function loader({ params }) {
  const service = await loadService(params.id);
  const reviews = await loadReviews(params.id);

  return { service, reviews };
}

const loadService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/service/${id}`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();
  return responseBody;
};

const loadReviews = async (serviceID) => {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/service/${serviceID}/reviews`,
    {
      method: "GET",
    }
  );
  const responseBody = await response.json();
  return responseBody;
};

const Service = () => {
  const { service } = useLoaderData();

  return (
    <section className="container mx-auto text-center my-8">
      <h1 className="text-3xl font-bold">{service.title}</h1>
      <section className="grid lg:grid-cols-2 gap-10 m-12">
        <ServiceCard service={service} bigCard />
        <ServiceReviewSection />
      </section>
    </section>
  );
};

export default Service;
