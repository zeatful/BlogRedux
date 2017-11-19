import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// React Router does fuzzy matching on path, must use exact keyword to prevent
// both components from rendering, could also use switch instead

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <div>
      <Route exact path="/" component={PostsIndex}/>
      <Route exact path="/posts/new" component={PostsNew}/>
    </div>
  </BrowserRouter>
</Provider>, document.querySelector('.container'));

/* Alternative using switch component, must order most specific to least specific path
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <div>
    <Switch>
      <Route exact path="/posts/new" component={PostsNew}/>
      <Route exact path="/cookies" component={Cookies}/>
      <Route exact path="/" component={PostsIndex}/>
    </Switch>
    </div>
  </BrowserRouter>
</Provider>, document.querySelector('.container'));
*/