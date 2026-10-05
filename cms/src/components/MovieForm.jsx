import { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from '../constant/baseUrl'

export default function MovieForm({handleSubmit}) {
  const [genres, setGenres] = useState([])
  const [form, setForm] = useState({
    title : "",
    synoopsis : "",
    genreId : 0,
    img : "",
    rating : 0,
    trailerUrl : ""
  })

  function handleForm(value, fieldName) {
    setForm((oldValue) => {
      return {
        ...oldValue,
        [fieldName] : value
      }
    })
  }

  async function fetchGenres() {
        try {
            const { data } =  await axios.get(`${baseUrl}/apis/movies/genres`, {
              headers: {
                Authorization: `Bearer ${localStorage.token}`
              }
            })
            console.log(data);
            setGenres(data.data)
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchGenres()
    }, [])

    console.log(genres);
    return(
        <>
        <div className="min-h-screen bg-gray-900 px-6 py-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Add Movie
        </h1>
        <form className="max-w-2xl mx-auto bg-blue-900 border border-gray-700 rounded-lg shadow-md p-6 space-y-4" onSubmit={(e) => handleSubmit(e, form)}>
          <div className="space-y-2">
            <label className="block text-white font-medium mb-2"
              htmlFor="title">Title</label>
            <input className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
            type="text" id="title" name="title" onChange={(e) => handleForm(e.target.value, "name")} />
          </div>
          <div>
            <label  className="block text-white font-medium mb-2"
            htmlFor="synopsis">Synopsis</label>
            <textarea className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400 min-h-32"
            id="synopsis" name="synopsis" defaultValue={""} onChange={(e) => handleForm(e.target.value, "synopsis")} />
          </div>
          <div>
            <label className="block text-white font-medium mb-2"
              htmlFor="genre">Genre</label>
            <select className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
            id="genre" name="genre" onChange={(e) => handleForm(+e.target.value, "genreId")} >
              ${genres.map((genre) => {
                return <option value={genre.id} key={genre.id}>{genre.name}</option>
              })}
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2"
            htmlFor="trailerUrl">Trailer URL</label>
            <input className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
            type="text" id="trailerUrl" name="trailerUrl" onChange={(e) => handleForm(e.target.value, "trailerUrl")} />
          </div>
          <div>
            <label 
              className="block text-white font-medium mb-2"
              htmlFor="imgUrl">Image URL</label>
            <input className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
            type="text" id="imgUrl" name="imgUrl" onChange={(e) => handleForm(e.target.value, "imgUrl")} />
          </div>
          <div>
            <label
              className="block text-white font-medium mb-2"
              htmlFor="rating">Rating</label>
            <input className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
              type="number" id="rating" name="rating" onChange={(e) => handleForm(+e.target.value, "rating")} />
          </div>
          <button className="w-full py-3 bg-blue-800 text-white font-medium rounded hover:bg-blue-400 transition duration-300"
          type="submit">Add Movie</button>
        </form>
        </div>
        </>
    )
}