export const initialState = null;

export const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "USER":
      newState = action.payload;
      break;
    case "CLEAR":
      newState = null;
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export const questionReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "isMultiChoice":
      const { isMultiChoice } = state;
      newState = { ...state, isMultiChoice: !isMultiChoice };
      break;

    case "content":
      newState = { ...state, content: action.event.target.value };
      break;

    case "score":
      newState = { ...state, score: action.event.target.value };
      break;

    case "content-answer":
      let answers = { ...state.answers };
      let newAnswer = {
        ...answers[action.index],
        content: action.event.target.value
      };
      answers = { ...answers, [action.index]: newAnswer };
      newState = { ...state, answers: Object.values(answers) };
      break;

    case "add-answer":
      let listAnswers = { ...state.answers };
      const length = state.answers.length;
      listAnswers = {
        ...listAnswers,
        [length]: { content: "", isCorrect: false }
      };
      newState = { ...state, answers: Object.values(listAnswers) };
      break;

    case "cancel":
      newState =
        action && action.initialValue
          ? { ...action.initialValue }
          : { ...state };
      break;

    default:
      throw new Error("Invalid action");
  }

  return newState;
};
