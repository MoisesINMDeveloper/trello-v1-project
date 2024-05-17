import TitleApp from "@/components/atoms/title";
const Welcome: React.FC = () => {
  return (
    <section className="flex flex-col flex-1 justify-between w-screen h-screen py-12">
      <div className="flex flex-col items-center justify-center gap-10">
        <TitleApp
          className=" font-poetsen font-black italic "
          title="¡Trello!"
        />
      </div>
      {/* CONTENEDOR INFORMATIVO PARA PAGINA BIENVENIDO */}
      <div>
        <div>
          <p></p>
        </div>
      </div>
      {/* Botones login y registro */}
      <div className="flex flex-col gap-4 self-center"></div>
    </section>
  );
};

export default Welcome;
