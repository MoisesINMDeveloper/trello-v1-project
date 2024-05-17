"use client";

import BackButton from "@/components/common/BackButton";
import TitleApp from "../../components/atoms/title";
import SigninForm from "@/components/molecules/signin.form";

const LoginTemplate = () => {
  return (
    <main className="flex flex-col justify-center py-[60px] w-screen h-screen">
      <section className="flex flex-col items-center ">
        <BackButton />
        <TitleApp
          className=" font-poetsen font-black italic "
          title="¡Trello!"
        />
        <div className="mt-8">
          <h2 className=" text-4xl">Ingresar Ahora</h2>
        </div>
        <SigninForm />
      </section>
    </main>
  );
};

export default LoginTemplate;
