import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/AuxHoc/AuxHoc";

const SideDrawer = (props) => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.openSideDrawer) {
    attachedClass = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.openSideDrawer} clicked={props.closed} />
      <div className={attachedClass.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
