//jshint esversion:6

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openProfileMenu() {
    //document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown").style.display = 'block';
}

function closeProfileMenu() {
    document.getElementById("myDropdown").style.display = 'none';
}
// Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//     if (!event.target.matches(".profileLink")) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 console.log(openDropdown.classList.contains('show'));
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// };


// window.addEventListener('click',closeMenu);

// function closeMenu(event){
//     if (!event.target.matches('.profileLink')) {
//        var dropdowns = document.getElementsByClassName("dropdown-content");
//        var i;
//        for (i = 0; i < dropdowns.length; i++) {
//            var openDropdown = dropdowns[i];
//            if (openDropdown.classList.contains('show')) {
//                console.log(openDropdown.classList.contains('show'));
//                openDropdown.classList.remove('show');
//            }
//        }
//     }
// }

function closeDropdown(event) {
    if (!event.target.matches('.profileLink')) {
        
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                console.log(openDropdown.classList.contains('show'));
                openDropdown.classList.remove('show');
            }
        }
    }
}

const gra = function (min, max) {
    return Math.random() * (max - min) + min;
};
const init = function () {
    let items = document.querySelectorAll('section');
    for (let i = 0; i < items.length; i++) {
        items[i].style.background = randomColor({
            luminosity: 'light'
        });
    }
    cssScrollSnapPolyfill();
};
init();

// var hasScrollbar = function () {
//     // The Modern solution
//     if (typeof window.innerWidth === 'number')
//         return window.innerWidth > document.documentElement.clientWidth;

//     // rootElem for quirksmode
//     var rootElem = document.documentElement || document.body;

//     // Check overflow style property on body for fauxscrollbars
//     var overflowStyle;

//     if (typeof rootElem.currentStyle !== 'undefined')
//         overflowStyle = rootElem.currentStyle.overflow;

//     overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

//     // Also need to check the Y axis overflow
//     var overflowYStyle;

//     if (typeof rootElem.currentStyle !== 'undefined')
//         overflowYStyle = rootElem.currentStyle.overflowY;

//     overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

//     var contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
    
//     var overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
//     var alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

//     return (contentOverflows && overflowShown) || (alwaysShowScroll);
// }