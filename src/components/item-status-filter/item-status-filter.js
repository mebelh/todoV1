import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
    state = {
        buttons: [
            { label: "All", key: "all" },
            { label: "Active", key: "active" },
            { label: "Done", key: "done" }
        ]
    };

    generateBtn = () => {
        const { itemStFilActiveBtnChange, activeBtnStatusFilter } = this.props;
        return this.state.buttons.map(({ label, key }) => {
            const clazz =
                "btn " +
                (activeBtnStatusFilter === label
                    ? "btn-info"
                    : "btn-outline-secondary");
            return (
                <button
                    type="button"
                    className={clazz}
                    key={key}
                    onClick={itemStFilActiveBtnChange}
                >
                    {label}
                </button>
            );
        });
    };

    render() {
        const btns = this.generateBtn();
        return <div className="btn-group">{btns}</div>;
    }
}
