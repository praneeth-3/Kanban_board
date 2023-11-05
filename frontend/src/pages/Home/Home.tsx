import { useDispatch } from "react-redux";
import { closeAlert, setAlertProps } from "../../redux/CommonSlice";
import "./Home.css";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import Draggable from "../../components/DragAndDrop/Draggable";
import Droppable from "../../components/DragAndDrop/Droppable";
import { DndContext } from "@dnd-kit/core";
import LoginContainer from "../../components/Login/LoginContainer";

function Home(props: any) {
  const dispatch = useDispatch();
  if (!props.activeUser.name) {
    return <LoginContainer />;
  } else
    return (
      <>
        {props.contextMenuProps.show && (
          <ContextMenu {...props.contextMenuProps} />
        )}
        <DndContext onDragEnd={props.handleDragEnd}>
          <div className="tasklist" onMouseUp={() => props.hideContextMenu()}>
            <div className="task-container">
              <Droppable
                id="Droppable_New"
                className="todo col-flex center-cross"
              >
                <div className="sub-title">New</div>
                {props.taskList
                  ?.filter((task: any) => task?.status?.toLowerCase() == "new")
                  .map((task: any) => {
                    return (
                      <Draggable
                        id={task._id}
                        className="card"
                        key={task.id}
                        task={task}
                      >
                        <div
                          onClick={() => props.showEditTaskUi(task)}
                          onContextMenu={(e) => {
                            props.handleOnContextMenu(e, task);
                          }}
                        >
                          {task.title}
                        </div>
                      </Draggable>
                    );
                  })}
              </Droppable>
              <Droppable
                id="Droppable_InProgress"
                className="inprogress col-flex center-cross"
              >
                <div className="sub-title">In Progress</div>
                {props.taskList
                  ?.filter(
                    (task: any) => task?.status?.toLowerCase() == "inprogress"
                  )
                  .map((task: any) => {
                    return (
                      <Draggable
                        id={task._id}
                        className="card"
                        key={task.id}
                        task={task}
                      >
                        <div
                          onClick={() => props.showEditTaskUi(task)}
                          onContextMenu={(e) => {
                            props.handleOnContextMenu(e, task);
                          }}
                        >
                          {task.title}
                        </div>
                      </Draggable>
                    );
                  })}
              </Droppable>
              <Droppable
                id="Droppable_Completed"
                className="completed col-flex center-cross"
              >
                <div className="sub-title">Completed</div>
                {props.taskList
                  ?.filter(
                    (task: any) => task?.status?.toLowerCase() == "completed"
                  )
                  .map((task: any) => {
                    return (
                      <Draggable
                        id={task._id}
                        className="card"
                        key={task.id}
                        task={task}
                      >
                        <div
                          onClick={() => props.showEditTaskUi(task)}
                          onContextMenu={(e) => {
                            props.handleOnContextMenu(e, task);
                          }}
                        >
                          {task.title}
                        </div>
                      </Draggable>
                    );
                  })}
              </Droppable>
            </div>
            <div className="footer-icons">
              <img
                src="reload.png"
                alt="Reload tasks"
                title="Reload tasks"
                onClick={props.reloadTasks}
              />
              <img
                src="plus.png"
                alt="Add task"
                title="Add task"
                onClick={() => {
                  dispatch(
                    setAlertProps({
                      show: true,
                      title: "Add Task",
                      message: "Enter Task Details",
                      okBtnFunc: (task: any) => {
                        props.addTask(task);
                        dispatch(closeAlert({}));
                      },
                      okBtnName: "Submit",
                      inputElements: [
                        { name: "title", value: "" },
                        { name: "desc", value: "" },
                        {
                          name: "status",
                          value: "New",
                          elmType: "combo",
                          comboOptions: ["New", "InProgress", "Completed"],
                        },
                      ],
                    })
                  );
                }}
              />
            </div>
          </div>
        </DndContext>
      </>
    );
}

export default Home;
