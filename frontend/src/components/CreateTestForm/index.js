import { createTestApi } from "../../apis/test";
import { toast } from "react-toastify";
import React, { useState } from "react";
import styles from "./CreateTestForm.module.css";
import { refreshPage } from "../../helpers";

function Test({ lessonId, visible, handleVisible }) {
  const [values, setValues] = useState({
    timeLimit: 0,
    description: ""
  });
  const { timeLimit, description } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const createNewTest = () => {
    const newTest = { lessonId, timeLimit, description };

    createTestApi(newTest)
      .then((res) => {
        if (res.error) toast.error("Create Test Failed");
        else {
          toast.success("Create Test Success");
          refreshPage();
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  return (
    <React.Fragment>
      <div className={styles.blur}></div>
      <div className={styles.modal}>
        <form className={styles.form} id="modal_form">
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Time limit (Minutes)</label>
            <input
              className={styles.formControl}
              type="number"
              min={0}
              placeholder="Enter Time Limit"
              onChange={handleChange("timeLimit")}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={styles.formControl}
              type="text"
              placeholder="Enter description"
              onChange={handleChange("description")}
            />
          </div>

          <div className={styles.submit}>
            <button
              type="button"
              className={styles.formSubmit}
              onClick={() => {
                createNewTest();
                handleVisible();
              }}
            >
              Create
            </button>
            <button
              type="button"
              className={`${styles.formSubmit} ${styles.button_cancel}`}
              onClick={() => {
                handleVisible();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Test;
