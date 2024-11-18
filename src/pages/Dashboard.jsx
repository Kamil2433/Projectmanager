import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import envVariables from "../helper/ApiKey";
import Navbar from '../component/Navbar/Navbar';
import Modal from "../component/Modals/modal";
import ProjectsGrid from '../component/projectgrid/Projectgrid';

const Dashboard = () => {

  const navigate = useNavigate();



        const [openmodal,setopenmodal]=useState(false);
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [members, setMembers] = useState('');
        const [deadline, setDeadline] = useState('');
        const [projects, setProjects] = useState([]);


  const handleAddTask = () => {
    setopenmodal(true);
  };



  const closeaddTask=()=>{
    setopenmodal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('auth-token'); // Fetch user token from localStorage

    try {
      const response = await axios.post(
        `${envVariables.API_URL}/api/project/create_project`,
        {
          name,
          description,
          members:members ? members.split(','):[], // Convert comma-separated string to array
          deadline,
        },
        {
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );


      if(response.status==403){
        alert("You are not authorized to create tasks")
      }

      alert('Project created successfully!');
      console.log(response.data);
      closeaddTask(); // Close the modal
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
      if (error.response?.status === 403) {
        alert('You are not authorized to create tasks.');
      } else {
        console.error('Error creating project:', error.response?.data || error.message);
        alert('Failed to create project. Please try again.');
      }
    }
  };


  useEffect(() => {

     const token = localStorage.getItem('auth-token');

     if(token){

       fetchProjects();
     }else{
      navigate('./signin')
     }
  }, [])
  

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('auth-token'); // Adjust token retrieval as per your auth setup
      const response = await axios.get(`${envVariables.API_URL}/api/project/get_projects`, {
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if(response.data){

        setProjects(response.data);
      }
      
    } catch (err) {
console.log(err)    
} 

  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ width: "100%", height: "10vh" }}>
        <Navbar />

        <div   style={{float:"right", margin:"5vh"}}>


        <button 
          onClick={handleAddTask} 
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          + Add Project
        </button>
        </div>
      </div>
      <div className='body'>
        {/* Content for the dashboard can go here */}
        <ProjectsGrid   fetchProjects={fetchProjects}/>
      </div>
      {openmodal  &&
  
         ( <Modal
          isOpen={openmodal}
          onClose={closeaddTask}
          header={"Add Project"}
          size={"xlarge"}
        >
  
<div   style={{display:"flex", alignContent:"center",alignItems:"center",height:"100%",justifyContent:"center"}}>  
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Add Project</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              ></textarea>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Members (comma-separated IDs)</label>
              <input
                type="text"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeaddTask}
              style={{
                marginLeft: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </form>
        </div>
        </div>
        </Modal>)
  
  
      }
    </div>

  );
}

export default Dashboard;
