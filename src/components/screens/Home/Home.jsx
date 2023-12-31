import { useState, useEffect } from "react";
import TodoItem from "../../item/TodoItem";
import { CreateTodoField } from "./create-todo-field/CreateTodoField";

// creating an object
// const data = [
//   {
//     _id: "1",
//     title: "Front End",
//     description: "HTML, CSS, Javascript, React",
//     isCompleted: false,
//   },
//   {
//     _id: "2",
//     title: "Back End",
//     description: "NodeJs, Express, SQL, MongoDB",
//     isCompleted: false,
//   },
// ];
const Home = () => {
  // we have to create empty array for useState because it will be array of object and then in return have to map through it
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("http://localhost:3000/data");
      const todoArray = await response.json();
      setTodos(todoArray);
    }
    fetchTodos();
  }, []);

  const changeTodo = (id) => {
    const copy = [...todos];
    const current = copy.find((t) => t._id === id);
    current.isCompleted = !current.isCompleted;
    setTodos(copy);
  };
  // remove Todo
  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t._id !== id));
  };

  // add ToDo, receive title
  const addTodo = async (title, description) => {
    setTodos([
      // will add first new todo and then rest of todos.
      {
        _id: new Date(),
        title, // recieving title
        isCompleted: false,
        description,
      },
      ...todos,
    ]);
  };
  // h-screen - height of screen 100vh
  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Todo for junior</h1>
      {/* map though todos not data */}

      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          changeTodo={changeTodo}
          removeTodo={removeTodo}
        />
      ))}
      <CreateTodoField
        addTodo={addTodo}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};
export default Home;
