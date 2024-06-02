import LinksNavigation from "../atoms/linksNavigation";
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
const NavigationList = () => {
  return (
    <ul className="flex flex-row gap-4">
      <LinksNavigation href={"/tareas"} text={"Tareas"} />
      <LinksNavigation href={"/chats"} text={"Chats"} />
      <LinksNavigation href={"/"} text={"Salir"} onClick={handleLogout} />
    </ul>
  );
};
export default NavigationList;
