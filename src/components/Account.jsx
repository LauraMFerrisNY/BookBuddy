/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import fetchAccountInfo from "../API/fetchAccountInfo"

function Account({ setToken, token }) {
  const [myAccountInfo, setMyAccountInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    try {
      if (token) {
        async function gatherAccountInfo() {
          const accountInfo = await fetchAccountInfo(token);
          setMyAccountInfo(accountInfo);
        }
        gatherAccountInfo();
      }
    } catch (e) {
      console.error("Unable to gather account info.", e);
    }
  },[])

  function handleClick() {
    setToken(null);
    navigate(`/`);
  }

  return (
    <>
      <h2>My Account</h2>

      {/* {error && <p className='authentication_error'>{error}</p>}
      {myName && <h3>Name: {myName}</h3>}
      {myEmail && <h3>Email: {myEmail}</h3>}
      {myBooks && <h3>Currently Checked Out: {myBooks}</h3>}
      {emptyBookshelfMessage && <h3>{emptyBookshelfMessage}</h3>} */}

      {!token && (<h3>You must be logged in to see your account.</h3>)}
      {token && (
        <>
          <h3>Name: {myAccountInfo.firstname} {myAccountInfo.lastname}</h3>
          <h3>Email: {myAccountInfo.email}</h3>
          <h3>Books Checked Out: {myAccountInfo.books}</h3>
          <button onClick={handleClick}>Log Out</button>
        </>
      )} 
    </>
  )
}
export default Account