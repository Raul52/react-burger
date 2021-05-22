import {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import firebaseInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {useHistory} from "react-router";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";

const ContactData = (props) => {
    const getElement = (type, config, value, validation, isValid) => {
        return {
            elementType: type,
            elementConfig: config,
            value: value,
            validation: validation,
            isValid: isValid,
            isTouched: false
        }
    };

    const [orderForm, setOrderForm] = useState({
        name: getElement('input', {type: 'text', placeholder: 'Your name'}, '', {required: true}, false),
        street: getElement('input', {type: 'text', placeholder: 'Your street'}, '', {required: true}, false),
        zipCode: getElement('input', {type: 'text', placeholder: 'Your zip code'}, '', {required: true, minLength: 5, maxLength: 5}, false),
        country: getElement('input', {type: 'text', placeholder: 'Your country'}, '', {required: true}, false),
        email: getElement('input', {type: 'email', placeholder: 'Your email'}, '', {required: true},false),
        deliveryMethod: getElement('select', {
            options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
            ]
        }, 'fastest', undefined, true)
    });
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const history = useHistory();

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: getFormData()
        }

        firebaseInstance.post('/orders.json', order)
            .then((response) => {
                setLoading(false);
                history.push("/");
            })
            .catch((error) => console.log(error))
    }

    const getForm = () => {
        if (loading) {
            return <Spinner/>
        } else {
            const formInputs = getFormInputs();
            return (
                <form onSubmit={orderHandler}>
                    {formInputs.map(formInput => (
                        <Input
                            key={formInput.id}
                            elementType={formInput.config.elementType}
                            elementConfig={formInput.config.elementConfig}
                            value={formInput.config.value}
                            invalid={!formInput.config.isValid}
                            shouldValidate={formInput.config.validation}
                            touched={formInput.config.isTouched}
                            onChange={(event) => inputOnChangeHandler(event, formInput.id)}/>))}
                    <Button btnType="Success" disabled={!isFormValid}>Order</Button>
                </form>
            );
        }
    }

    const isValid = (value, rules) => {
        let isValid = true;

        if (rules === undefined) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    const inputOnChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = isValid(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.isTouched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }

        setIsFormValid(formIsValid);
        setOrderForm(updatedOrderForm)
    }

    const getFormInputs = () => {
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        return formElementsArray;
    }

    const getFormData = () => {
        const formData ={};
        for (let formElement in orderForm) {
            formData[formElement] = orderForm[formElement].value;
        }

        return formData;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {getForm()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);