import React from "react";
import { FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";

function Footer() {


  return (
    <div className="">
      <hr />
      <footer className="footer footer-center p-10 text-base-content rounded dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/posts/satyam-gaikwad-27a7a724b_python-automation-gamedevelopment-activity-7218149338466705408-QmFg?utm_source=share&utm_medium=member_desktop"
            target="_blank"
            className="link link-hover">About Us</a>
          <a href="https://t.me/+NKT8OoynbggwZTk1"
            target="_blank"
            className="link link-hover">Contact</a>
          <a href="/JoinUs" className="link link-hover">Join</a>
          <a href="/SupportUs" className="link link-hover text-tea-400">Support Us</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://t.me/+NKT8OoynbggwZTk1" target="_blank" rel="noopener noreferrer" className="">
              <FaTelegram size={24} />
            </a>
            {/* <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a> */}

            <a href="https://www.linkedin.com/in/satyam-gaikwad-27a7a724b/" target="_blank" rel="noopener noreferrer" className="">
              <FaLinkedin size={24} />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className="">
              <FaInstagram size={24} />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            {/* Created by Satyam Gaikwad
            <br/> */}
            Copyright © {new Date().getFullYear()} - All right reserved

          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;