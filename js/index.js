"use strict";
window.addEventListener('load', function() {
    parallax({
        element: document.getElementById('background'),
        scale: 50,
        background: true,
        position: 'fixed'
    });
});
document.addEventListener('contextmenu', function(event) { event.preventDefault(); });
document.addEventListener('dragstart', function(event) { event.preventDefault(); });
document.addEventListener('selectstart', function(event) { event.preventDefault(); });

const toTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    window.pageYOffset > 100 ? toTop.classList.add('active') : toTop.classList.remove('active')
});

$('.menu-button').on('click', function() {
    $('.menu-list').toggleClass('closed')
});

var counter = 1;
var counter1 = 1;

setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 3) counter = 1;
}, 8000);

setInterval(function() {
    document.getElementById('rradio' + counter1).checked = true;
    counter1++;
    if (counter1 > 2) counter1 = 1;
}, 8000);