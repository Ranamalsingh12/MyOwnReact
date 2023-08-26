// (() => {

// const { func } = require("prop-types");

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
            return handleHtmlElement(el,props,children);
        }
    }

    function handleClass(clazz,props) {
        const component = new clazz(props);
        return component.render();
    }

    function handleHtmlElement(el, props, children){
        const anEle = document.createElement(el);
        children.forEach(child => appendChild(anEle, child));

        _.forEach(props, (value, name) => appendProp(
            anEle,
            name,
            value
        ) )
        return anEle;
    }

    function appendChild(el, child) {
        if(typeof(child) === 'object') {
            el.appendChild(child);
        }
        else{
            el.innerHTML += child;
        }
    }

    function appendProp(el, propName, propVal) {
        if(shouldAddEventListner(propName)) {
            el.addEventListener(
                propName.substring(2).toLocaleLowerCase(),
                propVal
            )
        } else {
            el.setAttribute(propName,propVal)
        }
    }



    // Utility functions
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

    function shouldAddEventListner(property) {
        return /^on.*$/.test(property);
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