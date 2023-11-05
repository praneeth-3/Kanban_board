import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Constants from "../../util/constants";
import {
  closeAlert,
  setAlertProps,
  showToastMessage,
} from "../../redux/CommonSlice";
import { useNavigate } from "react-router-dom";
import { setTaskList } from "../../redux/TaskSlice";
import "./Home.css";
import Home from "./Home";

function HomeContainer(props: any) {
  const activeUser = useSelector((state: any) => state.user);
  const taskList = useSelector((state: any) => state.task.taskList);

  const [contextMenuProps, setContextMenuProps] = useState({
    show: false,
    x: 0,
    y: 0,
    editTask: () => {},
    deleteTask: () => {},
  });
  const hideContextMenu = () => {
    setContextMenuProps({
      show: false,
      x: 0,
      y: 0,
      editTask: () => {},
      deleteTask: () => {},
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reloadTasks = () => {
    if (activeUser?.token) {
      axios
        .post(Constants.apiLinks.task.getAll, { token: activeUser.token })
        .then((res: any) => {
          dispatch(setTaskList({ taskList: res.data.taskList }));
          navigate("/");
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
    }
  };
  useEffect(() => {
    reloadTasks();
  }, [activeUser]);
  const addTask = (task: any) => {
    if (task?.title) {
      axios
        .post(Constants.apiLinks.task.create, {
          ...task,
          token: activeUser.token,
        })
        .then((res: any) => {
          dispatch(closeAlert({}));
          reloadTasks();
          dispatch(showToastMessage({ message: res.data.msg }));
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
    }
  };
  const showDeleteTaskUi = (task: any) => {
    dispatch(
      setAlertProps({
        ...Constants.initialAlertProps,
        show: true,
        title: "Delete Task",
        message: "Are you sure, you want to delete this task?",
        okBtnFunc: () => {
          deleteTask(task);
          dispatch(closeAlert({}));
        },
        okBtnName: "Ok",
      })
    );
  };
  const deleteTask = (task: any) => {
    axios
      .post(Constants.apiLinks.task.delete, {
        taskid: task._id,
        token: activeUser.token,
      })
      .then((res) => {
        dispatch(showToastMessage({ message: res.data.msg }));
        reloadTasks();
        dispatch(closeAlert({}));
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
  const showEditTaskUi = (task: any) => {
    dispatch(
      setAlertProps({
        show: true,
        title: "Edit Task",
        message: "Enter Task Details",
        okBtnFunc: (formdata: any) => {
          editTask(formdata, task);
          dispatch(closeAlert({}));
        },
        okBtnName: "Submit",
        inputElements: [
          { name: "title", value: task.title },
          { name: "desc", value: task.desc },
          {
            name: "status",
            value: task.status,
            elmType: "combo",
            comboOptions: ["New", "InProgress", "Completed"],
          },
        ],
      })
    );
  };
  const editTask = (formdata: any, task: any) => {
    let updatedTask = { ...task };
    updatedTask.title = formdata.title;
    updatedTask.desc = formdata.desc;
    updatedTask.status = formdata.status;
    axios
      .put(Constants.apiLinks.task.update, {
        task: updatedTask,
        token: activeUser.token,
      })
      .then((res) => {
        dispatch(showToastMessage({ message: res.data.msg }));
        reloadTasks();
        dispatch(closeAlert({}));
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
  const handleOnContextMenu = (evt: any, rightClickedItem: any) => {
    evt.preventDefault();
    setContextMenuProps({
      show: true,
      x: evt.clientX + 5,
      y: evt.clientY + 5,
      editTask: () => {
        showEditTaskUi(rightClickedItem);
        hideContextMenu();
      },
      deleteTask: () => {
        showDeleteTaskUi(rightClickedItem);
        hideContextMenu();
      },
    });
  };
  function handleDragEnd(event: any) {
    const over = event.over;
    let curTask = { ...event.active?.data?.current };
    if (over && curTask) {
      const overStatus = over.id.substring("droppable_".length);
      if (overStatus != curTask.status) {
        curTask.status = overStatus;
        editTask(curTask, event.active.data.current);
      }
    }
  }
  return (
    <Home
      activeUser={activeUser}
      contextMenuProps={contextMenuProps}
      taskList={taskList}
      reloadTasks={reloadTasks}
      addTask={addTask}
      showEditTaskUi={showEditTaskUi}
      handleDragEnd={handleDragEnd}
      hideContextMenu={hideContextMenu}
      handleOnContextMenu={handleOnContextMenu}
    />
  );
}

export default HomeContainer;
