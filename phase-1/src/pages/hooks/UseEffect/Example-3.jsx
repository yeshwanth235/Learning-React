import { useEffect, useState } from "react"


const Example3 = () => {
 const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight
 })

 const handleResize = () => {
   setWindowSize({
     width: window.innerWidth,
     height: window.innerHeight
    })
  }

 useEffect(() => {
  window.addEventListener('resize', handleResize())

  return () => {
   window.removeEventListener('resize', handleResize())
  }
 },[])

 const getDeviceType = () => {
  if(windowSize.width < 768) return {type: 'Mobile', color: 'bg-red-500'}
  if(windowSize.width < 1024) return {type: 'Tablet', color: 'bg-yellow-500'}
  return {type: 'Desktop', color: 'bg-green-500'}
 }

 const device = getDeviceType()

 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">Use Effect Example 3</p>
   <p>Goal: Track and display window dimensions with proper event cleanup.</p>
   <p>Requirements: </p>
   <ul className="list-disc ml-5">
    <li>
     Display current window width and height
    </li>
    <li>
     Update dimensions on window resize
    </li>
    <li>
     Show a visual indicator when window is mobile (&lt;768px), tablet (&lt;1024px), or desktop (&gt;1024px)
    </li>
    <li>
     Clean up event listener properly on component unmount
    </li>
   </ul>


   <div className={`mt-2 p-8 ${device.color} rounded-lg flex items-center justify-center transition-colors duration-300`}> 
    <div className="bg-white p-3 lg:p-6 rounded-lg shadow-2xl mr-2">
     <h1 className="text-base lg:text-3xl font-bold text-gray-400">
      Window Size tracker
     </h1>
    </div>
    <div className="text-sm lg:text-lg">
     <p><span className="font-semibold">Width:</span> {windowSize.width}px</p>
     <p><span className="font-semibold">Height:</span> {windowSize.height}px</p>
     <p><span className="font-semibold">Device:</span> {device.type}</p>
    </div>

   </div>
  </div>
 )
}

export default Example3