import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./styles.modules.css"; // Add custom styling for the grid
import envVariables from "../../helper/ApiKey";
import Modal from "../Modals/modal";

const ProjectsGrid = ({ fetchProjects }) => {
  const [projects, setProjects] = useState([]);
  const [openaddmodal, setopenaddmodal] = useState(false);
  const [openeditmodal, setopeneditmodal] = useState(false);
  const [taskid,settaskid]=useState(null)
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "",
    deadline: "",
  });

  const openAddModalFunction = (projectId) => {
    setTaskData({ ...taskData, project: projectId });
    setopenaddmodal(true);
  };



  const openeditmodalfunction = (task,id) => {
    // Set the taskData state with the task details
    setTaskData({
        title: task.title,
        description: task.description,
        project: task.project,
        assignedTo: task.assignedTo,
        priority: task.priority,
        deadline: task.deadline,
    });
    settaskid(id)

    // Open the modal
    setopeneditmodal(true);
}

  const closeeditmodal=()=>{
    setopeneditmodal(false)
  }

  const updateTask = async (inputid) => {
    console.log(inputid)
    try {
        const token = localStorage.getItem("auth-token");

        // Prepare the taskData (make sure it's updated with the modal input values)
        const taskDataToUpdate = {
            id:taskid, // Assuming taskData contains the task's current data with _id
            title: taskData.title,
            description: taskData.description,
            project: taskData.project,
            assignedTo: taskData.assignedTo,
            status: taskData.status,
            priority: taskData.priority,
            deadline: taskData.deadline,
        };

        const response = await axios.post(
            `${envVariables.API_URL}/api/task/update_task`,
            taskDataToUpdate,
            {
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data) {
                       fetchProjects(); // Or another function to refresh the task list
            closeeditmodal(); // Close the edit modal
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

  const createTask = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post(
        `${envVariables.API_URL}/api/task/create_task`,
        taskData,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // Update the project with the new task
        fetchProjects();
        closeaddmodal();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response?.status === 403) {
        alert('You are not authorized to create tasks.');
        closeaddmodal();
      } else {
        console.error('Error creating project:', error.response?.data || error.message);
        alert('Failed to create project. Please try again.');
      }
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString); // Convert the string to a Date object
    const day = String(date.getDate()).padStart(2, "0"); // Get day and add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and add leading zero
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  }

  const closeaddmodal = () => {
    setopenaddmodal(false);
  };

  useEffect(() => {
    fetchProjectsgrid();
  }, [fetchProjects]);

  const fetchProjectsgrid = async () => {
    try {
      const token = localStorage.getItem("auth-token"); // Adjust token retrieval as per your auth setup
      const response = await axios.get(
        `${envVariables.API_URL}/api/project/get_projects`,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const updateProjectTasks = async (projectId, updatedTasks) => {
    try {
      const token = localStorage.getItem("auth-token");
      const project = projects.find((p) => p._id === projectId);

      const updatedProject = {
        id: projectId,
        name: project.name,
        description: project.description,
        members: project.members,
        deadline: project.deadline,
        status: project.status,
        tasks: updatedTasks.map((task) => ({
          _id: task._id,
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo,
          status: task.status,
          priority: task.priority,
          deadline: task.deadline,
        })),
      };

      await axios.post(
        `${envVariables.API_URL}/api/project/update_project`,
        updatedProject,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating project tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        `${envVariables.API_URL}/api/task/delete_task`,
        { id: taskId }, // Pass the task ID in the request body
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
          await fetchProjects();
      // Update the state to remove the deleted task from the list
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error.response?.status === 403) {
        alert('You are not authorized to delete task.');
      } else {
        console.error('Error creating project:', error.response?.data || error.message);
        alert('Failed to create project. Please try again.');
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        `${envVariables.API_URL}/api/project/delete_project`,
        { id: projectId }, // Pass the project ID in the request body
        {
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the state to remove the deleted project from the list
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      if (error.response?.status === 403) {
        alert('You are not authorized to delete projects.');
      } else {
        console.error('Error creating project:', error.response?.data || error.message);
        alert('Failed to create project. Please try again.');
      }
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceProjectIndex = parseInt(
      source.droppableId.replace("project-", "")
    );
    const destProjectIndex = parseInt(
      destination.droppableId.replace("project-", "")
    );

    const sourceTasks = [...projects[sourceProjectIndex].tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceProjectIndex === destProjectIndex) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedProjects = [...projects];
      updatedProjects[sourceProjectIndex].tasks = sourceTasks;
      setProjects(updatedProjects);
      updateProjectTasks(projects[sourceProjectIndex]._id, sourceTasks);
    } else {
      const destTasks = [...projects[destProjectIndex].tasks];
      destTasks.splice(destination.index, 0, movedTask);

      const updatedProjects = [...projects];
      updatedProjects[sourceProjectIndex].tasks = sourceTasks;
      updatedProjects[destProjectIndex].tasks = destTasks;

      await setProjects(updatedProjects);
      await updateProjectTasks(projects[sourceProjectIndex]._id, sourceTasks);
      await updateProjectTasks(projects[destProjectIndex]._id, destTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="projects-grid">
        {projects.map((project, projectIndex) => (
          <div key={project._id} className="project-column">
            <h2 style={{ fontSize: "3vh" }}>{project.name}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: "80%",
                gap: "1vw",
              }}
            >
              <i
                className="fa-solid fa-trash"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteProject(project._id)}
              ></i>
              <i
                className="fa-solid fa-plus"
                style={{ cursor: "pointer" }}
                onClick={() => openAddModalFunction(project._id)}
              ></i>
            </div>
            <p>{project.description}</p>
            <Droppable droppableId={`project-${projectIndex}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  {project.tasks.map((task, taskIndex) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={taskIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-item"
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              paddingLeft: "80%",
                              gap: "1vw",
                              height:"5vh",
                              widht:"5vw"
                            }}
                          >
                            <i
                              className="fa-solid fa-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteTask(task._id)}
                            ></i>
                            <i className="fa-solid fa-pen-to-square" 
                             style={{ cursor: "pointer" }}
                             onClick={()=>openeditmodalfunction(task,task._id)}
                             ></i>
                          </div>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>
                            <strong>Status:</strong> {task.status}
                          </p>
                          <p>
                            <strong>Priority:</strong> {task.priority}
                          </p>
                          <p>
                            <strong>Deadline:</strong>{" "}
                            {formatDate(task.deadline)}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}

        
{openeditmodal &&  (
            <Modal
            isOpen={openeditmodal}
            onClose={closeeditmodal}
            header={"Edit Task"}
            size={"xlarge"}
          >
               <form className="task-form">
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={taskData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Assigned To:
                <input
                  type="text"
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={(e) =>
                    setTaskData({
                      ...taskData,
                      assignedTo: e.target.value.split(","),
                    })
                  }
                />
              </label>
              <label>
                Priority:
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="button" onClick={()=>updateTask()}>
                Edit Task
              </button>
            </form>

          </Modal>


          )



          }
        {openaddmodal && (
          <Modal
            isOpen={openaddmodal}
            onClose={closeaddmodal}
            header={"Add Task"}
            size={"xlarge"}
          >
            <form className="task-form">
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={taskData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Assigned To:
                <input
                  type="text"
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={(e) =>
                    setTaskData({
                      ...taskData,
                      assignedTo: e.target.value.split(","),
                    })
                  }
                />
              </label>
              <label>
                Priority:
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="button" onClick={createTask}>
                Add Task
              </button>
            </form>
          </Modal>

        )}
      </div>
    </DragDropContext>
  );
};

export default ProjectsGrid;
