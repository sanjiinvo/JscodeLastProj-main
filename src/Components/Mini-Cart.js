import { Card } from "react-bootstrap";

function MiniCart(props) {
    return (
      <Card style={{ width: '18rem' }}>
        <img className="mini-cart-image" src={props.item.image} />
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          {props.item.price}
        </Card.Body>
      </Card>
    );
  }
  
  export default MiniCart;