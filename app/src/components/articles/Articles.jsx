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
      imageUrl:
        "https://lh3.googleusercontent.com/p/AF1QipP5yL_4HCJr1le2nwE1Mvcz-j79QzbT2-8EaomH=s1360-w1360-h1020",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 2",
      content: "Content for Card 2",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 3",
      content: "Content for Card 3",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 4",
      content: "Content for Card 4",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 5",
      content: "Content for Card 5",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 6",
      content: "Content for Card 6",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 7",
      content: "Content for Card 7",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 8",
      content: "Content for Card 8",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 9",
      content: "Content for Card 9",
      imageUrl:
        "https://th-thumbnailer.cdn-si-edu.com/O3Dusr-SN-E1cuLzmavjspVhrxQ=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/6a/80/6a8057cd-5459-48f6-bbe9-a60cf978d469/gettyimages-1208881002.jpg",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
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
      <Row>
        {slicedCardsData.map((card, index) => (
          <Col key={index} className="mb-4">
            <a href={card.linkUrl} target="_blank" rel="noopener noreferrer">
              <Card
                className="h-100 shadow-sm bg-white border-light rounded position-relative card-background"
                style={{
                  background: `url("${card.imageUrl}") `,
                }}
              >
                {console.log("Image URL:", slicedCardsData[index].imageUrl)}{" "}
                {/* Add this line for logging */}
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
