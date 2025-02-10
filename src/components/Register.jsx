import { useState } from "react"
import { useNavigate } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

function Register( {setToken} ) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (userFirstName.length < 1) {
        setError("Invalid first name.");
        setToken(null);
      } else if (userLastName.length < 1) {
        setError("Invalid last name.");
        setToken(null);
      } else if (userEmail.length < 1) {
        setError("Invalid email.");
        setToken(null);
      } else if (userPassword.length < 8) {
        setError("Your password must contain 8 or more characters");
        setToken(null);
      } else {
        const response = await fetch(`${API_URL}/users/register`, {
          method: 'POST',
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            firstname: userFirstName, 
            lastname: userLastName,
            email: userEmail,
            password: userPassword})
        });
        const result = await response.json();
        setError(null);
        if (result.token) {
          setToken(result.token);
          localStorage.setItem('token', result.token);
          navigate(`/account`);
        }
        }
    } catch (error) {
        setError(error.message);
    }
  }


  return (
    <>
      <h2>Register for a Library Account</h2>

      <form className="registration_form" onSubmit={handleSubmit}>
        <label className='first_name_form'>
          First Name: 
          <input type='text' value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)}/>
        </label>
        <label className='last_name_form'>
          Last Name: 
          <input type='text' value={userLastName} onChange={(e) => setUserLastName(e.target.value)}/>
        </label>
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
    </>
  )
}
export default Register