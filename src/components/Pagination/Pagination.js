import React from "react";
import { Button } from "@material-tailwind/react";

const Pagination = ({
  numberOfPages,
  currentPageIndex,
  onChangeCurrentPage,
}) => {
  const handleClick = (pageIndex) => {
    if (pageIndex === currentPageIndex) {
      return;
    }
    onChangeCurrentPage(pageIndex);
  };
  return (
    <div className="flex justify-center gap-4 mt-0 mb-8 p-3">
      {Array(numberOfPages)
        .fill(0)
        .map((_, index) => (
          <Button
            className="text-md"
            key={index}
            color="red"
            variant={index + 1 === currentPageIndex ? null : "outlined"}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
};

export default Pagination;
