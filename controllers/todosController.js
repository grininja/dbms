import models from "../models";

const { Todo, TodoItem } = models;

const todos = {
  async create(req, res, next) {
    try {
      const { title } = req.body;
      const creator = req.user.username;
      const todo = await Todo.create({ title, creator });
      return res.status(201).send(todo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async fetchAll(req, res, next) {
    try {
      const myTodos = await Todo.findAll({
        where: { creator: req.user.username },
        include: [
          {
            model: TodoItem,
            as: "todoItems",
          },
        ],
      });
      return res.status(200).send(myTodos);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async fetchOne({ params, user }, res, next) {
    try {
      const myTodo = await Todo.findOne({
        where: { id: params.todoId, creator: user.username },
        include: [
          {
            model: TodoItem,
            as: "todoItems",
          },
        ],
      });
      if (!myTodo) {
        return res.status(404).send({ error: "Todo not found" });
      }
      return res.status(200).send(myTodo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async update({ body, user, params }, res, next) {
    try {
      const todo = await Todo.findOne({
        where: { id: params.todoId, creator: user.username },
      });
      if (!todo) {
        return res.status(400).send({ error: "Wrong todo id" });
      }
      const updatedTodo = await Todo.update(
        { title: body.title || todo.title },
        {
          where: { id: todo.id },
          returning: true,
          plain: true,
        }
      );
      return res.status(200).send(updatedTodo[1]);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async delete({ params, user }, res, next) {
    try {
      const todo = await Todo.findOne({
        where: { id: params.todoId, creator: user.username },
      });
      if (!todo) {
        return res.status(400).send({ error: "Wrong todo id" });
      }
      await todo.destroy();
      return res.status(200).send({});
    } catch (e) {
      return next(new Error(e));
    }
  },
};

export default todos;
