"use client";
import VerifyTemplate from "@/templates/VerifyTemplate/VerifyTemplate";
import { useAuth } from "@/hooks/use.auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { getNewEmailConfirm } = useAuth();

  // Hooks
  const router = useRouter();

  useEffect(() => {
    if (!getNewEmailConfirm()) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <VerifyTemplate from="register" />;
};

export default Page;
