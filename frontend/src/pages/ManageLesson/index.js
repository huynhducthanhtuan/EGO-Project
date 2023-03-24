import { useState, useEffect } from "react";
import { getCourseApi } from "../../apis/course";
import { getLessonsByCourseApi } from "../../apis/lesson";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import Lesson from "../../components/Lesson";
import Header from "../../components/Header";
import styles from "./ManageLesson.module.css";

const ManageLesson = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const courseId = query.get("courseId");
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);

  const getCourse = () => {
    getCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Course Failed");
        else setCourse(data);
      })
      .catch(() => toast.error("Get Course Failed"));
  };

  const getLessonsByCourse = () => {
    getLessonsByCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Lessons Failed");
        else setLessons(data);
      })
      .catch(() => toast.error("Get Lessons Failed"));
  };

  useEffect(() => {
    getCourse(courseId);
    getLessonsByCourse(courseId);
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <div className={styles.container}>
          <h2 className={styles.homeSliderHeading}>Manage Lessons</h2>
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate(`/lessons/create?courseId=${courseId}`)}
          >
            Create Lesson
          </button>
        </div>
        <h2 className={styles.courseName}>Course: {course && course.name}</h2>
        <div className={styles.row}>
          {lessons.map((lesson, index) => (
            <Lesson key={index} lesson={lesson} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManageLesson;
