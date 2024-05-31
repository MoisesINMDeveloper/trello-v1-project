// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
    statusId: number,
    userId: number
  ) => void;
  userId: number; // Agregar userId como prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, userId }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [statusId, setStatusId] = React.useState(1); // Suponiendo que el estado por defecto es 1

  const handleSave = () => {
    onSave(title, description, statusId, userId);
    setTitle("");
    setDescription("");
    setStatusId(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90vw] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <select
          value={statusId}
          onChange={(e) => setStatusId(Number(e.target.value))}
          className="border p-2 w-full mb-4"
        >
          <option value={1}>Pending</option>
          <option value={2}>In Progress</option>
          <option value={3}>Completed</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
