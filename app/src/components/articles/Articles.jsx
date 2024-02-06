import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/articles/articles.css";
import FeaturedProject2 from "../../assets/images/featured-project-2.png";
import FeaturedProject3 from "../../assets/images/featured-project-3.png";
import FeaturedProject4 from "../../assets/images/featured-project-4.png";
import FeaturedProject5 from "../../assets/images/featured-project-5.png";
import FeaturedProject6 from "../../assets/images/featured-project-6.png";
import SuggestionSupporterBrand from "../follower/SuggestionSupporterBrand";
import BrandAvatar from "./BrandAvatar";
import InfoIcon from "../../assets/images/projects-info-icon.svg";
import PurpleBackground from "../../assets/images/protect-energy.png";
import GreyBackground from "../../assets/images/grey-background-2.png";
import LightningBolt from "../../assets/images/lightning-bolt.svg";
import Utensils from "../../assets/images/utensils.svg";
import Water from "../../assets/images/recycle-water.svg";
import QuestionIcon from "../../assets/images/question-icon.svg";
import MothersKitchen from "../../assets/images/motherskitchen.jpg";

function Articles({ showPopup }) {
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
  const backgroundColors = [
    {
      color: "linear-gradient(130deg, #F39C12 0%, #e12318 100%)",
      svg: `${LightningBolt}`,
    },
    {
      color: "#D2AAE0",
      svg: `${Utensils}`,
    },

    {
      color: "#A4B0BE",
      svg: `${Water}`,
    },
    {
      color: "#EB6039",
      svg: `${LightningBolt}`,
    },
    // Add more backgrounds as needed
  ];

  const cardsData = [
    {
      title: "Decrease the Energy Usage",

      brandName: "divot",

      imageUrl: MothersKitchen,
    },
    {
      title: "Switch Utensils",

      brandName: "examplecoffeeshop",
      imageUrl:
        "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/06/ND46979-Roy-Mangersnes-1536x864.jpg.webp",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Save Water",
      brandName: "examplerestaurant",

      imageUrl:
        "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2022/10/Untitled-1024-%C3%97-768px-4.jpg.webp",
      linkUrl:
        "https://www.nytimes.com/interactive/2023/12/24/climate/groundwater-crisis-chicken-cheese.html",
    },
    {
      title: "Card 4",

      brandName: "examplecoffeebrand",
      imageUrl: FeaturedProject6,
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
          <h3>
            {" "}
            <i>Featured Projects</i>{" "}
            <img className="question-icon" src={QuestionIcon} />
          </h3>
        </div>
      </div>
      <Row>
        {slicedCardsData.map((card, index) => (
          <Col key={index} className="mb-4">
            <a href={card.linkUrl} target="_blank" rel="noopener noreferrer">
              <Card
                className={`h-100 shadow-sm border-light rounded position-relative ${
                  showPopup ? "card-visible" : "card-transition"
                }`}
              >
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${card.imageUrl})`,
                    /* background:
                      index < backgroundColors.length
                        ? backgroundColors[index].color
                        : "linear-gradient(130deg, #F39C12 0%, #e12318 100%)", */
                  }}
                >
                  {/*   {backgroundColors[index] && (
                    <img
                      className="overlay-svg"
                      src={backgroundColors[index].svg}
                      alt="overlay"
                    />
                  )} */}
                </div>

                <Card.Body className="p-3 mt-auto">
                  <Card.Title className="text-white">{card.title}</Card.Title>
                  <Card.Text className="text-white">
                    @{card.brandName}
                    {/* <BrandAvatar username={card.brandName} /> */}
                  </Card.Text>
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
            className="home-arrow-space clickable-icon initial-scale"
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
