(() => {

    function anElement(el,children) {
        if(typeof(el) === 'function') {
            return el();
        } else {
            const anEle = document.createElement(el);
            anEle.innerHTML = children.join(' ');
            return anEle;
        }
    }

    function createElement(el, props, ...children) {
        return anElement(el,children);
      }

    window.React = {
        createElement
    };

    window.ReactDOM = {
        render: (el, domEL) => {
            domEL.appendChild(el);
        }
    };

}) ();