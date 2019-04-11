/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// the 'list_items' variable holds a html collection of all list items
// inside the ul with class 'student-list'.
// each li is a student.
const list_items = document.querySelector('.student-list').children;

// 'items_per_page' holds the number of lis we want to show per page
const items_per_page = 5;

const divPage = document.querySelector('.page');

const page_header = document.querySelector('.page-header');

const studentList = document.querySelector('.student-list');
const lis_students = studentList.children;

// The following lines create, append and hide the message that
// is displayed to the page if no student is found with the search.
const message = document.createElement('h2');
message.textContent = 'No students found!';
message.style.fontWeight = 'lighter';
divPage.insertBefore(message, studentList);
message.style.display = 'none';


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
   In the 'appendPageLinks' function we create, append and give functionality
   to a pagination at the buttom of the page.
   the navigation takes the user through the different pages of our app.
   The function takes a parameter 'list' and our html collection of list items
   is going to be the argument of the function.
***/

const appendPageLinks = (list) => {

// First we create and append the elements to the page

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

  // At this point in the function the pagination is in place.
  // now we target the first link in the navigation and assign a className of
  // '.active' to it.

  const first_li = ul.getElementsByTagName('li')[0];
  const first_active_a = first_li.firstElementChild;
  first_active_a.className = 'active';

/***
  Now we loop through all the link elements we just created
  and add a 'click' event listener to all of them.
  we loop through them one more time and remove the className of each one of them.
  then we assign a className of 'active' only to the event targeted link only.

  Finally we call the 'showPage' function.
  Its arguments:
  1) the same that we'll pass to the 'appendPageLinks' function, which is
  our html collection
  2) and the last targeted link's textContent.
  ***/

  const lis_pagination = ul.children;

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

    showPage(list, e.target.textContent);
    });
  }
}


// We call the 'showPages' function passing the html collection and
// the number 1 as arguments to display the first page with the first 10 students as
// a starting point for our app.

showPage(list_items, 1);
appendPageLinks(list_items);


// in the following lines we create and manipulate some elements
// in order to append a search bar in the top right corner of our app.

const search_div = document.createElement('div');
search_div.className = 'student-search';
const search_input = document.createElement('input');
search_input.placeholder = 'Search for students...';
const search_button = document.createElement('button');
search_button.textContent = 'Search';

search_div.appendChild(search_input);
search_div.appendChild(search_button);
page_header.appendChild(search_div);




// We add a 'keyup' event listener to the search bar and filter
// the displaying students by comparing the user input with our
// students names.

search_input.addEventListener('keyup', () => {
  let input = search_input;
  let inputValue = input.value.toUpperCase();
  let namesArray = [];

    for(let i = 0; i < lis_students.length; i += 1) {
      let li =  lis_students[i];
      let h3 = li.getElementsByTagName('h3')[0];
      let name = h3.textContent.toUpperCase();

      if(name.includes(inputValue)) {
        li.style.display = '';
        namesArray.push(li);
      }else{
        li.style.display = 'none';
      }
    }

// with the help of the array we build during our looping
// and the following if/else statement we display a message on the
// page when no students are found during the search.

  if(namesArray.length === 0) {
    message.style.display = '';
  }else{
    message.style.display = 'none';
  }

  document.querySelector('.pagination').remove();
  showPage(namesArray, 1);
  appendPageLinks(namesArray);
})


// We add a 'click' event listener to the search button in case the user
// pastes in a name in the search box and the 'keyup' event listener is not
// triggered
// it has pretty much the same functionality as the 'keyup'

search_button.addEventListener('click', () => {
  let input = search_input;
  let inputValue = input.value.toUpperCase();
  let namesArray = [];

  if(input.value === '') {
    alert('Type a valid name');
  }
  else{
    for(let i = 0; i < lis_students.length; i += 1) {
      let li =  lis_students[i];
      let h3 = li.getElementsByTagName('h3')[0];
      let name = h3.textContent.toUpperCase();

      if(name.includes(inputValue)) {
        li.style.display = '';
        namesArray.push(li);
      }else{
        li.style.display = 'none';
      }
    }
    if(namesArray.length === 0) {
      message.style.display = '';
    }else{
      message.style.display = 'none';
    }

    document.querySelector('.pagination').remove();
    showPage(namesArray, 1);
    appendPageLinks(namesArray);
  }
})
