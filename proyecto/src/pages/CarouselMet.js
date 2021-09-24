import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import imABP from '../Images/PBL.png';
import imFC from '../Images/Flipped.png';
import imTBL from '../Images/TBL.png';

const items = [
  {
    src: imABP,
    altText: 'Slide 1',
    caption: 'Metodología Basada en Proyectos',
  },
  {
    src: imFC,
    altText: 'Slide 2',
    caption: 'Aula Invertida'
  },
  {
    src: imTBL,
    altText: 'Slide 3',
    caption: 'Metodología Basada en el Pensamiento'
  }
];

const CarouselMet = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width="75%"/>
        <CarouselCaption captionHeader={item.caption}/>
      </CarouselItem>
    );
  });


  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
      {slides}
      <CarouselControl direction="prev" directionText="Anterior" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Siguiente" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselMet;