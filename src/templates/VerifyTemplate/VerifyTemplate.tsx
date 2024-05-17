"use client";
import React from "react";
import BackButton from "@/components/common/BackButton";
import VerifyForm from "@/components/organism/VerifyForm/VerifyForm";
import TitleApp from "@/components/atoms/title";

interface VerifyTemplateInterface {
  from: string;
}

const VerifyTemplate: React.FC<VerifyTemplateInterface> = ({ from }) => {
  return (
    <main className="flex flex-col justify-center py-[60px] w-screen h-screen">
      <section className="flex flex-col justify-between flex-1 items-center">
        <BackButton />
        <TitleApp
          className=" font-poetsen font-black italic "
          title="¡Trello!"
        />
        <div className="flex flex-col items-center">
          <div className="mb-[4rem] flex flex-col items-center">
            <h2 className=" text-4xl">Ingresar codigo</h2>
          </div>
          <div className="flex flex-col items-center w-[90vw]">
            <VerifyForm from={from} />
          </div>
        </div>
      </section>
    </main>
  );
};
export default VerifyTemplate;
