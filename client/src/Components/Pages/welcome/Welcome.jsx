import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome(props) {

    const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login")
    console.log("L'utilisateur s'est connecté");
  };

  return (
    <div>
      <h1>Bienvenue {props.name}!</h1>
      <p>Merci de vous être inscrit sur notre application.</p>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Welcome;
