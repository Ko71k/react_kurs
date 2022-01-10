import logo from './logo.svg';
import {  useState } from "react"
import Game from "./game"
import Scores from "./score"
import Rules from "./rules"

function App() {
  const [state, setState] = useState("menu")
  if (state == "game") return (
    <Game onExit={() => setState("menu")}/>
  )
  if (state == "scores") return (
    <Scores onExit={() => setState("menu")}/>
  )
  if (state == "rules") return (
    <Rules onExit={() => setState("menu")}/>
  )
  return (
    <div className="App">
      <h3>Math Game</h3>
      <div className="button_container">
        <button onClick={() => setState("game")}> New </button>
        <button onClick={() => setState("scores")}> Scores </button>
        <button onClick={() => setState("rules")}>Rules</button>
        <button onClick={window.close}> Exit </button>
      </div>
    </div>
  );
}

export default App;
