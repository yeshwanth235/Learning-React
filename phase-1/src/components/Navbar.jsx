

const Navbar = () => {
  return (
   <div className="flex w-full align-center justify-center h-10 p-10 pb-0 gap-3">
    <a href="/" className="text-xl text-orange-500 hover:text-orange-600">Home</a>
    <a href="/hooks" className="text-xl text-orange-500 hover:text-orange-600">Hooks</a>
    <a href="/challenges" className="text-xl text-orange-500 hover:text-orange-600">Challenges</a>
   </div>
  )
}

export default Navbar