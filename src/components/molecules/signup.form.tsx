"use client";
import { useState } from "react";
import Button from "../atoms/button";
import { useRouter } from "next/navigation";
import Check from "../atoms/check";
import InputForm from "../atoms/input";
import axios from "axios";
import { AUTH_REGISTER } from "@/constant/apiKeys";
import { useAuth } from "../../hooks/use.auth";
import { toast, ToastContainer } from "react-toastify";

const SignupForm = () => {
  const { setNewEmailConfirm } = useAuth();
  const router = useRouter(); // Obtiene la instancia de router

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      ["username", "email", "name", "password", "repeatPassword"].includes(name)
    ) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [policyAcepted, setPolicyAcepted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.API_URL}${AUTH_REGISTER}`,
        formData
      );
      console.log(response.data);
      // Aquí puedes manejar la respuesta de la API como desees
      if (formData.email) {
        setNewEmailConfirm(formData.email);
      }
      router.push(`/signup/verify`);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      if (error) {
        // Mostrar error en la notificación
        if (typeof error === "string") {
          notifyError(error);
        } else {
          notifyError("error");
        }
      } else {
        // Mostrar un mensaje genérico "Ha ocurrido un error, por favor inténtalo de nuevo."
        notifyError("Ha ocurrido un error, por favor inténtalo nuevamente.");
      }
    }
  };

  const notifyError = (errorMessage: string) =>
    toast.error(errorMessage, {
      position: "top-center",
      draggablePercent: 50,
    });

  return (
    <section className="mt-6">
      <form
        className="flex flex-col items-center justify-between h-[65vh]"
        onSubmit={handleSubmit}
      >
        <ToastContainer draggable />
        <div className="flexcol justify-between gap-4">
          <InputForm
            type={"text"}
            name={"username"}
            placeholder={"Username"}
            value={formData.username}
            onChange={handleChange}
          />
          <InputForm
            type={"text"}
            name={"name"}
            placeholder={"Name"}
            value={formData.name}
            onChange={handleChange}
          />
          <InputForm
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            value={formData.email}
            onChange={handleChange}
          />
          <InputForm
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            value={formData.password}
            onChange={handleChange}
          />
          <InputForm
            type={"password"}
            name={"repeatPassword"}
            placeholder={"Repeat-password"}
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          <div className="flex mb-14 px-4 w-[80vw] items-center">
            <Check
              state={policyAcepted}
              setState={setPolicyAcepted}
              required={true}
              linkText="Politicas de Privacidad"
            />
          </div>
        </div>
        <div>
          <Button text={"Ingresar"} type={"submit"} />
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
