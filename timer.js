import {  useState,useEffect } from "react"

function Timer(props){
    const [time, setTime] = useState(5)
    useEffect(() =>{
    const timeoutID=setTimeout(()=>{
        if (time > 0){
            setTime(time-1)
        }
    },1000)
    return () => clearTimeout(timeoutID)
    }, [time])
    useEffect(() =>{
        setTime(5)
    }, [props.result])
return (<div>{time}</div>)
}

export default Timer;