import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getOrders, changeStatus} from "../store/actions/ordersActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link as RouterLink } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardHeader,
	CardContent,
	Button,
	Divider,
	Table,
	TableCell,
	TableHead,
	Tooltip,
	TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TableRow from "@material-ui/core/TableRow";
import TableOrderRow from "../components/TableBody/TableOrderRow";


const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	statusContainer: {
		// display: 'flex',
		// alignItems: 'center',
		minWidth: "150px"
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));



const OrderItems = props => {
	const changeStatusButtonHandler = (id, status) => {
		console.log('boom in orderitems', id, status);
		let newStatus = '';
		if (status === 'pending') {
			newStatus = 'inWork'
		} else if (status === 'inWork') {
			newStatus = 'completed'
		}
		props.changeStatus(id, newStatus);
	};
	const [direction, setDirection] = useState(true);
	useEffect(() => {
		props.getOrders();
	}, []);
	const { className, getOrders, changeStatus, staticContext, ...rest } = props;
	const classes = useStyles();
	const orders = props.orders;
	const user = {
		role: "master"
	};

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardHeader
				action={
					<Button component={RouterLink} to="/new-order" color="primary" size="small" variant="outlined">
						Добавить заказ
					</Button>
				}
				title="Список заказов"
			/>
			<Divider />
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID заказа</TableCell>
									<TableCell>Имя мастера</TableCell>
									<TableCell>Имя клиента</TableCell>
									<TableCell sortDirection="desc">
										<Tooltip
											enterDelay={300}
											title="Sort"
										>
											<TableSortLabel
												active
												direction={direction ? 'desc':'asc'}
											>
												<button onClick={() => setDirection({direction: false})}>Дата заказа</button>
											</TableSortLabel>
										</Tooltip>
									</TableCell>
									<TableCell>Тип доставки</TableCell>
									<TableCell>Статус оплаты</TableCell>
									<TableCell>Статус заказа</TableCell>
								</TableRow>
							</TableHead>
							<TableOrderRow
								orders={orders}
								user={user}
								statusContainer={classes.statusContainer}
								changeStatusButton={changeStatusButtonHandler}
							/>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
				<Button color="primary" size="small" variant="text">
					Показать все
					<ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

OrderItems.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = state => {
	return {
		orders: state.orders.orders
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getOrders: () => dispatch(getOrders()),
		changeStatus: (id, status) => dispatch(changeStatus(id, status))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
