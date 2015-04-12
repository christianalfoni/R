import actions from './actions.js';
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
  returnEmptyString,
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


var toggleTodo = actions.toggleTodo
  .map(toggleTodoMutation);

var newTodo = actions.changeNewTitle
  .throttle(0)
  .filter(pressEnterWithValue)
  .map(createTodoFromEvent);

var addTodo = newTodo
  .map(addTodoMutation);

var removeTodo = actions.removeTodo
  .map(removeTodoMutation);

var clearCompleted = actions.clearCompleted
  .map(clearCompletedMutation);

var editTodo = actions.editTodo
  .map(editTodoMutation);

var stopEditing = actions.stopEditing
  .filter(escOrClick)
  .map(clearEditTodoMutation);

var toggleAll = actions.toggleAll
  .map(toggleAllTodoMutation);

var saveTodo = newTodo
  .flatMapLatest(function (todo) {
    return Bacon.fromPromise(saveTodoToServer(todo));
  });

var savedTodo = saveTodo
  .map(updateTodoMutation)
  .mapError(revertUpdateTodoMutation);

var changeEditedTodoTitle = actions.changeEditedTodoTitle
  .map(changeEditedTodoTitleMutation);

var setEditedTodoTitle = actions.changeEditedTodoTitle
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

var filter = actions.filterTodos
  .toProperty()
  .startWith({
    complete: true,
    inComplete: true
  });

var filteredTodos = Bacon
  .combineAsArray(todos, filter)
  .map(filterTodos);

var newTitle = newTodo
  .map(returnEmptyString)
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
