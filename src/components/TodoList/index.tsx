import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Item from "./Item";
import { ITodo } from "../../types";

interface TodoListProps {
	items: ITodo[];
	onChangeItem: (todo: ITodo) => void;
	onEditItem: (todo: ITodo) => void;
	onDeleteItem: (todo: ITodo) => void;
}

export default function TodoList({
	items,
	onChangeItem,
	onEditItem,
	onDeleteItem,
}: TodoListProps) {
	return (
		<ListGroup as="ol">
			{items.map((item) => {
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
