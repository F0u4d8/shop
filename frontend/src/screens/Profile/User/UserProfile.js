import React, { useState, useEffect } from "react";
import Details from "./UserDetails";

import { useSelector } from "react-redux";

import { Container } from "react-bootstrap";
import classes from "../../ProductScreen/ProductScreen.module.css";
import { useNavigate } from "react-router-dom";
import UserListScreen from "../Admin/UserListScreen";
import ProductListScreen from "../Admin/ProductListScreen";


const UserProfile = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const {  userInfo } = userLogin;

const navigate = useNavigate()


  useEffect(() => {
    if (!userInfo) {
        navigate('/login');
      }
  }, [navigate, userInfo]);

  const [selection, setSelection] = useState("1");

  const changeSelection = (e) => {
    setSelection(e.target.getAttribute("data-selection"));
  };

  let selectionShow;
  if (selection === "1") {
    selectionShow = <Details></Details>;
  }   else if (selection === "5") {
    selectionShow = <UserListScreen />;
  } else if (selection === "6") {
    selectionShow = <ProductListScreen />;
  } 

  return (
    <Container>
      <div className={classes["selection-container"]}>
        <ul className={classes.navSelection}>
          <li
            className={classes.navItem}
            data-selection="1"
            onClick={changeSelection}
          >
            User Profile
          </li>
         
         
     
          {userInfo && userInfo.isAdmin && (
            <li
              className={classes.navItem}
              data-selection="5"
              onClick={changeSelection}
            >
              Manage Users
            </li>
          )}
          {userInfo && (userInfo.isAdmin || userInfo.isSeller) && (
            <li
              className={classes.navItem}
              data-selection="6"
              onClick={changeSelection}
            >
              Manage Products
            </li>
          )}
         
      
        </ul>
        {selectionShow}
      </div>
      <div style={{ marginBottom: "100px" }}></div>
    </Container>
  );
};

export default UserProfile;