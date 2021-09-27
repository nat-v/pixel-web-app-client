import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

import { loadUser } from './redux/actions/authActions';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/app/Main';

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;