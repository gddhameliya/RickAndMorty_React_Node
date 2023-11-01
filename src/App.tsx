import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styles from "./App.module.scss";
import { CardComponent, Pagination } from "./component";
import { character, characterRoot } from "./types/App";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<characterRoot>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();
  const paginationHandler = (page: number) => {
    setCurrentPage(page);
  };

  const getData = (page: number) => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.main}>
      {loading && <div>loading...</div>}
      {error && <div>{error?.message}</div>}
      {data && (
        <div className={styles.cardContainer}>
          {data?.results?.map((item: character) => (
            <CardComponent
              key={item.id}
              image={item.image}
              name={item.name}
              gender={item.gender}
              status={item.status}
              species={item.species}
              location={item.location}
              origin={item.origin}
            />
          ))}
        </div>
      )}
      <div className={styles.paginationContainer}>
        {data && data?.info?.pages > 1 && (
          <Pagination
            totalPage={data?.info?.pages || 0}
            pageNeighbours={2}
            currentPage={currentPage}
            onClick={paginationHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
