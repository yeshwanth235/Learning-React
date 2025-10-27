import { useCallback, useMemo, useState } from "react"


const Concept = () => {
 return (
  <div>
   <h2 className="text-cyan-800 text-lg">useCallBack - Memoize functions</h2>
   <ul className="list-disc ml-5">
    <li>
     Prevent unnecessary recreation of functions
    </li>
    <li>
     Optimize child component re-renders
    </li>
    <li>
     Critical when passing callBacks to optimized components
    </li>
   </ul>

   <h2 className="text-cyan-800 text-lg mt-5">UseMemo - Memoize values</h2>
   <ul className="list-disc ml-5">
    <li>
     Cache expensive calculations
    </li>
    <li>
     Prevent re-calculating on every re-render
    </li>
    <li>
     Return memoized value, not a function
    </li>
   </ul>

   <div className="mt-5">
    <p>Problem</p>
    <ProblemParentComponent />
   </div>

   <div className="mt-5">
    <p>Solution</p>
    <ParentComponent />
   </div>
  </div>
 )
}


const ProblemParentComponent = () => {

 const [count, setCount] = useState(0)
 const [name, setName] = useState('')

 const handleClick = () => {
   console.log('Button clicked')
 }

 // A reference is created for every re-render
 console.log(handleClick)


 // Expensive calculation re-triggers on every re-render
 const expensiveCalculation = () => {
   console.log('re-triggered')
   let result = 0
   for(let i=0; i<1000000; i++) {
    result = result + i;
   }
   return result
 }

 return (
  <div>
   <input 
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="border border-gray-300 rounded-md"
   />
   <br />
   <button
    onClick={handleClick}
    className="mt-2 p-1 bg-blue-500 text-white rounded-md"
   >
     Click it
   </button>
   <p>Result: {expensiveCalculation()}</p>
  </div>
 )
}

const ParentComponent = () => {
 const [count, setCount] = useState(0)
 const [name, setName] = useState('')

 const handleClick = useCallback(() => {
  console.log('Clicked...', count)
 }, [count])

 // console.log(handleClick)


 const expensiveCalculation = useMemo(() => {
   console.log('Calculating...')
   let result = 0 
   for(let i=0; i<1000; i++) {
    result = result + i;
   } 
   return result
 }, [count])

 return (
  <div>
   <input 
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="border border-gray-300 rounded-md"
   />
   <br />
   <button
    onClick={handleClick}
    className="mt-2 p-1 bg-blue-500 text-white rounded-md mr-3"
   >
     Click it
   </button>
   <button
    onClick={() => setCount(count + 1)}
    className="mt-2 p-1 bg-blue-500 text-white rounded-md"
   >
     Increase count
   </button>
   <p>Count: {count}</p>
   <p>Result: {expensiveCalculation}</p>
  </div>
 )
}

export default Concept