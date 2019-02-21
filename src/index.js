import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('/sw.js').then(function (registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function (err) {
//             // registration failed :(
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log('Service Worker: Error'));
    });
}
class Game extends React.Component {
    render() {
        return (
            <div > Hello World!
        </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
