import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/atoms/commons/Input";
import Button from "@/components/atoms/commons/Button";
import { HiOutlineMail } from "react-icons/hi";
import DropDown from "@/components/atoms/form/DropDownCode";
import { ChangeEvent } from "react";
import axios from "axios";
import { AUTH_FORGOT_PASSWORD } from "@/constant/apiKeys";
import { useAuth } from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

const RecoveryAccount = () => {
  const { setNewEmailOrNumberToConfirm } = useAuth();
  const router = useRouter();

  const [emailOrNumber, setEmailOrNumber] = useState<string>("");
  const [areaCode, setAreaCode] = useState<string>("");
  const [emailOrPhoneError, setEmailOrPhoneError] = useState({
    message: "",
    show: false,
  });
  const [isEmail, setIsEmail] = useState<boolean>(false);

  function handleEmailOrNumberChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;

    const onlyNumbers = /^$|^\d+$/;
    if (onlyNumbers.test(value)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }

    setEmailOrNumber(value);
  }

  function handleDropDownChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAreaCode(event?.target?.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setEmailOrPhoneError({
      message: "",
      show: false,
    });

    let formData = {};

    if (isEmail) {
      formData = {
        email: emailOrNumber,
      };
    } else {
      if (!areaCode) {
        setEmailOrPhoneError({
          show: true,
          message: "Por favor escoge tu codigo de area.",
        });
        return;
      }
      formData = {
        phone: `${areaCode}${emailOrNumber}`,
      };
    }

    axios
      .post(
        `${process.env.API_URL}${AUTH_FORGOT_PASSWORD}${emailOrNumber}`,
        formData
      )
      .then(() => {
        setNewEmailOrNumberToConfirm(emailOrNumber);
        router.push("/login/recover-account/verify");
      })
      .catch((error) => {
        console.error(error);
        notifyError("Ha ocurrido un error. Por favor inténtalo nuevamente.");
      });
  }

  const notifyError = (errorMessage: string) =>
    toast.error(errorMessage, {
      position: "top-center",
      draggablePercent: 50,
    });

  return (
    <>
      <ToastContainer draggable />

      <form
        className="flex w-[90vw] h-[50vh] flex-col items-end justify-between "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-between  gap-4 relative">
          <div className="w-[90vw] flex-col relative">
            <div className="flex flex-row">
              {isEmail ? (
                <div className="absolute top-[calc(50%-15px)] left-5">
                  <HiOutlineMail className="text-gray-400 w-[30px] h-[30px]" />
                </div>
              ) : (
                <DropDown
                  className={`${
                    emailOrPhoneError?.show ? "border-red-400" : ""
                  }`}
                  name="phoneAreaCode"
                  onChange={handleDropDownChange}
                  selectedArea={areaCode}
                />
              )}

              <Input
                className={`min-w-[67vw] w-[90vw] ml-1 max-w-[90vw] ${
                  isEmail ? "pl-[55px]" : "pl-4"
                } ${emailOrPhoneError?.show ? "border-red-400" : ""}`}
                type={"text"}
                placeholder="Telefono o correo electronico"
                value={emailOrNumber}
                onChange={handleEmailOrNumberChange}
                name="emailOrPhone"
              />
            </div>
            {emailOrPhoneError ? (
              <p className="text-end text-red-600 text-[12px]">
                {emailOrPhoneError?.message}
              </p>
            ) : null}
          </div>
        </div>

        <Button type="submit" text="Recuperar" />
      </form>
    </>
  );
};

export default RecoveryAccount;
