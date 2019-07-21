import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormElementMaterial from "../../components/FormElementMaterial/FormElementMaterial";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import MaterialUIPickers from "../../components/UI/DatePicker";


const useStyles = makeStyles(theme => ({
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(2),
		marginLeft: 0,
		minWidth: "100%",
	},
}));

export default function AddressForm() {
	const classes = useStyles();
	const [cleaningType, setCleaningType] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('female');

	function handleChangeRadio(event) {
		setValue(event.target.value);
	}

	function handleChange(event) {
		setCleaningType(event.target.value);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<FormElementMaterial
						required
						id="surname"
						name="surname"
						label="Фамилия"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormElementMaterial
						required
						id="firstName"
						name="firstName"
						label="Имя"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormElementMaterial
						required
						id="patronymic"
						name="patronymic"
						label="Отчество"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormElementMaterial
						required
						id="phone"
						name="phone"
						label="Телефон"
						fullWidth
						autoComplete="87078077755"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormElementMaterial
						required
						id="email"
						name="email"
						label="Электроная почта"
						fullWidth
						autoComplete="ch.kabykenov@gmail.com"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="cleaningType">Тип чистки</InputLabel>
						<Select
							fullWidth
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={cleaningType}
							onChange={handleChange}
							inputProps={{
								name: 'cleaningType',
								id: 'cleaningType',
							}}
						>
							<MenuItem value="">
								<em>Не выбран</em>
							</MenuItem>
							<MenuItem value="Мокрая">Мокрая</MenuItem>
							<MenuItem value="Сухая">Сухая</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid container justify="center" alignItems="center" xs={12} sm={6}>
					<Grid item>
						<IconButton aria-label="plus">
							<RemoveCircle />
						</IconButton>
					</Grid>
						<Typography component="p">
							Количество пар: 4
						</Typography>
					<Grid item>
						<IconButton aria-label="minus">
							<AddCircle />
						</IconButton>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography component="p">
						Итого:
					</Typography>
				</Grid>
				<Grid container justify="space-around" xs={12}>
					<RadioGroup aria-label="position" name="position" value={value} onChange={handleChangeRadio} row>
						<FormControlLabel
							value="delivery"
							control={<Radio color="primary" />}
							label="Доставка"
							labelPlacement="end"
						/>
						<FormControlLabel
							value="pickup"
							control={<Radio color="primary" />}
							label="Самовывоз"
							labelPlacement="end"
						/>
					</RadioGroup>
				</Grid>
				{
					value === "delivery" ?
					<Grid item xs={12}>
						<Grid item >
							<FormElementMaterial
								required
								id="deliveryAddress"
								name="deliveryAddress"
								label="Адрес для доставки"
								fullWidth
							/>
						</Grid>
						<MaterialUIPickers/>
					</Grid>
					: null
				}
			</Grid>
		</React.Fragment>
	);
}