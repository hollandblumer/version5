import Footer2 from "../../components/footer/Footer2";
import "../../styles/about/about.css";
import hollandProfileImage from "../../assets/images/hollandprofile.jpg";
import YinYang from "../../assets/images/yin-yang.png";
import GradientHexagon from "../../assets/images/header-blob-2.svg";
import { Avatar } from "@mui/material";
import Earth from "../../assets/images/green-earth.png";

function About() {
  const teamMembers = [
    {
      name: "Holland Blumer",
      title: " /  Founder & CEO",
      imageSrc: hollandProfileImage,
      description:
        "With two engineering degrees from Northwestern University (B.S.) and Dartmouth College (M.Eng), as well as experience in Silicon Valley and the automotive sector, Holland has a thorough understanding of the rapidly evolving technology industry and will leverage technology to enhance global communication, sustainability, and accessibility efforts.",
    },

    // Add more team members here
  ];

  return (
    <div className="about-page">
      <div className="about">
        <div className="about-page-blurb">
          <div className="welcome-about">
            <i>About</i>
            {/*  <div className="yin-yang-container">
              <img src={YinYang} className="yin-yang" alt="YinYang" />
            </div> */}
            {/* 💬 */}
          </div>
          <p>
            Divot is on a mission to improve communication efforts between
            brands and consumers for the sake of the planet{" "}
            <img src={Earth} className="earth" /> In other words, it's a website
            for people to help their favorite brands become more eco-friendly
            and track their progress.
          </p>
        </div>{" "}
        <div className="team-title" style={{ marginTop: "4rem" }}>
          <i>Meet the Founder</i>
        </div>
        {/*   <div className="info-avatar-wrapper-about">
          <img
            src={GradientHexagon}
            className="hexagon-gradient-about"
            style={{ opacity: 0.9 }}
          />

          <div className="avatar-background">
            <Avatar
              src={hollandProfileImage}
              sx={{ height: "430px", width: "430px" }}
              style={{}}
            />
          </div>
        </div> */}
        {/*         <div className="about-icons">
          <div
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            <div className="info-avatar-wrapper">
              <img
                src={GradientHexagon}
                className="hexagon-gradient-about"
                style={{ opacity: 0.9 }}
              />

              <div className="avatar-background">
                <Avatar
                  src={hollandProfileImage}
                  sx={{ height: "107px", width: "107px" }}
                  style={{}}
                />
              </div>
            </div>
            Holland
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div className="info-avatar-wrapper">
              <img
                src={GradientHexagon}
                className="hexagon-gradient-about"
                style={{ opacity: 0.9 }}
              />
              <div className="avatar-background">
                <Avatar
                  src={hollandProfileImage}
                  sx={{ height: "107px", width: "107px" }}
                  style={{}}
                />
              </div>
            </div>
            Valentina
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div className="info-avatar-wrapper">
              <img
                src={GradientHexagon}
                className="hexagon-gradient-about"
                style={{ opacity: 0.9 }}
              />

              <div className="avatar-background">
                <Avatar
                  src={hollandProfileImage}
                  sx={{ height: "107px", width: "107px" }}
                  style={{}}
                />
              </div>
            </div>
            Boris
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div className="info-avatar-wrapper">
              <img
                src={GradientHexagon}
                className="hexagon-gradient-about"
                style={{ opacity: 0.9 }}
              />

              <div className="avatar-background">
                <Avatar
                  src={hollandProfileImage}
                  sx={{ height: "107px", width: "107px" }}
                  style={{}}
                />
              </div>
            </div>
            Everette
          </div>
        </div> */}
        <div className="meet-team">
          {" "}
          {/*  <div className="meet-team-buttons">
          <div className="meet-team-button">
            <img
              src={hollandProfileImage}
              className="member-button"
              alt="Holland Blumer"
            />
            Holland
          </div>
          <div className="meet-team-button">
            <img
              src={hollandProfileImage}
              className="member-button"
              alt="Holland Blumer"
            />
            Valentina
          </div>
          <div className="meet-team-button">
            <img
              src={hollandProfileImage}
              className="member-button"
              alt="Holland Blumer"
            />
            Everett
          </div>
          <div className="meet-team-button">
            <img
              src={hollandProfileImage}
              className="member-button"
              alt="Holland Blumer"
            />
            Boris
          </div>
        </div> */}
        </div>
        <div className="members-container">
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <div className="profile-image">
                  <img src={member.imageSrc} alt={member.name} />
                </div>
                <div className="member-description">
                  <div className="member-name-title">
                    {" "}
                    <div className="member-name">{member.name}</div>
                    <div className="member-title">{member.title}</div>
                  </div>

                  {member.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default About;
