import axios from "axios";
import { Link } from "react-router";
import Toastify from 'toastify-js'
import baseUrl from "../constant/baseUrl";


export default function MovieCard({movie, fetchMovies}) {
  async function handleDelete() {
    try {
      const {data} = await axios.delete(`${baseUrl}/apis/movies/movies/${movie.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })

      // console.log(data);
      fetchMovies()
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
          } catch(error) {
            Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
          }
        }

  async function handleUpload(e) {
    try {
      const formData = new FormData()
      formData.append("file", e.target.files[0])

      const {data} = await axios.patch(`${baseUrl}/apis/movies/movies/${movie.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      Toastify({
        text: "Succeed Update Image",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
          } catch(error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
          }
        }

    return (
        <>
        <div className="w-72 bg-blue-900 rounded-lg shadow-md border-solid border-1 border-gray-700 overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">
          <img src={movie.imgUrl} className="h-96 w-full object-cover" alt=""/>
          <div className="p-5">
            <h2 className="text-xl font-bold text-white">{movie.title}</h2>
            <p className="mt-2 text-sm text-white">{movie.rating}</p>
            <p className="text-sm text-white">{movie.genre.name}</p>
            <p className="mt-2 text-sm text-gray-300 line-clamp-3">{movie.synopsis}</p>
          </div>
          <div className="">
            <Link to={`/detail/${movie.id}`}>Detail</Link>
            <Link onClick={handleDelete}>Delete</Link>
            <Link to={`/edit/${movie.id}`}>Edit</Link> 
            <label className=""> Upload
              <input type="file" className="hidden" onChange={handleUpload}/>
            </label>
          </div>
        </div>
        </>
    )
}