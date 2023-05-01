import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Item from "./Item";
import { ITodo, ITodoFilter } from "../../types";

interface TodoListProps {
	items: ITodo[];
	filter: ITodoFilter;
	startIndex: number;
	endIndex: number;
	onChangeItem: (todo: ITodo) => void;
	onEditItem: (todo: ITodo) => void;
	onDeleteItem: (todo: ITodo) => void;
}

export default function TodoList({
	items,
	filter,
	startIndex,
	endIndex,
	onChangeItem,
	onEditItem,
	onDeleteItem,
}: TodoListProps) {

	return (
		<ListGroup as="ol">
			{items.slice(startIndex, endIndex).map((item) => {
					return (
						<Item
							key={item.id}
							item={item}
							onChangeItem={onChangeItem}
							onEditItem={onEditItem}
							onDeleteItem={onDeleteItem}
						/>
					);
			})}
		</ListGroup>
	);
}
