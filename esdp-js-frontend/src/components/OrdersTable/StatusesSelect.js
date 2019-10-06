import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

const StatusesSelect = (props) => {
    return (
        <NativeSelect
            data-id={props.index}
            fullWidth
            value={props.statusId}
            selected={props.statusId}
            onClick={(e) => e.stopPropagation()}
            onChange={props.changeHandler}
            inputProps={{
                name: props.name,
            }}
        >
            {props.statuses ?
                props.statuses
                    .filter(status => status.status)
                    .map((status, index) => (
                        <option key={index} value={status.id} style={{border: `1px solid ${status.color}`}}>
                            {status.title}
                        </option>
                        )
                    )
                : null}
        </NativeSelect>
    )
};

export default StatusesSelect;

