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
            // https://api.p2.gc01aio.foxhub.space/apis/pub/movies/movies?q=${search}&i=${genre}
            // console.log(data);
            
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

    // async function fetchGenres() {
    //   try {
    //     const { data } = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/pub/movies/genres`)

    //     setGenres(data.data)
    //     console.log(data);
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }

    useEffect(() => {
        fetchMovies()
      }, [search, currentPage])
      // }, [search, genre])
    
      return (
        <>
        <Navbar />

        {/* search */}
        <div className='w-full max-w-2xl mx-auto h-12 rounded-lg shadow-md flex overflow-hidden'>
          <input type="text" className='bg-gray-100 flex-1 px-5 border-1 border-gray-700 focus:border-blue-400' placeholder='Search movies...'
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
        <div class="loading"> <img src={loadingGif} /> <p>Loading...</p> </div>
          </>
        ) : (
          <>
          {/* main */}
        <main className='grid grid-cols-4 gap-5 px-6 py-6'>
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />
          })}
        </main>
          </>
        )}

        {/* main */}
        {/* <main className='grid grid-cols-4 gap-5 px-6 py-6'>
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />
          })}
        </main> */}
        {/*  key={movie.id}
            title={movie.title}
            rating={movie.rating}
            genre={movie.genre.name}
            synopsis={movie.synopsis}
            imgUrl={movie.imgUrl} */}

        {/* pagination */}
        <div>
          <button type='button' className='disabled:bg-blue-500' onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          {pagination.map((page, index) => {
            return (
              <>
              <div key={index}>
              <button type='button' className={`text-black ${page === currentPage ? "bg-blue-500" : ""}`}
              onClick={() => setCurrentPage(page)}>
                {page}
              </button>
              </div>
              </>
            )
          })}
          {/* <button>2</button> */}
          <button type='button' className='disabled:bg-blue-500' onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
        </div>

        </>
      )
}