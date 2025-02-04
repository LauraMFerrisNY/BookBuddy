/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react"

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword})
      });
      const result = await response.json();
      console.log(result);
      setError(null);
      setToken(result.token);
    } catch (error) {
        setError(error.message);
    }
  }

  return (
    <>
      <h2>Login</h2>

      {error && <p className='submission_error'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className='email_form'>
          Email: 
          <input type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
        </label>
        <label className='password_form'>
          Password:
          <input type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
        </label>
        <label className='submit_button'>
          <button>Submit</button>
        </label>
      </form>
    </>
  )
}
export default Login