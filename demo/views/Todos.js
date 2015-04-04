import {View, DOM} from 'R';
import Bacon from 'baconjs';
import Todo from './Todo.js';
import Footer from './Footer.js';

module.exports = View(function (props, models, controllers) {

  function renderTodo(todo, index) {
    return <Todo key={index} todo={todo}/>
  }

  function renderTodos(data) {
    return (
      <section id="main">
        <input 
          id="toggle-all" 
          type="checkbox" 
          ev-click={controllers.toggleAll.push}
          checked={data.allChecked}
        />
        <ul id="todo-list">
          {data.todos.map(renderTodo)}
        </ul>
      </section>
    );
  }

  return Bacon.combineTemplate({
      title: models.title,
      todos: models.todos,
      allChecked: models.allChecked,
      isSaving: models.isSaving,
      count: models.count
    })
    .map(function (data) {
      return (
        <section id="todoapp">
          <header id="header">
            <h1>todos</h1>
              <input 
                id="new-todo" 
                value={data.title}
                ev-keydown={controllers.changeNewTitle.push}
                placeholder={data.isSaving ? 'Saving...' : 'What needs to be done?'} 
                disabled={data.isSaving}
                autofocus
              />
          </header>
          {data.count ? renderTodos(data) : null}
          {data.count ? <Footer/> : null}
        </section>
      );
    });
});

/*

          
          */
