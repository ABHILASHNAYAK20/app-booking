import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      navigate("/");
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
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-teal-800 text-center">
            Create an Account
          </h2>
          <p className="text-sm text-teal-600 text-center">
            Welcome! Join us and start your journey today.
          </p>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Name Inputs */}
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-teal-700 text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                  {...register("firstName", { required: "* This field is required" })}
                />
                {errors.firstName && (
                  <span className="text-amber-600 text-sm">{errors.firstName.message}</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-teal-700 text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                  {...register("lastName", { required: "* This field is required" })}
                />
                {errors.lastName && (
                  <span className="text-amber-600 text-sm">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-teal-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                {...register("email", { required: "* This field is required" })}
              />
              {errors.email && (
                <span className="text-amber-600 text-sm">{errors.email.message}</span>
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
                  required: "* This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-amber-600 text-sm">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-teal-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring focus:ring-amber-300 focus:outline-none"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "* This field is required";
                    } else if (watch("password") !== val) {
                      return "Passwords do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-amber-600 text-sm">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-400 focus:ring focus:ring-amber-300"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
