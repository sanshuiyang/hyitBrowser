import React from "react";
import { Button } from "react-bootstrap";

const index = (props) => {
    const {
        active = false,
        disabled = false,
        block = false,
        onClick,
        className,
        componentClass,//You can use a custom element type for this component.
        herf,//string
        type,//one of: 'button', 'reset', 'submit'
        bsStyle = "default",//one of: "primary", "success", "info", "warning", "danger", "link"
        bsSize = "lg",//"lg", "large", "sm", "small", "xs", "xsmall",
        children
    } = props;

    return <Button
        active={active}
        disabled={disabled}
        block={block}
        onClick={onClick ? onClick : null}
        componentClass={componentClass}
        herf={herf ? herf : "#"}
        type={type}
        bsStyle={bsStyle}
        bsSize={bsSize}
        className={className}
    >
        {children}
    </Button>
}

export default index;