import {Component, Render, DOM, Hook} from 'R';
import actions from './actions.js';
import store from './store.js';
import Todos from './components/Todos.js';
import page from 'page';

page('/', function () {
  actions.filterTodos.push({
    complete: true,
    inComplete: true
  });
});

page('/complete', function () {
  actions.filterTodos.push({
    complete: true
  });
});

page('/incomplete', function () {
  actions.filterTodos.push({
    inComplete: true
  });
});

Render({
  store: store,
  actions: actions
}, function () {
  page.start();
  return Todos();
});

