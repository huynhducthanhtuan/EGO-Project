import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTestDetailApi } from "../../apis/test";
import { getTestResultApi } from "../../apis/testResult";
import { toast } from "react-toastify";
import { BsCheck2, BsX } from "react-icons/bs";
import Header from "../../components/Header";
import QuestionResult from "../../components/QuestionResult";
import styles from "./TestResult.module.css";

function TestResult() {
  const { testId } = useParams();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [testDetail, setTestDetail] = useState();
  const [testResult, setTestResult] = useState();

  const getTestDetail = () => {
    getTestDetailApi(testId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Test Failed");
        else setTestDetail(data);
      })
      .catch(() => toast.error("Get Test Failed"));
  };

  const getTestResult = () => {
    getTestResultApi(userId, testId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Test Result Failed");
        else setTestResult(data);
      })
      .catch(() => toast.error("Get Test Result Failed"));
  };

  useEffect(() => {
    getTestDetail();
    getTestResult();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <section className={`container ${styles.homeSlider}`}>
        <h2>Test Result</h2>
        <div className={styles.formScore}>
          <span>Test Name: </span>
          <b>{testDetail && testDetail.description}</b>
          <br />
          <span>Your Score: </span>
          <b>
            {testResult && testResult.score}/{testDetail && testDetail.score}
          </b>
          <br />
          <span>Status: </span>
          <b>
            {testResult && testResult.isPass ? (
              <div className={styles.testStatus}>
                Pass <BsCheck2 className={styles.answerCorrectIcon} />
              </div>
            ) : (
              <div className={styles.testStatus}>
                Fail <BsX className={styles.answerIncorrectIcon} />
              </div>
            )}
          </b>
        </div>
        <div className={styles.row}>
          {testDetail &&
            testDetail.questions?.map((question, index) => (
              <QuestionResult key={index} question={question} testId={testId} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default TestResult;
