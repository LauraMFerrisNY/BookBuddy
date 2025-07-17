import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ReservedBooks from "./ReservedBooks";
import fetchAccountInfo from "../API/fetchAccountInfo";

function Account({ setToken, token }) {
  const [myFirstName, setMyFirstName] = useState(null);
  const [myLastName, setMyLastName] = useState(null);
  const [myEmail, setMyEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    try {
      if (token) {
        async function gatherAccountInfo() {
          const myInfo = await fetchAccountInfo(token);
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
      <div className="account_header">
        <h2>My Account</h2>

        {token && <div><button onClick={handleClick}>Log Out</button></div>}
      </div>

      {!token && (<h3>You must be logged in to see your account.</h3>)}
      {token && (
        <div className="account_content">
          <h3>Name: {myFirstName} {myLastName}</h3>
          <h3>Email: {myEmail}</h3>
          <h3>Books Checked Out:</h3>
          <ReservedBooks token={token} />
        </div>
      )}
    </>
  )
}
export default Account