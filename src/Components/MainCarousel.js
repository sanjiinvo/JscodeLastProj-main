import { Carousel } from "react-bootstrap";
import img1 from '../images/img1carousel.png'
import img2 from '../images/img2carousel.png'
import img3 from '../images/img3carousel.png'
import img4 from '../images/img4carousel.png'

function MainCarousel() {
    return (
      <Carousel className="Carousel">
        <Carousel.Item>
          <img
            className="w100"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w100"
            src={img2}
            alt="Second slide"
          />
  
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="w100"
            src={img3}
            alt="Third slide"
          />
  
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
export default MainCarousel