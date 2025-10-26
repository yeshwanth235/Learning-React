import { useEffect, useState } from "react"

const Example2 = () => {
 const [time, setTime] = useState(new Date())
 const [isRunning, setIsRunning] = useState(true)

 useEffect(() => {
  if(!isRunning) return
  let intervalRef = null
  intervalRef = setInterval(() => {
    setTime(new Date())
  }, 1000)
  return () => {
   clearInterval(intervalRef)
  }
 }, [isRunning])


 const formatTime = (date) => {
  return date.toLocaleTimeString()
 }

 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">Use Effect Example 2</p>
   <p>Goal: Build a clock that updates every second and cleans up properly</p>
   <p>Requirements: </p>
   <ul className="list-disc ml-5">
    <li>
     Display current time (HH:MM:SS)
    </li>
    <li>
     Update time every second
    </li>
    <li>
     Add START and STOP buttons
    </li>
    <li>
     Clean up the timer component on unmount
    </li>
   </ul>

   <div className="mt-2">
    <div className="text-xl">
     { formatTime(time) }
    </div>
    <button className="p-1 rounded-md text-white bg-orange-400 hover:bg-orange-500 mr-2"
    onClick={() => setIsRunning(true)}>
     START
    </button>
    <button className="p-1 rounded-md text-white bg-orange-400 hover:bg-orange-500"
    onClick={() => setIsRunning(false)}>
     STOP
    </button>
   </div>


  </div>
 )
}

export default Example2