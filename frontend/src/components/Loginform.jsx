
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "./MyContext"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Use auth context to store user data
        login(data.user, data.token)
        
        // Navigate to home page
        navigate("/")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full text-black h-11 px-3 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
          required
        />
      </div>


      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className=" text-black w-full h-11 px-3 pr-10 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-black text-lime-500 bg-white border-gray-300 rounded focus:ring-lime-400/20"
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <Link to="/forgot-password" className="text-sm text-lime-600 hover:text-lime-500 transition-colors">
          Forgot password?
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white font-medium transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-lime-600 hover:text-lime-500 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}
