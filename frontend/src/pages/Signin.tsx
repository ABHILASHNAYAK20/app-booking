import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign In Successful", type: "SUCCESS" });
      console.log("User signed in");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 bg-teal-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-teal-800 text-center">
            Welcome Back!
          </h2>
          <p className="text-sm text-teal-600 text-center">
            Please sign in to continue.
          </p>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-teal-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                {...register("email", { required: "This field is required" })}
              />
              {errors.email && (
                <span className="text-amber-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-teal-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-amber-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-400 focus:ring focus:ring-amber-300"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="text-sm text-teal-700 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-500 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
