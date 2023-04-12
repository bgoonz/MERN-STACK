import { useCallback, useReducer } from "react";

/*-------------------FORM REDUCER------------------------------------------- */
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        /* an example of inputId or action.inputId would be title or description */
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          /*if looking at input in form state that is not getting updated by the currently running action*/
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          /*overide the input state for the input we are updating with the action */
          /* dynamic assignment of the property of action object for the current inputID using [ action.inputId ]:*/
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
  return [formState, inputHandler];
};

export default useForm;
