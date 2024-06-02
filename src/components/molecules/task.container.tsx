"use client";
import React, { useState } from "react";

import axios from "axios";
import { Task } from "../../../types";
import { IoCloseOutline } from "react-icons/io5";
import { AUTH_TASK, COMMENT_TASK, DELETE_COMMENT } from "@/constant/apiKeys";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbProgressAlert } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface TaskContainerProps {
  tasks: Task[];

  setTasks: (tasks: Task[]) => void;

  userId: number;
  fetchUserData: () => Promise<void>;
}
const TaskContainer: React.FC<TaskContainerProps> = ({
  tasks,
  setTasks,
  userId,
  fetchUserData,
}) => {
  const [newComment, setNewComment] = useState("");
  const [taskIdWithOpenComment, setTaskIdWithOpenComment] = useState<
    number | null
  >(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (taskId: number) => {
    try {
      await axios.post(
        `${process.env.API_URL}${COMMENT_TASK}`,
        {
          content: newComment,
          taskId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Comentario enviado exitosamente");
      setNewComment(""); // Limpiar el campo de comentario después de enviarlo
      setTaskIdWithOpenComment(null); // Cerrar el campo de comentario después de enviarlo
      fetchUserData(); // Actualizar los datos del usuario
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${process.env.API_URL}${AUTH_TASK}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Tarea eliminada exitosamente");
      fetchUserData(); // Actualizar los datos del usuario
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axios.delete(
        `${process.env.API_URL}${DELETE_COMMENT}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Comentario eliminado exitosamente");
      fetchUserData(); // Actualizar los datos del usuario
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleStatusChange = async (taskId: number, newStatusId: number) => {
    try {
      await axios.put(
        `${process.env.API_URL}${AUTH_TASK}/${taskId}`,
        {
          statusId: newStatusId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Estado de tarea actualizado exitosamente");
      fetchUserData(); // Actualizar los datos del usuario
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  const renderStatusIcon = (statusId: number) => {
    switch (statusId) {
      case 1:
        return <RiErrorWarningLine className="w-6 h-6 text-red-500" />;
      case 2:
        return <TbProgressAlert className=" w-6 h-6 text-yellow-500" />;
      case 3:
        return <FaCheck className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const renderStatusOptions = (taskId: number, currentStatusId: number) => {
    const statuses = [
      { id: 1, label: "Pendiente" },
      { id: 2, label: "En Progreso" },
      { id: 3, label: "Completado" },
    ];

    return (
      <select
        value={currentStatusId}
        onChange={(e) => handleStatusChange(taskId, parseInt(e.target.value))}
        className="p-2 outline-none border rounded-xl"
      >
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        ))}
      </select>
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // Si no hay destino, no hacemos nada
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1); // Removemos el elemento de la posición de origen
    reorderedTasks.splice(result.destination.index, 0, removed); // Lo insertamos en la posición de destino
    setTasks(reorderedTasks); // Actualizamos el estado con las tareas reordenadas
  };
  return (
    <article className="flex flex-col justify-center items-center mt-12 gap-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        key={task.id}
                        className="p-3 pb-8 mb-8  w-[90vw] md:max-w-[350px] h-auto border-2 rounded-xl"
                      >
                        <div className="flex flex-col items-end justify-start ">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className=" w-10 h-10 rounded-full hover:text-red-500 "
                          >
                            <IoCloseOutline className=" border-1 rounded-full bg-white w-8 h-8" />
                          </button>
                        </div>
                        <div className="flex flex-col justify-center px-2 gap-4">
                          <div className=" flex flex-col items-center justify-center">
                            <h1 className="text-lg mb-2 text-start font-bold underline underline-offset-2 mt-[-2px]">
                              {task.title}
                            </h1>
                            <div className="w-full flex flex-row items-center justify-between">
                              <p className=" font-bold ">Estado</p>
                              <span className=" flex flex-row gap-2 items-center justify-between">
                                {renderStatusIcon(task.status.id)}
                                {renderStatusOptions(task.id, task.status.id)}
                              </span>
                            </div>
                          </div>
                          <div className=" border-1 p-3 rounded-xl">
                            <p className="text-xs">{task.description}</p>
                          </div>
                          <div>
                            <p className="px-2 text-xs">
                              <span className="font-bold underline underline-offset-2">
                                Comentarios
                              </span>
                              {task.comments.map((comment) => (
                                <div
                                  className="mb-4 mt-2 border-1 px-3 pb-2 rounded-xl"
                                  key={comment.id}
                                >
                                  <div className="  mr-[-1.4rem]  mt-4 flex items-end justify-end">
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(comment.id)
                                      }
                                      className="absolute border-1 rounded-full bg-white hover:text-red-500 items-center justify-center"
                                    >
                                      <IoCloseOutline className=" w-6 h-6" />
                                    </button>
                                  </div>
                                  <strong>{comment.username}</strong>:{" "}
                                  {comment.content}
                                </div>
                              ))}
                            </p>
                          </div>
                          {taskIdWithOpenComment === task.id && (
                            <form
                              className="flex flex-row justify-between"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleCommentSubmit(task.id);
                              }}
                            >
                              <input
                                className="p-2 h-8 outline-none"
                                type="text"
                                placeholder="Escribe un comentario..."
                                value={newComment}
                                onChange={handleCommentChange}
                              />
                              <button type="submit">Enviar</button>
                            </form>
                          )}
                          {taskIdWithOpenComment !== task.id && (
                            <button
                              onClick={() => setTaskIdWithOpenComment(task.id)}
                            >
                              Agregar comentario
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </article>
  );
};
export default TaskContainer;
