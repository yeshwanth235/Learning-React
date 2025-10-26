
const Concept = () => {
  return (
   <div>
    <p>useEffect is used to connecting with external system</p>
    <p className="text-cyan-800 text-lg mt-5">useEffect run after rendering and let you: </p>
    <ul className="list-disc ml-5">
     <li>
      Fetch data from an API endpoint
     </li>
     <li>
      Subscribe to an event like window resize or scroll
     </li>
     <li>
      Manually change the DOM
     </li>
     <li>
      Set up timer
     </li>
    </ul>

    <p className="text-cyan-800 text-lg">Three useEffect patterns</p>
    <ul className="list-disc ml-5">
     <li>
      Runs after every render if no dependency array is provided
     </li>
     <li>
      Runs only once after the initial render if provided with an empty dependency array
     </li>
     <li>
      Runs only when one of the dependencies has changed if provided with a non-empty dependency array
     </li>
    </ul>

    <p className="text-cyan-800 text-lg">Last but not least clean up function</p>
    <p>Cleanup - runs before component unmounts or before re-running effect</p>
   </div>
  )
}

export default Concept