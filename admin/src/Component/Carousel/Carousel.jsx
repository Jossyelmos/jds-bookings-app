import React, { useEffect, useState } from 'react';
import './carousel.scss';

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevState => {
                if (prevState === data.length - 1) {
                    return prevState = 0;
                } else {
                    return prevState + 1;
                }
            })

            return () => {
                clearInterval(interval);
            }
        }, 5000);
    }, []);
  return (
    <div className='carousel-wrapper'>
        <img src={data[currentIndex]} alt="" />
    </div>
  )
}

export default Carousel;