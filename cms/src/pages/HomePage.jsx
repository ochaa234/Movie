import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import baseUrl from '../constant/baseUrl'
import loadingGif from '../assets/BeanEater@1x-1.0s-200px-200px.svg'

export default function HomePage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const pagination = generatePage()
    // const [genre, setGenre] = useState("")
    // const [genres, setGenres] = useState([])

    async function fetchMovies() {
        try {
          setLoading(true)
            const { data } =  await axios.get(`${baseUrl}/apis/pub/movies/movies?limit=10&q=${search}&page=${currentPage}`)
            
            setMovies(data.data)
            setTotalPage(data.meta.totalPages)
            setCurrentPage(data.meta.page)
            // console.log(data.data);
        } catch(error) {
            console.log(error);
        } finally {
          setLoading(false)
        }
    }

    function generatePage() {
      let result = []
      for (let i = 1; i <= totalPage; i++) {
        result.push(i)
      }
      return result
    }

    function handlePrev() {
      if(currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }

    function handleNext() {
      if(currentPage < totalPage) {
        setCurrentPage(currentPage + 1)
      }
    }

    useEffect(() => {
        fetchMovies()
      }, [search, currentPage])
    
      return (
        <>
        {/* search */}
        <div className='w-full mt-6 max-w-2xl mx-auto h-12 rounded-lg shadow-md flex overflow-hidden'>
          <input type="text" className='bg-gray-100 flex-1 px-5 border border-gray-700 focus:border-blue-400' placeholder='Search movies...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            // console.log(e.target.value)
          }
          }/>
          <button className='px-5 font-medium bg-blue-800 hover:bg-blue-400 transition duration-300'
          onClick={fetchMovies}
          >Search</button>
        </div>

        {/* filter */}
        {/* <label htmlFor="genre">Genre</label>

        <select id="genre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Pilih genre</option>
          <option value="genres.map()">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
        </select> */}

        {loading ? (
          <>
          {/* Loading */}
          <div className="flex flex-col items-center justify-center py-20">
            <img className='w-20' src={loadingGif} />
            <p className="mt-2 text-gray-500">Loading...</p>
          </div>
          </>
        ) : (
          <>
          {/* main */}
        <main className='grid grid-cols-4 gap-5 px-6 py-6'>
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} fetchMovies={fetchMovies} />
          })}
        </main>
          </>
        )}

        {/* pagination */}
        <div className="flex justify-center items-center gap-2 my-8">
          <button type='button' className='px-4 py-2 rounded bg-blue-800 text-white hover:bg-blue-600 disabled:bg-gray-400' onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          {pagination.map((page, index) => {
            return (
              <div key={index}>
              <button type='button' className={`text-black w-10 h-10 rounded border  ${page === currentPage ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setCurrentPage(page)}>
                {page}
              </button>
              </div>
            )
          })}
          <button type='button' className='px-4 py-2 rounded bg-blue-800 text-white hover:bg-blue-600 disabled:bg-gray-400' onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
        </div>

        </>
      )
}