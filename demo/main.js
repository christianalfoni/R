import {Observable, View, Render, DOM} from 'R';
import controllers from './controllers.js';
import models from './models.js';
import Todos from './views/Todos.js';
import page from 'page';

page('/', function () {
  controllers.filterTodos.push({
    complete: true,
    inComplete: true
  });
});

page('/complete', function () {
  controllers.filterTodos.push({
    complete: true
  });
});

page('/incomplete', function () {
  controllers.filterTodos.push({
    inComplete: true
  });
});

Render(models, controllers, function () {
  page.start();
  return Todos();
});
