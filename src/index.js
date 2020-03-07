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
        ],
        serchPanelText: ""
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    createButton(label, key) {
        return {
            label: label,
            key: key,
            active: false
        };
    }

    addItem = text => {
        text = text ? text : "What need to do?";
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

    searchStateChange = e => {
        this.setState({
            serchPanelText: e.target.value
        });
    };

    search = (arr, term) => {
        if (term.length === 0) return arr;
        return arr.filter(
            elem => ~elem.label.toLowerCase().indexOf(term.toLowerCase())
        );
    };

    render() {
        const { todoData, serchPanelText } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        const visibleItems = this.search(todoData, serchPanelText);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel searchStateChange={this.searchStateChange} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={visibleItems}
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
