import {View, DOM} from 'R';
import Bacon from 'baconjs';

module.exports = View(function (props, models, controllers) {

  var todo = props.todo;
  var className = '';

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
    window.addEventListener('click', controllers.stopEditing.push);
    window.addEventListener('keydown', controllers.stopEditing.push);
  } else {
    window.removeEventListener('click', controllers.stopEditing.push);
    window.removeEventListener('keydown', controllers.stopEditing.push);
  }
  
  return Bacon.constant(
      <li className={className} ev-dblclick={controllers.editTodo.bindPush(props.key)}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            checked={todo.completed} 
            ev-change={controllers.toggleTodo.bindPush(props.key)}
            autofocus
          />
          <label ng-dblclick="editTodo(todo)">{todo.title}</label>
          <button className="destroy" ev-click={controllers.removeTodo.bindPush(props.key)}></button>
        </div>
        <input className="edit" value={todo.$newTitle} ev-keydown={controllers.changeEditedTodoTitle.push}/>
      </li>
  );
});
