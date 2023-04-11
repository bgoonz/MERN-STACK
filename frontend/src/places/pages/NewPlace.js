import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./NewPlace.css";
/*VALIDATOR_REQUIRE() returns a validator configuration object*/
const formReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for ( const inputId in state.inputs ) {
                /* an example of inputId or action.inputId would be title or description */
                if ( inputId === action.inputId ) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    /*if looking at input in form state that is not getting updated by the currently running action*/
                    formIsValid = formIsValid && state.inputs[ inputId ].isValid;
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
const NewPlace = () => {
    useReducer( formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    } )
  const titleInputHandler = useCallback((id, value, isValid) => {
    console.log(id, value, isValid);
  }, [] );
      const descriptionInputHandler = useCallback((id, value, isValid) => {
        console.log(id, value, isValid);
      }, []);
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title"
                onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description(at least 5 characters"
                onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
