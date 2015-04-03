import controllers from './controllers.js';
import Bacon from 'baconjs';
import { Promise } from 'es6-promise';
import {
  pressEnterWithValue,
  createTodoFromEvent,
  addTodoMutation,
  updateTodoMutation,
  revertUpdateTodoMutation,
  mutateValue,
  toggleTodoMutation,
  toggleAllTodoMutation,
  saveTodoToServer,
  isAllChecked,
  resetByEnterPress,
  returnTrue,
  returnFalse,
  removeTodoMutation,
  filterTodos,
  filterIncompleteTodos,
  clearCompletedMutation,
  editTodoMutation,
  clearEditTodoMutation,
  escOrClick,
  changeEditedTodoTitleMutation,
  setEditedTodoTitleMutation
} from './helpers.js';


var toggleTodo = controllers.toggleTodo
  .map(toggleTodoMutation);

var newTodo = controllers.changeNewTitle
  .filter(pressEnterWithValue)
  .map(createTodoFromEvent);

var addTodo = newTodo
  .map(addTodoMutation);

var removeTodo = controllers.removeTodo
  .map(removeTodoMutation);

var clearCompleted = controllers.clearCompleted
  .map(clearCompletedMutation);

var editTodo = controllers.editTodo
  .map(editTodoMutation);

var stopEditing = controllers.stopEditing
  .filter(escOrClick)
  .map(clearEditTodoMutation);

var toggleAll = controllers.toggleAll
  .map(toggleAllTodoMutation);

var saveTodo = newTodo
  .flatMapLatest(function (todo) {
    return Bacon.fromPromise(saveTodoToServer(todo));
  });

var savedTodo = saveTodo
  .map(updateTodoMutation)
  .mapError(revertUpdateTodoMutation);

var changeEditedTodoTitle = controllers.changeEditedTodoTitle
  .map(changeEditedTodoTitleMutation);

var setEditedTodoTitle = controllers.changeEditedTodoTitle
  .filter(pressEnterWithValue)
  .map(setEditedTodoTitleMutation);

var todos = Bacon
  .mergeAll(
    addTodo, 
    removeTodo, 
    toggleAll, 
    toggleTodo, 
    savedTodo, 
    clearCompleted, 
    editTodo, 
    stopEditing,
    changeEditedTodoTitle,
    setEditedTodoTitle)
  .scan([], mutateValue);

var allChecked = todos
  .map(isAllChecked);

var isSaving = Bacon
  .mergeAll(
    newTodo.map(returnTrue),
    savedTodo.map(returnFalse)
  )
  .startWith(false);

var filter = controllers.filterTodos
  .toProperty()
  .startWith({
    complete: true,
    inComplete: true
  });

var filteredTodos = Bacon
  .combineAsArray(todos, filter)
  .map(filterTodos);

var newTitle = controllers.changeNewTitle
  .map(resetByEnterPress)
  .startWith('');

var count = todos
  .map('.length');

var remainingCount = todos
  .map(filterIncompleteTodos)
  .map('.length');

module.exports = {
  count: count,
  todos: filteredTodos,
  title: newTitle,
  allChecked: allChecked,
  isSaving: isSaving,
  filter: filter,
  remainingCount: remainingCount
}
