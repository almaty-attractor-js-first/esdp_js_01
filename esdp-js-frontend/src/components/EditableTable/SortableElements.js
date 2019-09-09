import React, {Fragment} from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc'
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

// Компонент который используется активации drag-n-drop при клике внутри компонента
export const DragHandle = SortableHandle(({children}) => <Fragment>{children}</Fragment>);

// Универсальный компонент для превращения TableBody в sortable контейнер
export const TableBodySortable = SortableContainer(({ children }) => (
	<TableBody>
		{children}
	</TableBody>
));

export const TableRowSortable = SortableElement(({ children, ...props }) => (
	<TableRow {...props}>
		{children}
	</TableRow>
));

TableBodySortable.muiName = 'TableBody';
TableRowSortable.muiName = 'TableRow';
