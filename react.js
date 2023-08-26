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

    let rootDOMElement,rootReactElement;

    const REACT_CLASS = "REACT_CLASS";
    const classMap = {};
    let classCounter  = 0;

    function anElement(el,props,children) {
        if(isClass(el)) {
            return handleClass(el,props,children);
        }
        else if(isStateLessComponent(el)) {
            return el(props);
        } else {
            return handleHtmlElement(el,props,children);
        }
    }

    function handleClass(clazz,props, children) {
        classCounter++;
        if(classMap[classCounter]) {
            return classMap[classCounter];
        }
        const reactElement = new clazz(props);
        reactElement.type = REACT_CLASS;
        reactElement.children = children;
        classMap[classCounter] = reactElement;
        return reactElement;
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
        if(child.type === REACT_CLASS) {
            console.log(child)
            appendChild(el,child.render());
        }
        else if(typeof(child) === 'object') {
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
            if(propName === 'className') {
                propName = 'class';
            }
            if(propName === 'style') {
                propVal = _.reduce(propVal, (acc,value,key) => {
                    return acc.concat(`${key} : ${value};`)
                },'');
            }
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

        setState(state) {
            this.state = Object.assign({}, this.state, state);
            reRender();
        }
    }

    function reRender() {
        //Clear the DOM
        while(rootDOMElement.hasChildNodes()) {
            rootDOMElement.removeChild(rootDOMElement.lastChild);
        }
        classCounter = 1;
        ReactDOM.render(rootReactElement, rootDOMElement);
    }

    window.React = {
        createElement,
        Component
    };

    window.ReactDOM = {
        render: (el, domEL) => {
            rootDOMElement = domEL;
            rootReactElement = el;
            rootDOMElement.appendChild(el.render());
        }
    };

}) ();