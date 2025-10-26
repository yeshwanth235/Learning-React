import { useNavigate } from "react-router-dom"



const Challenges = () => {

 const navigation = useNavigate();
 const goToChallenge1 = () => {
  navigation("/useEffect/challenge-1")
 }

 return (
  <div>
    <h1 className="text-xl">Challenges Page</h1>

    <p>useEffect Chanllenges</p>
    <ul className="list-disc ml-5 cursor-pointer text-cyan-500 hover:text-cyan-600">
     <li onClick={goToChallenge1}>Challenge 1</li>
    </ul>
  </div>
 )
}

export default Challenges