import { useEffect, useState } from "react"


const Example1 = () => {

 const [count, setCount] = useState(0)

 // Runs only once after the initial render
 useEffect(() => {
  console.log('This line runs only once after the initial render. Runs in only mounted')
 }, [])

 // Runs every time count value changes
 useEffect(() => {
   console.log(`Count value changed to: ${count}`)
 }, [count])

 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">Use Effect Example 1</p>
   <p>Run useEffect withoug a dependecny which update a useState. we can observer useEffect is running a loop.</p>
   <p>This is because useEffect will run for every render</p>
   <pre className="bg-gray-200 p-3 rounded-md overflow-x-auto">
    <code>
     {
      `useEffect(() => {
       setCount(prev => prev + 1)}) 
       console.log("logging count: ", count)
      }`
     }
    </code>
   </pre>
   
   <p className="mt-5">Check the console</p>
   <p>Below line runs only once</p>
   <p>This line runs only once after the initial render. Runs in only mounted</p>
   <br />

   <div className="flex gap-3 items-center">
    <p>Click the button which triggers a useEffect everytime the count changes</p>
    <button className="rounded-md text-white bg-orange-400 hover:bg-orange-500 p-1" onClick={() => setCount(prev => prev+1)}>
     Click Me
    </button>
   </div>
   
  </div>
 )
}

export default Example1