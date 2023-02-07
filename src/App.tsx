import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isCountStart, setIsCountStart] = useState(false);
  let timer = useRef<ReturnType<typeof setTimeout> | null >(null)
  const interval = useCallback(
    () =>
      setInterval(() => {
        setCount((count) => count + 1);
      }, 1000),
    []
  );
  const startCount = () => {
    setIsCountStart((prev) => !prev);
  };
  const reset = ()=>{
    setCount(0)
    setIsCountStart(false)
  }

  const clearTimer = ()=>{
    timer.current && clearTimeout(timer.current);
  }

  useEffect(() => {
    if (isCountStart) {
     timer.current = interval();
    } else {
      clearTimer()
      timer.current=null
    }
    return ()=>{
      clearTimer()
    }
   
  
  }, [isCountStart,timer,interval]);

  return (
    <>
      <strong>Count: </strong>
      {count}
      <br />
      <button onClick={startCount}>{isCountStart ? "Pause" : "Play"}</button>
      <button onClick={reset} >Reset</button>
    </>
  );
}

export default App;
