import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './Form';
import * as serviceWorker from './serviceWorker';

function App() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1>Enter your code.</h1>
            <p>Check your SMS.</p>
            <Form numDigits={4} onSubmit={alert} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
