import { IoAddOutline } from "react-icons/io5";

const AddTask = () => {
  return (
    <button className="flex items-center justify-center border-1 border-gray-500 bg-black hover:bg-white w-12 h-12 m-4 rounded-full">
      <IoAddOutline className="w-12 h-12 text-white  hover:text-gray-600" />
    </button>
  );
};
export default AddTask;
