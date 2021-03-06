import React from 'react';
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='brand'
          placeholder='Brand' />
        <input
          type='text'
          name='model'
          placeholder='Model' />
        <input
          type='textarea'
          name='description'
          placeholder='Description' />
        <input
          type='number'
          step="0.01"
          name='price'
          placeholder='Price' />
          <input
          type='number'
          name='stockQuantity'
          placeholder='Stock Quantity' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;