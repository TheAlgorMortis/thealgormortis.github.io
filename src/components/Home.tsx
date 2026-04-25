import "./Bodies.css";
import { RiRobot3Fill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi2";
import { FaFireAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiAcorn } from "react-icons/gi";
import { PiLego } from "react-icons/pi";
import { SiTypescript } from "react-icons/si";
import Carousel from "./Carousel";

/**
 * The home component for the Dylan Reid Personal website.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="sectionHeading">
        <RiRobot3Fill className="bigIcon" />
        Welcome to Dylan Reid's Portfolio Website!
      </h1>
      <div className="bigSectionBlock">
        <div className="splitTwo">
          <div>
            <h2 className="sectionSubHeading">
              <FaFireAlt className="sshIcon" />
              Tomorrow Is My Canvas
            </h2>
            <p>
              I am a passionate creator, whether it be through developing
              software, writing novels, or producing video games. I am
              constantly learning new skills, which I intend to use with my
              out-of-the-box thinking to solve real world problems. I strive to
              create media and tools that will aid or entertain others. I am
              enthusiastic, buoyant, and optimistic, with relentless
              determination and ambition. I am reliable and responsible, and I
              care deeply about others. I aim to work towards a green and
              progressive future.
            </p>
            <h2 className="sectionSubHeading">
              <HiAcademicCap className="sshIcon" />
              Current Endeavours
            </h2>
            <p>
              I am currently studying my Honours in Computer Science at
              Stellenbosch University.
            </p>
          </div>
          <div>
            {/*---------------------------------------------------
             * Carousel
             *--------------------------------------------------*/}
            <Carousel>
              {/* LLL */}
              <div className="borderBox">
                <h2 className="sectionBlockHeading">
                  <PiLego className="achIcon" />
                  LEGO Instructions Animation
                </h2>
                <p>
                  I'm currently working on my honours project, which involves
                  designing and buidling a desktop app that takes PDF LEGO
                  instructions and converts them to live, steppable 3D
                  animations.
                </p>
                <video
                  src="/hoproj/clicks.webm"
                  className="ppHome"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <button
                  className="outerButton"
                  onClick={() =>
                    navigate("/experience/projects_university/LLL")
                  }
                >
                  More details
                </button>
              </div>
              {/* Little Explorers */}
              <div className="borderBox">
                <h2 className="sectionBlockHeading">
                  <SiTypescript className="achIcon" />
                  Official Little Explorers Website
                </h2>
                <p>
                  I built an informational website for Little Explorers
                  Aftercare and Preschool to tell prospective clients everything
                  they need to know about the services the business offers.
                </p>
                <img src="/le/aftercare-new.png" className="ppHome" />
                <div className="flexRow">
                  <a
                    className="outerButton"
                    href="https://littleexplorers.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check out the website
                  </a>
                  <button
                    className="outerButton"
                    onClick={() =>
                      navigate("/experience/projects_personal/le-site")
                    }
                  >
                    More details
                  </button>
                </div>
              </div>
              {/* Head demi */}
              <div className="borderBox">
                <h2 className="sectionBlockHeading">
                  <HiAcademicCap className="achIcon" />
                  CS144 Head Project Demi
                </h2>
                <p>
                  I was appointed as the head project demi for CS 144, the
                  first-year second-semester module for Computer Science
                  students at Stellenbosch University. I was tasked with writing
                  a LaTeX specification, a reference implementation, and a test
                  case suite. In the second half of 2026, I will be responsible
                  for answering questions and marking projects.
                </p>
                <button
                  className="outerButton"
                  onClick={() => navigate("/experience/jobs/demi_project")}
                >
                  More details
                </button>
                <h2 className="sectionBlockHeading">
                  <HiAcademicCap className="achIcon" />
                  Machine Learning TA
                </h2>
                <p>
                  I am currently a teaching assistant for a Machine Learning
                  module, where I help students with assignments and invigilate
                  assignment tests and exams.
                </p>
              </div>
              {/* Hackathon winner */}
              <div className="borderBox">
                <h2 className="sectionBlockHeading">
                  <GiAcorn className="achIcon" />
                  Hackathon Winner
                </h2>
                <img src="/maroonut/reviews.png" className="ppHome" />
                <p>
                  In 2025, Dylan Swarts and I won the Stellenbosch University
                  Developer Society Hackathon by developing a full-stack student
                  information system called "Maroonut."
                </p>
                <button
                  className="outerButton"
                  onClick={() =>
                    navigate("/experience/hackathons/suds-hackathon")
                  }
                >
                  More details
                </button>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
