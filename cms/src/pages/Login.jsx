import axios from "axios";
import { useState } from "react"
import baseUrl from "../constant/baseUrl";
import { useNavigate } from "react-router";
import Toastify from 'toastify-js'


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  async function handleLogin(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/apis/auth/login`, {email, password})
      // console.log(data);
      localStorage.setItem("token", data.data.token)
      navigate('/')
      Toastify({
  text: "Succeed Login",
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
      console.log(error.response);
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-blue-900 border border-gray-700 rounded-lg shadow-md p-8 space-y-5"
          >
            <h1 className="text-3xl font-bold text-white text-center">
              Login
            </h1>

            <div>
              <label
                htmlFor="email"
                className="block text-white font-medium mb-2"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white font-medium mb-2"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-800 text-white font-medium rounded hover:bg-blue-400 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
        </>
    )
}