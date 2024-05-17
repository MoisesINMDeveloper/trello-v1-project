import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

type LinksProps = {
  setState?: Dispatch<SetStateAction<boolean>>;
};

const BackButton: React.FC<LinksProps> = ({ setState }) => {
  const router: AppRouterInstance = useRouter();
  return (
    <div className="w-[90vw] top-0 mt-[30px] absolute">
      <button
        className="absolute border-black hover:bg-black focus:bg-black focus:text-white hover:text-white border-1 text-left rounded-full font-extrabold text-[1.2rem] p-[8px]"
        onClick={setState ? () => setState(false) : () => router.back()}
      >
        <FaArrowLeftLong />
      </button>
    </div>
  );
};
export default BackButton;
