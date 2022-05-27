import Carousel from 'react-bootstrap/Carousel';
import { run as runHolder } from 'holderjs/holder';
import { useEffect } from 'react';

const HomePage = () => {

    useEffect(() => {
    runHolder('d-block');
    });
    
    return (<Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100"
     data-src="holder.js/800x400?theme=lava&text=Your personal phonebook&fg=000000&size=60&font=Helvetica"
      alt="First slide"
    />
    <Carousel.Caption>
      <h5>All contacts in one place!</h5>
      <p>Store all your contacts in this APP.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      data-src="holder.js/800x400?theme=vine&text=Performed by Volodymyr Sokoriev&fg=000000&size=50&font=Helvetica"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h5>Github link below</h5>
      <p><a href='https://github.com/sokorevvvladimir'>https://github.com/sokorevvvladimir</a></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      data-src="holder.js/800x400?theme=sky&text=Have a nice day&fg=000000&size=50&font=Helvetica"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h5>Cheers!</h5>
      <p>&copy;2022</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>)
 }

export default HomePage;