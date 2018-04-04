# quiz

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For this project, I have 1 vue component (named quiz_componet.vue) within the components folder in src.  This component is referenced in <template> of App.vue and its props are sent depending on which quiz is selected by the user.  The user selected between 3 quiz types, which dictates which json file (which which quiz questions) is loaded and used for the quiz.  Once the user selects a quiz and clicks "start," the main page disappears (is hidden) behind the loaded quiz.  This main page reappears after the user submits and selects "ok" in the alert box that displays upon submitting.  Therefore, the user can slect a different quiz and continue having fun!

The quiz questions are displayed based on their index within the qQuestions prop (which is an array of question objects, each with a "question" attribute, "choices" attribute, and "correctAnswer" attribute).  The choices for each question are then loaded using a v-for statement, and assigned to radio buttons (allowing users to only select 1 of the possible answers.  Upon selecting a radio button, the user's answer is detremined (through "ans" function in methods) and stored in the data object "userAns."  Upon clicking "next," the user's answer is compared to the correct answer.  If he/she is correct, a counter is incremented, and if he/she is incorrect, the incorrectly answered question is added to an array in order to keep track of previously wrong (or skipped questions).  Skipping a question adds it to the array as well.  

The "previous" button below each question is only clickable once there is a skipped or incorrectly answered question.  Then, after clicking "previous" once, it is once again greyed out due to the fact that the "next" button must be clicked after the "previous" in order to check the newly selcted answer and jump back to the most recent unanswered/wrong question.  Then, if there is anything in the "ret" array, the previous button is once again clickable.  

Finally, upon reaching the final question in the quiz, the "next" button gets greyed out (because there is no next question), and the "submit" button becomes clickable.  Upon selecting "submit," an alert box appears with the results of your quiz, a little message about the results, and an "ok" button, which takes you back to the main page in order to start a new quiz as the user wishes.  This project took me about 6 hours to complete and I referenced w3school for various syntactical nuances of javascript and vue files.  I also collaborated with Val Slepak and Daniel Bernt, as well as the TA's in order to answer some questions that arose regarding this project.   











 
