import {Component, DOM, Hook} from 'R';
import Bacon from 'baconjs';

module.exports = Component(function (props, observables) {

  var todo = props.todo;
  var className = '';
  var {actions, store} = observables;
  var stopEditing = Hook(actions.stopEditing, 'push');

  if (todo.completed) {
    className += 'completed';
  }

  if (todo.$isSaved) {
    className += ' saved';
  }
  
  if (todo.$isEditing) {
    className += ' editing';
    setTimeout(function () {
      document.querySelectorAll('.edit')[props.key].focus();
    }, 0);
    window.addEventListener('click', stopEditing);
    window.addEventListener('keydown', stopEditing);
  } else {
    window.removeEventListener('click', stopEditing);
    window.removeEventListener('keydown', stopEditing);
  }
  
  return Bacon.constant(
      <li className={className} ev-dblclick={Hook(actions.editTodo, 'push', props.key)}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            checked={todo.completed} 
            ev-change={Hook(actions.toggleTodo, 'push', props.key)}
            autofocus
          />
          <label ng-dblclick="editTodo(todo)">{todo.title}</label>
          <button className="destroy" ev-click={Hook(actions.removeTodo, 'push', props.key)}></button>
        </div>
        <input className="edit" value={todo.$newTitle} ev-keydown={Hook(actions.changeEditedTodoTitle, 'push')}/>
      </li>
  );
});
