import { useEffect, useState } from "react";
import { createLessonApi } from "../../apis/lesson";
import { getCourseApi } from "../../apis/course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import Header from "../../components/Header";
import styles from "./CreateLesson.module.css";

const CreateLesson = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const courseId = query.get("courseId");
  const initialValues = {
    name: "",
    description: "",
    videoId: "",
    courseId: courseId
  };
  const [values, setValues] = useState(initialValues);
  const [course, setCourse] = useState();

  const getCourse = () => {
    getCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Course Failed");
        else setCourse(data);
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const createLesson = (lesson) => {
    createLessonApi(lesson)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Create Lesson Failed");
        else {
          toast.success("Create Lesson Success");
          navigate(`/manage/lessons?courseId=${courseId}`);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    createLesson(values);
  };

  useEffect(() => {
    getCourse();
    window.scrollTo(0, 0);
  }, []);

  const renderCreateLessonForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Name</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Video Id</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
              onChange={handleChange("videoId")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
              <p className={styles.formForce}>*</p>
            </div>
            <textarea
              className={styles.formControl}
              onChange={handleChange("description")}
            />
          </div>
          <button
            type="button"
            className={`${styles.formSubmit}`}
            onClick={(e) => submitForm(e)}
          >
            Create
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="mt-4">
      <Header />
      <h2>Course: {course && course.name}</h2>
      <h2 className="bold">Create Lesson</h2>
      <div className="mt-4 ">{renderCreateLessonForm()}</div>
    </div>
  );
};

export default CreateLesson;
