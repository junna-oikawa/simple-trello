import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTaskCardButton from './button/AddTaskCardButton';
import { TaskCard } from './TaskCard'

const reorder = (taskCardsList, startIndex, endIndex) => {
  const remove = taskCardsList.splice(startIndex, 1);
  taskCardsList.splice(endIndex, 0, remove[0]);
}

export const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([{
    id: "0",
    draggableId: "item-0"
  }]);
  
  const handleDragEnd = (result) => {
    reorder(taskCardsList, result.source.index, result.destination.index);
    setTaskCardsList(taskCardsList);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div className="taskCardsArea" {...provided.droppableProps} ref={provided.innerRef}>
            {taskCardsList.map((taskCard, index) => (
              <TaskCard index={index} key={taskCard.id} taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} taskCard={taskCard} />
            ))}
            {provided.placeholder}
            <AddTaskCardButton taskCardsList={taskCardsList} setTaskCardsList={setTaskCardsList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TaskCards;