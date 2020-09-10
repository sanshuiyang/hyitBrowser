import React from "react";

import "./styles.css";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = e => {
        e.preventDefault();
        e.target.previousSibling.checked = true;
    }

    render() {
        const { list } = this.props;
        return (
            <>
                {
                    list && list.map((value, index) => (
                        <div className="radio-container" key={index}>
                            <input type="radio" name={value.name} value={value.value} />
                            <span className="radio-content" onClick={this.handleClick}>{value.content}</span>
                        </div>
                    ))
                }
            </>
        )
    }
}

export default Index;