import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppHeader from "./components/app-header/app-header";
import SearchPanel from "./components/search-panel/search-panel";
import TodoList from "./components/todo-list/todo-list";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import AddTodoPanel from "./components/item-add-panel/item-add-panel";

import "./index.css";

export default class App extends Component {
    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem("Drink Coffe"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch")
        ]
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    addItem = text => {
        text = text ? text : "You dont write todo";
        this.setState(({ todoData }) => {
            const newArray = [...todoData, this.createTodoItem(text)];
            return {
                todoData: newArray
            };
        });
    };

    deleteItem = id => {
        this.setState(({ todoData }) => {
            const indx = todoData.findIndex(el => el.id === id);

            const newArray = [
                ...todoData.slice(0, indx),
                ...todoData.slice(indx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    onToggleImportant = id => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            };
        });
    };

    onToggleDone = id => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            };
        });
    };

    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={id => {
                        this.deleteItem(id);
                    }}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddTodoPanel
                    addItem={text => {
                        this.addItem(text);
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
