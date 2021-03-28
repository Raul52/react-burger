import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop";
import {Component} from "react";

class Modal extends Component {

    //alternative would be PureComponent but that checks all props so it's more inefficient than one simple check
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (<>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                     style={
                         {
                             transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                             opacity: this.props.show ? '1' : '0',
                         }
                     }>
                    {this.props.children}
                </div>
            </>
        )
    };
}

export default Modal;