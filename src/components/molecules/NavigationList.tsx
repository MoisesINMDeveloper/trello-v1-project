import LinksNavigation from "../atoms/linksNavigation";
const NavigationList = () => {
  return (
    <ul className="flex flex-row gap-4">
      <LinksNavigation href={"/tareas"} text={"Tareas"} />
      <LinksNavigation href={"/chats"} text={"Chats"} />
      <LinksNavigation href={"/Others"} text={"Others"} />
      <LinksNavigation href={""} text={""} />
    </ul>
  );
};
export default NavigationList;
