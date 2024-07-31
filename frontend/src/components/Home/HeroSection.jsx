import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/HeroSection.css';
import c1 from '../../assets/images/c1.jpg'; // Ensure correct file extension
import c2 from '../../assets/images/c2.jpg'; // Ensure correct file extension
import c3 from '../../assets/images/c3.jpg'; // Ensure correct file extension
import c4 from '../../assets/images/c4.jpg'; // Ensure correct file extension
import WordFlick from './WordFlick';

function ContentCarouselSection() {
  return (
    <section className="content-carousel-section">
   
      <div className="content ">
       
      <div className="container" style={{display:'block' , width: '40rem'}}>
      <h1>Welcome to the Quiz Master</h1>
      <br></br>
      <WordFlick />
    </div>
      </div>
      <div className="carousel-container">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          autoPlay
          infiniteLoop
          interval={3000}
        >
          <div>
            <img src={c1} alt="Slide 1" />
          </div>
          <div>
            <img src={c2} alt="Slide 2" />
          </div>
          <div>
            <img src={c3} alt="Slide 3" />
          </div>
          <div>
            <img src={c4} alt="Slide 4" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default ContentCarouselSection;
