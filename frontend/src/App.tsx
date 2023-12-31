import "./App.css";
import "./components/Login/Login.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Logout from "./pages/Logout/Logout";
import About from "./pages/About/About";
import ToastMessage from "./components/Toast/ToastMessage";
import DeleteUser from "./pages/DeleteUser/DeleteUser";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "./redux/CommonSlice";
import AlertContainer from "./components/Alert/AlertContainer";
import HomeContainer from "./pages/Home/HomeContainer";

function App() {
  const alertProps = useSelector((state: any) => state.common.alertProps);
  const dispatch = useDispatch();
  return (
    <div className="App">
      {alertProps.show && (
        <AlertContainer
          title={alertProps.title}
          message={alertProps.message}
          closeAction={() => {
            dispatch(closeAlert({}));
          }}
          alertOkBtnFunc={alertProps.okBtnFunc}
          okBtnName={alertProps.okBtnName}
          inputElements={alertProps.inputElements}
        />
      )}
      <Navbar />
      <ToastMessage />
      <Routes>
        <Route path="/">
          <Route
            index
            Component={(props) => {
              return (
                <HomeContainer timestamp={new Date().toString()} {...props} />
              );
            }}
          ></Route>
          <Route path="logout" element={<Logout />}></Route>
          <Route path="delete-user" element={<DeleteUser />}></Route>
          <Route path="change-password" element={<ChangePassword />}></Route>
          <Route path="about" element={<About />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
