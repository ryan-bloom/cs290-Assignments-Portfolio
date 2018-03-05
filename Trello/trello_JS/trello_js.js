/*
 *  A simple todo list app.
 *
 * @author YOUR NAMES HERE
 */

/* Filters and todoList code from vueLab, not used here but too scared to delete just yet
// visibility filters
var filters = {
    all: function (cards) {
        return cards;
    },
    active: function (cards) {
        return cards.filter(card => !card.completed);
    },
    completed: function (cards) {
        return cards.filter(card => card.completed);
    }
}

// Define custom filter to correctly pluralize the word
Vue.filter('pluralize', function (n) {
    return n === 1 ? 'item' : 'items';
});

// Example data that represents the list of todo items

var todoList = [
    {
        title: 'Download code',
        completed: true
    },
    {
        title: 'Study code',
        completed: true
    },
    {
        title: 'Finish code',
        completed: true
    }
]; */

//Variable keeps track of how many total lists have been added
var idNum = 0;
// app Vue instance
var app = new Vue({
    // app initial state data (lists, cards, users added via v-models andn methods called)
    data: {
      lists: [
        /*{
          id: idNum,
          title:"",
          cards: [
            {task: "task 1.1"},
            {task: "task 1.2"},
            {task: "task 1.3"}
          ],
          newCard: '',
          visibility: 'all',
          styleData: {
            backgroundColor:'',
            padding: '5px',
            display: 'block',
          }
        }
        */
      ],
      //Array to keep track of users that sign up
      users:[],
      newUserName: '',
      newUserEmail: '',
      returnName: '',
      returnEmail: ''
    },
    methods: {
      //Add a new list object to data with all its fields initialized
      //Called when "new_list_maker" button is pressed
      newList(){
        //Increment idNum with every additional list added
        idNum += 1;
        //Push this empty list onto the list of lists in data
        this.lists.push({
          id: idNum,
          title: "",
          newCard: '',
          cards: [],
          visibility: 'all',
          styleData:{
            backgroundColor:'',
            padding: '5px',
            display: 'block',
            marginLeft: '10px'
          }
        })
      },

/*Find the list at the specific id and add the new
card to that list's list of cards. Called when "enter" is pressed
after user inputs information into the card text box*/
      addNewCard(id){
        //If there is something entered in the text box
        if(this.lists[id-1].newCard){
          //Push to the specific list's list of cards
          this.lists[id-1].cards.push({
            task: this.lists[id-1].newCard
          })
          this.lists[id-1].newCard = '';
        }
      },

//Remove the list from your board if you wish, make sure to update id fields of other lists
//Called when "list_removal" button is pressed
      removeList(id){
        idNum -= 1;
        for(i=0; i<this.lists.length;i++){
          currID = this.lists[i].id;
          /*Decrement all list id's greater than the
          removed list because now they are 1 closer
          to the start*/
          if (currID > id){
            this.lists[i].id -= 1;
          }
        }
        //Remove the current list from lists
        this.lists.splice(id-1,1);
      },

      //Called when the "x" button next to a card is clicked
      //Simply removes the card from the array of cards in the current list
      removeCard(id, card){
        this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1)
      },

      //Move the entire list up one spot in the array of lists
      move_up(id){
        //Make sure it isn't already the first list
        if(id > 1){
          this.lists[id-1].id -= 1;
          this.lists[id-2].id += 1;
          var temp = this.lists[id-2];
          var main = this.lists[id-1];
          Vue.set(this.lists, id-2, main);
          Vue.set(this.lists, id-1, temp)
        }
      },

      //Move entire list down one spot in array of lists
      move_down(id){
        //Make sure it isn't already the last list
        if(id < idNum){
          this.lists[id-1].id += 1;
          this.lists[id].id -= 1;
          var temp = this.lists[id];
          var main = this.lists[id-1];
          Vue.set(this.lists, id, main);
          Vue.set(this.lists, id-1, temp)
        }
      },

      //Called when user click's "sign_up" button
      //Adds the user's username and email to the array "users"
      //Check to make sure a username and email have been written in the v-model boxes
      addUserInfo(){
        if(this.newUserName != '' && this.newUserEmail != ''){
          //Push new user object to users array
          this.users.push({
            userName: this.newUserName,
            userEmail: this.newUserEmail
          })
          this.newUserName = '';
          this.newUserEmail = '';
        }
        else{
          alert("Please Enter Username and Email");
        }
      },

      /*If a user is already signed up, this checks to see if that user's username and email
      are in the users array in data.  Called when user clicks the "sign_in" button*/
      signIn(){
        if(this.users.length == 0){
          alert("Your username and/or email were NOT found in our records (be carefull of capital letters)!");
        }
        if(this.returnName != '' && this.returnEmail != ''){
          for(i=0; i<this.users.length; i++){
            un = this.users[i].userName;
            em = this.users[i].userEmail;
            if (un == this.returnName && em == this.returnEmail) {
              alert("Your username and email match our records!");
            }
            //If looped through all users and no match found- not a returning user
            else if (i==this.users.length-1) {
              alert("Your username and/or email were NOT found in our records (be carefull of capital letters)!");
            }
          }
        }
        //If a username and email aren't typed out in the v-models yet
        else {
          alert("Please fill in ALL fields!");
        }
        this.returnName = '';
        this.returnEmail = '';
      }
    }

/* Code from vueLab but too scared to delete yet
    computed: {
        // return cards that match the currently selected filter
        filteredCards () {
            return filters[this.visibility](this.cards);
        },

        // return count of the remaining active card items
        remaining () {
            return filters.active(this.cards).length;
        }
    },

    methods: {
        // change current filter to the given value
        setFilter (filter) {
            this.visibility = filter;
        },

        // add newly entered todo item if it exists and clear it to prepare for the next one
        addCard () {
            this.newCard = this.newCard.trim();
            if (this.newCard) {
                this.cards.push({
                    title: this.newCard,
                    completed: false
                })
                // text input displays this value, so clear it to indicate ready to type a new one
                this.newCard = '';
            }
        },

        // remove given todo from the list
        removeTodo (card) {
            this.cards.splice(this.cards.indexOf(card), 1)
        },

        // remove all completed cards from the list
        removeCompleted () {
            this.cards = filters.active(this.cards)
        }
    }*/
})

// mount
app.$mount('#Board')
