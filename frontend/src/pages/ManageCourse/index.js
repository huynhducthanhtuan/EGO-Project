import { useState, useEffect } from "react";
import { getCoursesByUserApi } from "../../apis/course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Course from "../../components/Course";
import Header from "../../components/Header";
import styles from "./ManageCourse.module.css";

const ManageCourse = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [courses, setCourses] = useState([]);

  const getCoursesByUser = (userId) => {
    getCoursesByUserApi(userId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Courses Failed");
        else setCourses(data);
      })
      .catch(() => toast.error("Get Courses Failed"));
  };

  useEffect(() => {
    getCoursesByUser(userId);
  }, []);

  return (
    <div>
      <Header />
      <div className={`container ${styles.homeSlider}`}>
        <div className={styles.container}>
          <h2>Manage Courses</h2>
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate("/courses/create")}
          >
            Create Course
          </button>
        </div>
        <div className={styles.row}>
          {courses.map((course, index) => (
            <Course key={index} course={course} index={index} type="manage" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
