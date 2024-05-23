"use client";
import WelcomeTemplate from "@/templates/WelcomeTemplate/WelcomeTemplate";
import { useAuth } from "@/hooks/use.auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WelcomeLoad from "@/components/organism/WelcomeLoad/WelcomeLoad";
import NavigationBar from "@/components/organism/NavigationBar/NavigationBar";
// CREAR UN HOOKS SI NO CONSIGO COMO VALIDAR LA AUTENTICACION DEL USUARIO
export default function Home() {
  const { isAuth, getUserInfo, loginState, updateUserInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const params = useSearchParams();

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
      loginState();
      updateUserInfo(decodedUserQuery);
      setUsername(decodedUserQuery.username);
      router.replace("/");
    } else {
      const userInfo = getUserInfo();
      setUsername(userInfo.username || "user");
      setLoading(false); // Mover aquí para asegurar que la carga solo se termina una vez obtenida la información
    }
  }, [params, loginState, updateUserInfo, getUserInfo, router]);

  if (loading) {
    return <WelcomeLoad />;
  }

  return (
    <main className="h-screen w-screen">
      {isAuth() ? (
        <>
          {" "}
          <NavigationBar />
          Dashboard {username}
        </>
      ) : (
        <>
          <WelcomeTemplate />
        </>
      )}
    </main>
  );
}
