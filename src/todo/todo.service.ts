import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from 'src/shared/schema/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  todos: any[] = [
    {
      id: 'eac400ba-3c78-11e9-b210-d663bd873d93',
      name: 'Supermarket Todo list',
    },
    {
      id: 'eac40736-3c78-11e9-b210-d663bd873d93',
      name: 'Office Todo list',
    },
    {
      id: 'eac408d0-3c78-11e9-b210-d663bd873d93',
      name: 'Traveling Todo  list',
    },
    {
      id: 'eac40a7e-3c78-11e9-b210-d663bd873d93',
      name: 'Studying Todo list',
    },
    {
      id: 'eac40c90-3c78-11e9-b210-d663bd873d93',
      name: 'Monday Todo list',
    },
  ];

  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto) {
    // createTodoDto.id = (Math.random()).toString();
    // this.todos.push(createTodoDto);
    const addedTodo = new this.todoModel(createTodoDto);
    return {
      message: 'Todo added successfully!',
      data: addedTodo.save()
    };
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  async findOne(id: string) {
    // const findInd = this.todos.findIndex(ele => ele.id === id);
    const findInd = await this.todoModel.findOne({ _id: id });
    if (findInd) return {
      message: `This action returns a todo`,
      data: findInd
    }
    else return `Data not found with #${id}`;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    // this.todos.filter(ele => {
    //   if (ele.id === id) {
    //     ele.name = updateTodoDto.name;
    //     ele.description = updateTodoDto.description;
    //   }
    // });
    const updateData = await this.todoModel.findOneAndUpdate({ _id: id }, updateTodoDto, { new: true });
    if (updateData) return {
      message: 'Updated successfully!',
      data: updateData
    };
    else return {
      message: `Data not found with #${id}`
    };
  }

  async remove(id: string) {
    const findInd = await this.todoModel.deleteOne({ _id: id });
    if (findInd) return {
      message: 'Deleted successfully!',
      data: findInd
    };
    else return {
      message: `Data not found with #${id}`
    };
  }
}
