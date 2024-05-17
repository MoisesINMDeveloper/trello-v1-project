import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VerifyInput from "@/components/atoms/VerifyInput";
import Button from "@/components/atoms/button";
import axios from "axios";
import {
  AUTH_FORGOT_PASSWORD,
  AUTH_VERIFY,
  RESEND_CODE_LOGIN,
  RESEND_CODE_REGISTER,
} from "@/constant/apiKeys";
import { useAuth } from "@/hooks/use.auth";
import VerificationErrorModal from "@/components/modals/verify/VerificationErrorModal";
import VerificationSuccessModal from "@/components/modals/verify/VerificationSuccessmodal";

import { CircularProgress } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

type VerifyFormType = {
  from: string;
  email?: string;
};

const VerifyForm: React.FC<VerifyFormType> = ({ from, email }) => {
  const [showResendLink, setShowResendLink] = useState(false);
  const [verificationInput, setVerificationInput] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendButtonLoader, setResendButtonLoader] = useState<boolean>(false);
  const router = useRouter();
  const { getNewEmailConfirm, updateUserInfo, getPasswordToConfirm } =
    useAuth();
  console.log(getNewEmailConfirm());
  useEffect(() => {
    if (from === "register" && getNewEmailConfirm()) {
      setShowResendLink(true);
    }
  }, []);

  const handleResendCode = () => {
    setResendButtonLoader(true);
    let apiKeyToUse;
    if (from === "login") {
      apiKeyToUse = RESEND_CODE_LOGIN;
    } else if (from === "register") {
      apiKeyToUse = RESEND_CODE_REGISTER;
    } else if (from === "recover-account") {
      apiKeyToUse = AUTH_FORGOT_PASSWORD;
    }
    axios
      .post(`${process.env.API_URL}${apiKeyToUse}${email}`)
      .then(async (res) => {
        const data = await res.data;
        setShowResendLink(false);
        notifySuccess(data?.message);
        setTimeout(() => {
          setShowResendLink(true);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al reenviar el código:", error);
        notifyError(
          "Ha ocurrido un error al reenviar tu código. Por favor, inténtalo nuevamente."
        );
      })
      .finally(() => {
        setResendButtonLoader(false);
      });
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const input = e.target.value.slice(0, 6);
    setVerificationInput(input);
    if (input.length === 6) {
      handleSubmit(input);
    }
  };

  const handleSubmit = (VerifyInput: string) => {
    setLoading(true);
    const formData = {
      email: getNewEmailConfirm(),
      verificationCode: VerifyInput,
    };
    console.log(formData);
    axios
      .post(`${process.env.API_URL}${AUTH_VERIFY}`, formData)
      .then(async (res) => {
        const data = res.data;
        localStorage.setItem("token", data?.token);
        updateUserInfo(data?.user);
        setVerificationSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3500);
      })
      .catch(() => {
        setVerificationError(true);
        setTimeout(() => {
          setVerificationError(false);
        }, 3000);
        setVerificationInput("");
        setLoading(false);
      });
  };

  const notifyError = (errorMessage: string) =>
    toast.error(errorMessage, {
      position: "top-center",
      draggablePercent: 50,
    });

  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: "top-center",
      draggablePercent: 50,
    });

  return (
    <article className="flex flex-col items-center justify-between w-screen h-[50vh]">
      <ToastContainer draggable />
      <div className="flex flex-col items-center w-[90vw]">
        {verificationError || verificationSuccess || loading ? (
          <CircularProgress size="lg" />
        ) : (
          <VerifyInput
            className={`w-[90vw] ${verificationError && "border-red-500"}`}
            placeholder="Introduce tu código aquí"
            type="text"
            value={verificationInput}
            name="verification"
            onChange={handleInputChange}
          />
        )}

        {verificationError && (
          <VerificationErrorModal modal={verificationError} />
        )}

        {verificationSuccess && (
          <VerificationSuccessModal modal={verificationSuccess} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {showResendLink && (
          <Button
            onClick={handleResendCode}
            text={"Reenviar código"}
            type="button"
          />
        )}
      </div>
    </article>
  );
};

export default VerifyForm;
