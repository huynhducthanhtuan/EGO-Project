import React, { useState, useEffect } from "react";
import { getLessonApi } from "../../apis/lesson";
import { getTestsByLessonApi } from "../../apis/test";
import { toast } from "react-toastify";
import CreateTestForm from "../../components/CreateTestForm";
import useQuery from "../../hooks/useQuery";
import Header from "../../components/Header";
import Test from "../../components/Test";
import styles from "./ManageTest.module.css";

const ManageTest = () => {
  const query = useQuery();
  const lessonId = query.get("lessonId");
  const [lesson, setLesson] = useState();
  const [tests, setTests] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const getLesson = () => {
    getLessonApi(lessonId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Lesson Failed");
        else setLesson(data);
      })
      .catch(() => toast.error("Get Lesson Failed"));
  };

  const getTestsByLesson = () => {
    getTestsByLessonApi(lessonId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Tests Failed");
        else setTests(data.tests);
      })
      .catch(() => toast.error("Get Tests Failed"));
  };

  useEffect(() => {
    getLesson();
    getTestsByLesson();
  }, []);

  return (
    <div>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <div className={styles.container}>
          <h2 className={styles.homeSliderHeading}>Manage Tests</h2>
          <button className={styles.button} onClick={() => handleVisible()}>
            Create test
          </button>
        </div>
        <h2 className={styles.lessonName}>Lesson: {lesson && lesson.name}</h2>
        <div className={styles.row}>
          {tests &&
            tests.map((test, index) => (
              <Test key={index} test={test} index={index} />
            ))}
        </div>
      </section>
      {visible ? (
        <CreateTestForm
          lessonId={lessonId}
          handleVisible={handleVisible}
          visible={visible}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default ManageTest;
