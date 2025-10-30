import { useEffect, useRef, useState } from "react";


const Concept = () => {
  return (
   <div>
    <p>useRef is a hook that lets you reference a value that's not needed for rendering </p>
    <p className="text-cyan-800 text-lg mt-5">
     useRef create a mutable reference that: 
    </p>
    <ul className="list-disc ml-5">
     <li>Persists across renders</li>
     <li>Doesn't trigger re-renders when changed</li>
     <li>Can hold any value (not just DOM elements)</li>
    </ul>

    <p className="text-cyan-800 text-lg mt-5">Three main use cases</p>
    <AccessDomElements />
    <StoringMutableValues />
    <TrackingPreviousState />
   </div>
  )
}

const AccessDomElements = () => {
 const inputRef = useRef(null);

 const focusInput = () => {
  inputRef.current.focus();
 }

 return (
  <div>
   <p>Accessing DOM elements</p>
   <input className="border mr-3" ref={inputRef} type="text" />
   <button className="p-1 bg-orange-300 hover:bg-orange-400 text-white rounded-sm" onClick={focusInput}>Focus Input</button>
  </div>
 )
}

const StoringMutableValues = () => {

 const [count, setCount] = useState(0);
 const intervalRef = useRef(null);

 const startTimer = () => {
  intervalRef.current = setInterval(() => {
   setCount((prevCount) => prevCount + 1);
  }, 1000);
 }

 const stopTimer = () => {
  clearInterval(intervalRef.current);
 }

 return (
  <div className="mt-5">
   <p>Storing Mutable values without re-render</p>
   <p>Count: {count}</p>
   <button onClick={startTimer} className="p-1 bg-orange-300 hover:bg-orange-400 text-white rounded-sm mr-3">Start</button>
   <button onClick={stopTimer} className="p-1 bg-orange-300 hover:bg-orange-400 text-white rounded-sm">Stop</button>
  </div>
 )
}

const TrackingPreviousState = () => {
 const [count, setCount] = useState(0);
 const prevValue = useRef(null);

 useEffect(() => {
  prevValue.current = count;
 }, [count])

 return (
  <div className="mt-5">
   <p>Tracking previous value</p>
   <p>Count: {count}</p>
   <p>Previous value: {prevValue.current}</p>
   <button 
    className="p-1 bg-orange-300 hover:bg-orange-400 text-white rounded-sm"
    onClick={() => setCount(count + 1)}
   >
    Increment
   </button>
  </div>
 )
}

export default Concept