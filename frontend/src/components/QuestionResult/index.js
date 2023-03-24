import { useEffect, useState, Fragment } from "react";
import { BsCheck2 } from "react-icons/bs";
import styles from "./QuestionResult.module.css";

function QuestionResult({ question, testId }) {
  const values = { ...question, testId };
  const [listCorrect, setListCorrect] = useState([]);

  const getListCorrect = () => {
    const corrects = question.answers.map((answer) => answer.isCorrect);
    setListCorrect(corrects);
  };

  useEffect(() => {
    getListCorrect();
  }, []);

  return (
    <div className={styles.question_form}>
      <div className={styles.question}>
        <input type="text" value={values.content} />
        <div className={styles.formScore}>
          <span>Score: </span>
          <b>{values && values.score}</b>
        </div>
      </div>
      <div className={styles.answers}>
        {values.answers.map((answer, index) => (
          <Fragment>
            <div className={styles.answer_form} key={answer._id}>
              <input
                type={values.isMultiChoice ? "checkbox" : "radio"}
                defaultValue={answer._id}
                name={question._id}
                id={answer._id ? answer._id : index}
                checked={listCorrect[index]}
              />
              <input
                className={styles.text}
                type="text"
                value={values.answers[index]?.content}
              />
              {listCorrect[index] && (
                <BsCheck2 className={styles.answerCorrectIcon} />
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default QuestionResult;
