import React from "react";
import classes from "./MobileApp.css";
import Logo from "../Logo/Logo";
import Label from "../Label/Label";
import Input from "../Input/Input";
import FormComponent from "../FormComponent/FormComponent";
import Button from "../Button/Button";

export default function MobileApp() {
  return (
    <div className={classes.MobileLayout}>
      <div className={classes.Header}>
        <Logo />
      </div>
      <div className="bdy">
        <FormComponent
          labelComponent={<Label text="Login" />}
          inputComponent={<Input mobile />}
        />
        <FormComponent
          labelComponent={<Label text="Password" />}
          inputComponent={<Input mobile type="password" />}
        />
        <Button text="Submit" />
      </div>
    </div>
  );
}
