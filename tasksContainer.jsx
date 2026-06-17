import {useState, useEffect} from "react";
import sun from "./sun.png";
// import TaskButtons from './buttons.jsx';

let greeting = "Hello!";
let index;

function chooseGreeting() {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 5) {
    greeting = "Good Morning";
    document.body.style.background = "linear-gradient(45deg, #fada61 0.000%, #ff9188 50.000%, #ff5acd 100.000%)";
  }
  if (hour > 12) {
    greeting = "Good Afternoon"
  }
  if (hour > 17) {
    greeting = "Good Evening";
    document.body.style.background = "linear-gradient(135deg, #4159d0 0.000%, #c84fc0 50.000%, #ffcd70 100.000%)";
  }
}

chooseGreeting();


function TasksContainer() {
  const [info, setInfo] = useState();
  const [tasks, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("savedTasks");
    return savedTasks !== null ? JSON.parse(savedTasks) : [];
  });

useEffect(() => localStorage.setItem("savedTasks", JSON.stringify(tasks)));

  return (
    <>

      <div className="taskInputContainer">
        <h2>{greeting}</h2>
        <p>{tasks.length > 0 ? "Here are your tasks for today" : "No tasks yet, Good Job!"}</p>
        <img src={sun} alt="sun" class="TimeImg" />
        <form onSubmit={(e) =>{
          e.preventDefault()
           if (document.getElementById("taskInput").value.trim() !== "") {
          setTask([...tasks, { info: info }])
          document.querySelector('#taskInput').value = null;
          setInfo("");
           }
           useEffect(localStorage.setItem("savedTasks", JSON.stringify(tasks)));
        }}>
          <input type="text" minLength="3" maxLength="96" placeholder="Plan your goals here! You got this." name="taskInput" id="taskInput" onChange={e => setInfo(e.target.value)} />
          <label for="#taskInput" type="submit" className="taskEnterBtn" onClick={() => {
            if (document.getElementById("taskInput").value.trim() !== "") {
            setTask([...tasks, { info: info }])
            document.querySelector('#taskInput').value = null;
            setInfo("");
            }
          }}><ion-icon name="send"></ion-icon></label>
        </form>
      </div>

      <div className="tasksContainer">
        {tasks.map(task => (
          <div className="task" id={"task"}>
            <div className="textHalf">
              <input type="checkbox" />
              <label className="taskContent" contentEditable="false">{task.info}</label>
            </div>
            <div class="taskButtons">
              <ion-icon name="create-outline" onClick={() => {
                index = tasks.indexOf(task);
                document.querySelectorAll(".taskContent")[index].classList.toggle("editing");
                if (tasks.length > 1) {
                  if (document.querySelectorAll(".taskContent")[index].getAttribute("contentEditable") === "false") {
                    document.querySelectorAll(".taskContent")[index].setAttribute("contentEditable", "true");
                    document.querySelectorAll(".taskContent")[index].focus();
                  } else {
                    document.querySelectorAll(".taskContent")[index].setAttribute("contentEditable", "false");
                  }
                } else {
                  if (document.querySelector(".taskContent").getAttribute("contentEditable") === "false") {
                    document.querySelector(".taskContent").setAttribute("contentEditable", "true");
                    document.querySelectorAll(".taskContent")[index].focus();
                  } else {
                    document.querySelector(".taskContent").setAttribute("contentEditable", "false");
                  }
                }
                task.info = document.querySelectorAll(".taskContent")[index].textContent;
                useEffect(localStorage.setItem("savedTasks", JSON.stringify(tasks)));
              }}></ion-icon>
              <ion-icon class="deleteBtn" name="trash-outline" onClick={() => {
                index = tasks.indexOf(task);
                tasks.splice(index, 1);
                document.querySelectorAll('.task')[index].remove();
                useEffect(localStorage.setItem("savedTasks", JSON.stringify(tasks)));
              }}></ion-icon>
            </div>
          </div>
        ))}
      </div>

    </>
  );

}

export default TasksContainer;
