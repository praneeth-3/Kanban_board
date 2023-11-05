import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Constants from "../../util/constants";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/UserSlice";
import {
  closeAlert,
  setAlertProps,
  showToastMessage,
} from "../../redux/CommonSlice";
import Login from "./Login";

function LoginContainer() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const dispatch = useDispatch();
  const createNewUser = () => {
    axios
      .post(Constants.apiLinks.auth.signin, formData)
      .then((res: any) => {
        if (res.data.user && res.data.token)
          dispatch(
            setActiveUser({ name: res.data.user.name, token: res.data.token })
          );
      })
      .catch((err: any) => {
        const msg = err.response?.data?.msg
          ? err.response.data.msg
          : err.message;
        dispatch(
          setAlertProps({
            ...Constants.initialAlertProps,
            show: true,
            title: "Error",
            message: msg,
          })
        );
      });
  };
  const onFormUpdate = (evt: any) => {
    let _formData = { ...formData };
    if (evt.target.name) {
      _formData[evt.target.name as keyof Object] = evt.target.value;
    }
    setFormData(_formData);
  };
  const loginUser = () => {
    if (formData.name && formData.password) {
      axios
        .post(Constants.apiLinks.auth.login, formData)
        .then((res: any) => {
          if (res.data.user && res.data.token)
            dispatch(
              setActiveUser({ name: res.data.user.name, token: res.data.token })
            );
          dispatch(showToastMessage({ message: res.data.msg }));
          setFormData({ name: "", password: "" });
        })
        .catch((err: any) => {
          if (err.response?.data?.msg?.toUpperCase() == "USER NOT FOUND") {
            dispatch(
              setAlertProps({
                ...Constants.initialAlertProps,
                show: true,
                title: "Error",
                message: "User not found, do you want to create a new account?",
                okBtnFunc: () => {
                  createNewUser();
                  dispatch(closeAlert({}));
                },
                okBtnName: "Yes",
              })
            );
          } else {
            const msg = err.response?.data?.msg
              ? err.response.data.msg
              : err.message;
            dispatch(
              setAlertProps({
                ...Constants.initialAlertProps,
                show: true,
                title: "Error",
                message: msg,
                okBtnFunc: null,
                okBtnName: "",
                inputElements: [],
              })
            );
          }
        });
    }
  };
  return (
    <Login
      formData={formData}
      onFormUpdate={onFormUpdate}
      loginUser={loginUser}
    />
  );
}

export default LoginContainer;
