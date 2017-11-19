import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router-dom';

class PostsIndex extends Component {
  // life cycle method immediately called once the component is in the DOM and on
  // the screen
  componentDidMount() {
    this
      .props
      .fetchPosts();
  }
  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      );
    });
  }
  // A Link tag has extra features to prevent some default anchor tag behavior
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">Add a Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts};
}

// avoiding the dispatch function
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);