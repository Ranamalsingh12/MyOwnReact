(() => {

    function anElement(el,children) {
        if(isClass(el)) {
            return handleClass(el);
        }
        else if(isStateLessComponent(el)) {
            return el();
        } else {
            return handleHtmlElement(el,children);
        }
    }

    function handleClass(clazz) {
        const component = new clazz;
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