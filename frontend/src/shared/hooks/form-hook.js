import { useCallback, useReducer } from "react";

/*-------------------FORM REDUCER------------------------------------------- */
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        //if the inputId is not a property of the state.inputs object... i.e. when name is undefined in the auth.js file
        if (!state.inputs[inputId]) {
          continue; //skip this iteration of the for loop
        }
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
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

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);
  return [formState, inputHandler, setFormData];
};
