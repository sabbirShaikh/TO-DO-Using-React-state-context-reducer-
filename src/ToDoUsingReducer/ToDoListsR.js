function ToDoListsR(lists, action) {
    if (action.type === "add") {
        return [...lists, action.payload];
    } else if (action.type === "delete") {
        return [...action.payload]
    } else if (action.type === "edit") {
        return lists.map((ele, idx) => action.editIndex === idx ? action.payload : ele)
    }
}

export default ToDoListsR;
