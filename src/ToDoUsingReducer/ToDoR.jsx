import { useReducer, useRef, useState } from "react";
import ToDoListsR from "./ToDoListsR";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function ToDoR() {
  const [lists, setLists] = useReducer(ToDoListsR, []);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inpRef = useRef(null);

  function userInp(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function clickBtn() {
    if (input === "") {
      alert("Write something to add...");
      return;
    } else {
      inpRef.current.focus();
      setInput("");
      if (editIndex === null) {
        setLists({ type: "add", payload: input });
      } else {
        setLists({ type: "edit", payload: input, editIndex });
        setEditIndex(null);
      }
    }
  }

  function delBtn(idx) {
    lists.splice(idx, 1);
    setLists({ type: "delete", payload: [...lists] });
  }

  function editBtn(idx) {
    inpRef.current.focus();
    setInput(lists[idx]);
    setEditIndex(idx);
  }

  function enterKey(e) {
    if (e.key === "Enter") {
      clickBtn();
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 my-6">
        To-Do List
      </h1>

      <div className="flex justify-center items-center gap-3 mb-6">
        <input
          type="text"
          onChange={userInp}
          onKeyDown={enterKey}
          value={input}
          ref={inpRef}
          placeholder="Enter a task..."
          className="w-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={clickBtn}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {editIndex === null ? "Add" : "Update"}
        </button>
      </div>

      <ul className="space-y-3 w-full max-w-md mx-auto">
        {lists.map((ele, idx) => {
          return (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow"
            >
              <span className="text-gray-700">{ele}</span>
              <div className="flex gap-5 text-2xl">
                <button
                  className="text-red-600 cursor-pointer"
                  onClick={() => delBtn(idx)}
                >
                  <MdDeleteForever />
                </button>
                <button
                  className="text-green-700 cursor-pointer"
                  onClick={() => editBtn(idx)}
                >
                  <FaEdit />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
