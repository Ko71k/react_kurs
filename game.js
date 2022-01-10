import logo from './logo.svg';
import {  useState,useEffect } from "react"
import Timer from "./timer.js"

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getSign(){
    const arr=["+","-","*","/"]
    return arr[getRandomNumberBetween(0,3)]
}

function saveResult(name, result) {
    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.push({name : name, score: result})
    localStorage.setItem("scores", JSON.stringify(scores))
}

function getExpression(){
    let a=getRandomNumberBetween(1,100);
    let b=getRandomNumberBetween(1,10);
    let c;
    const sign=getSign();
    switch (sign) {
        case "+":
            c=a+b;
            break;
        case "-":
            c=a-b;
            break;
        case "*":
            c=a*b;
            break;
        case "/":
            a=b*getRandomNumberBetween(1,10);
            c=a/b;
            break;
    }
    return [a,b,c,sign];
}

function Game(props) {
    const [result, setResult] = useState(0)
    const [name, setName] = useState("")
    const [values, setValues] = useState(getExpression())
    const [running, setRunning] = useState(true)

    useEffect(() => {
        const intervalID=setTimeout(() => {
        setRunning(false)
        }, 5000);
        return () => clearTimeout(intervalID)
    }, [result])

    const onAnswer=(sign) =>{
        if ((sign==values[3])|| (values[1]==1 && ((sign=="/") || (sign=="*")))) {
            setResult(result+1)
            setValues(getExpression())
        }
        else setRunning(false)
    }

    const onQuit=() =>{
        saveResult(name, result);
        props.onExit()
    }

    //Loss screen
    if (!running) return(
    <div className="App">
        <div>Loss   
        </div>
        <div>Score is {result}</div>
        <button onClick={() =>props.onExit()}>Menu(No save)</button>
        <div>Your name:</div>
        <input className="name" onChange={(e) =>setName(e.target.value)}/>
        <button onClick={() =>onQuit()}>Submit</button>
        <div>{values[0]} {values[3]} {values[1]} = {values[2]} </div>
    </div>
    )
    //Game screen
    return (
    <div className="App">
    <div>Score: {result}</div>
    <div>{values[0]} _ {values[1]} = {values[2]} </div>
    <Timer result={result}/>
    <div className="signButtonContainer">
        <div>
            <div className="signButton" onClick={() =>onAnswer("+")}>+</div>
            <div className="signButton" onClick={() =>onAnswer("-")}>-</div>
        </div>
        <div>
            <div className="signButton" onClick={() =>onAnswer("*")}>*</div>
            <div className="signButton" onClick={() =>onAnswer("/")}>/</div>
        </div>
    </div>
    </div>
  )
}

export default Game;