import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  function clear(){
    setPreState("");
    setCurState("");
    setInput("0");
  }

  const back = () =>{
    {preState ? setPreState(preState.slice(0,-1)) : setCurState(input.slice(0,-1))}
  }

  const handleClick = (e) =>{
    if (curState.includes(".") && e.target.value === ".") return;
    
    if (total) {
      setPreState("");
    }
    curState
      ? setCurState((pre) => pre + e.target.value)
      : setCurState(e.target.value);
    setTotal(false);
  }

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.value);
    if (curState === "") return;
    if (preState !== "") {

      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.value === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };


  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
    console.log(input);
  },[]);
  
  return (
    <div className="App">
      <div className = "container">
        <form >
          <input className='form' type="text" value={input ? input : preState}></input>
        </form>
        <div className='buttons'>
          <button onClick={clear} id='clear' className='highlight'>Clear</button>
          <button onClick = {back} id='backspace' className='highlight'>C</button>
          <button onClick={operatorType} value = "/" className='highlight'>&divide;</button>
          <button onClick={handleClick} value = "7">7</button>
          <button onClick={handleClick} value = "8">8</button>
          <button onClick={handleClick} value = "9">9</button>
          <button onClick={operatorType} className='highlight' value = "*">&times;</button>
          <button onClick={handleClick} value = "4">4</button>
          <button onClick={handleClick} value = "5">5</button>
          <button onClick={handleClick} value = "6">6</button>
          <button onClick={operatorType} value = "-" className='highlight'>&ndash;</button>
          <button onClick={handleClick} value = "1">1</button>
          <button onClick={handleClick} value = "2">2</button>
          <button onClick={handleClick} value = "3">3</button>
          <button onClick={operatorType} value = "+" className='highlight'>+</button>
          <button onClick={handleClick} value = "0">0</button>
          <button onClick={handleClick} value = ".">.</button>
          <button onClick={equals} value = "=" className='highlight' id='result'>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
