import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../Redux/Actions/postActions' 
import PostsCard from '../components/PostsCard'
import { FaSearch } from "react-icons/fa";
import { FaRegFaceDizzy } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom"
import BigLoader from '../components/BigLoader'

const AllPosts = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector(state => state.posts)

  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')

  // URL Filters
  const city = searchParams.get("city")
  const make = searchParams.get("make")
  const model = searchParams.get("model")
  const year = searchParams.get("year")
  const budget = searchParams.get("budget")
  const body = searchParams.get("body type")

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  // Filter posts
 // Filter posts
const filteredPosts = posts.filter(post => {
  const term = searchTerm.toLowerCase()

  // SEARCH BAR FILTER
  const matchesSearch =
    post.title.toLowerCase().includes(term) ||
    post.city.toLowerCase().includes(term) ||
    (post.brand && post.brand.toLowerCase().includes(term)) ||
    (post.model && post.model.toLowerCase().includes(term)) ||
    String(post.year).includes(term) ||
    String(post.price).includes(term) ||
    (post.bodyType && post.bodyType.toLowerCase().includes(term))

  // URL FILTERS
  const matchesURL =
    (!city || post.city === city) &&
    (!make || post.brand === make) &&
    (!model || post.model === model) &&
    (!year || String(post.year) === year) &&
    (!body || post.bodyType === body)

  // ⭐ BUDGET RANGE FILTER
  let minBudget = 0
  let maxBudget = Infinity

  if (budget && budget.includes("-")) {
    const [min, max] = budget.split("-")
    minBudget = Number(min)
    maxBudget = Number(max)
  }

  const matchesBudget =
    post.price >= minBudget && post.price <= maxBudget

  return matchesSearch && matchesURL && matchesBudget
})


  if (loading) return <BigLoader/>
  if (error) return <div className="text-red-500">Error: {error}</div>
  if (!posts || posts.length === 0) return <div>No posts found.</div>

  return (
    <div className="pt-20 px-4">

      {/* Search Input */}
      <div className='ring-2 ring-violet-500 my-5 bg-transparent w-[80%] rounded flex justify-between'>
        <input
          type="text"
          placeholder="Search by title, description, city or brand..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 outline-none bg-transparent w-full text-white"
        />
        <div className='text-center m-3'><FaSearch className='inline'/></div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostsCard key={post._id} details={post}  />
          ))
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <FaRegFaceDizzy className='text-[10vw] pb-3'/>
            <p>No posts match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllPosts
