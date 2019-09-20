import React, {Fragment} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import image from '../assets/images/6dbd75cb-3029-4490-8215-0a3fe18250b4file.png'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";


const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(1)
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 350,
		height: 350,
		[theme.breakpoints.up('sm')]: {
			width: 250,
			height: 250,
		},
		marginRight: theme.spacing(2)
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function OrderCard({order, statuses, defaultExpanded}) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			{
				order ?
					<Fragment>
						<div className={classes.card}>
							<div className={classes.details}>
								<CardContent className={classes.content}>
									<Typography component="h6" variant="h6">
										<b>Заказ:</b>{` ${order.id.substring(0, 7)}`}
									</Typography>
									<Typography variant="subtitle1" color="textPrimary">
										<b>Дата создания: </b>{`${moment(order.createdAt).format('DD.MM.YYYY HH:mm')} `}
									</Typography>
									<Typography variant="subtitle1" color="textPrimary">
										<b>Дата забора: </b>{`${moment(order.completedDate).format('DD.MM.YYYY HH:mm')} `}
									</Typography>
									<Typography variant="subtitle1" color="textPrimary">
										<b>Адрес доставки/забора: </b>{`${order.address} `}
									</Typography>
									<Typography variant="subtitle1" color="textPrimary">
										<b>Статус заказа: </b>{(statuses.find(status => {return order.statusId === status.id})) ?
											`${(statuses.find(status => {return order.statusId === status.id}).title)}`
										: null}
									</Typography>
									<Typography variant="subtitle1" color="textPrimary">
										<b>Сумма заказа: </b>{`${order.totalPrice}`}
									</Typography>
								</CardContent>
							</div>
							<CardMedia
								className={classes.cover}
								image={image}
								title={order.id}
							/>
						</div>
						<ExpansionPanel defaultExpanded={defaultExpanded}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={classes.heading}>Позиции заказа</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>Тип чистки</TableCell>
											<TableCell align="right">Количество</TableCell>
											<TableCell align="right">Цена</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{order.orderItems.map((row, index) => (
											<TableRow key={index}>
												<TableCell component="th" scope="row">{row.title}</TableCell>
												<TableCell align="right">{row.qty}</TableCell>
												<TableCell align="right">{row.price}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Fragment>
				: null
			}
		</Card>
	);
}
