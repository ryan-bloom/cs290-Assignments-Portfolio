#Ryan Bloom Trello README

For this assignment, I created a version of trello for users to create and interact with todo lists.  In my vue app, the data stored are simple string and array variables that are used in variuos functions in my methods section.  The more complex data structures, such as lists (which contain ids, titles, newcards, newDeadlines, filters, arrays of cards, etc.) and cards (which contain categories, users, deadlines, comments, etc.) are created and added to the data later in the program, when a user creates a new list or card and the newList() function or addNewCard() function is executed.  Furthermore, I used bootstrap in order to make my webpage dynamically responsive and fit to different size screens, and I used a little bit of raw CSS in order to structure and center some elements on my page.    


---Work with Lists---
In my program, users can create list by clicking the "Make a New List!" button.  They can edit this list's title by typing into the "Enter List Title" text box and they can remove the enitre list by clicking the "remove list" button at the end of each list.  Additionally, by clicking the left and right arrow buttons at the top of each list, the order in which whole list are displayed can be changed by the user.  Finally, by clicking the "collapse" and "expand" buttons at the top of each list, users can hide and show the cards associated with the list in question. 


---Work with cards---
Furthermore, users can type tasks into the "Enter Task!" text box, and can assign a deadline to this task by typing one into the text box directly below.  Upon clicking the "enter" key on the keyboard, this a new card will be created with this task and the specified deadline (if one is provided) via the addNewCard() function being called. If no deadline is entered, the card is still created, but the deadline is listed as "No Deadline Set."  Once cards are created, clicking the "x" button to the right of the card will remove it, and clicking the "<" and ">" buttons next to the cards will move them to the list to the left or right of its current list.  Finally, clicking the "see more" button below each card in a list will display information about that card, including when it was created and its category (such as whether or not it is in progress), along with other information I will explain later.


---Work with users---
At the top of my web application, users can sign up by entering a username and email address.  This information is then stored in the users array in my data structure.  If a user tries to sign up with a username or email that is already in the array, they will be told to try a different combination.  Then, users can sign in by entering either their username or email address (no password is required).  If either username or email address is found in the users array, the user is welcomed to the page.  Finally, users can change their username or email address by first entering their old username/email address, followed by their new username/email address.  If their old one is found in the array, then that is changed to the newly desired one.  My application checks to make sure users fill out all necessary fields before executing the "addUserInfo()", "signIn()", "editUserName()", or "editUserEmail()" functions.  


---Customise a Project---
At the top of each list, there is a textbox that reads "Enter Background Color."  Once a color is typed into this box by a user, that list's background changes to the desired color, allowing users to customize their projects.  Furthermore, next to each card, there is a dropdown menu of categories from which users can select.  Each category changes the color of a card, allowing users to customize their lists and cards even further.  Additionally, these categories provide information regarding the status of cards.  Finally, below each list, there is a dropdown menu from which users can select filters for their cards. If a user selects a filter, then only cards within the selected filter category will be displayed.  This works by hiding all other cards in hidden arrays until they are to be shown again.  


---Click on a card to see expanded view---
Along with categories, "x" buttons, and arrow buttons, each card contains a "see more" button.  When this button is clicked, the "cardInfo()" function is exectued, which displays more information about the card in question.  This information includes the card's name, the date that the card was created, the card's deadline, comments/todos associated with this card, the card's category or status, and all the users that are associated with this card as well.

---Challenges---
In addition to all of the previously mentioned features, my application allows any number of comments to be made on a card.  This is done through the "comments" text box found in each card.  Upon entering a comment or sub-todo, the user clicks "enter" on their keyboard, and this comment is added to the card's "Comments" array within its datastructure.  Then, upon clicking the "see more" button, all of these comments and sub-todos are displayed for the user to see.  Furthermore, any number of users can be assigned to a card.  A user is assigned to a card when he/she is signed in and a card is present in a list on the board.  If a user signs in, her/his username or email is added to the "cardUsers" array in each card's datastructure.  One can see all of the users that are assigned to a specific card upon clicking the "see more" button below each card.  


---Conclusion---
This assignment helped me learn an immense aount about working with vue, and it was very cool to see the final functioning product come to life.  I spent upwards of 40 hours working on this assignment and used various resources, including your lab code, w3school, and vuejs in order to understand how to get started.  I feel that the integration with firebase was very confusing and poorly understood by many students, and hopefully will work more smoothly in the future.  This assignment, although very long, stressul, and complicated did teach me a lot about coding and creating fully functioning websites.

Ryan Bloom