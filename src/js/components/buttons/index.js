import React from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

class LRBtns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lActive: true,
            rActive: false,
            currentType: null,
        }
    }

    componentDidMount() {
        this.setState({
            currentType: this.props.l_key
        })
    }

    handleClick = type => {
        const { onDoSth } = this.props;
        console.log(type);
        if (type == this.state.currentType) {
            return;
        }
        this.setState({
            lActive: !this.state.lActive,
            rActive: !this.state.rActive,
            currentType: type
        });
        onDoSth(type);
    }

    render() {
        const { l_title, r_title, l_key, r_key } = this.props
        return (
            <div style={{ width: "80%", margin: "0 auto", padding: "10%", backgroundColor: "white", boxSizing: "border-box", border: "1px solid black" }}>
                <Button
                    className={`l-btn button ${this.state.lActive ? "active" : ""}`} onClick={() => this.handleClick(l_key)} >
                    {l_title}
                </Button>
                <Button
                    className={`r-btn button ${this.state.rActive ? "active" : ""}`}
                    onClick={() => this.handleClick(r_key)} >
                    {r_title}
                </Button>
            </div>
        )
    }
}

export default LRBtns;