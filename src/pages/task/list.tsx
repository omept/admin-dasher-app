import { KanbanBoardContainer } from "@/components/task/kanban/board";
import KanbanColumn from "@/components/task/kanban/column";

const TaskList = () => {
  return (
    <>
      <KanbanBoardContainer>
        <KanbanColumn></KanbanColumn>
      </KanbanBoardContainer>
    </>
  );
};

export default TaskList;
