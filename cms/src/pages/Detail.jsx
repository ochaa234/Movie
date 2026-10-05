import { Link, useParams } from "react-router";
import { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from '../constant/baseUrl'
import loadingGif from '../assets/BeanEater@1x-1.0s-200px-200px.svg'



export default function Detail() {
  const {id} = useParams()
  const [movie, setMovies] = useState({})
  const [loading, setLoading] = useState(false)
  
  async function fetchMovie() {
        try {
          setLoading(true)
            const { data } =  await axios.get(`${baseUrl}/apis/pub/movies/movies/${id}`)
            
            // console.log(data);
            setMovies(data.data)
        } catch(error) {
            console.log(error);
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
      }, [])

      // console.log(movie.genre)
      // console.log(movie.genre.name)
    return (
        <>
        {loading ? (
          <>
                    {/* Loading */}
                  <div className="loading"> <img src={loadingGif} /> <p>Loading...</p> </div>
                    </>
        ) : (
          <>
          <div className="min-h-screen bg-gray-900 px-6 py-10">
            <div className="max-w-6xl mx-auto bg-blue-900 border border-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
  
            <img
              src={movie.imgUrl}
              alt="Movie Poster"
              className="w-full md:w-80 h-auto object-cover"
            />

            <div className="p-6 flex-1">
              
              <h1 className="text-3xl font-bold text-white">
                {movie.title}
              </h1>

              <p className="mt-2 text-blue-400">
                {movie.genre?.name}
              </p>

              <p className="mt-2 text-gray-300">
                Author: {movie.author?.username}
              </p>

              <p className="mt-2 text-white">
                ⭐ {movie.rating}
              </p>

              <p className="mt-6 text-gray-300 leading-relaxed">
                {movie.synopsis}
              </p>

              <div className="flex gap-3 mt-8">
                
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-blue-800 text-white rounded hover:bg-blue-400 transition duration-300"
                >
                  Watch Trailer
                </a>

                <Link
                  to="/"
                  className="px-5 py-2 border border-gray-700 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
          </div>
          </>
        )
        }
        
        </>
    )
}