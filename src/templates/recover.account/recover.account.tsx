"use client";

import BackButton from "@/components/common/BackButton";

const RecoverAccountTemplate = () => {
  return (
    <main className="flex flex-col justify-center py-[60px] w-screen h-screen">
      <section className="flex flex-col justify-between flex-1 items-center">
        <BackButton />
        <div className="flex flex-col items-center"></div>
        <div className="flex flex-col items-center  gap-2">
          <p className="text-lg w-[85vw] text-center text-black-100 ">
            Ingresa tu numero de telefono o correo para recibir el codigo de
            recuperacion.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RecoverAccountTemplate;
