import { useEffect } from "react";
import { Route } from "react-router-dom";

export const CheckoutTemplate = (props) => {
    const { Component, ...restParam } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <Component {...propsRoute} ></Component>
        </>
    }}>

    </Route>
}