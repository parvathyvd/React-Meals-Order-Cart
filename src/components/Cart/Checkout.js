import classes from './Checkout.module.css';
import { useRef } from 'react';
import { useState } from 'react';

//helper fucnction
const isEmpty = (enteredValue) => enteredValue.trim() === '';
const isFiveChar = (enteredValue) => enteredValue.length === 5


const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const [formInputsVaild, setFormInputsValid] = useState({
      name: true,
      street: true,
      postal: true,
      city: true,
    })

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalValid = !isEmpty(enteredPostal) && isFiveChar(enteredPostal);
    const enteredCityValid = !isEmpty(enteredCity);

    setFormInputsValid({
      name: enteredNameValid,
      street: enteredStreet,
      postal: enteredPostal,
      city : enteredCity
    })

    const formIsValid = enteredNameValid && enteredStreetValid && enteredPostalValid && enteredCityValid

    if(!formIsValid){
      return;
    }

    // Submit form
      props.onConfirm({
        name: enteredName,
        street : enteredStreet,
        city: enteredCity,
        postal: enteredPostal

      })

  }


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsVaild.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsVaild.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsVaild.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsVaild.street && <p>Please enter a valid Street</p>}
      </div>
      <div className={`${classes.control} ${formInputsVaild.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputsVaild.postal && <p>Please enter a valid Postal(5 digits)</p>}
      </div>
      <div className={`${classes.control} ${formInputsVaild.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsVaild.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;