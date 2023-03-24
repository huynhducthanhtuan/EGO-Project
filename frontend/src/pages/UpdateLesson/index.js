import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseApi } from "../../apis/course";
import { updateLessonApi, getLessonApi } from "../../apis/lesson";
import { toast } from "react-toastify";
import useQuery from "../../hooks/useQuery";
import styles from "./UpdateLesson.module.css";

const UpdateLesson = () => {
  const query = useQuery();
  const courseId = query.get("courseId");
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    description: "",
    videoId: "",
    courseId: courseId
  });
  const [course, setCourse] = useState();

  const getCourse = (courseId) => {
    getCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Course Failed");
        else setCourse(data);
      })
      .catch(() => toast.error("Get Course Failed"));
  };

  const getLesson = (lessonId) => {
    getLessonApi(lessonId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Lesson Failed");
        else setValues(data);
      })
      .catch(() => toast.error("Get Lesson Failed"));
  };

  const updateLesson = (lessonId, values) => {
    updateLessonApi(lessonId, values)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Update Lesson Failed");
        else {
          toast.success("Update Lesson Success");
          // Back previous page
          navigate(-1);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateLesson(lessonId, values);
  };

  useEffect(() => {
    getCourse(courseId);
    getLesson(lessonId);
  }, [lessonId]);

  const renderUpdateLessonForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Name</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
              value={values?.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Video Id</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
              value={values?.videoId}
              onChange={handleChange("videoId")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
            </div>
            <textarea
              className={styles.formControl}
              value={values?.description}
              onChange={handleChange("description")}
            />
          </div>
          <button
            type="button"
            className={`${styles.formSubmit}`}
            onClick={(e) => submitForm(e)}
          >
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="mt-4">
      <Header />
      <h2>Course: {course?.name}</h2>
      <h2 className="bold">Update Lesson</h2>
      <div className="mt-4 ">{renderUpdateLessonForm()}</div>
    </div>
  );
};

export default UpdateLesson;
