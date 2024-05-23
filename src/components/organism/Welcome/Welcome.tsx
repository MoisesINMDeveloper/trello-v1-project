import LinksUrl from "@/components/atoms/linksUrl";
import TitleApp from "@/components/atoms/title";
const Welcome: React.FC = () => {
  return (
    <section className="flex flex-col  justify-between items-center w-screen h-screen py-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <TitleApp
          className=" font-poetsen font-black italic "
          title="¡Trello!"
        />
        <div className="font-bold w-[90vw] text-xl  text-center">
          <h6 className="text-gray-700">
            Bienvenido a{" "}
            <b className="text-black font-black text-2xl font-poetsen italic">
              ¡Trello!
            </b>
            , tu sitio preferido para anotaciones de tareas
          </h6>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-[90vw] gap-4 ">
        <p className=" font-bold text-gray-700">Por favor elige una opcion</p>
        {/* Botones login y registro */}
        <div className="flex flex-col gap-4 self-center">
          <LinksUrl href={"/login"} text={"Ingreso"} />
        </div>
        {/* CONTENEDOR INFORMATIVO PARA PAGINA BIENVENIDO */}
        <div>
          <LinksUrl href={"/signup"} text={"Registro"} />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
