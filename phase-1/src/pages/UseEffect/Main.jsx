
import Concept from "./Concept"
import Example1 from "./Example-1"
import Example2 from "./Example-2"
import Example3 from "./Example-3"
import Example4 from "./Example-4"

const Main = () => {
  return (
   <div className="m-5 lg:m-20">
    <h1 className="text-xl">useEffect Hook</h1>
    <div className="m-2 lg:m-5">
     <Concept />
     <Example1 />
     <Example2 />
     <Example3 />
     <Example4 />
    </div>
   
   </div>
  )
}

export default Main