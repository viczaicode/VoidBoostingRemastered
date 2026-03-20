import React from 'react'
import useAuthContext from '../contexts/AuthContext'

export default function MainPage() {

    const { user } = useAuthContext();
  return (
    <div>
        <h1>MainPage</h1>
        <p>User: { user === null? "Not logged in!":user.name}</p>
    </div>
  )
}
