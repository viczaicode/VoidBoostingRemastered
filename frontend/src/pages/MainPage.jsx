import React from 'react'
import logo2 from "../logo2.png";
import useAuthContext from '../contexts/AuthContext'
import TypeWriter from '../components/TypeWriter';

export default function MainPage() {

    const { user } = useAuthContext();
    const welcomeText =
    "Welcome, summoner. Your ascension begins.\nLet the Void carry you to the rank you deserve.";
  return (
    <div>

        <div className="udvozlo">
        <img src={logo2} className="App-logo2" alt="logo" />

        <p className="typing-text">
          <span className="intro-bold">
            <TypeWriter text={welcomeText.split("\n")[0]} />
          </span>
          <br />
          <br />
          <TypeWriter text={welcomeText.split("\n")[1]} />
        </p>
      </div>

        <h1>MainPage</h1>
        <p>User: { user === null? "Not logged in!":user.nickname}</p>
    </div>
  )
}
