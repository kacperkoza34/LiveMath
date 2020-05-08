import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Aside.module.scss";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Aside = ({ children }) => {
  const [active, setActive] = useState(false);
  const animation = useRef(null);

  const toggle = (active) => {
    const [element] = animation.current.children;

    const list = element.querySelector("#list");
    const angle = element.querySelector("span");
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    if (active)
      tl.to(element, {
        duration: 0.3,
        x: "+=100%",
      }).to(angle, { duration: 0.3, rotate: "+=180dge" }, "-=0.3");
    else
      tl.to(element, {
        duration: 0.3,
        x: "-=100%",
      }).to(angle, { duration: 0.3, rotate: "-=180dge" }, "-=0.3");
  };

  return (
    <div ref={animation} className={styles.root}>
      <div className={styles.asideWrapper}>
        <div id={"list"} className={styles.list}>
          {children}
        </div>
        <div
          onClick={() => {
            toggle(!active);
            setActive(!active);
          }}
          className={styles.control}
        >
          <span>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
      </div>
    </div>
  );
};

Aside.propTypes = {
  children: PropTypes.node,
};

export default Aside;
