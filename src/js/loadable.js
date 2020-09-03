import React, { Component } from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadingComponents extends Component{
    componentDidMount(){
        NProgress.start();
    }

    componentWillUnmount(){
        NProgress.done();
    }

    render(){
        return <div />
    }
}

export default (loader, loading = LoadingComponents) => {
    return Loadable({
        loader,
        loading
    });
}