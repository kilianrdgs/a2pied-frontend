import {useNavigate} from "react-router";

export function useLoginFromLocalStorage() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const navigate = useNavigate()
    if (username && email) return {username, email}
    navigate("/")
    return {username: "", email: ""}
}