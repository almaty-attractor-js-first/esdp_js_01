import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
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

function createData(name, qty, price) {
	return { name, qty, price };
}

const rows = [
	createData('Кроссовки', 1, 1000),
	createData('Туфли', 1, 500),
	createData('Ботинки', 1, 2000),
	createData('Сапоги', 1, 5000),
];

export default function MediaControlCard() {
	const classes = useStyles();
	const theme = useTheme();
	
	return (
		<Card className={classes.root}>
			<div className={classes.card}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component="h5" variant="h5">
							Заказ: F6ssdf34
						</Typography>
						<Typography variant="subtitle1" color="textPrimary">
							Дата создания: 01/02/2019 | 17:30
						</Typography>
						<Typography variant="subtitle1" color="textPrimary">
							Статус заказа: В работе
						</Typography>
						<Typography variant="subtitle1" color="textPrimary">
							Сумма заказа: 8500 тг
						</Typography>
					</CardContent>
				</div>
				<CardMedia
					className={classes.cover}
					image={image}
					title="Live from space album cover"
				/>
			</div>
			<ExpansionPanel>
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
							{rows.map(row => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.qty}</TableCell>
									<TableCell align="right">{row.price}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Card>
	);
}
