import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import {Route, Switch} from "react-router";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path={"/checkout-summary"} component={Checkout}/>
                <Route path={"/orders"} component={Orders} />
                <Route path={"/"} exact component={BurgerBuilder}/>
            </Switch>
        </Layout>
    );
}

export default App;
