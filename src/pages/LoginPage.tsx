import { useState } from "react";
import { icons } from "../assets/icons/icons";
import { logIn } from "../services/api.ts";

const LoginPage = () => {
     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });

     const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
          console.log(formData);
     };

     const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const { email, password } = formData;
          await logIn(email, password);
     };
     return (
          <div className="h-screen w-full bg-[#F8F8F8] flex items-center justify-center">
               <div className="w-[333px] h-[416px] bg-white rounded-[23px] shadow-lg px-[27px] flex flex-col justify-center">
                    <h1 className="text-lg font-medium text-center">Inicio de sesión </h1>

                    <p className="text-center text-xs font-normal mt-[12px]">Inicia sesión para ingresar al sistema</p>

                    <form onSubmit={handleLoginSubmit} className="mt-[94px] flex flex-col gap-5">
                         <div className="relative  w-full h-[35px] rounded-full border-[1px] border-[#D0D0D0] flex items-center">
                              <label className="absolute -top-3 bg-white text-sm font-normal px-2 left-3 text-[#D0D0D0]">
                                   Correo
                              </label>

                              <input
                                   type="email"
                                   name="email"
                                   className="bg-transparent h-full w-full outline-none indent-4 text-sm"
                                   onChange={handleChangeForm}
                              />

                              <img src={icons.arrobaIcon} className="w-auto h-[20px] mr-[16px]" alt="Arroba" />
                         </div>

                         <div className="relative  w-full h-[35px] rounded-full border-[1px] border-[#D0D0D0] flex flex-col">
                              <label className="absolute -top-3 bg-white text-sm font-normal px-2 left-3 text-[#D0D0D0]">
                                   Contraseña
                              </label>

                              <input
                                   type="password"
                                   name="password"
                                   className="bg-transparent h-full w-full outline-none  px-4 text-sm"
                                   onChange={handleChangeForm}
                              />
                         </div>

                         <button
                              className="text-sm text-white text-center bg-black h-[35px] w-full rounded-full mt-5"
                              type="submit"
                         >
                              Iniciar sesion
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default LoginPage;
