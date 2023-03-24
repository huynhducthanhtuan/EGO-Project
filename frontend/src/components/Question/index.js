import { useEffect, useReducer, useState, Fragment } from "react";
import { toast } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import {
  createQuestionApi,
  deleteQuestionApi,
  updateQuesionApi
} from "../../apis/question";
import { questionReducer } from "../../reducers";
import styles from "./Question.module.css";
import DeleteModal from "../../modals/DeleteModal";
import { refreshPage } from "../../helpers";

function Question({ question, testId }) {
  const [listCorrect, setListCorrect] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const initialValue = question._id
    ? { ...question, testId }
    : {
        content: "Question",
        isMultiChoice: false,
        score: 100,
        testId: testId,
        answers: []
      };
  const [values, dispatch] = useReducer(questionReducer, initialValue);

  const getListCorrect = () => {
    const corrects = question.answers.map((answer) => answer.isCorrect);
    setListCorrect(corrects);
  };

  const updateQuesion = (questions, _id) => {
    updateQuesionApi(questions, _id)
      .then((res) => {
        const { error } = res.data;
        if (error) toast.error("Update Question Failed");
        else {
          question = values;
          toast.success("Update Question Success");
          refreshPage();
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const createQuestion = (questions) => {
    createQuestionApi(questions)
      .then((res) => {
        const { error, data } = res.data;
        if (error) toast.error("Create Question Failed");
        else {
          question = { ...values, _id: data._id };
          toast.success("Create Question Success");
          refreshPage();
        }
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  const handleChangeCorrect = () => {
    const newListCorrect = values.answers.map((answer, index) => {
      const id = answer._id ? answer._id : index;
      return document.getElementById(id).checked ? true : false;
    });
    setListCorrect(newListCorrect);
  };

  const handleCancel = () => {
    dispatch({
      type: "cancel",
      initialValue: initialValue
    });
    getListCorrect();
  };

  const handleSave = () => {
    const newAnswers = values.answers.map((answer, index) => ({
      content: answer.content,
      isCorrect: listCorrect[index],
      answerId: answer._id
    }));

    const questions = {
      ...values,
      answers: newAnswers
    };
    if (question._id) {
      const _id = question._id;
      updateQuesion(questions, _id);
    } else {
      createQuestion(questions);
    }
  };

  const handleClick = (action) => {
    dispatch({ type: action });
  };

  useEffect(() => {
    getListCorrect();
  }, []);

  return (
    <div className={styles.question_form}>
      <div className={styles.question}>
        <input
          type="text"
          value={values.content}
          onChange={(event) => dispatch({ type: "content", event: event })}
        />
        <div className={styles.formScore}>
          <span>Score:</span>
          <input
            type="text"
            value={values.score}
            onChange={(event) => dispatch({ type: "score", event: event })}
          />
        </div>
        <RiDeleteBin6Line
          className={styles.icons}
          onClick={() => setOpenDeleteModal(!openDeleteModal)}
        />
        {openDeleteModal && (
          <DeleteModal
            body="Are you sure to delete this question?"
            setOpenDeleteModal={setOpenDeleteModal}
            deleteApi={deleteQuestionApi}
            deleteItemId={question._id}
          />
        )}
      </div>
      <div className={styles.answers}>
        {values.answers.map((answer, index) => (
          <Fragment>
            <div className={styles.answer_form} key={answer._id}>
              <input
                type={values.isMultiChoice ? "checkbox" : "radio"}
                onChange={() => handleChangeCorrect()}
                defaultValue={answer._id}
                name={question._id}
                id={answer._id ? answer._id : index}
                checked={listCorrect[index]}
              />
              <input
                type="text"
                className={styles.text}
                placeholder="Enter new answer"
                value={values.answers[index]?.content}
                onChange={(event) =>
                  dispatch({
                    type: "content-answer",
                    event: event,
                    index: index
                  })
                }
              />
              {listCorrect[index] && (
                <BsCheck2 className={styles.answer_correct_icon} />
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <div className={styles.formAction}>
        <div className={styles.formResult}>
          <IoMdAddCircleOutline
            className={styles.icons}
            onClick={() => handleClick("add-answer")}
          />
          <span onClick={() => handleClick("add-answer")}>Add answer</span>
        </div>
        <div className={styles.multiChoice}>
          <input
            type="checkbox"
            onChange={() => dispatch({ type: "isMultiChoice" })}
            name={question._id}
            id={question._id}
            checked={values.isMultiChoice}
          />
          <span>Multichoice</span>
        </div>
        <div className={styles.formSubmit}>
          <button type="button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button type="button" onClick={() => handleSave()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
