import React, { useState } from "react";


function Form() {
  const [state, setState] = useState({username: "", password: ""})
  const [isActive, setIsActive] = useState(false);

  const correctUser = "Kasper";
  const correctPassword = "test123";

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    e.preventDefault();
  }

  //SECURITY CHECKS

  //Prevent XSS attack
  function escapeHTML(txt) {
    return txt
         .replace(/&/g, "")
         .replace(/</g, "")
         .replace(/>/g, "")
         .replace(/"/g, "")
         .replace(/'/g, "");
    }

  function handleClick(e) {
    
    if(state.username == correctUser && state.password == correctPassword) {
      setIsActive(current => !current);
    }
    else if (state.username.length == 0 || state.password.length == 0) {
      alert("Username or password cannot be empty!")
    }
    else if (state.username != correctUser){
      alert("User " + state.username + " does not exist.")
    }
    else if (state.username == correctUser && state.password != correctPassword){
      alert("Incorrect password for user " + state.username + ".")
    }
    
    e.preventDefault();
  };

  return (
    <form >
        <div style={{display: !isActive ? 'block' : 'none',}}>
        <h1 style={{fontSize:"20px"}}>Innlogging</h1>
        <p>Test user:
          <ul>
            <li>Username: Kasper</li>
            <li>Passord: test123</li>
          </ul>
        </p>
        <label>
          Username
          <br></br>
          <input
            type="text"
            name="username"
            value={escapeHTML(state.username)}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Passord
          <br></br>
          <input
            type="password"
            name="password"
            value={escapeHTML(state.password)}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <button onClick={handleClick} class="button-3" role="button">Logg inn</button>
        </div>

        <div id="loggedIn" style={{display: isActive ? 'block' : 'none',}}>

          <h1 style={{fontSize:"20px"}}>Velkommen {state.username}!</h1>

          <div id='gif' >
            <p style={{color:"green", fontWeight:"bold", padding:"5px"}}>Success!</p>
          </div>

          <p id="disp" style={{ display: isActive ? 'block' : 'none',}}>Velkommen {state.username}, du er nå logget inn!</p>
          <button style={{backgroundColor: "red", float: "right"}}onClick={handleClick} class="button-3" role="button">Logg ut</button>
        </div>
        <br></br>
        <br></br>
      </form>
  );
}

export default Form;