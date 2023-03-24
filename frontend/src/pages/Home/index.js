import { useEffect, useState } from "react";
import { updatePageTitle } from "../../helpers";
import { PageTitle } from "../../constants";
import { checkValidTokenApi } from "../../apis/user";
import { getCoursesApi } from "../../apis/course";
import {
  getMyNotRegisteredCoursesApi,
  getMyRegisteredCoursesApi
} from "../../apis/register";
import { toast } from "react-toastify";
import { Banner } from "../../assets";
import Header from "../../components/Header";
import Course from "../../components/Course";
import styles from "./Home.module.css";

function Home() {
  const token = localStorage.getItem("signin_token");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [myRegisteredCourses, setMyRegisteredCourses] = useState([]);
  const [myNotRegisteredCourses, setMyNotRegisteredCourses] = useState([]);

  const loadAllCourses = () => {
    getCoursesApi()
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Courses Failed");
        else setAllCourses(data);
      })
      .catch(() => toast.error("Get Courses Failed"));
  };

  const loadMyRegisteredCourses = () => {
    getMyRegisteredCoursesApi(userId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Registered Courses Failed");
        else setMyRegisteredCourses(data);
      })
      .catch(() => toast.error("Get Registered Courses Failed"));
  };

  const loadMyNotRegisteredCourses = () => {
    getMyNotRegisteredCoursesApi(userId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Other Courses Failed");
        else setMyNotRegisteredCourses(data);
      })
      .catch(() => toast.error("Get Other Courses Failed"));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageTitle(PageTitle.HOME);
  }, []);

  useEffect(() => {
    if (token) {
      const checkValidToken = async () => await checkValidTokenApi(token);
      checkValidToken()
        .then((res) => setIsLoggedIn(res.data.data))
        .catch((err) => toast.error(err.message));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadMyRegisteredCourses();
      loadMyNotRegisteredCourses();
    } else {
      loadAllCourses();
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div className={styles.home}>
      <Header />
      <section className={`container_fluid ${styles.homeBanner}`}>
        <img src={Banner} alt="" />
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>My Courses</h2>
        <div className={styles.row}>
          {myRegisteredCourses.map((course, index) => (
            <Course key={index} course={course} index={index} type="learn" />
          ))}
        </div>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>Other Courses</h2>
        <div className={styles.row}>
          {myNotRegisteredCourses.map((course, index) => (
            <Course key={index} course={course} index={index} />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <div className={styles.home}>
      <Header />
      <section className={`container_fluid ${styles.homeBanner}`}>
        <img src={Banner} alt=""></img>
      </section>
      <section className={`container ${styles.homeSlider}`}>
        <h2>All Courses</h2>
        <div className={styles.row}>
          {allCourses.map((course, index) => (
            <Course key={index} course={course} index={index} type="register" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
