"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeTemplate from "@/templates/homeTemplate/home.template";
import NavigationBar from "@/components/organism/NavigationBar/NavigationBar";
import { UserData } from "../../../types"; // Ajusta la ruta según sea necesario
import { AUTH_GET_USER_DATA } from "@/constant/apiKeys";
import WelcomeTemplate from "@/templates/WelcomeTemplate/WelcomeTemplate";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.API_URL}${AUTH_GET_USER_DATA}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(response.data);
      setUsername(response.data.username); // Asegúrate de que `username` exista en `UserData`
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (userData === null) {
    return <WelcomeTemplate />;
  }

  return (
    <>
      <NavigationBar />
      <div className="pt-16">
        <div className="flex flex-col items-center">
          <h2 className="flex flex-row items-center justify-between text-[1.8rem] text-center mx-4">
            Bienvenido
            <span className="text-[2rem] mx-2 font-poetsen font-black italic">
              ¡{username}!
            </span>
          </h2>
          <p className="text-lg">¿Estas listo para tu primera tarea?</p>
        </div>
        <HomeTemplate userData={userData} fetchUserData={fetchUserData} />
      </div>
    </>
  );
};

export default HomePage;
