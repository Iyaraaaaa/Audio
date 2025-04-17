import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Login Successful");

        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        console.error(err.response?.data?.error || "Login failed");
        toast.error(err.response?.data?.error || "Invalid Credentials");
      });
  }

  return (
    <div
      className="bg-picture w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleOnSubmit}>
        <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[100px] h-[100px] object-cover"
          />
          <input
            type="email"
            placeholder="Email"
            className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[30px] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="my-8 w-[300px] h-[50px] bg-amber-400 text-2xl text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
