import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./NewPlace.css";
/*VALIDATOR_REQUIRE() returns a validator configuration object*/
const NewPlace = () => {
  return (
      <form className="place-form">

      <Input element="input" type="text" label="title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title"></Input>
    </form>
  );
};

export default NewPlace;
