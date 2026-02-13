import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import profilePic from "../assets/profile.jpeg";
import { useMatch, useNavigate } from "react-router-dom";

/* icons */
import { GiHamburgerMenu } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi2";
import { LuKeyboard } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { FaFileDownload, FaGithub, FaBook, FaCode } from "react-icons/fa";
import { FaLinkedin, FaXmark } from "react-icons/fa6";
import { GrActions } from "react-icons/gr";

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

  useLockBodyScroll(mobileMenuOpen);
  useCloseOnEscape(mobileMenuOpen, () => setMobileMenuOpen(false));

  const closeMobileMenu = () => setMobileMenuOpen(false);

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

  return (
    <header className="header">
      {/* Desktop */}
      <div className="desktopHeader">
        <ProfilePic />
        <ProfileArea />
        <NavArea onNavigate={undefined} />
        <UserArea />
      </div>

      {/* Mobile taskbar */}
      <div className="mobileHeader">
        <div className="mobileTaskbar">
          <ProfilePic />
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
function ProfilePic() {
  return (
    <div className="userArea">
      <img src={profilePic} className="profilePic" alt="Profile" />
    </div>
  );
}

/**
 * The navigation area for the header
 */
function NavArea({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  const isHome = !!useMatch("/home");
  const isEducation = !!useMatch("/education");
  const isSkills = !!useMatch("/skills/*");

  const homeStyle = isHome ? "navSelected" : "navButton";
  const educationStyle = isEducation ? "navSelected" : "navButton";
  const skillsStyle = isSkills ? "navSelected" : "navButton";

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
        <button className={educationStyle} onClick={() => go("/education")}>
          <HiAcademicCap /> Education
        </button>
        <button className={skillsStyle} onClick={() => go("/skills")}>
          <LuKeyboard /> Skills/Experience
        </button>
      </nav>

      <nav className="nav">
        <a className="navLink" href="./CV.pdf" download="CV-Dylan-Reid">
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
        <a
          className="navLink"
          href="https://ddylanrreid.wixsite.com/my-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaBook />
          My Writing
        </a>
      </nav>
    </div>
  );
}

/**
 * The user area of the header.
 */
function UserArea() {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light"),
  );

  return (
    <div className="userArea">
      <button
        className="userButton"
        aria-pressed={isLight}
        title="Toggle light/dark mode"
        onClick={() => {
          document.documentElement.classList.toggle("light");
          setIsLight(document.documentElement.classList.contains("light"));
        }}
      >
        <GrActions /> {isLight ? "Light" : "Dark"}
      </button>
    </div>
  );
}
