"use client";
import TitleApp from "@/components/atoms/title";
import Image from "next/image";
import { useEffect, useState } from "react";

const WelcomeLoad = () => {
  // Estado para manejar la vista de bienvenido
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  //   Estados para mostrar las imagenes
  const [showLogo, setShowLogo] = useState(false);
  const [imageOne, setImageOne] = useState(false);
  const [imageTwo, setImageTwo] = useState(false);
  const [imageThree, setImageThree] = useState(false);

  const baseTime = 800;

  //   Efecto para controlar la vista de bienvenido
  useEffect(() => {
    const firstLoad = sessionStorage.getItem("first-load");

    if (firstLoad === "false") {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem("first-load", "false");
      }, baseTime * 5);
    }
  }, []);

  //   Efecto para controlar las imagenes
  useEffect(() => {
    setTimeout(() => {
      setShowLogo(true);
    }, baseTime);

    setTimeout(() => {
      setImageOne(true);
    }, baseTime * 2);

    setTimeout(() => {
      setImageTwo(true);
      setImageThree(true);
    }, baseTime * 3);
  }, []);

  return (
    <>
      {showWelcome ? (
        <div className="fixed top-0 right-0 w-screen h-screen bg-white-100 z-[999] flex flex-col items-center justify-start gap-[70px] py-[40px]">
          <TitleApp
            className=" font-poetsen font-black italic "
            title="¡Trello!"
          />

          {/* Logo Verifyarca */}
          {showLogo ? (
            <section className="fade-in-top">
              <Image
                src="/VerifyArcaLogo.png"
                alt="Icono de verify arca"
                loading="lazy"
                width={230}
                height={76}
              />
            </section>
          ) : null}

          {/* Imagenes */}
          <section className="flex flex-col justify-center items-center">
            {imageOne ? (
              <Image
                src="/BienvenidoImagen1.png"
                alt="Icono de verify arca"
                loading="lazy"
                width={100}
                height={80}
                className="fade-in-bottom object-contain w-[100px] h-auto"
              />
            ) : null}
            {/* 2 Imagenes */}
            <div className="flex gap-[20px]">
              {imageTwo ? (
                <Image
                  src="/BienvenidoImagen2.png"
                  alt="Icono de verify arca"
                  loading="lazy"
                  width={120}
                  height={76}
                  className="fade-in-left object-contain w-[120px] h-auto"
                />
              ) : null}
              {imageThree ? (
                <Image
                  src="/BienvenidoImagen3.png"
                  alt="Icono de verify arca"
                  loading="lazy"
                  width={120}
                  height={76}
                  className="fade-in-right object-contain w-[120px] h-auto"
                />
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default WelcomeLoad;
