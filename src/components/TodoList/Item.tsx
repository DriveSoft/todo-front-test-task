import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { ITodo } from "../../types";

interface ItemProps {
    item: ITodo;
	onChangeItem: (todo: ITodo) => void;
    onEditItem: (todo: ITodo) => void;
	onDeleteItem: (todo: ITodo) => void;
}

export default function Item({
    item,
    onChangeItem,
	onEditItem,
	onDeleteItem,
}: ItemProps) {
	return (
		<ListGroup.Item
			as="li"
			className="d-flex justify-content-between align-items-start"
		>
			<Form.Check inline checked={item.completed} onChange={() => onChangeItem({...item, completed: !item.completed})} />

			<div className="ms-2 me-auto">
				<div className="fw-bold">{item.title}</div>
				{item.description}
			</div>

			<Button variant="light" size="lg" onClick={() => onEditItem({...item})}>
				Edit
			</Button>
			<Button variant="light" size="lg" onClick={() => onDeleteItem({...item})}>
				Delete
			</Button>
		</ListGroup.Item>
	);
}
