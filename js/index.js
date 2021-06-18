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

$('.feed-button').on('click', function() {
    $('.twitter-time').toggleClass('closed')
});

$('.alert .close').on('click', function() {
    $('.alert').toggleClass('closed');
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

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }