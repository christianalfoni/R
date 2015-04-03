import {View, DOM} from 'R';
import Bacon from 'baconjs';

module.exports = View(function (props, models, controllers) {

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
      filter: models.filter,
      remainingCount: models.remainingCount,
      count: models.count
    })
    .map(function (data) {
      return (
        <footer id="footer">
          <span id="todo-count"><strong>{getRemainingText(data.remainingCount)}</strong>
          </span>
          <ul id="filters">
            <li>
              <a className={getClassName(['complete', 'inComplete'], data.filter)} href="/">All</a>
            </li>
            <li>
              <a className={getClassName(['inComplete'], data.filter)} href="/incomplete">Active</a>
            </li>
            <li>
              <a className={getClassName(['complete'], data.filter)} href="/complete">Completed</a>
            </li>
          </ul>
          <button id="clear-completed" ev-click={controllers.clearCompleted.push}></button>
        </footer>
      );
    })
});
