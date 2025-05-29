
import React from "react";
import { ReactNode } from "react";

interface FooterProps {
  annio?: number;
  children?: ReactNode;
}

const Footer: React.FC<FooterProps> = ({
  annio = new Date().getFullYear(),
  children = "Ferretería Guzmán",
}) => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">
            &copy; {annio} <a href="#">{children}</a>
          </div>
          <div>
            <a href="#">Privacy Policy</a> &middot;{" "}
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
