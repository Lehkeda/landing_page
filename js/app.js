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
var sections;
const nav_list = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function get_all_sections(){
    sections = document.querySelectorAll('section');
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function build_nav(){
    const nav_list_fragment = document.createDocumentFragment();
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

// Add class 'active' to link when near top of viewport
function add_active_class(section, link){
    const nav_list_links = nav_list.querySelectorAll('a.active');

    // remove active class from any other link
    if(nav_list_links.length != 0){
        nav_list_links.forEach(function (item){
            item.classList.remove('active');
        })
    }

    // add active to the link that relates to current section
    link.classList.add('active');
}

function add_active_section_class(section){
    sections.forEach(function (item){
        item.classList.remove('active_section');
    })
    section.classList.add('active_section');
}


// Scroll to anchor ID using scrollTO event
function scroll_to_section(e, link){
    e.preventDefault;

    //get current section
    const link_target = link.getAttribute("href");
    const section=document.querySelector(link_target);

    //get selected section place
    const section_place=section.getBoundingClientRect();

    window.scrollTo(section_place.x,section_place.y);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
get_all_sections();
build_nav();

// Scroll to section on link click
document.querySelectorAll('a.menu__link').forEach(function(link){
    link.addEventListener('click', scroll_to_section(this, link));
});

let nav_bar_timeout;

document.addEventListener('scroll', function(){
    if(window.scrollY+100 > sections[0].offsetTop){
        //show go to the top button
        document.querySelector('#top_button').style.display='inline';

        //show nav bar
        document.querySelector('.navbar__menu').style.display='block';

        //hide nav bar after 5 seconds
        nav_bar_timeout = setTimeout(function (){
            document.querySelector('.navbar__menu').style.display='none';
            clearTimeout(nav_bar_timeout);
        },5000);
    }else{
        document.querySelector('#top_button').style.display='none';
    }
  
    // Set sections as active
    for(let i=0; i<sections.length; i++){
        // get current link
        const link = document.querySelector('a[href="#'+sections[i].getAttribute('id')+'"]');

        const window_y=window.scrollY;
        // last section
        if(i+1 == sections.length){
            if(window_y+200 > sections[i].offsetTop){ 
                add_active_class(sections[i], link);
                add_active_section_class(sections[i]);
            }
        }else{
            if(window_y+200 > sections[i].offsetTop && window_y < sections[i+1].offsetTop){
                add_active_class(sections[i], link);
                add_active_section_class(sections[i]);
            }
        }
    }
});

// keep navbar visible when the mouse over it
document.querySelector('.page__header').addEventListener('mouseover', function(){
    this.style.display='block';
    clearTimeout(nav_bar_timeout);
});

// Add hide section button
sections.forEach(function (section){
    section.innerHTML+= "<div class='hide_button_div'><a class='hide_button' href='#!'>Hide</a></div>";
});

// Show and hide sections
document.querySelectorAll('.hide_button_div').forEach(function(hide_button_div){
    let show=0;
    let section = hide_button_div.parentElement.querySelector('.landing__container');
    const hide_button = hide_button_div.querySelector('.hide_button');
    hide_button.addEventListener('click', function(){
        if(!show){
            // Hide section
            section.style.height='5vh';
            section.style.overflow='hidden';
            show=1;
            hide_button.textContent="show";
        }else{
            // Show section
            section.style.height='auto';
            hide_button.textContent="Hide";
            show=0;
        }
    })
    
});
