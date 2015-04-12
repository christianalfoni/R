import {Component, DOM, Hook} from 'R';
import Bacon from 'baconjs';
import Todo from './Todo.js';
import Footer from './Footer.js';

module.exports = Component(function (props, observables) {

  var {actions, store} = observables;

  function renderTodo(todo, index) {
    return <Todo key={index} todo={todo}/>
  }

  function renderTodos(state) {
    return (
      <section id="main">
        <input 
          id="toggle-all" 
          type="checkbox" 
          ev-click={Hook(actions.toggleAll, 'push')}
          checked={state.allChecked}
        />
        <ul id="todo-list">
          {state.todos.map(renderTodo)}
        </ul>
      </section>
    );
  }

  return Bacon.combineTemplate({
      title: store.title,
      todos: store.todos,
      allChecked: store.allChecked,
      isSaving: store.isSaving,
      count: store.count
    })
    .map(function (state) {
      return (
        <section id="todoapp">
          <header id="header">
            <h1>todos</h1>
              <input 
                id="new-todo" 
                value={state.title}
                ev-keydown={Hook(actions.changeNewTitle, 'push')}
                placeholder={state.isSaving ? 'Saving...' : 'What needs to be done?'} 
                disabled={state.isSaving}
                autofocus
              />
          </header>
          {state.count ? renderTodos(state) : null}
          {state.count ? <Footer/> : null}
        </section>
      );
    });
});

/*

          
          */
