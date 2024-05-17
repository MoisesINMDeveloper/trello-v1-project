"use client";
import IconVLogo from "@/components/atoms/commons/IconVLogo";
import TitlePage from "@/components/atoms/commons/TitlePage";
import BackButton from "@/components/atoms/commons/BackButton";
import ResetPasswordInputs from "@/components/molecules/reset-password/reset-password-inputs";
const ResetCodeTemplate = () => {
  return (
    <main className="flex flex-col justify-center py-[60px] w-screen h-screen">
      <section className="flex flex-col items-center ">
        <BackButton />
        <IconVLogo />
        <TitlePage text="Reestablecer" />
        <div>
          <ResetPasswordInputs />
        </div>
      </section>
    </main>
  );
};

export default ResetCodeTemplate;
