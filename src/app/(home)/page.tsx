"use client";
import WelcomeTemplate from "@/templates/WelcomeTemplate/WelcomeTemplate";
import { useAuth } from "@/hooks/use.auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WelcomeLoad from "@/components/organism/WelcomeLoad/WelcomeLoad";
import NavigationBar from "@/components/organism/NavigationBar/NavigationBar";
import useUserData from "@/hooks/use.userdata";
import HomeTemplate from "@/templates/homeTemplate/home.template";
import { UserError } from "../../../types";

export default function Home() {
  const { isAuth, loginState, updateUserInfo } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();
  const {
    userData,
    loading: userDataLoading,
    error,
    fetchUserData,
  } = useUserData();

  useEffect(() => {
    const tokenQuery = params.get("token");
    const decodedTokenQuery = tokenQuery
      ? decodeURIComponent(tokenQuery)
      : null;
    const userQuery = params.get("username");
    const decodedUserQuery = userQuery
      ? JSON.parse(decodeURIComponent(userQuery))
      : null;

    if (decodedTokenQuery && decodedUserQuery) {
      localStorage.setItem("token", decodedTokenQuery);
      loginState(decodedTokenQuery);
      updateUserInfo(decodedUserQuery);
      setUsername(decodedUserQuery.username);
      router.replace("/");
    } else {
      setInitialLoading(false);
    }
  }, [params, loginState, updateUserInfo, router]);

  useEffect(() => {
    if (!initialLoading && !userDataLoading && userData) {
      setUsername(userData.username || "user");
    }
  }, [initialLoading, userDataLoading, userData]);

  if (initialLoading || userDataLoading) {
    return <WelcomeLoad />;
  }

  if (error) {
    return <div>Error: {(error as UserError).message}</div>;
  }

  console.log(userData);

  return (
    <main className="h-screen ">
      {isAuth() ? (
        <>
          <NavigationBar />
          <div className="pt-16">
            Dashboard {username}
            <HomeTemplate userData={userData} fetchUserData={fetchUserData} />
          </div>
        </>
      ) : (
        <WelcomeTemplate />
      )}
    </main>
  );
}
