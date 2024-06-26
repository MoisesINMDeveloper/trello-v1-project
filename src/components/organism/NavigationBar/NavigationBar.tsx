import TitleApp from "../../atoms/title";
import NavigationList from "../../molecules/NavigationList";
const NavigationBar = () => {
  return (
    <nav className="flex flex-row items-center justify-between  shadow-2xl fixed w-screen  p-4 bg-slate-200 z-10 glassEffect">
      <TitleApp
        className="font-poetsen  font-black italic text-[24px]"
        title={"¡Trello!"}
      />
      <NavigationList />
    </nav>
  );
};
export default NavigationBar;
