import { React, useState } from "react";
import "../../styles/articles/articles.css";
import {
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

function Articles() {
  const [showFood, setShowFood] = useState(false);
  const [showBeauty, setShowBeauty] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Recommendation</Popover.Header>
      <Popover.Body>
        Add <strong>lemon</strong>
      </Popover.Body>
    </Popover>
  );

  const popovertop = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Recommendation</Popover.Header>
      <Popover.Body>
        Serve with <strong>couscous</strong>
      </Popover.Body>
    </Popover>
  );

  const popoverend = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Recommendation</Popover.Header>
      <Popover.Body>
        <li>
          {" "}
          <b>1 cup </b> fresh squeezed orange juice{" "}
        </li>{" "}
        <li>
          {" "}
          <b>Handful </b>of baby spinach{" "}
        </li>
        <li> Frozen pineapple </li>
        <li> Frozen peaches </li>
        <li>
          {" "}
          <b>2 cups</b> water{" "}
        </li>
      </Popover.Body>
    </Popover>
  );

  const popovertofu = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Recommendation</Popover.Header>
      <Popover.Body>
        Add to everything bagel with tomato, lettuce, and onion
      </Popover.Body>
    </Popover>
  );

  const popoverdates = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Recommendation</Popover.Header>
      <Popover.Body>
        Prefer the medjool dates <strong>with pits</strong>.
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="wellness">
      <div className="projects-title">Recommended Projects</div>
      <Row className="gy-4 ms-3 me-3 justify-content-between">
        <Col className="mb-4">
          <Card
            className="h-100 shadow-sm bg-white border-light rounded img-fluid position-relative"
            style={{
              // Set the background image
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0658/7933/files/slow_motion_goods_cropped_watercolors_480x480.jpg?v=1684701220')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card.Body>
              <Card.Title> 8 Sustainable Gifting Ideas </Card.Title>
              <Card.Text>
                {" "}
                by <b>Madi Apparel</b>{" "}
              </Card.Text>

              <form
                target="_blank"
                className="form-button"
                action="https://www.listennotes.com/podcasts/apple-news-in/a-guide-to-smarter-more-UozlmOBHcsy/"
              >
                {/*   <button className="article-button align-self-end read-more">
                  <Card.Footer type="submit" className="mx-auto read-button">
                    Read
                  </Card.Footer>
                </button> */}
              </form>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card
            className="h-100 shadow-sm bg-white rounded border-light img-fluid"
            style={{
              // Set the background image
              backgroundImage: `url(https://www.colorado.edu/health/sites/default/files/styles/hero/public/block/adobestock_473806696_crop.jpg?itok=tcdPgqdv)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card.Body>
              <Card.Title>6 tips for coping with climate...</Card.Title>
              <Card.Text>
                by <b>University of Colorado Boulder</b>
              </Card.Text>

              <form
                target="_blank"
                className="form-button"
                action="https://www.colorado.edu/health/blog/climate-anxiety"
              >
                {/*   <button className="article-button align-self-end read-more">
                  <Card.Footer type="submit" className="mx-auto read-button">
                    Read
                  </Card.Footer>
                </button> */}
              </form>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-4">
          <Card
            className="h-100 shadow-sm bg-white rounded img-fluid"
            style={{
              // Set the background image
              backgroundImage: `url(https://hbr.org/resources/images/article_assets/2019/06/R1904J_MILLER_B.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card.Body>
              <Card.Title> The Elusive Green Consumer</Card.Title>
              <Card.Text>
                {" "}
                by <b>Katherine White et. al</b>{" "}
              </Card.Text>

              <form
                target="_blank"
                className="form-button"
                action="https://www.veggiessavetheday.com/pineapple-green-smoothie/"
              >
                {/*   <button className="article-button align-self-end read-more ">
                  <Card.Footer type="submit" className="mx-auto read-button">
                    Read
                  </Card.Footer>
                </button> */}
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="dot-row">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Articles;
