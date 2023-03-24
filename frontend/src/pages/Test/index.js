import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getTestDetailApi } from "../../apis/test";
import { submitTestApi } from "../../apis/testResult";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import Header from "../../components/Header";
import styles from "./Test.module.css";

function Test() {
  const navigate = useNavigate();
  const startDate = useRef(Date.now());
  const { testId } = useParams();
  const [testDetail, setTestDetail] = useState();
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState({});
  const [checked, setChecked] = useState({});

  const getTestDetail = () => {
    getTestDetailApi(testId)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Get Test Failed");
        else {
          const test = data;
          setTestDetail(data);
          setQuestions(data.questions);

          const initResults = test.questions.map((question) => ({
            questionId: question._id,
            answers: []
          }));

          setChecked({ ...Array(test.questions.length).fill([]) });
          setResults({ ...initResults });
        }
      })
      .catch(() => toast.error("Get Test Failed"));
  };

  const submitTest = (test) => {
    submitTestApi(test)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Submit Test Failed");
        else {
          toast.success("Submit Test Success");
          navigate(`/test-results/${testId}`);
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleChecked = (id, isMultiChoice, index) => {
    let newChecked;

    if (isMultiChoice) {
      const isChecked = checked[index].includes(id);

      newChecked = isChecked
        ? checked[index].filter((item) => item !== id)
        : [...checked[index], id];
    } else {
      newChecked = [id];
    }

    const resultChange = { ...results[index], answers: newChecked };
    setResults({
      ...results,
      [index]: resultChange
    });

    setChecked({ ...checked, [index]: newChecked });
  };

  const handleSubmitTest = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const newTestResult = {
      testId: testId,
      userId: userId,
      results: Object.values(results)
    };
    submitTest(newTestResult);
  };

  const defaultRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Show test result
    } else
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
  };

  useEffect(() => {
    getTestDetail();
  }, []);

  return (
    <div className={styles.home}>
      <section className={`container ${styles.homeSlider}`}>
        <Header />
        <br />
        <h2>Test</h2>
        {questions.length != 0 && (
          <div className={styles.countdown}>
            <Countdown
              renderer={defaultRenderer}
              date={startDate.current + testDetail.timeLimit * 60 * 1000}
              key={startDate.current + testDetail.timeLimit * 60 * 1000}
            />
          </div>
        )}
        <div className={styles.row}>
          {testDetail &&
            testDetail.questions?.map((question, index) => (
              <div className={styles.question_form}>
                <div className={styles.question}>
                  <span className={styles.content}>
                    Question {index + 1}: {question.content}
                  </span>
                  <span className={styles.score}>Score: {question.score}</span>
                </div>
                <div className={styles.answers}>
                  {question.answers.map((answer) => (
                    <div className={styles.answer_form} key={answer._id}>
                      <input
                        type={question.isMultiChoice ? "checkbox" : "radio"}
                        onChange={() =>
                          handleChecked(
                            answer._id,
                            question.isMultiChoice,
                            index
                          )
                        }
                        checked={checked[index].includes(answer._id)}
                        name={question._id}
                        id={answer._id}
                      />
                      <span>{answer.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {questions.length != 0 && (
          <div>
            <button
              onClick={() => handleSubmitTest()}
              className={styles.btnSubmit}
            >
              Submit test
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Test;
