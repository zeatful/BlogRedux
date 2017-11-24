import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// React Router does fuzzy matching on path, must use exact keyword to prevent
// both components from rendering, could also use switch instead /posts/:id must
// be second route
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/posts/new" component={PostsNew}/>
        <Route path="/posts/:id" component={PostsShow}/>
        <Route exact path="/" component={PostsIndex}/>
      </Switch>
    </div>
  </BrowserRouter>
</Provider>, document.querySelector('.container'));