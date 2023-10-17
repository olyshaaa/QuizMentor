import React from 'react'

const Header = ({username, handleLogout}) => {
  return (
    <header>
        <div>header</div>
        <div>username: {username}</div>
        <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header