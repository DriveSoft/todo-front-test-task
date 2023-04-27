import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Menu } from "../components/Menu";
import TodoList from "../components/TodoList";
import ModalTodo from "../components/ModalTodo";
import Alert from "react-bootstrap/Alert";
import { ITodo, ITodoFilter } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export default function Todo() {
	const [todos, setTodos] = useState<ITodo[]>([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
	const [showModal, setShowModal] = useState<ITodo | null>(null);
	const [filterStatusTodo, setFilterStatusTodo] = useState<string>("ALL");
	const [searchFilter, setSearchFilter] = useState<ITodoFilter>({
		title: "",
		description: "",
		completed: undefined,
	});

	useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get("/todos", {
                    signal: controller.signal,
                });
                isMounted && setTodos(response.data);
                
            } catch (error: unknown) {
                //@ts-expect-error it's ok
                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    navigate("/login");
                }
                error instanceof Error && isMounted && setError(error.message);                          
            }
        };

        getTodos();

        return () => {
            isMounted = false;
            controller.abort();
        }
	}, []);

	const onSaveTodo = (todo: ITodo) => {
		console.log(todo);
        const todoPost = {title: todo.title, description: todo.description, completed: todo.completed};

		if (!todo.id) { // create todo
			axiosPrivate
				.post("/todos", todoPost)
				.then((response) => {
					setTodos([...todos, response.data]);
					setShowModal(null);
				})
				.catch((error) => {
					console.log(error);
				});
		} else { // update todo
			axiosPrivate
				.put(`/todos/${todo.id}`, todoPost)
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
        const todoPost = {title: todo.title, description: todo.description, completed: todo.completed};
		axiosPrivate
			.put(`/todos/${todo.id}`, todoPost)
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
		if (todo) {
			setShowModal(todo);
		}
	};

	const onDeleteItem = (todo: ITodo) => {
		axiosPrivate
			.delete(`/todos/${todo.id}`)
			.then((response) => {
				const newTodos = todos.filter((item) => item.id !== todo.id);
				setTodos(newTodos);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onChangeSearch = (value: string) => {
		setSearchFilter({ ...searchFilter, title: value, description: value });
	};

	const onChangeStatusTodo = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setFilterStatusTodo(event.target.value);
		const completeFilter =
			event.target.value === "COMPLETE"
				? true
				: event.target.value === "INCOMPLETE"
				? false
				: undefined;
		setSearchFilter({ ...searchFilter, completed: completeFilter });
	};

    const onLogout = () => {
		axios
			.get("/users/logout", {withCredentials: true})
			.then((response) => {				
                navigate("/login");					
			})
			.catch((err) => {
				console.log("catch", err);
			});
    }

	return (
		<>
			<Menu onChangeSearch={onChangeSearch} onLogout={onLogout} />
            {error && <div style={{ textAlign: "center" }}><Alert variant={"danger"}>{error}</Alert></div>}
			<Stack
				direction="horizontal"
				gap={2}
				className="p-2 mt-5 col-md-6 mx-auto justify-content-between"
			>
				<Button
					as="a"
					variant="outline-secondary"
					onClick={() =>
						setShowModal({
							id: 0,
                            user_id: 0,
							title: "",
							description: "",
							completed: false,
						})
					}
				>
					✚
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

			<Stack gap={2} className="p-2 col-md-6 mx-auto">
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
