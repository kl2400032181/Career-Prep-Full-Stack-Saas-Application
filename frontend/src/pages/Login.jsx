import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

import Button from "../Components/common/Button";
import Input from "../Components/common/Input";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error("Please fix the highlighted fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await api.post("/auth/login", {
      email: formData.email.trim(),
      password: formData.password,
    });

    localStorage.setItem("token", response.data.token);

    toast.success("Signed in successfully!");

    const destination = location.state?.from?.pathname || "/dashboard";

    navigate(destination, { replace: true });
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your email and password.";

    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Sign in to continue your career preparation.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  autoComplete="current-password"
                  className="pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-[38px] rounded-md p-1 text-zinc-500 transition hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full"
              >
                Sign In
              </Button>
            </form>

            {/* Register */}
            <div className="mt-6 border-t border-zinc-800 pt-6 text-center">
              <p className="text-sm text-zinc-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-white hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Demo note */}
          <p className="mt-5 text-center text-xs text-zinc-600">
            Demo authentication is enabled for frontend development.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;