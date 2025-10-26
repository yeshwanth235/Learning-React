import { useEffect, useState } from "react"

const Challenge1 = () => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [time, setTime] = useState(new Date())

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  const fetchUser = async (signal) => {
    try {
      setLoading(true)
      setError(null)
      let res = await fetch('https://randomuser.me/api/', { signal })
      let data = await res.json()
      setUser(data.results[0])
    } catch(err) {
      setError('Failed to fetch user data')
    }
    setLoading(false)
  }

  const getDeviceType = () => {
    if(windowSize.width < 768) return {type: 'Mobile', color: 'bg-red-500'}
    if(windowSize.width < 1024) return {type: 'Tablet', color: 'bg-yellow-500'}
    return {type: 'Desktop', color: 'bg-green-500'}
  }


  useEffect(() => {
    const abortController = new AbortController()
    //fetch random user data
    fetchUser(abortController.signal)

    // trigger resize event listener
    window.addEventListener('resize', handleResize)


    // set interval to update time every second
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      // remove resize event listener on unmount
      window.removeEventListener('resize', handleResize)

      // abort fetch request on unmount
      abortController.abort()

      // clear interval on unmount
      clearInterval(intervalId)
    }
  }, [])

  const device = getDeviceType()

  const formatTime = (date, value) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    switch (value) {
      case 'hours':
        return hours
      case 'minutes':
        return minutes
      case 'seconds':
        return seconds
      default:
        break;
    }
  }

  return (
    <div>
      <h1 className="text-2xl text-green-600 text-center">User Dashboard</h1>
      <div>
        <div className="flex flex-col justify-center align-center bg-fuchsia-300 w-sm p-2 lg:p-4 rounded-sm text-white">
          <div className="font-semibold pb-1">
            <h1>Current Time</h1>
          </div>
          <div className="flex">
            <div className="p-1 bg-fuchsia-400 rounded-sm">{formatTime(time, 'hours')}</div>
            <div className="p-1 text-fuchsia-400">:</div>
            <div className="p-1 bg-fuchsia-400 rounded-sm">{formatTime(time, 'minutes')}</div>
            <div className="p-1 text-fuchsia-400">:</div>
            <div className="p-1 bg-fuchsia-400 rounded-sm">{formatTime(time, 'seconds')}</div>
          </div>
        </div>

        <div className={`flex flex-col justify-center align-center w-sm ${device.color} text-white p-2 lg:p-4 rounded-md mt-4`}>
          <div className="font-semibold pb-1">
            <h3>Window dimensions</h3>
          </div>
          <p><span>Width: </span> {windowSize.width}px</p>
          <p><span>Height: </span> {windowSize.height}px</p>
          <p><span>Device: </span> {device.type}</p>
        </div>

        <div className="bg-gray-300 mt-4 w-sm rounded-md p-4">
          {
            loading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-18 w-18 border-b-8 border-blue-400"></div>
              </div>
            )
          }
          {
            error && (
              <div className="bg-red-100 p-4 rounded-md">
                <p className="text-red-500">{error}</p>
              </div>
            )
          }
          {user && !loading && !error && (
            <div>
              <div>
                <img 
                  src={user.picture.medium}
                  alt={user.name.first}
                  className="w-sm object-cover rounded-md"
                />
              </div>
              <div className="mt-2">
                <h2 className="font-semibold">{user.name.first} {user.name.last}</h2>
                <p>{user.email}</p>
                <p>{user.location.city}, {user.location.country}</p>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => fetchUser()}
                  className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-sm"
                >
                  Load New User
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default Challenge1