import React from "react";
import TextField from "@material-ui/core/TextField";

const WorkersSelect = (props) => {
    return (
        <TextField
            select
            data-id={props.index}
            fullWidth
            value={props.workerId}
            onClick={(e) => e.stopPropagation()}
            onChange={props.changeHandler}
            inputProps={{
                name: props.name,
                id: props.name + props.index,
                style: {minWidth: '80px'}
            }}
            SelectProps={{
                native: true
            }}
        >
            {props.workers ?
                props.workers
                    .filter(worker => worker.role === props.workerRole || worker.role === 'nobody')
                    .map((worker, index) => (
                        <option key={index} value={worker.id} style={{minWidth: '130px'}}>
                            {`${worker.firstName} ${worker.lastName}`}
                        </option>
                        )
                    )
            : null}
        </TextField>
    )
};

export default WorkersSelect;

