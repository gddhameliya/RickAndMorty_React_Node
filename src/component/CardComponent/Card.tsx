import React from "react";
import styles from "./Card.module.scss";
import { Location, Origin } from "../../types/App";

const Card = ({
  image,
  name,
  status,
  species,
  gender,
  location,
  origin,
}: {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: Location;
  origin: Origin;
}) => {
  return (
    <div className={styles.bg} data-testid="character">
      <div className={styles.flex}>
        <section className={styles.box}>
          <div className={styles.imgWrapper}>
            <img src={image} className={styles.img} alt="img" />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.section}>
              <a href="/">
                <h2>{name}</h2>
              </a>
              <span className={styles.status}>
                <span>
                  {status === "Alive" ? (
                    <span className={styles.statusIconGreen}></span>
                  ) : (
                    <span className={styles.statusIconRed}></span>
                  )}
                  {status} - {species}
                </span>
                <span className={styles.gender}>{gender}</span>
              </span>
            </div>
            <div className={styles.section}>
              <span className={styles.txtGray}>Last known location:</span>
              <a href={location.url}>{location.name}</a>
            </div>
            <div className={styles.section}>
              <span className={styles.txtGray}>First seen in:</span>
              <a href={origin.url}>{origin.name}</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Card;
