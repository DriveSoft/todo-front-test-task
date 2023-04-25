import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Menu } from "./components/Menu";
import TodoList from "./components/TodoList";
import ModalTodo from "./components/ModalTodo";
import { ITodo, ITodoFilter } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [showModal, setShowModal] = useState<ITodo | null>(null);
	const [filterStatusTodo, setFilterStatusTodo] = useState<string>("ALL");
  const [searchFilter, setSearchFilter] = useState<ITodoFilter>({title: "", description: "", completed: undefined});

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/todos")
			.then((response) => {
				setTodos(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const onSaveTodo = (todo: ITodo) => {
		console.log(todo);

		if (!todo.id) {
			axios
				.post("http://localhost:5000/api/todos", todo)
				.then((response) => {
					setTodos([...todos, response.data]);
					setShowModal(null);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			axios
				.put(`http://localhost:5000/api/todos/${todo.id}`, todo)
				.then((response) => {
					const newTodos = todos.map((item) => {
						if (item.id === todo.id) {
							return response.data;
						}
						return item;
					});
					setTodos(newTodos);
					setShowModal(null);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const onChangeItem = (todo: ITodo) => {
		console.log(todo);

		axios
			.put(`http://localhost:5000/api/todos/${todo.id}`, todo)
			.then((response) => {
				const newTodos = todos.map((item) => {
					if (item.id === todo.id) {
						return response.data;
					}
					return item;
				});
				setTodos(newTodos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onEditItem = (todo: ITodo) => {
		// const todo = todos.find((item) => item.id === todo.id);
		if (todo) {
			setShowModal(todo);
		}
	};

	const onDeleteItem = (todo: ITodo) => {
		axios
			.delete(`http://localhost:5000/api/todos/${todo.id}`)
			.then((response) => {
				const newTodos = todos.filter((item) => item.id !== todo.id);
				setTodos(newTodos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

  const onChangeSearch = (value: string) => {
    setSearchFilter({...searchFilter, title: value, description: value});
  }

  const onChangeStatusTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatusTodo(event.target.value)
    const completeFilter = event.target.value === "COMPLETE" ? true : event.target.value === "INCOMPLETE" ? false : undefined;
    setSearchFilter({...searchFilter, completed: completeFilter});
  }

	return (
		<>
			<Menu onChangeSearch={onChangeSearch} />
			<Stack
				direction="horizontal"
				gap={2}
				className="mt-5 col-md-6 mx-auto justify-content-between"
			>
				<Button
					as="a"
					variant="primary"
					onClick={() =>
						setShowModal({
							id: 0,
							title: "",
							description: "",
							completed: false,
						})
					}
				>
					Add task
				</Button>
				<Form.Select
					style={{ maxWidth: "150px" }}
					value={filterStatusTodo}
					onChange={onChangeStatusTodo}
				>
					<option value={"ALL"}>All</option>
					<option value={"INCOMPLETE"}>Incomplete</option>
					<option value={"COMPLETE"}>Complete</option>
				</Form.Select>
			</Stack>

			<Stack gap={2} className="mt-2 col-md-6 mx-auto">
				<TodoList
          filter={searchFilter}
					items={todos}
					onChangeItem={onChangeItem}
					onEditItem={onEditItem}
					onDeleteItem={onDeleteItem}
				/>
			</Stack>

			<ModalTodo
				show={showModal}
				handleClose={() => setShowModal(null)}
				onSave={onSaveTodo}
			/>
		</>
	);
}

export default App;
