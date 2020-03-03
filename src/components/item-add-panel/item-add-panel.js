import React, { Component } from "react";
import "./item-add-panel.css";

export default class AddTodoPanel extends Component {
    render() {
        const { addItem } = this.props;

        return (
            <div className="add-todo-panel">
                <input
                    type="text"
                    className="form-control input"
                    aria-label="Amount (to the nearest dollar)"
                    placeholder="Add todo..."
                />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        addItem(document.querySelector(".input").value);
                        document.querySelector(".input").value = "";
                    }}
                >
                    Add
                </button>
            </div>
        );
    }
}
