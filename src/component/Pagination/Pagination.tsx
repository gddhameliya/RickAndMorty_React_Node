import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  totalPage,
  currentPage,
  pageNeighbours,
  onClick,
}: {
  totalPage: number;
  currentPage: number;
  pageNeighbours: number;
  onClick: (el: number) => void;
}) => {
  const totalNumbers = pageNeighbours * 2 + 1;
  const totalBlocks = totalNumbers + 2;
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";
  const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };
  const fetchPageNumbers = () => {
    if (totalPage > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPage - 1, currentPage + pageNeighbours);
      let pages: (string | number)[] = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPage - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPage];
    } else {
      return range(1, totalPage);
    }
  };

  const numberOfPage = fetchPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onClick(currentPage - 1)}
      >
        &laquo;
      </button>

      {numberOfPage.map((el: string | number, index: number) => {
        if (el === LEFT_PAGE) {
          return (
            <button key={index} onClick={() => onClick(currentPage - 5)}>
              ...
            </button>
          );
        } else if (el === RIGHT_PAGE) {
          return (
            <button key={index} onClick={() => onClick(currentPage + 5)}>
              ...
            </button>
          );
        } else {
          return (
            <button
              key={index}
              className={currentPage === el ? styles.active : ""}
              onClick={() => onClick(el as number)}
            >
              {el}
            </button>
          );
        }
      })}
      <button
        disabled={currentPage === totalPage}
        onClick={() => onClick(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
