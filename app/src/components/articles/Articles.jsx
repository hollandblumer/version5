import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/articles/articles.css";

function Articles() {
  const getNumCards = () => {
    // Determine the number of cards based on screen width
    const screenWidth = window.innerWidth;
    return screenWidth < 576 ? 2 : 4;
  };

  const [numCards, setNumCards] = useState(getNumCards());
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Update the number of cards when the window is resized
    const handleResize = () => {
      setNumCards(getNumCards());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleArrowClick = (direction) => {
    const numSlides = Math.ceil(cardsData.length / numCards);

    // Update the active slide when the arrow is clicked
    if (direction === "right") {
      setActiveSlide((prevSlide) => (prevSlide + 1) % numSlides);
    } else if (direction === "left") {
      setActiveSlide((prevSlide) => (prevSlide - 1 + numSlides) % numSlides);
    }
  };

  const cardsData = [
    {
      title: "Card 1",
      content: "Content for Card 1",
      imageUrl: "https://example.com/image1.jpg",
      linkUrl: "https://example.com/link1",
    },
    {
      title: "Card 2",
      content: "Content for Card 2",
    },
    {
      title: "Card 3",
      content: "Content for Card 3",
    },
    {
      title: "Card 4",
      content: "Content for Card 4",
    },
    {
      title: "Card 5",
      content: "Content for Card 5",
    },
    {
      title: "Card 6",
      content: "Content for Card 6",
    },
    {
      title: "Card 7",
      content: "Content for Card 7",
    },
    {
      title: "Card 8",
      content: "Content for Card 8",
    },
    {
      title: "Card 9",
      content: "Content for Card 9",
    },
  ];

  const slicedCardsData = cardsData.slice(
    activeSlide * numCards,
    (activeSlide + 1) * numCards
  );

  return (
    <div className="wellness">
      <div className="projects-row">
        <div className="projects-title">
          <h3> Featured Projects</h3>
        </div>
      </div>
      <Row
        className={`gy-4 ms-3 me-3 justify-content-between slides-${numCards}`}
      >
        {slicedCardsData.map((card, index) => (
          <Col key={index} className="mb-4">
            <a href={card.linkUrl} target="_blank" rel="noopener noreferrer">
              <Card>
                {/* Add background image */}
                <Card.Img variant="top" src={card.imageUrl} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.content}</Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>

      <div className="dot-row">
        {activeSlide !== 0 && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="home-arrow-space"
            size="sm"
            color="#afa9a1"
            onClick={() => handleArrowClick("left")}
          />
        )}
        {[...Array(Math.ceil(cardsData.length / numCards))].map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeSlide ? "active" : ""}`}
            onClick={() => handleSlideChange(index)}
          ></div>
        ))}
        {activeSlide !== Math.ceil(cardsData.length / numCards) - 1 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className="home-arrow-space"
            size="sm"
            color="#afa9a1"
            onClick={() => handleArrowClick("right")}
          />
        )}
      </div>
    </div>
  );
}

export default Articles;
