import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputMask from "react-input-mask";
import {connect} from "react-redux";
import {getClientOrders} from "../../store/actions/clientsActions";

function FormDialog(props) {
    const [phone, setPhone] = React.useState('');
    const handleChange = e => {
        setPhone(e.target.value);
    };
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Узнать статус заказа</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите номер телефона что-бы узнать о состоянии текущих заказов.
                    </DialogContentText>
                    <InputMask value={phone}
                               helperText="123 456 7890"
                               mask="+7 999 999 9999"
                               maskChar={null}
                               required
                               id="phone"
                               name="phone"
                               label="Телефон"
                               fullWidth
                               onChange={handleChange}>
                        {(inputProps) => <TextField {...inputProps}
                                                    type="tel" value={phone} />}
                    </InputMask>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={() => props.getClientOrders(phone)} color="primary">
                        Проверить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        getClientOrders: (phone) => dispatch(getClientOrders(phone)),
    }
};

export default connect(null, mapDispatchToProps)(FormDialog);
