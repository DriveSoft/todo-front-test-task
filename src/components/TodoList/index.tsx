import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Item from "./Item";
import { ITodo, ITodoFilter } from "../../types";

interface TodoListProps {
	items: ITodo[];
	filter: ITodoFilter;
	onChangeItem: (todo: ITodo) => void;
	onEditItem: (todo: ITodo) => void;
	onDeleteItem: (todo: ITodo) => void;
}

export default function TodoList({
	items,
	filter,
	onChangeItem,
	onEditItem,
	onDeleteItem,
}: TodoListProps) {

	console.log('filter', filter);

	const filterFunc = (item: ITodo) => {
		let statusResult = true;
		let titleResult = true;
		let descResult = true;

		if (filter.completed !== undefined) {
			statusResult = item.completed === filter.completed;	
		}

		if (filter.title) {
			titleResult = item.title.toLowerCase().includes(filter.title.toLowerCase());	
		}	
		
		if (filter.description) {
			descResult = item.description.toLowerCase().includes(filter.description.toLowerCase());
		}
		
		return statusResult && (titleResult || descResult);
	}


	return (
		<ListGroup as="ol">
			{items.map((item) => {
				if (filterFunc(item)) {
					return (
						<Item
							key={item.id}
							item={item}
							onChangeItem={onChangeItem}
							onEditItem={onEditItem}
							onDeleteItem={onDeleteItem}
						/>
					);
				}

			})}
		</ListGroup>
	);
}
