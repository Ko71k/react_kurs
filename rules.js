
function Rules(props) {
    return (
        <div className="App">
        <div>1.The game shows an expression.</div>
        <div>You must choose the appropriative sign.</div>
        <div>2.You have 5 seconds for an answer.</div>
        <div>If the time expires or you choose the wrong answer, game is over.</div>
        <button onClick={() =>props.onExit()}>Menu</button>
        </div>
    )
}
export default Rules;
