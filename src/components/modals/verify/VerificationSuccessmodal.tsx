"use client";
import React, { useEffect } from "react";

interface VerificationSuccessModalInterface {
  modal: boolean;
}

const VerificationSuccessModal: React.FC<VerificationSuccessModalInterface> = ({
  modal,
}) => {
  /* UseEffect para evitar scroll cuando el modal esta abierto */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  return (
    <main className="w-screen flex flex-col items-center h-screen justify-around py-[60px] fixed top-0 right-0 z-[100] bg-white px-[30px]">
      <div className="flex flex-col items-center gap-4 ">
        <h3 className="text-success text-[36px] font-bold text-center">
          Verificación exitosa
        </h3>
      </div>
      <p className="text-center font-semibold">
        &quot;Tu codigo ha sido verificado, ahora tienes acceso completo a todas
        las funciones de{" "}
        <b className="text-black font-black text-xl font-poetsen italic">
          ¡Trello!
        </b>
        &quot;
      </p>
    </main>
  );
};
export default VerificationSuccessModal;
