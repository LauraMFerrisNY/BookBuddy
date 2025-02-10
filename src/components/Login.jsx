import { useState } from "react"
import { useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

function Login({ setToken }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      if (result.token) {
        setToken(result.token);
        setError(null);
        localStorage.setItem('token', result.token);
        navigate(`/account`);
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
        setError("Invalid Credentials");
    }
  }

  return (
    <>
      <h2>Login</h2>

      <div className="login_form">
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

        {error && <p className='submission_error'>{error}</p>}

        <button onClick={()=> navigate(`/register`)}>New to our Library? Click here to create an account.</button>
      </div>
    </>
  )
}
export default Login