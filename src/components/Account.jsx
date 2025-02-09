/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ReservedBooks from "./ReservedBooks";
import fetchAccuntInfo from "../API/fetchAccountInfo";

function Account({ setToken, token }) {
  const [myFirstName, setMyFirstName] = useState(null);
  const [myLastName, setMyLastName] = useState(null);
  const [myEmail, setMyEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    try {
      if (token) {
        async function gatherAccountInfo() {
          const myInfo = await fetchAccuntInfo(token);
          setMyFirstName(myInfo.firstname);
          setMyLastName(myInfo.lastname);
          setMyEmail(myInfo.email);
        }
        gatherAccountInfo();
      }
    } catch (e) {
      console.error("Unable to gather account info.", e);
    }
  },[])

  function handleClick() {
    setToken(null);
    localStorage.removeItem('token');
    navigate(`/`);
  }

  return (
    <>
      <h2>My Account</h2>

      {!token && (<h3>You must be logged in to see your account.</h3>)}
      {token && (
        <>
          <h3>Name: {myFirstName} {myLastName}</h3>
          <h3>Email: {myEmail}</h3>
          <h3>Books Checked Out:</h3>
          <ReservedBooks token={token} />
          <button onClick={handleClick}>Log Out</button>
        </>
      )}
    </>
  )
}
export default Account