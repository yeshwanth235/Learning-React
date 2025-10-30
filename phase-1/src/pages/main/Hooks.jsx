import { useNavigate } from "react-router-dom";


const Hooks = () => {
 const navigation = useNavigate();
 const goToRoute = (value) => {
  navigation(`/${value}`)
 }
 return (
  <div>
   <h1 className="text-xl">Hooks Page</h1>
   <ul className="list-disc ml-5 cursor-pointer text-cyan-500 hover:text-cyan-600">
     <li onClick={() => goToRoute('useEffect')}>useEffect</li>
     <li onClick={() => goToRoute('useCallback-useMemo')}>useCallback-useMemo</li>
     <li onClick={() => goToRoute('useRef')}>useRef</li>
    </ul>
  </div>
 )
}

export default Hooks