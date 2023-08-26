// (() => {

// const { func } = require("prop-types");

//     function anElement(el,children) {
//         if(typeof(el) === 'function') {
//             return el();
//         } else {
//             const anEle = document.createElement(el);
//             anEle.innerHTML = children.join(' ');
//             return anEle;
//         }
//     }

//     function createElement(el, props, ...children) {
//         return anElement(el,children);
//       }

//     window.React = {
//         createElement
//     };

//     window.ReactDOM = {
//         render: (el, domEL) => {
//             domEL.appendChild(el);
//         }
//     };

// }) ();

(() => {

    function anElement(el,props,children) {
        if(isClass(el)) {
            return handleClass(el,props);
        }
        else if(isStateLessComponent(el)) {
            return el(props);
        } else {
            return handleHtmlElement(el,children);
        }
    }

    function handleClass(clazz,props) {
        const component = new clazz(props);
        return component.render();
    }

    function handleHtmlElement(el, children){
        const anEle = document.createElement(el);
        children.forEach(child => {
            if(typeof(child) === 'object') {
                anEle.appendChild(child);
            }
            else{
                anEle.innerHTML += child;
            }
        });
        return anEle;
    }

    function isClass(func) {
        return typeof func == 'function'
            && /^class\s/.test(Function.prototype.toString.call(func));
    }

    function isStateLessComponent(el) {
        return !isClass(el) && typeof el == 'function';
    }

    function createElement(el, props, ...children) {
        return anElement(el,props,children);
    }

    class Component {
        constructor(props) {
            this.props = props; 
        }
    }

    window.React = {
        createElement,
        Component
    };

    window.ReactDOM = {
        render: (el, domEL) => {
            domEL.appendChild(el);
        }
    };

}) ();