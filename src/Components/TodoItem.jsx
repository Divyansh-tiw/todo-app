import styles from "./todoitem.module.css";
export default function TodoItem({ item, todos, setTodos }) {
  function handleDelete() {
    setTodos(todos.filter((todo) => todo !== item)); //This line filters out item from the todos array and updates the state.
  }
  function handleClick(name) {
    const newArray = todos.map((todo) =>
      todo.name === name ? { ...todo, done: !todo.done } : todo
    ); // looping through the every todo item and marking the done value as opposite
    setTodos(newArray); //updating the todos list with msrked items
  }
  const newClass = item.done ? styles.completed : "";
  let Date = localStorage.getItem("Date");
  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        <span className={newClass} onClick={() => handleClick(item.name)}>
          {item.name} {Date}
        </span>
        <span>
          <button
            onClick={() => {
              handleDelete(item);
            }}
            className={styles.deleteButton}
          >
            X
          </button>
        </span>
      </div>

      <hr className={styles.itemLine} />
    </div>
  );
}
