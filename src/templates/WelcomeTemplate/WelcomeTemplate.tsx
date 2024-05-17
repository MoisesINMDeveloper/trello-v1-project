"use client";
import React from "react";
import Welcome from "@/components/organism/Welcome/Welcome";
const WelcomeTemplate: React.FC = () => {
  return (
    <main className="flex flex-col justify-center w-screen h-screen">
      <Welcome />
    </main>
  );
};

export default WelcomeTemplate;
