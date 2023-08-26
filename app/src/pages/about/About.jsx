import React from "react";
import Footer2 from "../../components/footer/Footer2";
import "../../styles/about/about.css";

function About() {
  const teamMembers = [
    {
      name: "Holland Blumer",
      imageSrc: "../assets/images/hollandprofile.jpg",
      description:
        "John is a frontend developer with a passion for sustainability.",
    },
    {
      name: "Jane Smith",
      imageSrc: "path_to_image/jane.jpg",
      description:
        "Jane is a backend developer who loves creating eco-friendly solutions.",
    },
    // Add more team members here
  ];

  return (
    <div className="about-page">
      <div className="about">
        Divot is a website for people to help their favorite brand become more
        sustainable and track their progress.
      </div>

      <div className="meet-team">
        <p>Meet the Team</p>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="profile-image">
                <img src={member.imageSrc} alt={member.name} />
              </div>
              <div className="member-description">
                <h3>{member.name}</h3>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default About;
