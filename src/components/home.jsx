import React, { useState, useEffect } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completeTask, setCompleted] = useState([]);
  const [Taskname, setTaskName] = useState('');
  const [TaskDesc, setTaskDesc] = useState('');
  const [error, setError] = useState('');
  const [Logged, setLogged] = useState(false);
  const [Userdata, setUserdata] = useState(null);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User might not be authenticated.');
        setLogged(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:4000/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserdata(data);
          setLogged(true); // User is authenticated
        } else {
          console.error('Failed to fetch user details. Unauthorized or expired token.');
          setLogged(false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!Logged) return; // Prevent fetching if not logged in

      const apiUrl = 'http://127.0.0.1:4000/get-incomplete-todo/';
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [Logged]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (!Logged) return; // Prevent fetching if not logged in

      const apiUrl = 'http://127.0.0.1:4000/get-completed-todo/';
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCompleted(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompletedTasks();
  }, [Logged]);

  const deleteTask = async (id) => {
    const apiUrl = `http://127.0.0.1:4000/delete-todo/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    // Input validation
    if (!Taskname.trim() || !TaskDesc.trim()) {
      setError('Both task name and description are required.');
      return; // Prevent further execution if validation fails
    }

    const apiUrl = `http://127.0.0.1:4000/create-todo`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: Taskname,
          description: TaskDesc,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeTasks = async (id) => {
    const apiUrl = `http://127.0.0.1:4000/complete-task/${id}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.reload();
      } else if (response.status === 404) {
        console.error('Task not found');
      } else if (response.status === 406) {
        console.error('Task already complete');
      } else {
        console.error('Error completing task:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <>
      <div className='p-2 mt-5'>
      <div>
          <p className='font-bold text-2xl md:ml-10 ml-3 mb-[5vh] flex'>
            Hello,<span className='ml-2'>{Userdata ? Userdata.username : 
                                     <span> please 
                                       <Link to="login"> <span className='uppercase bg-blue-300 p-2 px-4 rounded-md text-xl text-slate-100 '> login </span> </Link>
                                     </span>}</span>
          </p>
        </div>

        <h1 className='font-bold text-2xl text-center mb-4'>Your pending Tasks</h1>
        <ol>
          {tasks.map((task) => (
            <div key={task.id} className='bg-slate-100 mb-4 px-3 py-2 rounded-md'>
              <div className='flex justify-between items-center'>
                <p className='font-extrabold text-xl uppercase'>{task.title}</p>

                <div className='flex gap-3'>
                  <button className='text-green-600' onClick={() => completeTasks(task.id)}>
                    <FaCheckSquare size={23} />
                  </button>
                  <button className='text-red-600' onClick={() => deleteTask(task.id)}>
                    <MdDelete size={23} />
                  </button>
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <li className='text-sm font-extralight text-gray-700'>
                  {task.description}
                </li>
              </div>
            </div>
          ))}
        </ol>
      </div>

      <div className='p-2 mb-[30vh]'>
        <h1 className='font-bold text-2xl text-center underline text-slate-700 mb-3'>Completed Tasks</h1>
        {completeTask.map((task) => (
          <div key={task.id} className='bg-slate-100 mb-4 px-3 py-3 rounded-md'>
            <div className='flex justify-between items-center uppercase'>
              <p className='font-bold text-xl'>{task.title}</p>
              <p className='text-sm lowercase bg-slate-200 px-2 rounded-sm'>completed</p>
            </div>

            <div className='flex gap-2 items-center'>
              <p className='text-sm font-extralight text-gray-700'>
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='fixed left-0 right-0 bottom-0 pb-[6vh] backdrop-blur-md bg-white bg-opacity-50 py-4 px-2 rounded-md'>
        <div className='flex gap-2'>
          <input
            type='text'
            className='border-[1px] w-2/5 rounded-md pl-2'
            placeholder='Task name'
            onChange={(e) => {
              setTaskName(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
          <input
            type='text'
            className='w-3/4 rounded-md pl-2 border-[1px]'
            placeholder='Description'
            onChange={(e) => {
              setTaskDesc(e.target.value);
              setError(''); // Clear error on input change
            }}
          />
          <button
            className='bg-blue-300 w-1/4 p-2 rounded-md text-white font-bold text-xl'
            onClick={() => {
              if (Logged) {
                createTask();
              } else {
                setError('You need to be logged in to create a task.');
              }
            }}
            disabled={!Logged} // Disable button if not logged in
          >
            Create
          </button>
        </div>

        {error && (
          <p className='text-red-500 text-sm mt-2'>{error}</p>
        )}
        {!Logged && (
          <p className='text-red-500 text-sm mt-2'>You need to be logged in to see your tasks or create new ones.</p>
        )}
      </div>
    </>
  );
};

export default Home;
