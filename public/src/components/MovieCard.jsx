import { Link } from "react-router";

export default function MovieCard({movie}) {
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
            <Link to="">Edit</Link>
            <Link to="">Delete</Link> 
          </div>
        </div>
        </>
    )
}
/*
ini fix
<div className="w-72 bg-blue-950 rounded-lg shadow-md border-solid border-1 overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqhsQqJQGKLUixYqvrAAoLyTZ0DlQnJS3-NGG7c1Eew&s=10"
            className="h-96 w-full object-cover"
            alt=""
          />
          <div className="p-5">
            <h2 className="text-xl font-bold text-white">Toy Story 5</h2>
            <p className="mt-2 text-sm text-white">Rating: 5</p>
            <p className="text-sm text-white">Genre: Animation</p>
            <p className="mt-2 text-sm text-white">
              Woody, Buzz, Jessie and the rest of the gang's jobs are challenged when
              they're introduced to electronics, a new threat to playtime.
            </p>
          </div>
        </div> 
*/