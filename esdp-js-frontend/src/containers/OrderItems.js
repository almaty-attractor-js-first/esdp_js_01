import React, {useEffect} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getOrders} from "../store/actions/ordersActions";
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
	TableRow,
	Tooltip,
	TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
		display: 'flex',
		alignItems: 'center',
		minWidth: "90px"
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));

const OrderItems = props => {
	useEffect(() => {
		props.getOrders();
	}, []);
	const { className, getOrders, staticContext, ...rest } = props;
	const classes = useStyles();
	const orders = props.orders;
	const goToPage = (orderID) => {
		props.history.push(`order/${orderID}`);
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
												direction="desc"
											>
												Дата заказа
											</TableSortLabel>
										</Tooltip>
									</TableCell>
									<TableCell>Тип доставки</TableCell>
									<TableCell>Статус оплаты</TableCell>
									<TableCell>Взять в работу</TableCell>
								</TableRow>
							</TableHead>
							<TableOrderRow
								orders={orders}
								statusContainer={classes.statusContainer}
								click={(orderID) => goToPage(orderID)}
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
		getOrders: () => dispatch(getOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);
