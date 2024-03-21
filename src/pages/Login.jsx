import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userSchema";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signin} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit =  async () => {
    // Handle form submission here
    signin(email, password);
    
  };

  return (
    <div className="bg-blue-500">
      <div className="font-sans text-#333">
        <div className="min-h-screen flex flex-col items-center justify-center py-6">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="max-md:text-center">
              <h2 className="text-textBlank lg:text-6xl xl:text-7xl text-4xl font-extrabold lg:leading-[55px]">
                Bienvenido al Sistema PQRSF
              </h2>
              <p className="text-textGrey text-sm xl:text-xl mt-6">
                Ingrese sesión con su correo y contraseña
              </p>
              <div className="flex justify-center py-7">
                <img
                  src="/logo-autonoma-de-narino.webp"
                  width={179.5}
                  height={0}
                  alt="Logo autónoma"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            </div>
            <form
              className="space-y-6 max-w-md md:max-w-full md:ml-auto max-md:mx-auto w-full border border-y-4 border-bottomBlue rounded-lg px-5 py-10 bg-white"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-center text-gray-600 text-3xl xl:text-4xl font-extrabold mb-8 max-md:text-center">
                Iniciar Sesión
              </h3>
              <div className="pb-7 pt-2">
                <div className="pb-5">
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-gray-100 placeholder:text-gray-600 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 lg:text-xl"
                    placeholder="Email"
                    {...register("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    className="bg-gray-100 placeholder:text-gray-600 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 lg:text-xl"
                    placeholder="Contraseña"
                    {...register("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm lg:text-xl font-semibold rounded text-textBlank bg-bottomBlue hover:bg-bottomBlueHover focus:outline-none"
                >
                  Iniciar Sesión
                </button>
              </div>
              <div className="space-x-6 flex justify-center">
                <p className="text-xs md:text-xl xl:text-base text-gray-600 text-center mt-2">
                  &copy; 2024 Aunar
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
