import React, { Component } from "react";
import ReactDOM from "react-dom";

import AppHeader from "./components/app-header/app-header";
import SearchPanel from "./components/search-panel/search-panel";
import TodoList from "./components/todo-list/todo-list";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import AddTodoPanel from "./components/item-add-panel/item-add-panel";

import "./index.css";

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            { label: "Drink Coffee", important: false, id: 1 },
            { label: "Make Awesome App", important: true, id: 2 },
            { label: "Have a lunch", important: false, id: 3 },
            { label: "Come to sleep", important: false, id: 4 }
        ]
    };

    addItem = text => {
        text = text ? text : "You dont write todo";
        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                {
                    label: text,
                    important: false,
                    id: this.maxId++
                }
            ];
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

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={id => {
                        this.deleteItem(id);
                    }}
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
