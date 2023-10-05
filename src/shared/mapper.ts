import { CreateTodoDto } from "src/todo/dto/create-todo.dto";
import { Todo } from "src/todo/entities/todo.entity";

export const toTodoDto = (data: Todo): CreateTodoDto => {  
    const { id, name, description } = data;

    let todoDto: CreateTodoDto = { id, name, description, };
    return todoDto;
    
};
