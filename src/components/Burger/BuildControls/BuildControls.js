import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(el =>
            <BuildControl
                key={el.label}
                label={el.label}
                added={() => props.ingredientAdded(el.type)}
                removed={() => props.ingredientsRemoved(el.type)}
                disabled={props.disabled[el.type]}
            />
        )}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW
        </button>
    </div>
);

export default BuildControls;