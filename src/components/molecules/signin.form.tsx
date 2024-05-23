import React, { useState } from "react";
import Button from "../atoms/button";
import { useRouter } from "next/navigation"; // Importa useRouter desde next/router
import InputForm from "../atoms/input";
import axios from "axios";
import { AUTH_LOGIN } from "@/constant/apiKeys";
import { useAuth } from "../../hooks/use.auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninForm = () => {
  const { setNewEmailConfirm, updateUserInfo, loginState } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.API_URL}${AUTH_LOGIN}`,
        formData
      );
      if (response.status === 200) {
        const { token, name } = response.data;
        localStorage.setItem("token", token);
        updateUserInfo(name);
        loginState();
        router.push(`/`); // Redirigir al dashboard si el inicio de sesión es exitoso
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setNewEmailConfirm(formData.email);
        router.push(`/login/verify`); // Redirigir a verificación si es necesario
      } else {
        console.error("Error al enviar la solicitud:", error);
        notifyError("Ha ocurrido un error, por favor inténtalo nuevamente.");
      }
    }
  };

  const notifyError = (errorMessage: any) =>
    toast.error(errorMessage, {
      position: "top-center",
      draggablePercent: 50,
    });

  return (
    <section className="flex flex-col items-start justify-start">
      <form
        className="flex flex-col items-center justify-start py-12 h-[65vh]"
        onSubmit={handleSubmit}
      >
        <ToastContainer draggable />
        <div className="flex flex-col justify-between gap-4 mb-[16rem]">
          <InputForm
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputForm
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button text="Ingresar" type="submit" />
        </div>
      </form>
    </section>
  );
};

export default SigninForm;
