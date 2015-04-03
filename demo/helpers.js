var ajax = function (todo) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(todo);
    }, 2000);
  });
};

module.exports = {
  pressEnterWithValue: function (event) {
    return !!(event && event.keyCode === 13 && event.target.value);
  },
  createTodoFromEvent: function (event) {
    return {
      title: event.target.value,
      completed: false
    }
  },
  addTodoMutation: function (todo) {
    return function (todos) {
      todos.push(todo);
      return todos;
    };
  },
  saveTodoToServer: function (todo) {
    return ajax(todo);
  },
  removeTodoMutation: function (index) {
    return function (todos) {
      todos.splice(index, 1);
      return todos;
    }
  },
  updateTodoMutation: function (todo) {
    return function (todos) {
      todo.$isSaved = true;
      return todos;
    };
  },
  revertUpdateTodoMutation: function (todo) {
    return function (todos) {
      todos.splice(todos.indexOf(todo), 1);
      return todos;
    }
  },
  toggleTodoMutation: function (index, event) {
    return function (todos) {
      todos[index].completed = !todos[index].completed;
      return todos;
    };
  },
  toggleAllTodoMutation: function () {
    return function (todos) {
      if (todos.filter(function (todo) {
          return !todo.completed;
        }).length) {
        return todos.map(function (todo) {
          todo.completed = true;
          return todo;
        });
      } else {
        return todos.map(function (todo) {
          todo.completed = false;
          return todo;
        });
      }
    };
  },
  isAllChecked: function (todos) {
    return !todos.filter(function (todo) {
      return !todo.completed;
    }).length;
  },
  returnTrue: function () {
    return true;
  },
  returnFalse: function () {
    return false;
  },
  resetByEnterPress: function (event) {
    if (!event || event.keyCode === 13) {
      return '';
    } else {
      return event.target.value;
    }
  },
  mutateValue: function (value, mutation) {
    return mutation(value);
  },
  filterTodos: function (streams) {
    var todos = streams[0];
    var filter = streams[1];
    return todos.filter(function (todo) {
      return (todo.completed && filter.complete) || (!todo.completed && filter.inComplete);
    });
  },
  filterIncompleteTodos: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  clearCompletedMutation: function () {
    return function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    }
  },
  editTodoMutation: function (index) {
    return function (todos) {
      var currentlyEditedTodo = todos.filter(function (todo) {
        return todo.$isEditing;
      });
      if (currentlyEditedTodo.length) {
        currentlyEditedTodo[0].$isEditing = false;
      }
      todos[index].$isEditing = true;
      todos[index].$newTitle = todos[index].title;
      return todos;
    };
  },
  clearEditTodoMutation: function () {
    return function (todos) {
      var currentlyEditedTodo = todos.filter(function (todo) {
        return todo.$isEditing;
      });
      if (currentlyEditedTodo.length) {
        currentlyEditedTodo[0].$isEditing = false;
      }
      return todos;
    };
  },
  escOrClick: function (event) {
    return (event.keyCode && event.keyCode === 27) || (event.type === 'click');
  },
  changeEditedTodoTitleMutation: function (event) {
    return function (todos) {
      var currentlyEditedTodo = todos.filter(function (todo) {
        return todo.$isEditing;
      });
      if (currentlyEditedTodo.length) {
        currentlyEditedTodo[0].$newTitle = event.target.value;
      }
      return todos;
    }
  },
  setEditedTodoTitleMutation: function (event) {
    return function (todos) {
      var currentlyEditedTodo = todos.filter(function (todo) {
        return todo.$isEditing;
      });
      if (currentlyEditedTodo.length) {
        currentlyEditedTodo[0].title = currentlyEditedTodo[0].$newTitle;
        currentlyEditedTodo[0].$isEditing = false;
      }
      return todos;
    }
  }
}
