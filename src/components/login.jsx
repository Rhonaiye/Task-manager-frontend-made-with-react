import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Check login status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:4000/login/'; // Update with your FastAPI login endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setError('');
        setIsLoggedIn(true); // Set login status
        navigate('/');
        console.log(data.access_token);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setIsLoggedIn(false); // Update login status
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-serif'>
      <div className='bg-white p-6 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          {isLoggedIn ? 'Welcome Back!' : 'Login'}
        </h2>
        {isLoggedIn ? (
          <div className='text-center'>
            <p className='mb-4'>You are logged in.</p>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white w-full p-2 rounded-md font-semibold'
            >
              Log Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='border-[1px] w-full rounded-md p-2'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='border-[1px] w-full rounded-md p-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <div className='my-4 flex gap-5 items-center'>
              <p className='font-extralight text-gray-600 text-sm'>Don't have an account? </p>
              <Link to='/sign-up'>
                <span className='text-blue-400 underline'>Sign Up</span>
              </Link>
            </div>

            <button
              type='submit'
              className='bg-blue-500 text-white w-full p-2 rounded-md font-semibold'
            >
              Log In
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default Login;
