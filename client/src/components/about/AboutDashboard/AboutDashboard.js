import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./AboutDashboard.module.scss";
import { connect } from "react-redux";
import AboutMathJax from "../Articles/AboutMathJax/AboutMathJax";
import DummArticles from "../Articles/DummArticles/DummArticles";
import VideoArticle from "../Articles/VideoArticle/VideoArticle";
import Aside from "../../layout/Aside/Aside";

import { aboutOpenTask } from "../../../data/AboutOpenTask";
import { aboutCloseTask } from "../../../data/AboutCloseTask";
import { aboutBooleanTask } from "../../../data/AboutBooleanTask";

import { newOpenTask } from "../../../data/NewOpenTask";
import { newCloseTask } from "../../../data/NewCloseTask";
import { newBooleanTask } from "../../../data/NewBooleanTask";
import { aboutClass } from "../../../data/AboutClass";
import { addTask } from "../../../data/AddTask";

const menuConfig = [
  {
    allowStudents: true,
    component: AboutMathJax,
    title: "MathJax",
  },
  {
    allowStudents: true,
    component: DummArticles,
    description: aboutOpenTask,
    title: "Zadanie otwarte",
  },
  {
    allowStudents: true,
    component: DummArticles,
    description: aboutCloseTask,
    title: "Zadanie zamknięte",
  },
  {
    allowStudents: true,
    component: DummArticles,
    description: aboutBooleanTask,
    title: "Zadanie prawda fałsz",
  },
  {
    allowStudents: false,
    component: VideoArticle,
    description: newOpenTask,
    title: "Nowe zadanie otwarte",
  },
  {
    allowStudents: false,
    component: VideoArticle,
    description: newCloseTask,
    title: "Nowe zadanie zamknięte",
  },
  {
    allowStudents: false,
    component: VideoArticle,
    description: newBooleanTask,
    title: "Nowe zadanie prawda fałsz",
  },
  {
    allowStudents: false,
    component: VideoArticle,
    description: aboutClass,
    title: "Klasa",
  },
  {
    allowStudents: false,
    component: VideoArticle,
    description: addTask,
    title: "Dodawanie zadań",
  },
];

const AboutDashboard = ({ accountType, match }) => {
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    setActivePage(match.params.page - 1);
  }, []);

  const renderArticle = (block, index, props) => {
    if (typeof block.component !== "undefined") {
      if (block.description) {
        return React.createElement(block.component, {
          key: index,
          description: block.description,
        });
      } else {
        return React.createElement(block.component, {
          key: index,
        });
      }
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
