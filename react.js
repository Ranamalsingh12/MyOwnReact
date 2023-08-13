(() => {

    function div(el,children) {
        const anEle = document.createElement(el);
        anEle.innerHTML = children.join(' ');
        return anEle
    }

    function createElement(el, props, ...children) {
        return div(el,children);
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