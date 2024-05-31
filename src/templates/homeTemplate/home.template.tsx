import React, { useState } from "react";
import axios from "axios";
import AddTask from "@/components/atoms/add.task";
import TaskContainer from "@/components/molecules/task.container";
import Modal from "@/components/modals/task/task.modal";
import { UserData } from "../../../types";
import { AUTH_TASK } from "@/constant/apiKeys";

interface HomeTemplateProps {
  userData: UserData | any;
  fetchUserData: () => Promise<void>;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  userData,
  fetchUserData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveTask = async (
    title: string,
    description: string,
    statusId: number,
    userId: number
  ) => {
    try {
      await axios.post(
        `${process.env.API_URL}${AUTH_TASK}`,
        {
          title,
          description,
          statusId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Task created successfully");
      await fetchUserData(); // Actualizar los datos del usuario
      handleCloseModal(); // Cerrar el modal después de guardar la tarea
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center ">
      <TaskContainer
        tasks={userData.tasks}
        userId={userData.id}
        fetchUserData={fetchUserData}
      />

      <div className=" ">
        <button onClick={handleAddTaskClick}>
          <AddTask />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        userId={userData.id} // Pasar userId al modal
      />
    </section>
  );
};

export default HomeTemplate;
