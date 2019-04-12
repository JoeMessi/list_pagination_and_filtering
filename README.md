# list_pagination_and_filtering

Hello teacher :)

Please have a look at my app that paginates a long list of students names
in different pages and helps you search and filter student by typing
a name in the search box on the top-right corner of the app.

I'm going for a “Exceeds Expectations” grade and I added to my app all the
required 'extra credit' features. Which are:

           1) Add search component
           2) Add functionality to the search component
           3) Paginate search results
           4) and Handle no results returned


I wrote comments here and there in my script.js, hopefully they're clear.

-----------------------------------------------------

Also I have some questions about my code, and since you're going to review it
I thought I'd ask here.

Questions:

1) the 2 event listeners at the end of the script, the 'keyup' for the search bar
   and the 'click' for the button next to it are basically the same. The code is
   pretty much the same and I was wondering if there is a better way to achieve that
   without repeating the same code.

2) About the 'keyup' event listener. I believe it's working well, though there is
   something I don't quite understand.
   After the loop I remove the current pagination and I call my 2 functions
   'showPage' and 'appendPageLinks' with the new array of names.
   When you start typing in the search bar the response is good, the new pagination
   is created and all is good.
   The thing I don't get is why when I delete the search everything comes back
   to the original pagination ? Obviously that's what we want, but I just don't get
   the code.
   Wouldn't we need in the code to specify that when the search is empty we go back
   to the original pagination ? and delete the just created one using the array of
   names ?

   like something like that:

   if(input empty) {
     - remove the pagination just created with the array of names
     - call the 2 functions with the html collection of all students
   }

   Despite me not getting it, it's working well, so I'm a bit confused.

3) And I would like to know if I can make my code cleaner and shorter and anything else
   you think I should know about.


That's all, thanks a lot and happy reviewing :)
