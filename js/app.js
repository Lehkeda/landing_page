/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
var sections;
function get_all_sections(){
    sections = document.querySelectorAll('section');
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const nav_list_fragment = document.createDocumentFragment();
const nav_list = document.querySelector('#navbar__list');

get_all_sections();
function build_nav(){
    sections.forEach(function(section){
        let new_li = document.createElement('li');

        new_li.innerHTML=`<a class="menu__link" 
            href="#${section.getAttribute('id')}"> 
            ${section.dataset.nav}
            </a>`;

        nav_list_fragment.appendChild(new_li);
    });

    nav_list.appendChild(nav_list_fragment);
}

build_nav();

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
document.querySelectorAll('a.menu__link').forEach(function(link){
    link.addEventListener('click', function(e){
        e.preventDefault;
        const link_target = link.getAttribute("href");
        const section_place=document.querySelector(link_target).getBoundingClientRect();
        window.scrollTo(section_place.x,section_place.y)
    });
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


