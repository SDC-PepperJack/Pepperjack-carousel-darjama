import React from 'react';
import styles from './styles.css';

const CarouselPic = ({ toggleModal, image }) => (
  <div
    role="button"
    aria-label="model open"
    tabIndex="0"
    className={styles.carouselPic}
    id="carouselPic"
    onClick={toggleModal}
    style={{
      backgroundImage: `url(${image})`,
    }}
  />
);

export default CarouselPic;
