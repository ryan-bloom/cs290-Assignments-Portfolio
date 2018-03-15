/*
 *
 * @author Ryan Bloom
 */

//connect with firebase
var config = {
    apiKey: "AIzaSyB0SzvJsqv3k1lOQO4vqkCK9Bbb1t2CA4s",
    authDomain: "trello-cs290.firebaseapp.com",
    databaseURL: "https://trello-cs290.firebaseio.com",
    projectId: "trello-cs290",
    storageBucket: "trello-cs290.appspot.com",
    messagingSenderId: "649377867515"
  };
//firebase.initializeApp(config);

var db = firebase.initializeApp(config).database();
var listsRef = db.ref('lists');
var usersRef = db.ref('users');
Vue.use(VueFire);



//Variable keeps track of how many total lists have been added
var idNum = 0;

// app Vue instance
var app = new Vue({
    // app initial state data (lists, cards, users added via v-models andn methods called)
    data: {
      //lists: [],

      //Array to keep track of users that sign up

//JSON.stringify will output JSON rather than building own thing

      //users:[],
      newUserName: '',
      newUserEmail: '',
      newUserImg: '',
      returnName: '',
      changeUserOld: '',
      changeUserNew: '',
      changeEmailOld: '',
      changeEmailNew: ''
    },

//Firebase stuff
  firebase: {
      lists: listsRef,
      users: usersRef
    },

    methods: {
      //Add a new list object to data with all its fields initialized
      //Called when "new_list_maker" button is pressed
      newList(){
        //Increment idNum with every additional list added
        idNum += 1;
        //Push this empty list onto the list of lists in data
        this.lists.push({
        //listRef.push({
          id: idNum,
          title: "",
          newCard: '',
          newDeadline: '',
          filter: '',
          cards: [],
          hideCards: [],
          filteredCards: [],
          tempFilt: [],
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
        //If no deadline is entered, dline is set to the card's deadline
        var dline = "No Deadline Set"
        //If there is something entered in the text boxes
        if(this.lists[id-1].newCard){
          //Push to the specific list's list of cards
          if(this.lists[id-1].newDeadline){
            dline = this.lists[id-1].newDeadline;
          }
          this.lists[id-1].cards.push({
            task: this.lists[id-1].newCard,
            cardCategory: '',
            cardUsers: [],
            deadline: dline,
            date: new Date(),
            cardComment: '',
            Comments: [],
            styleData:{
              color:'',
              fontWeight:'',
              padding: '5px',
              border:'1px solid black'
            }
          })
          var numCs = this.lists[id-1].cards.length;
          //var c = this.lists[id-1].cards[numCs-1];
          if(this.returnName){
            this.lists[id-1].cards[numCs-1].cardUsers.push(this.returnName.toLowerCase());
          }
          this.lists[id-1].newCard = '';
          this.lists[id-1].newDeadline = '';
        }
      },
      //listRef.child(id['.key']).child('cards').push({})

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
        this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
      },

      //Allow users to move cards between lists
      card_left(id, card){
        if(id>1){
          this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
          this.lists[id-2].cards.push(card);
        }
      },

      //Allow users to move cards between lists
      card_right(id, card){
        if(id<idNum){
          this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
          this.lists[id].cards.push(card);
        }
      },

//Method changes color of card text when its category is changed
      card_cat(id, card){
        var cardID = this.lists[id-1].cards.indexOf(card);
        if(card.cardCategory == "urgent"){
          this.lists[id-1].cards[cardID].styleData.color = 'red';
          this.lists[id-1].cards[cardID].styleData.fontWeight = 'bold';
        }
        if(card.cardCategory == "normal"){
          this.lists[id-1].cards[cardID].styleData.color = 'black';
          this.lists[id-1].cards[cardID].styleData.fontWeight = 'normal';
        }
        if(card.cardCategory == "minor"){
          this.lists[id-1].cards[cardID].styleData.color = 'blue';
          this.lists[id-1].cards[cardID].styleData.fontWeight = 'normal';
        }
        if(card.cardCategory == "inProgress"){
          this.lists[id-1].cards[cardID].styleData.color = 'goldenRod';
          this.lists[id-1].cards[cardID].styleData.fontWeight = 'normal';
        }
        if(card.cardCategory == "completed"){
          this.lists[id-1].cards[cardID].styleData.color = 'green';
          this.lists[id-1].cards[cardID].styleData.fontWeight = 'normal';
        }
      },

//When "see more" button is selected, dispalys more info about that card
      cardInfo(id, card){
        var cID = this.lists[id-1].cards.indexOf(card);
        var c = this.lists[id-1].cards[cID];
        alert("Card Info Below! \n\n" +
              "Date Created: " + c.date + "\n" +
              "Task: " + c.task + "\n" +
              "Category/Status: " + c.cardCategory + "\n" +
              "Users: " + c.cardUsers + "\n" +
              "Deadline: " + c.deadline + "\n" +
              "Comments/Sub-Lists: " + c.Comments)
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
      //If there are cards in the list, then collapse them by storing them in a hidden array
      collapse_cards(id){
        if(this.lists[id-1].cards.length != 0){
          this.lists[id-1].hideCards = this.lists[id-1].cards;
          this.lists[id-1].cards = [];
        }
      },
      //If there are cards in the hidden array, expand the list by moving them back to the displayed array
      expand_cards(id){
        if(this.lists[id-1].hideCards.length != 0 && this.lists[id-1].cards.length == 0){
          this.lists[id-1].cards = this.lists[id-1].hideCards;
          this.lists[id-1].hideCards = [];
        }
      },

      //Add comments to Comments array for the card
      addComment(id, card){
        if(card.cardComment){
          card.Comments.push(card.cardComment);
          card.cardComment = '';
        }
      },

      //When the filter is changed for a list, this function runs to only display cards of the selected category
      card_filter(id){
        //Only run if the list of cards or the filterd cards cards have anything in them
        if(this.lists[id-1].cards.length != 0 || this.lists[id-1].filteredCards.length != 0){
          var f = this.lists[id-1].filter;
          if(f == "none"){
            if(this.lists[id-1].filteredCards.length != 0){
              for(i=0; i<this.lists[id-1].filteredCards.length; i++){
                var c1 = this.lists[id-1].filteredCards[i];
                this.lists[id-1].cards.push(c1);
              }
            }
            this.lists[id-1].filteredCards = [];
          }
          //Put all cards not in the selected category into a hidden array
          else{
            if(this.lists[id-1].filteredCards.length != 0){
              for(i=0; i<this.lists[id-1].filteredCards.length; i++){
                var c2 = this.lists[id-1].filteredCards[i];
                this.lists[id-1].cards.push(c2);
              }
            }
            this.lists[id-1].filteredCards = [];
            for(i = 0; i<this.lists[id-1].cards.length; i++){
              var c3 = this.lists[id-1].cards[i];
              if(c3.cardCategory != f){
                this.lists[id-1].filteredCards.push(c3);
              }
              else{
                this.lists[id-1].tempFilt.push(c3);
              }
            }
            //Reset the visible and hidden arrays
            this.lists[id-1].cards = this.lists[id-1].tempFilt;
            this.lists[id-1].tempFilt = [];
          }
        }
      },


      //Called when user click's "sign_up" button
      //Adds the user's username and email to the array "users"
      //Check to make sure a username and email have been written in the v-model boxes
      addUserInfo(){
        if(this.newUserName != '' && this.newUserEmail != '' && this.newUserImg != ''){
          for(i=0; i<this.users.length; i++){
            un = this.users[i].userName;
            em = this.users[i].userEmail;
            //Don't let users create a username or email if it is already in the users list
            //Don't have repeated emails/usernames
            if(this.newUserName.toLowerCase() == un){
              alert("Sorry, that username is already taken! Try again.");
              this.newUserName = '';
              return;
            }
            if(this.newUserEmail.toLowerCase() == em){
              alert("Sorry, that email address is already taken! Try again.");
              this.newUserEmail = '';
              return;
            }
          }
          //Push new user object to users array once reach end of loop, no duplicates
          this.users.push({
            userName: this.newUserName.toLowerCase(),
            userEmail: this.newUserEmail.toLowerCase(),
            userImg: ""
          })
          this.newUserName = '';
          this.newUserEmail = '';
          this.newUserImg = '';
        }
        else{
          alert("Please Enter Username, Email, and select an Image");
        }
      },

      /*If a user is already signed up, this checks to see if that user's username and email
      are in the users array in data.  Called when user clicks the "sign_in" button*/
      signIn(){
        if(this.users.length == 0){
          alert("Your username and/or email were NOT found in our records!");
        }
        if(this.returnName != ''){
          for(i=0; i<this.users.length; i++){
            un = this.users[i].userName;
            em = this.users[i].userEmail;
            //Check .toLowerCase() so that emails and usernames aren't case sensitive
            if (un == this.returnName.toLowerCase()){
              //Add this user to all the cards
              for(i=0; i<this.lists.length; i++){
                for(j=0; j<this.lists[i].cards.length; j++){
                  if(this.lists[i].cards[j].cardUsers.indexOf(this.returnName.toLowerCase()) < 0){
                    this.lists[i].cards[j].cardUsers.push(this.returnName.toLowerCase());
                  }
                }
              }
//alert("Your username matches our records!");
              alert("Hello " + un + ", welcome back!")
              //this.returnName = '';
              return;
            }
            else if (em == this.returnName.toLowerCase()) {
              for(i=0; i<this.lists.length; i++){
                for(j=0; j<this.lists[i].cards.length; j++){
                  if(this.lists[i].cards[j].cardUsers.indexOf(this.returnName.toLowerCase()) < 0){
                    this.lists[i].cards[j].cardUsers.push(this.returnName.toLowerCase());
                  }
                }
              }
              //alert("Your email matches our records!");
              alert("Hello " + em +", welcome back!")
              //this.returnName = '';
              return;
            }
            //If looped through all users and no match found- not a returning user
            else if(i==this.users.length-1) {
              alert("Your username and/or email were NOT found in our records!");
            }
          }
        }
        //If a username and email aren't typed out in the v-models yet
        else {
          alert("Please fill in ALL fields!");
        }
        this.returnName = '';
        //this.returnEmail = '';
      },


//Find if old username is in list of users and change it to new username if it is found
      editUserName(){
        if(this.changeUserOld != '' && this.changeUserNew != ''){
          for(i=0; i<this.users.length; i++){
            un = this.users[i].userName;
            if(this.changeUserOld.toLowerCase() == un){
              this.users[i].userName = this.changeUserNew.toLowerCase();
              alert("You changed your username from " + this.changeUserOld + " to " + this.changeUserNew);
              if(this.returnName == un){
                this.returnName = this.changeUserNew.toLowerCase();
              }
              this.changeUserNew = '';
              this.changeUserOld = '';
              return;
            }
          }
          alert("Your old username was not found!");
        }
        else{
          alert("Please enter all necessary information (old and new username)");
        }
      },

      //Find if the desired email to change is in the list of users, then change it to new if it is found
      editUserEmail(){
        if(this.changeEmailOld != '' && this.changeEmailNew != ''){
          for(i=0; i<this.users.length; i++){
            em = this.users[i].userEmail;
            if(this.changeEmailOld.toLowerCase() == em){
              this.users[i].userEmail = this.changeEmailNew.toLowerCase();
              alert("You changed your email from " + this.changeEmailOld + " to " + this.changeEmailNew);
              if(this.returnName == em){
                this.returnName = this.changeEmailNew.toLowerCase();
              }
              this.changeEmailOld = '';
              this.changeEmailNew = '';
              return;
            }
          }
          alert("Your old email was not found!");
        }
        else{
          alert("Please enter all necessary information (old and new email)")
        }
      }
    }
})

// mount
app.$mount('#Board')
