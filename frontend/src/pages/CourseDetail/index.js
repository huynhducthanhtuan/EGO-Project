import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseApi } from "../../apis/course";
import { getLessonsByCourseApi } from "../../apis/lesson";
import { getRegisterApi, registerCourseApi } from "../../apis/register";
import { toast } from "react-toastify";
import { IoPricetags } from "react-icons/io5";
import { HiOutlineFilm } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import {
  DefaultLessonImage,
  User1Avatar,
  User2Avatar,
  User3Avatar
} from "../../assets";
import LessonVideo from "../../components/Lesson/LessonVideo";
import Header from "../../components/Header";
import styles from "./CourseDetail.module.css";

const CourseDetail = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [register, setRegister] = useState(false);
  const [toggle, setToggle] = useState("description");
  const [lessons, setLessons] = useState([]);

  const goToCourseDetail = () => {};

  const handleRegister = () => {
    setRegister(!register);
  };

  const getCourse = (courseId) => {
    getCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Course Failed");
        else setCourse(data);
      })
      .catch(() => toast.error("Get Course Failed"));
  };

  const getRegister = () => {
    getRegisterApi({ userId, courseId })
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Registered Courses Failed");
        else setRegister(Boolean(data));
      })
      .catch(() => toast.error("Get Registered Courses Failed"));
  };

  const getLessons = () => {
    getLessonsByCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Lessons Failed");
        else setLessons(data);
      })
      .catch(() => toast.error("Get Lessons Failed"));
  };

  const registerNewCourse = (userId, courseId) => {
    if (userId) {
      registerCourseApi({ userId, courseId })
        .then((res) => {
          const { error } = res.data;
          if (error) toast.error("Register Course Failed");
          else {
            handleRegister();
            toast.success("Register Course Success");
          }
        })
        .catch(() => toast.error(err.response.data.error));
    } else {
      navigate("/signin");
    }
  };

  const addToCart = () => {
    if (userId) {
      registerNewCourse(userId, courseId);
      setRegister(!register);
    } else {
      toast.info("You Must Signin Before");
      navigate("/signin");
    }
  };

  const showRegister = () => {
    if (course) {
      return (
        <button
          className={styles.register}
          onClick={() => addToCart(course)}
          disabled={register}
          style={{ background: register ? "f9f8f8" : "#adc8e0" }}
        >
          {register ? "Registered" : "Register now"}
        </button>
      );
    } else
      return (
        <button onClick={goToCourseDetail} className={styles.register}>
          Start
        </button>
      );
  };

  useEffect(() => {
    getCourse(courseId);
    getRegister();
    getLessons();
  }, []);

  return (
    <section>
      <body className={`${styles.detailInformation}`}>
        <Header />
        <section className={`container ${styles.homeSlider}`}>
          <div className={styles.course_detail_container}>
            <div className={styles.course_detail}>
              <div className={styles.course_image}>
                <img
                  className={styles.itemImage}
                  src={course.thumbnail}
                  alt=""
                />
              </div>
              <div className={styles.course_info}>
                <h2 className={styles.course_name}>{course.name}</h2>
                <div className={styles.course_cost}>
                  <IoPricetags /> {course.cost} VND
                </div>
                <div className={styles.course_lessons}>
                  <HiOutlineFilm /> <b>{lessons.length}</b> lessons
                </div>
                {showRegister()}
              </div>
            </div>
            <div className={styles.course_comment}>
              <div className={styles.courseTabs}>
                <div
                  className={
                    toggle === "description"
                      ? `${styles.tabItem} ${styles.active}`
                      : `${styles.tabItem}`
                  }
                  onClick={() => setToggle("description")}
                >
                  <h6>
                    <button>
                      <span>Description</span>
                    </button>
                  </h6>
                </div>
                <div
                  className={
                    toggle === "comments"
                      ? `${styles.tabItem} ${styles.active}`
                      : `${styles.tabItem}`
                  }
                  onClick={() => setToggle("comments")}
                >
                  <h6>
                    <button>
                      <span>Comments</span>
                    </button>
                  </h6>
                </div>
              </div>

              <div></div>

              <div className="tabContents">
                <div
                  className={
                    toggle === "description"
                      ? `${styles.tabContent} ${styles.active}`
                      : `${styles.tabContent}`
                  }
                >
                  <div className={styles.course_decription}>
                    <p className={styles.description_header}>{course.name}</p>
                    <p className={styles.description}>{course.description}</p>
                    <div className={styles.row}>
                      {lessons &&
                        lessons.map((lesson, index) => (
                          <div key={index} className={styles.listLesson}>
                            <div className={styles.lesson__left}>
                              {register ? (
                                <LessonVideo videoId={lesson.videoId} />
                              ) : (
                                <img
                                  className={styles.defaultLessonImage}
                                  src={DefaultLessonImage}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className={styles.lesson__right}>
                              <h3
                                className="lesson__name"
                                onClick={(event) => {
                                  if (register)
                                    navigate(`/lessons/${lesson._id}`);
                                  else event.preventDefault();
                                }}
                              >
                                {lesson.name}
                              </h3>
                              <div className={styles.lesson__cost}>
                                <BsYoutube /> {lesson.videoId}
                              </div>
                              <p className={styles.lesson__description}>
                                <MdDescription />
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    toggle === "comments"
                      ? `${styles.tabContent} ${styles.active}`
                      : `${styles.tabContent}`
                  }
                >
                  <div className={styles.commentExample}>
                    <img src={User1Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Nguyen Duc Bao</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentExample}>
                    <img src={User2Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Nguyen Thi Anh Tuyet</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentExample}>
                    <img src={User3Avatar}></img>
                    <div className={styles.comment_item}>
                      <p className={styles.name}>Huynh Duc Thanh Tuan</p>
                      <p className={styles.content}>
                        Khoa hoc rat hay, rat tuyet voi, em hoc hoi duoc nhieu
                        thu
                      </p>
                    </div>
                  </div>
                  <div className={styles.commentBtnPart}>
                    <img src={User3Avatar}></img>
                    <input
                      type="text"
                      name="comment"
                      placeholder="Enter your comment"
                    ></input>
                    <button>Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </section>
  );
};

export default CourseDetail;
