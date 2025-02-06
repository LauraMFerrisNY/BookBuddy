/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";

function Navigations() {
  return (
    <>
      <div className="nav_bar_links">
        <Link to='/'>Home</Link>
        <Link to='/books'>Books</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/account'>My Account</Link>
      </div>
    </>
  )
}
export default Navigations