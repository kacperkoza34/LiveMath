import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AboutDashboard.module.scss";
import { connect } from "react-redux";
import AboutMathJax from "../Articles/AboutMathJax/AboutMathJax";
import AboutOpenTask from "../Articles/AboutOpenTask/AboutOpenTask";
import AboutCloseTask from "../Articles/AboutCloseTask/AboutCloseTask";
import AboutBooleanTask from "../Articles/AboutBooleanTask/AboutBooleanTask";
import Aside from "../../layout/Aside/Aside";

const menuConfig = [
  { allowStudents: true, component: AboutMathJax, title: "MathJax" },
  { allowStudents: true, component: AboutOpenTask, title: "Zadania otwarte" },
  {
    allowStudents: false,
    component: AboutCloseTask,
    title: "Zadania zamknięte",
  },
  {
    allowStudents: false,
    component: AboutBooleanTask,
    title: "Zadanie prawda fałsz",
  },
  { allowStudents: false, component: AboutMathJax, title: "MathJax" },
];

const AboutDashboard = ({ accountType, match }) => {
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setActivePage(match.params.page - 1);
  }, []);

  const renderArticle = (block, index) => {
    if (typeof block.component !== "undefined") {
      return React.createElement(block.component, {
        key: index,
      });
    }
    return React.createElement(() => <div>Coś jest nie tak :( </div>, {
      key: index,
    });
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <Aside>
            <h4>Tematy</h4>
            {
              <ul>
                {menuConfig.map(({ allowStudents, title }, index) => (
                  <>
                    {accountType === "student" ? (
                      <>
                        {allowStudents && (
                          <li
                            keu={index}
                            className={
                              activePage === index
                                ? styles.btnListActive
                                : styles.btnList
                            }
                            onClick={() => setActivePage(index)}
                          >
                            {title}
                          </li>
                        )}
                      </>
                    ) : (
                      <li
                        keu={index}
                        className={
                          activePage === index
                            ? styles.btnListActive
                            : styles.btnList
                        }
                        onClick={() => setActivePage(index)}
                      >
                        {title}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            }
          </Aside>
          <div className={styles.contentWrapper}>
            {renderArticle(menuConfig[activePage], activePage)}
          </div>
        </div>
      </div>
    </div>
  );
};

AboutDashboard.propTypes = {
  accountType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accountType: state.user.data.accountType,
});

export default connect(mapStateToProps)(AboutDashboard);
