class ParallaxElement {
    constructor(element, scale, background) {
        this.element = element;
        this.scale = Math.abs(scale);
        this.background = background;
        this.direction = scale > 0 ? 1 : -1;
    }
}

let w = window.innerWidth, h = window.innerHeight, hw = w / 2, hh = h / 2, cx = hw, cy = hh, x = 0, y = 0;

let elements = [];

function resizeBackgrounds() {
    for(var i = 0; i < elements.length; i++) {
        if(!elements[i].background) continue;
        elements[i].element.style.width = (w + 2 * (elements[i].scale + 1)) + 'px';
        elements[i].element.style.height = (h + 2 * (elements[i].scale + 1)) + 'px';
    }
}

function renderAll() {
    for(var i = 0; i < elements.length; i++) render(elements[i]);
}

function render(element) {
    element.element.style.left = (hw + x * element.scale * element.direction) + 'px';
    element.element.style.top = (hh + y * element.scale * element.direction) + 'px';
}

function resizeHander() {
    cx *= window.innerWidth / w;
    cy *= window.innerHeight / h;
    w = window.innerWidth;
    h = window.innerHeight;
    hw = w / 2;
    hh = h / 2;
    x = cx / hw - 1;
    y = cy / hh - 1;
    resizeBackgrounds();
    renderAll();
}

function cursorMoveHander(eventX, eventY) {
    cx = eventX;
    cy = eventY;
    x = cx / hw - 1;
    y = cy / hh - 1;
    requestAnimationFrame(renderAll);
}

window.addEventListener('resize', resizeHander);

document.addEventListener('mousemove', function(event) {
    cursorMoveHander(event.clientX, event.clientY);
});

document.addEventListener('touchmove', function(event) {
    cursorMoveHander(event.touches[0].clientX, event.touches[0].clientY);
});

function parallax(options) {
    let element = options.element;
    let scale = options.scale || 10;
    let background = options.background || false;
    let position = options.position || 'relative';
    let mobile = options.mobile ? !!options.mobile : true;
    if(typeof element === 'string') element = document.querySelector(element);
    element.style.position = position;
    element.style.transform = 'translate(-50%, -50%)';
    let parallaxElement = new ParallaxElement(element, scale, background);
    elements.push(parallaxElement);
    if(background) {
        scale = Math.abs(scale);
        element.style.width = (w + 2 * (scale + 1)) + 'px';
        element.style.height = (h + 2 * (scale + 1)) + 'px';
    }
    render(parallaxElement);
}