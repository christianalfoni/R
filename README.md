# R
A view concept for Functional Reactive Applications. Read the following article for an introduction: [Functional Reactive Applications](http://christianalfoni.com/articles/2015_04_01_Functional-Reactive-Applications).

### Supports
- [BaconJS](https://baconjs.github.io/)
- [RxJS](http://xgrommx.github.io/rx-book/index.html)

### API
**R** exposes a simple API to give your FRP code a view layer to hook on to.

#### DOM
DOM has to be available in the scope of the module. It is used by the JSX transpiler. So, whenever you write JSX, import the DOM function.

#### Component
A component has to return an observable of vritual dom structures.
```js
import {Component, DOM} from 'r-js';

exports default Component(function (props, observables) {
  
  return observables.foo
    .map(function (foo) {
      
      return (
        <div>
          <h1>Hello there {foo}. Message: {props.message}</h1>
        </div>
      );

    });

});
```

#### Render
Inject observables to map over in your Components. The function has to return a component that will be mounted on `document.body`.
```js
import {Render, DOM} from 'r-js';
import observables from './observables.js';
import App from './App.js';

Render(observables, function () {
  return <App message="Wazup?"/>;
});

```

#### Hook
Hook allows you to easily push values to a Bus (BaconJS) using `push` or BehaviorSubject (RxJS) using `onNext`. You can also bind values to the hook.
```js
import {Component, Hook, DOM} from 'r-js';

exports default Component(function (props, observables) {
  
  return observables.foo
    .map(function (foo) {
      
      return (
        <div>
          <h1>Hello there {foo}. Message: {props.message}</h1>
          <button 
            ev-click={Hook(observables.changeFoo, 'push', 'This is the new value')}
          >Change</button>
        </div>
      );

    });

});
```

### Install
It is highly recommended to use Webpack and babel-loader for JSX and ES6/7 syntax.

- `npm install r-js`
- `npm install virtual-dom-loader`
- `npm install babel-loader`
- `npm install webpack`
- `npm install webpack-dev-server`

Create a `webpack.config.js` file in your root folder.

```js
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var appPath = path.resolve(__dirname, 'app');
var buildPath = path.resolve(__dirname, 'build');

var config = {
  entry: path.resolve(appPath, 'main.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!virtual-dom?jsx=DOM',
      exclude: [nodeModulesPath]
    }]
  }
};

module.exports = config;
```

And add a script in your `package.json` file:
```js
...
"scripts": {
  "start": "webpack-dev-server --devtool eval --progress --colors --content-base build/",
}
...
```

And last but not least, you need an html file in your build folder. `build/index.html`.

```html
<body>
  <script src="bundle.js"></script>
</body>
```

Please check out [react-webpack-cookbook](https://github.com/christianalfoni/react-webpack-cookbook/wiki) for more info on using webpack.

### Run
`npm start` runs the demo on *localhost:8080*

### Contribute
- Fork and clone repo
- `npm install`
- `npm start` starts development flow on localhost:8080
- `npm test` run tests
