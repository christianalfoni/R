import Bacon from 'baconjs'

module.exports = {
  changeNewTitle: new Bacon.Bus(),
  removeTodo: new Bacon.Bus(),
  toggleTodo: new Bacon.Bus(),
  toggleAll: new Bacon.Bus(),
  editTodo: new Bacon.Bus(),
  filterTodos: new Bacon.Bus(),
  clearCompleted: new Bacon.Bus(),
  stopEditing: new Bacon.Bus(),
  changeEditedTodoTitle: new Bacon.Bus()
};
