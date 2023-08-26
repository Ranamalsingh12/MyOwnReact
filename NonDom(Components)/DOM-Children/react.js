(() => {

    function anElement(el,children) {
        if(typeof(el) === 'function') {
            return el();
        } else {
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