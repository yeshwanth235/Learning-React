import { useEffect, useState } from "react"

const Example4 = () => {

 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 const fetchUser = async (signal) => {
  try {
   setLoading(true)
   setError(null)
   const response = await fetch('https://randomuser.me/api/', { signal })
   const data = await response.json()
   setUser(data.results[0])
  }catch(err) {
   setError('Failed to fetch user data')
  }
  setLoading(false)
 }

 useEffect(() => {
  const abortController = new AbortController()
  fetchUser(abortController.signal)
  return () => {
   abortController.abort()
  }
 }, [])

 if(loading) {
  return (
   <div className="mt-4 flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
   </div>
  )
 }

 // if(error) {
 //  return (
 //   <div className="mt-4 p-8 bg-red-100 border border-red-400 rounded-md">
 //    <p className="text-red-400">Error: {error}</p>
 //   </div>
 //  )
 // }

 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">Use Effect Example 4</p>
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

   <div className="p-4 lg:p-8 max-w-md mx-auto mt-10">
    {user && (
     <div>
      <img 
      src={user.picture.medium}
      alt={user.name.first}
      className="w-full object-cover"
      />
      <div>
       <h2 className="text-xl font-bold">
        {user.name.first} {user.name.last}
       </h2>
       <p className="text-gray-600 mb-2">
        {user.email}
       </p>
       <p>
        {user.location.city}, {user.location.country}
       </p>
       <button onClick={() => fetchUser()} className="w-full bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-md mt-4">
        Load New User
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
  
 )
}

export default Example4