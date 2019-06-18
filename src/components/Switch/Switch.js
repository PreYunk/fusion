import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import classNames from './Switch.css';

const styles = () => ({
    switchBase: {
        color: 'white',
        '&$checked': {
            color: '#313131'
        },
        '&$checked + $track': {
            backgroundColor: '#313131'
        }
    },
    checked: {},
    track: {}
});

const materialSwitch = (props) => {
    const {classes} = props;
    return (
        <div className={classNames.Switch}>
            <Switch
                classes={{
                    switchBase: classes.switchBase,
                    checked: classes.checked,
                    track: classes.track
                }}
                checked={props.checked}
                onChange={props.onChange}
            />
            <span className={classNames.SwitchLabel}>{props.text}</span>
        </div>

    );
};

export default withStyles(styles)(materialSwitch);