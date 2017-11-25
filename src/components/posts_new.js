import _ from 'lodash';
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
};

// Field component only knows how to interact with Redux to handle
// actionCreaters and state it, it does not know how to render itself
class PostsNew extends Component {
  // spread the field.input attributes across the input tag and provides
  // pre-generated onChange, onFocus, onBlur event handlers field.meta contains
  // pristine, touched and untouched states of the field
  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error
      ? 'has-danger'
      : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input}/>
        <span className="text-help">{touched
            ? error
            : ''}</span>
      </div>
    );
  }
  onSubmit(values) {
    this
      .props
      .createPost(values, () => this.props.history.push('/'));
  }
  render() {
    // property passed to component from reduxForm
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title" type="text" name="title" component={this.renderField}/>
        <Field
          label="Categories"
          type="text"
          name="categories"
          component={this.renderField}/>
        <Field label="Content" type="text" name="content" component={this.renderField}/>
        <button className="btn btn-primary" type="submit">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate the inputs from the 'values' object
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  // errors === {} then valid, otherwise invalid
  return errors;
}

// treated similar to the connect call wrapping PostsNew with reduxForm function
// helper, let reduxForm communcate from the PostsNew component directly to the
// form reducer in reducers/index.js sets the form name, must be unique
export default reduxForm({validate, form: 'PostsNewForm'})(connect(null, {createPost})(PostsNew));
