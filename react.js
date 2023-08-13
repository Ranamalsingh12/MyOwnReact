(() => {

    function div(children) {
        const anEle = document.createElement('div');
        anEle.innerHTML = children.join(' ');
        return anEle
    }

    function createElement(el, props, ...children) {
        return div(children);
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