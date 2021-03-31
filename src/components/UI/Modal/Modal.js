import classes from "./Modal.module.css"
import Backdrop from "../Backdrop/Backdrop";
import {PureComponent} from "react";

class Modal extends PureComponent {

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