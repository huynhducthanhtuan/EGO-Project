import AnswerModel from "../../models/AnswerModel.js";
import TestResultModel from "../../models/TestResultModel.js";
import QuestionModel from "../../models/QuestionModel.js";
import TestModel from "../../models/TestModel.js";
import { ObjectId } from "../../constants/index.js";

export const getAnswersOfQuestion = async (questionId) => {
  const answers = await AnswerModel.find(
    { questionId: new ObjectId(questionId), isCorrect: true },
    { _id: true },
    { sort: { _id: 1 } }
  ).lean();

  const output = answers.map((answers) => answers._id.toString());
  return output;
};

export const getScoreQuestion = async (questionId, answers) => {
  const questionDetail = await QuestionModel.findOne(
    { _id: new ObjectId(questionId) },
    { score: true }
  ).lean();

  const correctAnswer = await getAnswersOfQuestion(questionId);

  // Get a score by Comparing the array of correct answers with the array of user answers
  const score =
    JSON.stringify(correctAnswer) === JSON.stringify(answers)
      ? questionDetail.score
      : 0;

  return score;
};

export const handleScore = async (results) => {
  const listScorePromise = results.map((result) => {
    const { questionId, answers } = result;
    return getScoreQuestion(questionId, answers.sort());
  });

  const listScore = await Promise.all(listScorePromise);

  const sumScore = listScore.reduce((a, b) => a + b, 0);
  return sumScore;
};

export const createTestResult = async ({ userId, testId, results }) => {
  const score = await handleScore(results);
  const testScore = await TestModel.findOne(
    { _id: new ObjectId(testId) },
    { score: true }
  ).lean();

  // Pass if the score obtained is greater than or equal to 70% of the total of the test
  const isPass = score / testScore.score >= 0.7 ? true : false;

  const newTestResult = new TestResultModel({
    userId: new ObjectId(userId),
    testId: new ObjectId(testId),
    score: score,
    isPass: isPass
  });

  const output = await newTestResult.save();
  return output;
};

export const checkDidTest = async ({ userId, testId }) => {
  const isExisted = await TestResultModel.findOne({
    userId: new ObjectId(userId),
    testId: new ObjectId(testId)
  }).lean();
  return Boolean(isExisted);
};

export const getTestResult = async (userId, testId) => {
  const test = await TestModel.findOne({ _id: new ObjectId(testId) });

  const testResult = await TestResultModel.findOne({
    userId: new ObjectId(userId),
    testId: new ObjectId(testId)
  }).lean();

  return {
    ...testResult,
    testScore: test.score,
    testDescription: test.description
  };
};
