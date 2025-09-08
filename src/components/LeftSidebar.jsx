import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/svges/home.svg";
import FeedIcon from "../assets/svges/feed.svg";
import EducationIcon from "../assets/svges/education.svg";
import JobListIcon from "../assets/svges/joblist.svg";
import EventCalendarIcon from "../assets/svges/eventCalendar.svg";
import { FaBriefcase, FaUserTie, FaBuilding } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {!isOpen && (
        <div className="closed-sidebar-content">
          <div className="close-inner-wrapper">
            <div className="links-wrapper d-flex flex-column align-items-center gap-3">
              <Nav.Link as={Link} to="/">
                <div className="inner-link-content  d-flex flex-column align-items-center gap-1">
                  <div className="icon-wrapper">
                    <img src={HomeIcon} alt="" />
                  </div>
                  <div className="name-wrapper">Home</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/feeds">
                <div className="inner-link-content  d-flex flex-column align-items-center gap-1">
                  <div className="icon-wrapper">
                    <img src={FeedIcon} alt="" />
                  </div>
                  <div className="name-wrapper">Feed</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/education">
                <div className="inner-link-content  d-flex flex-column align-items-center gap-1">
                  <div className="icon-wrapper">
                    <img src={EducationIcon} alt="" />
                  </div>
                  <div className="name-wrapper">Education</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/joblist">
                <div className="inner-link-content  d-flex flex-column align-items-center gap-1">
                  <div className="icon-wrapper">
                    <img src={JobListIcon} alt="" />
                  </div>
                  <div className="name-wrapper">Joblist</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/event-calendar">
                <div className="inner-link-content  d-flex flex-column align-items-center gap-1">
                  <div className="icon-wrapper">
                    <img src={EventCalendarIcon} alt="" />
                  </div>
                  <div className="name-wrapper">Event Calendar</div>
                </div>
              </Nav.Link>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="opened sidebar-content">
          <div className="links-wrapper d-flex flex-column ">
            <Nav.Link as={Link} to="/">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <img src={HomeIcon} alt="" />
                </div>
                <div className="name-wrapper">Home</div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/job">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <FaUserTie size={20} />
                </div>
                <div className="name-wrapper">Earn</div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/feeds">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <img src={FeedIcon} alt="" />
                </div>
                <div className="name-wrapper">Feed</div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/education">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <img src={EducationIcon} alt="" />
                </div>
                <div className="name-wrapper">Education</div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/joblist">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <img src={JobListIcon} alt="" />
                </div>
                <div className="name-wrapper">Joblist</div>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/event-calendar">
              <div className="inner-link-content  d-flex align-items-center gap-3">
                <div className="icon-wrapper">
                  <img src={EventCalendarIcon} alt="" />
                </div>
                <div className="name-wrapper">Event Calendar</div>
              </div>
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/login">

            <div className="inner-link-content  d-flex align-items-center gap-3">
              <div className="icon-wrapper">
                <img src={EventCalendarIcon} alt="" />
              </div>
              <div className="name-wrapper">
                Login
              </div>
            </div>
          </Nav.Link>
            <Nav.Link as={Link} to="/register">

            <div className="inner-link-content  d-flex align-items-center gap-3">
              <div className="icon-wrapper">
                <img src={EventCalendarIcon} alt="" />
              </div>
              <div className="name-wrapper">
               Register
              </div>
            </div>
          </Nav.Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
