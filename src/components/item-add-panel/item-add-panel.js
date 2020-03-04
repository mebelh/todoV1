import React, { Component } from "react";
import "./item-add-panel.css";

export default class AddTodoPanel extends Component {
    state = {
        label: ""
    };

    onChange = e => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = e => {
        this.props.addItem(this.state.label);
        e.preventDefault();
    };

    render() {
        return (
            <form className="add-todo-panel" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control input"
                    aria-label="Amount (to the nearest dollar)"
                    placeholder="What need to do?"
                    onChange={this.onChange}
                />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.onSubmit}
                >
                    Add
                </button>
            </form>
        );
    }
}
