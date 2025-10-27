import { memo, useCallback, useEffect, useMemo, useState } from "react"


const Example1 = () => {
 return (
  <div className="mt-4">
   <p className="text-cyan-800 text-lg">useCallBack useMemo Example 1</p>
   <p>Goal: Build a product list with search and filtering that demostrates performace optimization</p>
   <p>Requirements</p>
   <ul className="list-number ml-5">
    <li>
     Display 1000 product
     <ul className="list-disc ml-5">
      <li>
       Each product has: id, name, price and category
      </li>
      <li>
       Generate mock data on component mount
      </li>
     </ul>
    </li>

    <li>
     Search functionality
     <ul className="list-disc ml-5">
      <li>
       Filter product by name as user types
      </li>
      <li>
       should be case-insensitive
      </li>
     </ul>
    </li>
    <li>
     Category filter
      <ul className="list-disc ml-5">
       <li>
        Dropdown to filter by category
       </li>
      </ul>
    </li>
    <li>
     Performace tracking
     <ul className="list-disc ml-5">
      <li>
       Add console.log to trach when filtering happens
      </li>
      <li>
       show render count
      </li>
     </ul>
    </li>
    <li>
     Optimization
     <ul className="list-disc ml-5">
      <li>
       use useMemo to cache filtered product list
      </li>
      <li>
       use useCallBack for search handler
      </li>
      <li>
       Demonstrate the difference (with/without optimization)
      </li>
     </ul> 
    </li>
   </ul>

   <div>
    <SearchFilterList />
   </div>
  </div>
 )
}

const generateProducts = (count) => {
   const categories = ['Electronics', 'Clothing', 'Food']
   const products = []
   
   for (let i = 1; i <= count; i++) {
     products.push({
       id: i,
       name: `Product ${i}`,
       price: Math.floor(Math.random() * 1000) + 10,
       category: categories[Math.floor(Math.random() * categories.length)]
     })
   }
   
   return products
 }

const SearchFilterList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [renderCount, setRenderCount] = useState(0)
 

  const products = useMemo(() => generateProducts(1000), [])

  const filteredProducts = useMemo(() => {
   console.log('Filtering products...')
   return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'All' || product.category === category
    return matchesSearch && matchesCategory
   }) 
  }, [products, searchTerm, category])

  const handleSearch = useCallback((e) => {
   setSearchTerm(e.target.value)
  }, [])

  const handleCategoryChange = useCallback((e) => {
   setCategory(e.target.value)
  }, [])

  useEffect(() => {
   setRenderCount(prev => prev + 1)
  }, [searchTerm, category])

 return (
   <div className="p-8 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-gray-600">Product Search & Filter</h1>

    <div className="mb-4 p-3 bg-blue-100 rounded">
     <p className="text-sm font-semibold">Component rendered: {renderCount}</p>
     <p className="text-xs text-gray-600">open console to see whne filtering applies</p>
    </div>

    <div className="mb-6 flex gap-4">
      <input 
       type="text"
       value={searchTerm}
       onChange={handleSearch}
       placeholder="Search products..."
       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select 
       value={category}
       onChange={handleCategoryChange}
       className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
       <option value="All">All Categories</option>
       <option value="Electronics">Electronics</option>
       <option value="Clothing">Clothing</option>
       <option value="Food">Food</option>
      </select>
    </div>

    <div className="mb-4 text-gray-600">
     Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> of {products.length} products
    </div>

    <div
     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
     {filteredProducts.slice(0, 50).map(product => (
      <ProductCard key={product.id} product={product} />
     ))}
    </div>

    {
     filteredProducts.length > 50 && (
      <p className="text-center mt-4 text-gray-500">
        ... and {filteredProducts.length - 50} more products
      </p>
     )
    }
   </div>
 )
}

const ProductCard = memo(({ product }) => {
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
    </div>
  )
})


export default Example1