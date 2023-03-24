import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseApi, updateCourseApi } from "../../apis/course";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import styles from "./UpdateCourse.module.css";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    cost: "",
    description: "",
    thumbnail: ""
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getOldCourseData = (courseId) => {
    getCourseApi(courseId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Course Failed");
        else setValues(data);
      })
      .catch(() => toast.error("Get Course Failed"));
  };

  const updateCourse = (courseId, course) => {
    updateCourseApi(courseId, course)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Update Course Failed");
        else {
          toast.success("Update Course Success");
          // Back previous page
          navigate(-1);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateCourse(courseId, values);
  };

  const renderUpdateCourseForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Name</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              value={values.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Cost (VND)</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              value={values.cost}
              onChange={handleChange("cost")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
              <p className={styles.formForce}>*</p>
            </div>
            <textarea
              className={styles.formControl}
              value={values.description}
              onChange={handleChange("description")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Thumbnail</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              className={styles.formControl}
              type="text"
              value={values.thumbnail}
              onChange={handleChange("thumbnail")}
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

  useEffect(() => {
    getOldCourseData(courseId);
  }, []);

  return (
    <div className="mt-4">
      <Header />
      <h2 className="bold">Update Course</h2>
      <div className="mt-4 ">{renderUpdateCourseForm()}</div>
    </div>
  );
};

export default UpdateCourse;
