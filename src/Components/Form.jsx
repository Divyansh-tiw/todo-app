import { useState } from "react";
import styles from "./form.module.css";
export default function Form({ todos, setTodos }) {
  const [todo, setTodo] = useState({ name: "", done: false });
  function handleSubmit(e) {
    e.preventDefault(); // prevents reload of the page after every button click
    if (todo.name === "" || !selectedDate) {
      alert("Fill both Date and Item");
    } else {
      setTodos([...todos, todo]); // updates todos list with added todo items
      setTodo({ name: "", done: false });
    }
  }
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  localStorage.setItem("Date", selectedDate);

  const sortedTodos = todos
    .slice()
    .sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <div>
      <form className={styles.todoform} onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={getTodayDate()}
          ></input>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.modernInput}
            onChange={(e) =>
              setTodo({ name: e.target.value, done: false, date: selectedDate })
            } //lets you type in the input
            type="text"
            value={todo.name}
            placeholder="Enter To-Do Item"
          />

          <button className={styles.modernButton} type="Submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
