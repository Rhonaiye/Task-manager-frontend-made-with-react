import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:4000/sign-up/';

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          first_name: firstName,
          last_name: lastName,
          password: password,
        }),
      });

      if (response.ok) {
        setError('');
        setSuccess('Account created successfully! Please log in.');
        setEmail('');
        setUsername('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setConfirmPassword('');
      } else if (response.status === 409) {
        setError('Username or email already exists.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-serif'>
      <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md'>
        <h2 className='text-3xl font-serif font-bold mb-4 text-center'>Signup</h2>
        <form onSubmit={handleSignup}>

          {/* First Row */}
          <div className='mb-4 flex flex-col md:flex-row gap-4'>
            <div className='w-full'>
              <label htmlFor='firstName' className='block text-gray-700 font-semibold mb-1'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                className='border-[1px] w-full rounded-md p-2'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className='w-full'>
              <label htmlFor='lastName' className='block text-gray-700 font-semibold mb-1'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                className='border-[1px] w-full rounded-md p-2'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className='mb-4 flex flex-col md:flex-row gap-4'>
            <div className='w-full'>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='border-[1px] w-full rounded-md p-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='w-full'>
              <label htmlFor='username' className='block text-gray-700 font-semibold mb-1'>
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
          </div>

          {/* Third Row */}
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-1'>
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

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className=' w-full rounded-md p-2 border-[1px]'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error or Success Messages */}
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          {success && <div className='flex justify-between '>
            <p className='text-green-500 text-sm mb-4'>{success}</p>
            <Link to='/login'> 
            <span className='text-blue-400'>login</span> 
             </Link>
          </div>}
          
          <div className='my-4 flex gap-5 md:justify-end items-center'>
            <p className='font-extralight text-gray-600 text-sm'>Already have an account? </p>
             <Link to='/login'> 
              <span className='text-blue-400 underline'>login</span> 
             </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-blue-500 text-white w-full p-2 rounded-md font-semibold'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
