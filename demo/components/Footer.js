import {Component, DOM, Hook} from 'R';
import Bacon from 'baconjs';

module.exports = Component(function (props, observables) {

  var {actions, store} = observables;

  var getRemainingText = function (remainingCount) {
    return remainingCount === 1 ? remainingCount + ' item left' : remainingCount + ' items left';
  };

  var getClassName = function (props, filter) {
    var filterKeys = Object.keys(filter);
    for (var x = 0; x < filterKeys.length; x++) {
      if (props.indexOf(filterKeys[x]) === -1) {
        return '';
      }
    }
    return props.length === filterKeys.length ? 'selected' : '';
  };

  return Bacon.combineTemplate({
      filter: store.filter,
      remainingCount: store.remainingCount,
      count: store.count
    })
    .map(function (state) {
      return (
        <footer id="footer">
          <span id="todo-count"><strong>{getRemainingText(state.remainingCount)}</strong>
          </span>
          <ul id="filters">
            <li>
              <a className={getClassName(['complete', 'inComplete'], state.filter)} href="/">All</a>
            </li>
            <li>
              <a className={getClassName(['inComplete'], state.filter)} href="/incomplete">Active</a>
            </li>
            <li>
              <a className={getClassName(['complete'], state.filter)} href="/complete">Completed</a>
            </li>
          </ul>
          <button id="clear-completed" ev-click={Hook(actions.clearCompleted, 'push')}></button>
        </footer>
      );
    })
});
