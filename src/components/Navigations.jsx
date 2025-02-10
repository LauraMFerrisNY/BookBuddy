import { Link } from "react-router-dom";

function Navigations({ token }) {
  return (
    <>
      <div className="nav_bar_links">
        <Link to='/'>Home</Link>
        <Link to='/books'>Books</Link>
        {!token && <Link to='/login'>Log In</Link>}
        {token && <Link to='/account'>My Account</Link>}
      </div>
    </>
  )
}
export default Navigations