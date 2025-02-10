import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import bookLogo from './assets/books.png'
import Navigations from './components/Navigations';
import GreetingPage from './components/GreetingPage';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
        setToken(storedToken);
    }
});

  return (
    <>
      <div className='page_content'>
        <div className='top_nav_bar'>
          <h1 className='site_title'><img id='logo-image' src={bookLogo}/>Laura's Library</h1>
          <Navigations token={token}/>
        </div>
        
        <div className='main_section'>
          <Routes>
            <Route path='/' element={<GreetingPage />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/:id' element={<SingleBook token={token} />} />
            <Route path='/login' element={<Login setToken={setToken}/>} />
            <Route path='/register' element={<Register setToken={setToken} />} />
            <Route path='/account' element={<Account setToken={setToken} token={token} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
