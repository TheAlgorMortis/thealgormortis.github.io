import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import profilePic from "../assets/profile.jpeg";
import { useMatch, useNavigate } from "react-router-dom";

/* icons */
import { FaPhone } from "react-icons/fa";
import { GiHamburgerMenu, GiSkills } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi2";
import { LuKeyboard } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { FaFileDownload, FaGithub, FaCode } from "react-icons/fa";
import { FaLinkedin, FaXmark } from "react-icons/fa6";

/* Styles */
import "./Header.css";
import "./Bodies.css";

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useCloseOnEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}

/**
 * The header for the website
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(mobileMenuOpen || profileModalOpen);
  useCloseOnEscape(mobileMenuOpen, () => setMobileMenuOpen(false));
  useCloseOnEscape(profileModalOpen, () => setProfileModalOpen(false));

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const updateHeaderHeight = () => {
      root.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeProfileModal = () => setProfileModalOpen(false);

  // Render the mobile overlay into document.body to avoid z-index / stacking-context issues.
  const mobileMenu = mobileMenuOpen
    ? createPortal(
        <div
          className="headerMobileOverlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeMobileMenu();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="headerMobileSheet"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="headerMobileTopBar">
              <div className="headerMobileTopTitle">Menu</div>
              <button
                className="headerMobileClose"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                title="Close menu"
              >
                <FaXmark />
              </button>
            </div>

            <div className="headerMobileMenu">
              <NavArea onNavigate={closeMobileMenu} />
              <UserArea />
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  const profileModal = profileModalOpen
    ? createPortal(
        <div
          className="profileModalOverlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeProfileModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Profile picture"
        >
          <div
            className="profileModalContent"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="profileModalClose"
              onClick={closeProfileModal}
              aria-label="Close profile picture"
              title="Close"
              type="button"
            >
              <FaXmark />
            </button>
            <img
              src={profilePic}
              className="profileModalImage"
              alt="Dylan Reid profile"
            />
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <header ref={headerRef} className="header">
      {/* Desktop */}
      <div className="desktopHeader">
        <ProfilePic onOpen={() => setProfileModalOpen(true)} />
        <ProfileArea />
        <NavArea onNavigate={undefined} />
        <UserArea />
      </div>

      {/* Mobile taskbar */}
      <div className="mobileHeader">
        <div className="mobileTaskbar">
          <ProfilePic onOpen={() => setProfileModalOpen(true)} />
          <ProfileArea />
          <button
            className="burger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            title="Open menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {mobileMenu}
      {profileModal}
    </header>
  );
}

/**
 * component showing profile information
 */
function ProfileArea() {
  return (
    <div className="headerInfo">
      <h1 className="infoCaption">Dylan James Reid</h1>
      <h3 className="infoCaptionSub">
        <FaCode />
        Software Engineer
      </h3>
    </div>
  );
}

/**
 * component showing profile picture
 */
function ProfilePic({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="userArea">
      <button
        className="profilePicButton"
        onClick={onOpen}
        aria-label="Open profile picture"
        title="Open profile picture"
        type="button"
      >
        <img src={profilePic} className="profilePic" alt="Profile" />
      </button>
    </div>
  );
}

/**
 * The navigation area for the header
 */
function NavArea({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  const isHome = !!useMatch("/home");
  const isEducation = !!useMatch("/education/*");
  const isSkills = !!useMatch("/skills/*");
  const isExperience = !!useMatch("/experience/*");
  const isContact = !!useMatch("/contact");

  const homeStyle = isHome ? "navSelected" : "navButton";
  const educationStyle = isEducation ? "navSelected" : "navButton";
  const skillsStyle = isSkills ? "navSelected" : "navButton";
  const experienceStyle = isExperience ? "navSelected" : "navButton";
  const contactStyle = isContact ? "navSelected" : "navButton";

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <div className="navGroup">
      <nav className="nav">
        <button className={homeStyle} onClick={() => go("/home")}>
          <IoIosHome /> Home
        </button>
        <button className={educationStyle} onClick={() => go("/education/uni")}>
          <HiAcademicCap /> Education
        </button>
        <button className={skillsStyle} onClick={() => go("/skills/languages")}>
          <GiSkills /> Skills
        </button>
        <button
          className={experienceStyle}
          onClick={() => go("/experience/teaching_assistant")}
        >
          <LuKeyboard /> Experience
        </button>
        <button className={contactStyle} onClick={() => go("/contact")}>
          <FaPhone /> Contact
        </button>
      </nav>

      <nav className="nav">
        <a
          className="navLink"
          href="/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFileDownload />
          CV
        </a>
        <a
          className="navLink"
          href="https://github.com/TheAlgorMortis"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Github
        </a>
        <a
          className="navLink"
          href="https://www.linkedin.com/in/dylan-james-reid/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          Linkedin
        </a>
      </nav>
    </div>
  );
}

/**
 * The user area of the header.
 */
function UserArea() {
  // TODO: Readd
  return <></>;

  /* return ( */
  /*   <div className="userArea"> */
  /*     <button */
  /*       className="userButton" */
  /*       aria-pressed={isLight} */
  /*       title="Toggle light/dark mode" */
  /*       onClick={() => { */
  /*         document.documentElement.classList.toggle("light"); */
  /*         setIsLight(document.documentElement.classList.contains("light")); */
  /*       }} */
  /*     > */
  /*       <GrActions /> {isLight ? "Light" : "Dark"} */
  /*     </button> */
  /*   </div> */
  /* ); */
}
