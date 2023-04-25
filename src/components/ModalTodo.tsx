import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ITodo } from "../types";

interface ModalTodoProps {
	show: ITodo | null;
	handleClose: () => void;
	onSave(todo: ITodo): void;
}

export default function ModalTodo({
	show,
	handleClose,
	onSave,
}: ModalTodoProps) {
	const [todo, setTodo] = useState<ITodo>({
		id: 0,
		title: "",
		description: "",
		completed: false,
	});

    useEffect(() => {
        if (show) setTodo({...show});
    }, [show]);

	return (
		<Modal show={!!show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Todo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTitle"
					>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							autoFocus
							value={todo.title}
							onChange={(e) => {
								setTodo({ ...todo, title: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlDescription"
					>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={todo.description}
							onChange={(e) => {
								setTodo({
									...todo,
									description: e.target.value,
								});
							}}
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlCompleted"
					>
						<Form.Select 
                            value={+todo.completed}
							onChange={(e) => {
								setTodo({ ...todo, completed: !!parseInt(e.target.value) });
							}}                        
                        >
							<option value={0}>Incomplete</option>
							<option value={1}>Complete</option>
						</Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => onSave(todo)}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
