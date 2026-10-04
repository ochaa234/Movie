import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function BaseLayout() {
    return (
        <>
        <Navbar />
        <Outlet />
        <h1>BASE LAYOUT</h1>
        </>
    )
}