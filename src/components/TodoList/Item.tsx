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
		<div className="d-flex" style={{width: "100%"}}>
			<Form.Check inline checked={item.completed} onChange={() => onChangeItem({...item, completed: !item.completed})} />

			<div>
				<div className="fw-bold" style={{textDecoration: item.completed ? "line-through": "none"}}>{item.title}</div>
				{item.description}
			</div>

			<div className="d-flex ms-auto align-self-center flex-nowrap">
				<Button className="align-self-center" variant="secondary" onClick={() => onEditItem({...item})}>
				<span style={{color: "black"}}>✎</span>
				</Button>
				<Button className="ms-2 align-self-center" variant="secondary" onClick={() => onDeleteItem({...item})}>
				✕
				</Button>
			</div>	
		</div>
		</ListGroup.Item>
	);
}
