/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// the 'list_items' variable holds a html collection of all list items
// inside the ul with class 'student-list'.
// each li is a student.
const list_items = document.querySelector('.student-list').children;

// 'items_per_page' holds the number of lis we want to show per page
const items_per_page = 10;


/***
   the 'showPage' function takes 2 parameters: 'list' and 'page'.
   The arguments that we will pass in when calling the function
   will be respectively: our html collection 'list_items' and the number
   of the page where the function is going to show 10 students only.

   we get to show only 10 students per page by looping over
   all lis and setting their 'display' property.
   we hide all of them first, then we change again the display of only the
   targeted ones.

   we get the start and end index of our 10 student-long list
   by applying some simple math.
***/

const showPage = (list, page) => {
  let start_index = (page * items_per_page) - items_per_page;
  let end_index = page * items_per_page;

  for(let i = 0; i < list.length; i += 1) {
    list[i].style.display = 'none';
    if(i >= start_index && i < end_index) {
    list[i].style.display = '';
    }
  }
}


/***
   In the 'appendPageLinks' function we create and append elements
   to the DOM in order to display a navigation at the buttom of the page.
   the navigation takes the user through the different pages of our app.
***/

const appendPageLinks = (list) => {
  const divPage = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = 'pagination';

  const ul = document.createElement('ul');

  let numOfPages = Math.ceil(list.length / items_per_page);

  for(let i = 1; i <= numOfPages; i += 1) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i;

    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  divPage.appendChild(div);
}

appendPageLinks(list_items);



// we target elements in our index.html and give a 'className' of
// '.active' to the first link in the navigation at the buttom of the page.

    const div_pagination = document.querySelector('.pagination');
    const ul_pagination = div_pagination.getElementsByTagName('ul')[0];
    const first_li = ul_pagination.getElementsByTagName('li')[0];
    const first_active_a = first_li.firstElementChild;
    first_active_a.className = 'active';



// we loop through the a elements we just created with 'appendPageLinks'
// and add a 'click' event listener to all of them.
// we loop through them one more time and remove the className of each one of them.
// then we assign a className of 'active' only to the event targeted link only.
// Finally we call the 'showPage' function passing our html collection and
// the last targeted link textContent as arguments.

const lis_pagination = ul_pagination.children;

for(let i = 0; i < lis_pagination.length; i += 1) {
  let li = lis_pagination[i];
  let a = li.firstElementChild;
  a.addEventListener('click', (e) => {

    for(let i = 0; i < lis_pagination.length; i += 1) {
      let li = lis_pagination[i];
      let a = li.firstElementChild;
      a.className = '';
      e.target.className = 'active';
    }

  showPage(list_items, e.target.textContent);
  });
}


// We call the 'showPages' function passing the html collection and
// the number 1 as arguments to display the first page of the first 10 students as
// a starting point for our app.

showPage(list_items, 1);



// in the following lines we create and manipulate some elements
// in order to append a search bar in the top right corner of our app.

const page_header = document.querySelector('.page-header');
const search_div = document.createElement('div');
search_div.className = 'student-search';
const search_input = document.createElement('input');
search_input.placeholder = 'Search for students...';
const search_button = document.createElement('button');
search_button.textContent = 'Search';

search_div.appendChild(search_input);
search_div.appendChild(search_button);
page_header.appendChild(search_div);



// THAT'S WHERE THE PROBLEMS BEGIN :)
// -----------------------------

const studentList = document.querySelector('.student-list');
const lis_students = studentList.children;


// add keyup event listener to search input

search_input.addEventListener('keyup', () => {
  let input = search_input;
  let inputValue = input.value.toUpperCase();
//  let inputLength = inputValue.length;
  let namesArray = []; // --------------------------------------

    for(let i = 0; i < lis_students.length; i += 1) {
      let li =  lis_students[i];
      let h3 = li.getElementsByTagName('h3')[0];
      let name = h3.textContent.toUpperCase();
//      let nameSubStr = name.substring(0, inputLength);

      if(name.includes(inputValue)) {
        li.style.display = '';
        namesArray.push(li);  // ------------------------------
      }else{
        li.style.display = 'none';
      }
    }

    // appendPageLinks(namesArray);
    // document.querySelector('.pagination').style.display = 'none';


// not sure about the following

    if(inputValue === '') {
      showPage(list_items, 1);
    }
    // else{
    //   document.querySelector('.pagination').remove();
    //   appendPageLinks(list_items);
    //   showPage(list_items, 1);
    // }

})


// add 'click' event listener to search button

search_button.addEventListener('click', () => {
  let input = search_input;

  if(input.value === '') {
    alert('Type a valid name');
  }
  else{
    for(let i = 0; i < lis_students.length; i += 1) {
      let li =  lis_students[i];
      let h3 = li.getElementsByTagName('h3')[0];
      let name = h3.textContent;

      if(name === input.value) {
        li.style.display = '';
      }else{
        li.style.display = 'none';
      }
    }
  input.value = '';
  }
})
