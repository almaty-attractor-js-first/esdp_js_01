import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
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

import mockData from './data';
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

const LatestOrders = props => {
	const { className, staticContext, ...rest } = props;

	const classes = useStyles();

	const [orders] = useState(mockData);

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

LatestOrders.propTypes = {
	className: PropTypes.string
};

export default LatestOrders;
