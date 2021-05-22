import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, useHistory, useRouteMatch} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

const Checkout = (props) => {
    const history = useHistory();
    const match = useRouteMatch();

    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinueHandler = () => {
        history.replace('/checkout-summary/contact-data');
    }

    return (
        <>
            <CheckoutSummary
                ingredients={props.ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinueHandler}/>
            <Route path={match.path + '/contact-data'} component={ContactData}/>
        </>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);