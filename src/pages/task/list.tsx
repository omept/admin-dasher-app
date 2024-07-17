import {
  KanbanBoard,
  KanbanBoardContainer,
} from "@/components/task/kanban/board";
import KanbanColumn from "@/components/task/kanban/column";

const TaskList = () => {
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn title="Backlog"></KanbanColumn>
          <KanbanColumn title="In Progress"></KanbanColumn>
          <KanbanColumn title="Done"></KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default TaskList;
