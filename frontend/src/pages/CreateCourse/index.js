import { useState } from "react";
import { toast } from "react-toastify";
import { createCourseApi } from "../../apis/course";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./CreateCourse.module.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const initialValues = {
    name: "",
    cost: "",
    description: "",
    thumbnail: "",
    userId: userId
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const createCourse = (course) => {
    createCourseApi(course)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Create Course Failed");
        else {
          setValues(initialValues);
          toast.success("Create Course Success");
          navigate("/manage/courses");
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const submitForm = (e) => {
    e.preventDefault();
    createCourse(values);
  };

  const renderCreateCourseForm = () => {
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
              <p className={styles.formLabel}>Cost (VND)</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
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
              onChange={handleChange("description")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Thumbnail</p>
              <p className={styles.formForce}>*</p>
            </div>
            <input
              type="text"
              className={styles.formControl}
              onChange={handleChange("thumbnail")}
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
      <h2 className="bold">Create New Course</h2>
      <div className="mt-4 ">{renderCreateCourseForm()}</div>
    </div>
  );
};

export default CreateCourse;
