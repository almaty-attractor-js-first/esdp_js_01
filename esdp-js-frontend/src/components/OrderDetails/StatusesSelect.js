import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

const StatusesSelect = (props) => {

    return (
        <NativeSelect
            data-id={props.index}
            fullWidth
            value={props.statusId || ''}
            onClick={(e) => e.stopPropagation()}
            onChange={props.changeHandler}
            inputProps={{
                name: props.name,
                id: props.name + props.index,
            }}
        >
            <option value={props.statusId}>
                {(props.statuses[0]) ?
                    (props.statuses.find(status => {return props.statusId === status.id}).title) :
                    null}
            </option>
            {props.statuses ?
                props.statuses.map((item, index) => {
                    return (
                        <option key={index} value={item.name} style={{background: item.color}}>
                            {item.title}
                        </option>
                    )
                }) : null}
        </NativeSelect>
    )
};

export default StatusesSelect;

