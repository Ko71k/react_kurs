import logo from './logo.svg';
import {  useState } from "react"

function downloadFile(filename, file) {
    const element = document.createElement("a");
    element.setAttribute("href", window.URL.createObjectURL(file));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function Scores(props) {
    const downloadResult=() => {
        let resForTextFile=""
        for (let i = 0; i<scores.length; i++)
        {
            resForTextFile += `\n ${scores[i].name || "Player"} - ${scores[i].score}`;
        }
        const textFileBlob = new Blob([resForTextFile], {
            type: "text/plain"
        });
        const textFile = new File([textFileBlob], "file.txt");
        downloadFile("results.txt", textFile)
    }

    const [scores, setScores] = useState(JSON.parse(localStorage.getItem("scores") || "[]"))
    const clearResults=() => {
        setScores([])
        localStorage.removeItem("scores")
    }
    return (
    <div className="App">
        <h3>Score table</h3>
        <div className="ScoreTable">{scores.sort((a, b) => b.score - a.score).map((sc, i) => (<p key={i}>{i+1}.{sc.name || "Player"} - {sc.score}</p>))}</div>
        <button onClick={props.onExit}>Menu</button>
        <button onClick={downloadResult}>Get results</button>
        <button onClick={clearResults}>Clear results</button>
    </div>
    )
}

export default Scores;