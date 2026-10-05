import axios from "axios";
import MovieForm from "../components/MovieForm";
import Toastify from 'toastify-js'
import baseUrl from "../constant/baseUrl";
import { useNavigate } from "react-router";

export default function Add() {
    const navigate = useNavigate()
    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${baseUrl}/apis/movies/movies`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            navigate("/")
Toastify({
  text: "Succeed Add New Movie",
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
        <MovieForm handleSubmit={handleSubmit}/>
        </>
    )
}