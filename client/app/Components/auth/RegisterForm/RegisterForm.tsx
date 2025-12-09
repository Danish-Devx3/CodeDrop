"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

function RegisterForm() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-card w-full max-w-[520px] shadow-xl border border-border">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium text-card-foreground">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-muted-foreground text-[14px]">
          Create an account. Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-primary hover:text-accent-foreground transition-all duration-300"
          >
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-muted-foreground">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name="name"
            className="px-4 py-3 border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background text-foreground"
            placeholder="John Doe"
          />
        </div>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-muted-foreground">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="px-4 py-3 border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background text-foreground"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-muted-foreground">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="px-4 py-3 border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background text-foreground"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-muted-foreground opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>

        <div className="flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Register Now
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <img src="/flurry.png" alt="" className="w-full h-full object-cover" />
      </div>
    </form>
  );
}

export default RegisterForm;
