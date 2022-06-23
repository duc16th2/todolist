const Todos = require("./../model/todos.model");

class TodoController {
  async todos(req, res) {
    const todos = await Todos.find();
    const user = req.user;
    res.render("pages/todo", { user: user, todos: todos });
  }

  async addItem(req, res) {
    const todo = req.body;
    await Todos.create({ todo: todo.todo, status: "incomplete" });
    res.redirect("/todos");
  }

  async doneItem(req, res) {
    const { _id } = req.params;
    await Todos.updateOne({ _id }, { status: "completed" });
    res.redirect("/todos");
  }

  async removeItem(req, res) {
    const { _id } = req.params;
    await Todos.deleteOne({ _id });
    res.redirect("/todos");
  }
}

module.exports = new TodoController();
