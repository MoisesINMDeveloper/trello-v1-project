"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "@/components/atoms/add.task";
import TaskContainer from "@/components/molecules/task.container";
import Modal from "@/components/modals/task/task.modal";
import { UserData, Task } from "../../../types"; // Asegúrate de importar Task
import { AUTH_TASK } from "@/constant/apiKeys";

interface HomeTemplateProps {
  userData: UserData;
  fetchUserData: () => Promise<void>;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  userData,
  fetchUserData,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(userData.tasks);
  }, [userData.tasks]);

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
      const response = await axios.post(
        `${process.env.API_URL}${AUTH_TASK}`,
        { title, description, statusId, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newTask: Task = {
        id: response.data.id, // Asume que el backend devuelve el ID
        title,
        description,
        statusId,
        status: { id: statusId, name: "Pendiente" }, // Ajusta esto según tu lógica de estado
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
      };
      setTasks([...tasks, newTask]);
      await fetchUserData();
      handleCloseModal();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <section className="flex flex-col items-center mt-[-1rem] justify-center">
      <TaskContainer
        tasks={tasks}
        setTasks={setTasks}
        userId={userData.id}
        fetchUserData={fetchUserData}
      />
      <div>
        <button onClick={handleAddTaskClick}>
          <AddTask />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        userId={userData.id}
      />
    </section>
  );
};

export default HomeTemplate;
