import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../component/Pagination/Pagination";

test("renders pagination component correctly", () => {
  const currentPage = 1;
  const totalPage = 10;
  const pageNeighbours = 2;
  const onClick = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      pageNeighbours={pageNeighbours}
      onClick={onClick}
    />
  );
  const page1Button = screen.getByText("1");
  const pageDashButton = screen.getByText("...");
  const page10Button = screen.getByText("10");

  expect(page1Button).toBeInTheDocument();
  expect(pageDashButton).toBeInTheDocument();
  expect(page10Button).toBeInTheDocument();
});

test("calls onClick when a page number is clicked", () => {
  const currentPage = 1;
  const totalPage = 10;
  const pageNeighbours = 2;
  const onClick = jest.fn();

  render(
    <Pagination
      currentPage={currentPage}
      totalPage={totalPage}
      pageNeighbours={pageNeighbours}
      onClick={onClick}
    />
  );
  const page2Button = screen.getByText("2");
  fireEvent.click(page2Button);

  expect(onClick).toHaveBeenCalledWith(2);
});
