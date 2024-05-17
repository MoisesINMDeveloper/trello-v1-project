"use client";
import BackButton from "@/components/common/BackButton";
import TitleApp from "../components/atoms/title";
import SignupForm from "../components/molecules/signup.form";

const SignupTemplate = () => {
  return (
    <main className=" flex flex-col items-center py-14">
      <BackButton />
      <TitleApp className=" font-poetsen font-black italic " title="¡Trello!" />
      <div className="mt-8">
        <h2 className=" text-4xl">Registrate ahora</h2>
      </div>
      <SignupForm />
    </main>
  );
};

export default SignupTemplate;
