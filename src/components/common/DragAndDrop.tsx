// import React from "react";
// import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

// interface DragDropContainerProps {
//   onDragEnd: (result: any) => void;
//   tasks: any[]; // Tipo de los tasks
//   children: React.ReactNode;
// }

// const DragDropContainer: React.FC<DragDropContainerProps> = ({
//   onDragEnd,
//   tasks,
//   children,
// }) => {
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {tasks.map((task, index) => (
//               <Draggable
//                 key={task.id} // Usando el id del task como clave
//                 draggableId={task.id.toString()} // Usando el id del task como draggableId
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                   >
//                     {React.Children.toArray(children)[index]}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   </section>}
//   );
// };

// export default DragDropContainer;
