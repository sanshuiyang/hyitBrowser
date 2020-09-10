import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownTitle: ""
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const { obj } = this.props
        if (this.state.dropdownTitle === "") {
            this.setState({
                dropdownTitle: obj.item[0]
            })
        }
    }

    handleSelect = e => {
        e.preventDefault();
        this.setState({
            dropdownTitle: e.target.innerText
        })
    }

    render() {
        const { obj } = this.props
        return (
            <div>
                <span className="title">{obj.title}</span>
                <span className="cls-content">
                    <DropdownButton
                        bsStyle="default"
                        title={this.state.dropdownTitle}
                        id="dropdown"
                        className="dropdown-header"
                    >
                        {
                            obj.item.map((value, index) => (
                                <MenuItem
                                    eventKey={index}
                                    key={index}
                                    onClick={this.handleSelect}
                                >
                                    {value}
                                </MenuItem>
                            ))
                        }
                    </DropdownButton>
                </span>
            </div>
        )
    }
}

export default Index;