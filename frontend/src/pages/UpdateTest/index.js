import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTestDetailApi, updateTestApi } from "../../apis/test";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import styles from "./UpdateTest.module.css";

const UpdateTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    timeLimit: 0,
    description: ""
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const getOldTestData = (testId) => {
    getTestDetailApi(testId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Test Failed");
        else setValues(data);
      })
      .catch(() => toast.error("Get Test Failed"));
  };

  const updateTest = (testId, test) => {
    updateTestApi(testId, test)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Update Test Failed");
        else {
          toast.success("Update Test Success");
          // Back previous page
          navigate(-1);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateTest(testId, values);
  };

  const renderUpdateTestForm = () => {
    return (
      <form className={styles.container} id="form-1">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Time limit (Minutes)</p>
            </div>
            <input
              className={styles.formControl}
              type="number"
              min={0}
              value={values.timeLimit}
              onChange={handleChange("timeLimit")}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.flex}>
              <p className={styles.formLabel}>Description</p>
            </div>
            <textarea
              className={styles.formControl}
              value={values.description}
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

  useEffect(() => {
    getOldTestData(testId);
  }, []);

  return (
    <div className="mt-4">
      <Header />
      <h2 className="bold">Update Test</h2>
      <div className="mt-4 ">{renderUpdateTestForm()}</div>
    </div>
  );
};

export default UpdateTest;
