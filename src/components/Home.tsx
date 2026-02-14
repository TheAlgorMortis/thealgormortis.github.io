import "./Bodies.css";
import { RiRobot3Fill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { FaFireAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiAcorn } from "react-icons/gi";
import { SiTypescript } from "react-icons/si";

/**
 * The home component for the Dylan Reid Personal website.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="sectionHeading">
        <RiRobot3Fill />
        Welcome to Dylan Reid's Personal Website!
      </h1>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          <FaFireAlt />
          Tomorrow Is My Canvas
        </h2>
        <p>
          I am a passionate creator, whether it be through developing software,
          writing novels, or producing video games. I am constantly learning new
          skills, which I intend to use with my out-of-the-box thinking to solve
          real world problems. I strive to create media and tools that will aid
          or entertain others. I am enthusiastic, buoyant, and optimistic, with
          relentless determination and ambition. I am reliable and responsible,
          and I care deeply about others. I aim to work towards a green and
          progressive future.
        </p>
        <h2 className="sectionBlockHeading">
          <HiAcademicCap />
          Current Endeavours
        </h2>
        <p>
          I am currently studying my Honours in Computer Science at Stellenbosch
          Universtiy. Next year, I will be working as a Software Engineer at
          Investec Bank.
        </p>
      </div>
      <h1 className="sectionHeading">
        <FaTrophy />
        Recent Achievements
      </h1>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          <SiTypescript />
          Official Little Explorers Website
        </h2>
        <p>
          I built an informational website for Little Explorers Aftercare and
          Preschool to tell prospective clients everything they need to know
          about the services the business offers.
        </p>
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
              navigate("/skills/experience/projects_personal/le-site")
            }
          >
            More details
          </button>
        </div>
      </div>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          <HiAcademicCap />
          CS144 Head Project Demi
        </h2>
        <p>
          I was appointed as the head project demi for CS 144, the first-year
          second-semester module for Computer Science students at Stellenbosch
          University. I was tasked with writing a LaTeX spec, a reference
          implementation, and a test case and suite. In the second half of 2026,
          I will be responsible for answering questions and marking projects.
        </p>
        <button
          className="outerButton"
          onClick={() => navigate("/skills/experience/jobs/demi_project")}
        >
          More details
        </button>
      </div>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          <GiAcorn />
          Hackathon Winner
        </h2>
        <p>
          In 2025, Dylan Swarts and I won the Stellenbosch University Developer
          Society Hackathon by developing a full-stack student information
          system called "Maroonut."
        </p>
        <button
          className="outerButton"
          onClick={() =>
            navigate("/skills/experience/hackathons/suds-hackathon")
          }
        >
          More details
        </button>
      </div>
    </>
  );
}
