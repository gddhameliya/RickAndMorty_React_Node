import React from "react";
import { render, screen } from "@testing-library/react";
import CardComponent from "../component/CardComponent/Card";

test("renders card component correctly", () => {
  const data = {
    image: "image-url",
    name: "John Doe",
    status: "Alive",
    species: "Human",
    gender: "Male",
    location: { url: "location-url", name: "Earth" },
    origin: { url: "origin-url", name: "Mars" },
  };

  render(
    <CardComponent
      image={data.image}
      name={data.name}
      status={data.status}
      gender={data.gender}
      species={data.species}
      location={data.location}
      origin={data.origin}
    />
  );

  const name = screen.getByText(data.name);
  const string = `${data.status} - ${data.species}`;
  const status = screen.getByText(string);
  const gender = screen.getByText(data.gender);
  const locationName = screen.getByText(data.location.name);
  const originName = screen.getByText(data.origin.name);

  expect(name).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(gender).toBeInTheDocument();
  expect(locationName).toBeInTheDocument();
  expect(originName).toBeInTheDocument();
});
