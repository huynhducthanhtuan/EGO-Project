import QuestionModel from "../../models/QuestionModel.js";
import AnswerModel from "../../models/AnswerModel.js";
import { ObjectId } from "../../constants/index.js";
import {
  updateTestScoreWhenCreateQuestion,
  updateTestScoreWhenUpdateQuestion
} from "./test.js";
import {
  handleCreateNewAnswers,
  handleUpdateAnswers,
  deleteAnswersOfQuestion
} from "./answer.js";

export const checkExistedQuestion = async (questionId) => {
  const isExisted = await QuestionModel.exists({
    _id: new ObjectId(questionId)
  }).lean();

  return Boolean(isExisted);
};

export const createNewQuestion = async (question) => {
  const newQuestion = await QuestionModel.create(question);
  return newQuestion;
};

export const handleCreateNewQuestion = async (question) => {
  const { testId, content, isMultiChoice, score, answers } = question;

  // 1. Create question
  const newQuestion = {
    testId: new ObjectId(testId),
    content: content,
    isMultiChoice: isMultiChoice,
    score: score
  };
  const savedQuestion = await createNewQuestion(newQuestion);

  // 2. Update test score
  const updatedTest = await updateTestScoreWhenCreateQuestion(testId, score);

  // 3. Create answers
  const questionId = savedQuestion._id;
  const createdAnswers = await handleCreateNewAnswers(questionId, answers);

  // 4. Return result (saved question and answers)
  const isCreatedQuestionAndAnswers =
    updatedTest && savedQuestion && createdAnswers.includes(null) === false;
  const result = isCreatedQuestionAndAnswers
    ? {
        question: savedQuestion,
        answers: createdAnswers
      }
    : null;

  return result;
};

export const updateQuestion = async (questionId, newQuestion) => {
  const updatedQuestion = await QuestionModel.findOneAndUpdate(
    { _id: new ObjectId(questionId) },
    newQuestion,
    { new: true }
  );
  return updatedQuestion;
};

export const handleUpdateQuestion = async (questionId, question) => {
  const { testId, content, isMultiChoice, score, answers } = question;

  // 1. Update question, test score and question answers
  const questionInfo = {
    content,
    isMultiChoice,
    score
  };

  const [updatedQuestion, updatedTest, updatedAnswers] = await Promise.all([
    updateQuestion(questionId, questionInfo),
    updateTestScoreWhenUpdateQuestion(testId, questionId, score),
    handleUpdateAnswers(answers)
  ]);

  // 2. Return update status
  const isUpdatedQuestionAndAnswers =
    updatedQuestion && updatedTest && updatedAnswers.includes(null) === false;

  return isUpdatedQuestionAndAnswers;
};

export const deleteQuestionById = async (questionId) => {
  const deletedQuestion = await QuestionModel.findOneAndDelete({
    _id: new ObjectId(questionId)
  }).lean();

  return deletedQuestion;
};

export const handleDeleteQuestionById = async (questionId) => {
  const [deletedQuestion, deletedAnswers] = await Promise.all([
    deleteQuestionById(questionId),
    deleteAnswersOfQuestion(questionId)
  ]);

  const isDeleted = deletedQuestion && deletedAnswers.deletedCount > 0;
  return isDeleted;
};

export const handleDeleteManyQuestions = async (questionIds) => {
  const promises = questionIds.map((questionId) =>
    handleDeleteQuestionById(questionId)
  );

  const promiseResult = await Promise.all(promises);

  const isDeleted = promiseResult.includes(null) ? false : true;
  return isDeleted;
};

export const getQuestionsByTests = async (testIds) => {
  const listQuestions = await QuestionModel.find(
    { testId: { $in: testIds } },
    { _id: true }
  ).lean();

  return listQuestions;
};

export const getQuestionDetail = async (questionId) => {
  const question = await QuestionModel.findOne(
    { _id: new ObjectId(questionId) },
    { _id: true, content: true, isMultiChoice: true, score: true }
  ).lean();

  const answers = await AnswerModel.find(
    { questionId: new ObjectId(questionId) },
    { _id: true, content: true, isCorrect: true }
  ).lean();

  const output = { ...question, answers };
  return output;
};
