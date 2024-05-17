"use client";
import WelcomeTemplate from "@/templates/WelcomeTemplate/WelcomeTemplate";
import { useAuth } from "@/hooks/use.auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import WelcomeLoad from "@/components/organism/WelcomeLoad/WelcomeLoad";

export default function Home() {
  // Hooks
  const { isAuth, getUserInfo, loginState, updateUserInfo } = useAuth();
  const { username } = getUserInfo();
  const router = useRouter();

  const params = useSearchParams();
  useEffect(() => {
    const tokenQuery = params.get("token");
    const decodedTokenQuery = tokenQuery
      ? decodeURIComponent(tokenQuery)
      : null;
    const userQuery = params.get("user");
    const decodedUserQuery = userQuery
      ? JSON.parse(decodeURIComponent(userQuery))
      : null;

    if (decodedTokenQuery && decodedUserQuery) {
      localStorage.setItem("token", decodedTokenQuery);
      updateUserInfo(decodedUserQuery);
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WelcomeLoad />
      {isAuth() ? <main>Dashboard {username}</main> : <WelcomeTemplate />}
    </>
  );
}
