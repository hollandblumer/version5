import Footer2 from "../../components/footer/Footer2";
import "../../styles/about/about.css";
import hollandProfileImage from "../../assets/images/about-me-5.png";
import YinYang from "../../assets/images/yin-yang.png";

function About() {
  const teamMembers = [
    {
      name: "Holland Blumer",
      title: "CEO/Founder",
      imageSrc: hollandProfileImage,
      description:
        "With two engineering degrees from Northwestern University (B.S.) and Dartmouth College (M.Eng), as well as experience in Silicon Valley and the automotive sector, Holland has a thorough understanding of the rapidly evolving technology industry and will leverage technology to enhance global communication, sustainability, and accessibility efforts.",
    },
    {
      name: "Valentina Orozoco",
      title: "Freelance Illustrator",
      imageSrc: hollandProfileImage,
      description:
        "Jane is a backend developer who loves creating eco-friendly solutions.",
    },
    {
      name: "Everett Tung",
      title: "Research Intern",
      imageSrc: hollandProfileImage,
      description:
        "Everett is an incoming junior at Northwestern, double-majoring in Econ and Math. Alongside his education, he has experience in financial case competitions for Houlihan Lokey, Credit Suisse, and EY Parthenon, and previously interned at Hadrian Capital. He is deeply passionate about bridging business operations with the planet's well-being. Outside the classroom, Everett enjoys biking along Lake Michigan, playing Club Volleyball, and cheering on the Lakers.",
    },
    {
      name: "Boris Bashirov",
      title: "Freelance Illustrator",
      imageSrc: hollandProfileImage,
      description:
        "Everett is an incoming junior at Northwestern, double-majoring in Econ and Math. Alongside his education, he has experience in financial case competitions for Houlihan Lokey, Credit Suisse, and EY Parthenon, and previously interned at Hadrian Capital. He is deeply passionate about bridging business operations with the planet's well-being. Outside the classroom, Everett enjoys biking along Lake Michigan, playing Club Volleyball, and cheering on the Lakers.",
    },
    // Add more team members here
  ];

  return (
    <div className="about-page">
      <div className="about">
        <div className="about-page-blurb">
          <div className="welcome-about">
            ABOUT{" "}
            <div className="yin-yang-container">
              <img src={YinYang} className="yin-yang" alt="YinYang" />
            </div>
            💬
          </div>
          Divot is a website for people to help their favorite brands become
          more eco-friendly and track their progress.
        </div>{" "}
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
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    style={{ width: "400px", height: "400px" }}
                  />
                </div>
                <div className="member-description">
                  <div className="member-name-title">
                    {" "}
                    <div className="member-name">{member.name}</div>
                    <div className="member-title">{member.title}</div>
                  </div>

                  <p>{member.description}</p>
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
