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
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" 
            onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>

        </>
    )
}