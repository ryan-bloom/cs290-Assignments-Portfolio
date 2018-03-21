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

var db = firebase.initializeApp(config).database();
//var listsRef = db.ref('lists');
//var usersRef = db.ref('users');

Vue.use(VueFire);


// app Vue instance
var app = new Vue({
//Function that loads data from firebase database to my trello aplication upon reloading the webpage
  created: function(){
    var curr = this;
    function readData(snapshot){
      var data = snapshot.val();
      //Only load data in if there is data to load, else nothing to be done
      if(data){
        if("users" in data){
          for(i = 0; i<data.users.length; i++){
            curr.users.push(data.users[i]);
          }
        }
        if("lists" in data){
          for(i = 0; i<data.lists.length; i++){
            curr.lists.push(data.lists[i]);
            //Initialize cards array; filteredCards array; and tempFilt array in list
            // Only if not already there
            //Must do this because empty arrays are not stored in firebase
            if(!("cards" in data.lists[i])){
              data.lists[i].cards = [];
            }
            if(!("filteredCards" in data.lists[i])){
              data.lists[i].filteredCards = [];
            }
            if(!("tempFilt" in data.lists[i])){
              data.lists[i].tempFilt = [];
            }
          }
        }
        //If there are activities that were recorded prior, load them in
        if("activities" in data){
          for(i = 0; i<data.activities.length; i++){
            curr.activities.push(data.activities[i]);
          }
        }
        //If there was a previous idNum count, keep that count going instead of returning to 0
        if("idNum" in data){
          curr.idNum = data.idNum;
        }
      }
      db.ref("/").off("value", readData);
    }
    db.ref("/").on("value", readData);
  },
    // app initial state data (lists, cards, users added via v-models andn methods called)
    data: {
      //Variable keeps track of how many total lists have been added
      idNum: 0,
      //Array of list objects (each list object has subarrays of cards)
      lists: [],
      //Array to keep track of users that sign up
      users:[],
      //Array to keep track of all activities that occur within the page
      activities:[],

      //Variables used to update and work with users sign ups, sign ins, and edits
      newUserName: '',
      newUserEmail: '',
      newUserImg: '',
      returnName: '',
      changeUserOld: '',
      changeUserNew: '',
      changeEmailOld: '',
      changeEmailNew: ''
    },

    methods: {
      updateDatabase(fbObject, data){
        //updates the firebase dataset
        db.ref("/" + fbObject).set(data);
      },
      //Add a new list object to data with all its fields initialized
      //Called when "new_list_maker" button is pressed
      newList(){
        //id toString for activities log
        var aID = (this.idNum).toString();
        //Increment idNum with every additional list added
        this.idNum += 1;
        //Push this empty list onto the list of lists in data
        this.lists.push({
//        listsRef.push({
          id: this.idNum,
          tempTitle: '',
          title: "",
          newCard: '',
          newDeadline: '',
          filter: '',
          tempColor: '',
          cards: [],
//          cards: [false],
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
        }),
        //Update activities log accordingly
        this.activities.push({
          activity: "list " + aID + " create at: " + new Date()
        });
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
        this.updateDatabase("idNum", this.idNum);
      },

      setTitle(id){
        //String of list ID to use for addition to activities log
        var aID = (id-1).toString();
        //Set title upon clicking enter
        if(this.lists[id-1].tempTitle){
          this.lists[id-1].title = this.lists[id-1].tempTitle;
        }
        this.lists[id-1].tempTitle = '';
          //Update activities log accordingly
        this.activities.push({
          activity: "Title added to/changed for list " + aID + " at: " + new Date()
        });
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

/*Find the list at the specific id and add the new
card to that list's list of cards. Called when "enter" is pressed
after user inputs information into the card text box*/
      //addNewCard(id){
      addNewCard(id){
        //String of list ID to use for addition to activities log
        var aID = (id-1).toString();
        //If no deadline is entered, dline is set to the card's deadline
        var dline = "No Deadline Set"
        //If there is something entered in the text boxes
        if(this.lists[id-1].newCard){
//        if(list.newCard){
          //Push to the specific list's list of cards
          if(this.lists[id-1].newDeadline){
//          if(list.newDeadline){
            dline = this.lists[id-1].newDeadline;
          }
          this.lists[id-1].cards.push({
//            list.cards.push({
//          listsRef.child(list['.key']).cards.push({
            task: this.lists[id-1].newCard,
//            task: list.newCard,
            cardCategory: '',
            cardUsers: ["Users"],
            deadline: dline,
            date: new Date(),
            cardComment: '',
            Comments: ["Comments"],
            styleData:{
              color:'',
              fontWeight:'',
              padding: '5px',
              border:'1px solid black'
            }
          })
        }
          var numCs = this.lists[id-1].cards.length;
//          var numCs = list.cards.length;
          var c = this.lists[id-1].cards[numCs-1];
          if(this.returnName){
            this.lists[id-1].cards[numCs-1].cardUsers.push(this.returnName.toLowerCase());
          }
          //Record the addition of this card in activities log
          this.activities.push({
            activity: "Card added to list " + aID + " at: " + new Date()
          });
          this.lists[id-1].newCard = '';
          this.lists[id-1].newDeadline = '';
      this.updateDatabase("lists", this.lists);
      this.updateDatabase("activities", this.activities);
      },
      //listRef.child(id['.key']).child('cards').push({})

//Remove the list from your board if you wish, make sure to update id fields of other lists
//Called when "list_removal" button is pressed
      removeList(id){
        //String of list ID to use for addition to activities log
        var aID = (id-1).toString();
        //Decrement number of lists
        this.idNum -= 1;

        for(i=0; i<this.lists.length;i++){
          currID = this.lists[i].id;
          //Decrement all list id's greater than the
          //removed list because now they are 1 closer
          //to the start
          if (currID > id){
            this.lists[i].id -= 1;
            //listsRef.child(listCurr['.key']).id -= 1;
          }
        }
        //Remove the current list from lists
        this.lists.splice(id-1,1);
        //this.updateDatabase("lists", this.lists);
//log this activity
        this.activities.push({
          activity: "List " + aID + " removed at: " + new Date()
        });
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
        this.updateDatabase("idNum", this.idNum);
      },

//When enter is pressed, set the background color of lists = tempColor
      listColor(id){
        //String of list ID to use for addition to activities log
        var aID = (id-1).toString();
        //Set background color on clicking enter
        if(this.lists[id-1].tempColor){
          this.lists[id-1].styleData.backgroundColor = this.lists[id-1].tempColor;
        }
        //Update activities log accordingly
        this.activities.push({
          activity: "List " + aID + " color changed to " + this.lists[id-1].tempColor + " at " + new Date()
        });
        this.lists[id-1].tempColor = '';
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

      //Called when the "x" button next to a card is clicked
      //Simply removes the card from the array of cards in the current list
      removeCard(id, card){
        //String of list ID to use for addition to activities log
        var aID = (id-1).toString();
//Remove the desired card from the list
        this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
//Update activities log accordingly
        this.activities.push({
          activity: "Card removed from list " + aID + " at " + new Date()
        });
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

      //Allow users to move cards between lists
      card_left(id, card){
        //ids toString to be used in activities log
        var aID = (id-1).toString();
        var aID2 = (id-2).toString();

        if(id>1){
          //Add card to different list in order to display on desired list
          this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
          this.lists[id-2].cards.push(card);
          this.activities.push({
            activity: "Card moved from list " + aID + " to list " + aID2 + " at " + new Date()
          });
        }
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

      //Allow users to move cards between lists
      card_right(id, card){
        //ids toString to be used in activities log
        var aID = (id-1).toString();
        var aID2 = (id).toString();

        if(id<this.idNum){
          //Add desired card to diff lists to display on different lists
          this.lists[id-1].cards.splice(this.lists[id-1].cards.indexOf(card),1);
          this.lists[id].cards.push(card);
          this.activities.push({
            activity: "Card moved from list " + aID + " to list " + aID2 + " at " + new Date()
          });
        }
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

//Method changes color of card text when its category is changed
      card_cat(id, card){
        //id's toString to be used in activities log
        var aID = (id-1).toString();

        var cardID = this.lists[id-1].cards.indexOf(card);
        //Check to see which category the card was set to -- change color/font depending on category
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
        this.activities.push({
          activity: "Card category set to " + card.cardCategory + " at " + new Date()
        });
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("activities", this.activities);
      },

//When "see more" button is selected, dispalys more info about that card
      cardInfo(id, card){
        //id toString to be used in activities log
        var aID = (id-1).toString();

//Display card info when requested by user
        var cID = this.lists[id-1].cards.indexOf(card);
        var c = this.lists[id-1].cards[cID];
        alert("Card Info Below! \n\n" +
              "Date Created: " + c.date + "\n" +
              "Task: " + c.task + "\n" +
              "Category/Status: " + c.cardCategory + "\n" +
              "Users: " + c.cardUsers + "\n" +
              "Deadline: " + c.deadline + "\n" +
              "Comments/Sub-Lists: " + c.Comments);
//Update activities log
        this.activities.push({
          activity: "Card information displayed at " + new Date()
        });
        this.updateDatabase("activities", this.activities);
      },

      //Move the entire list up one spot in the array of lists
      move_up(id){
        //id toString() for activities log use
        var aID = (id-1).toString();
        var aID2 = (id-2).toString();
        //Make sure it isn't already the first list
        if(id > 1){
          //Shift indices of given lists in order to display in desired new order
          this.lists[id-1].id -= 1;
          this.lists[id-2].id += 1;
          var temp = this.lists[id-2];
          var main = this.lists[id-1];
          Vue.set(this.lists, id-2, main);
          Vue.set(this.lists, id-1, temp);
          //Update activities log
          this.activities.push({
            activity: "List " + aID + " swapped locations with list " + aID2 + " at "+ new Date()
          });
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
        }
      },

      //Move entire list down one spot in array of lists
      move_down(id){
        //id toString() for activities log use
        var aID = (id-1).toString();
        var aID2 = (id).toString();
        //Make sure it isn't already the last list
        if(id < this.idNum){
          //Shift indices of given lists in order to display them in new order
          this.lists[id-1].id += 1;
          this.lists[id].id -= 1;
          var temp = this.lists[id];
          var main = this.lists[id-1];
          Vue.set(this.lists, id, main);
          Vue.set(this.lists, id-1, temp);
          //Update activities log
          this.activities.push({
            activity: "List " + aID + " swapped locations with list " + aID2 + " at "+ new Date()
          });
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
        }
      },
      //If there are cards in the list, then collapse them by storing them in a hidden array
      collapse_cards(id){
        //id toString() for activities log use
        var aID = (id-1).toString();

        //Hide cards in hide array if there are any displayed cards
        if(this.lists[id-1].cards.length != 0){
          this.lists[id-1].hideCards = this.lists[id-1].cards;
          this.lists[id-1].cards = [];
          //Update activities log accordingly
          this.activities.push({
            activity: "List " + aID + " cards collapsed at "+ new Date()
          });
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
        }
      },
      //If there are cards in the hidden array, expand the list by moving them back to the displayed array
      expand_cards(id){
        //id toString() for activities log use
        var aID = (id-1).toString();
        //If no hideCards array has been initialized, do nothing
        if(!this.lists[id-1].hideCards){
          return;
        }

        //If there are cards hidden in the hideCards array, move them to cards array to be displayed
        if(this.lists[id-1].hideCards.length != 0 && this.lists[id-1].cards.length == 0){
          this.lists[id-1].cards = this.lists[id-1].hideCards;
          this.lists[id-1].hideCards = [];
          //Update activities log accordingly
          this.activities.push({
            activity: "List " + aID + " cards expanded at "+ new Date()
          });
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
        }
      },

      //Add comments to Comments array for the card
      addComment(id, card){
        //id toString() for activities log use
        var aID = (id-1).toString();

        //Add comment to card's "Comments" array
        if(card.cardComment){
          card.Comments.push(card.cardComment);
          card.cardComment = '';
          this.activities.push({
            activity: "Comment added to card in list " + aID + " at "+ new Date()
          });
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
        }
      },

      //When the filter is changed for a list, this function runs to only display cards of the selected category
      card_filter(id){
        //id toString() for activities array use
        var aID = (id-1).toString();

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
              //Hide cards that don't match filter f
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
          //Update activities log accordingly
          if(f != "none"){
          this.activities.push({
            activity: "List " + aID + " cards filtered to show " + f +  " cards at "+ new Date()
          });}
          if(f == "none"){
            this.activities.push({
              activity: "List " + aID + " cards all shown, no filter set, at " + new Date()
            })
          }
          this.updateDatabase("lists", this.lists);
          this.updateDatabase("activities", this.activities);
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
              this.activities.push({
                activity: "Username " + this.newUserName + " rejected because already taken at "+ new Date()
              });
              this.newUserName = '';
              this.updateDatabase("activities",this.activities);
              return;
            }
            if(this.newUserEmail.toLowerCase() == em){
              alert("Sorry, that email address is already taken! Try again.");
              this.activities.push({
                activity: "Email " + this.newUserEmail + " rejected because already taken at "+ new Date()
              });
              this.newUserEmail = '';
              this.updateDatabase("activities",this.activities);
              return;
            }
          }
          //Set the picture to the selcted image by user
          var pic = '';
          if(this.newUserImg == 1){
            pic = "/trello_images/sports_img.png";
          }
          if(this.newUserImg == 2){
            pic = "/trello_images/art_img.png";
          }
          if(this.newUserImg == 3){
            pic = "/trello_images/music_img.png";
          }
          if(this.newUserImg == 4){
            pic = "/trello_images/school_img.png";
          }
          //Push new user object to users array once reach end of loop, no duplicates
          this.users.push({
            userName: this.newUserName.toLowerCase(),
            userEmail: this.newUserEmail.toLowerCase(),
            userImg: pic
          })
          this.newUserName = '';
          this.newUserEmail = '';
          this.newUserImg = '';
        }
        else{
          alert("Please Enter Username, Email, and select an Image");
        }
        this.activities.push({
          activity: "New user added to users at "+ new Date()
        });
        this.updateDatabase("activities", this.activities);
        this.updateDatabase("users", this.users);
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
              this.activities.push({
                activity: "User, " + un + ", signed in at "+ new Date()
              });
              this.updateDatabase("activities", this.activities);
              alert("Hello " + un + ", welcome back!")
              return;
            }
            //if not a username, check to see if signing in with an email address
            else if (em == this.returnName.toLowerCase()) {
              for(i=0; i<this.lists.length; i++){
                for(j=0; j<this.lists[i].cards.length; j++){
                  if(this.lists[i].cards[j].cardUsers.indexOf(this.returnName.toLowerCase()) < 0){
                    this.lists[i].cards[j].cardUsers.push(this.returnName.toLowerCase());
                  }
                }
              }

              this.activities.push({
                activity: "User, " + em + ", signed in at "+ new Date()
              });
              this.updateDatabase("activities", this.activities);
              alert("Hello " + em +", welcome back!")
              return;
            }
            //If looped through all users and no match found- not a returning user
            else if(i==this.users.length-1) {
              this.activities.push({
                activity: "User attempted to sign in and failed at " + new Date()
              });
              this.updateDatabase("activities", this.activities);
              alert("Your username and/or email were NOT found in our records!");
            }
          }
        }
        //If a username and email aren't typed out in the v-models yet
        else {
          this.activities.push({
            activity: "User attempted to sign in and failed at " + new Date()
          });
          this.updateDatabase("activities", this.activities);
          alert("Please fill in ALL fields!");
        }
        this.returnName = '';
        this.updateDatabase("lists", this.lists);
        this.updateDatabase("users", this.users);
      },


//Find if old username is in list of users and change it to new username if it is found
      editUserName(){
        if(this.changeUserOld != '' && this.changeUserNew != ''){
          //Only change username if old username is found in the users array
          for(i=0; i<this.users.length; i++){
            un = this.users[i].userName;
            if(this.changeUserOld.toLowerCase() == un){
              this.users[i].userName = this.changeUserNew.toLowerCase();
              this.activities.push({
                activity: "User " + un + " changed username to "+ this.changeUserNew +" at "+ new Date()
              });
              this.updateDatabase("activities", this.activities);
              this.updateDatabase("users", this.users);
              alert("You changed your username from " + this.changeUserOld + " to " + this.changeUserNew);
              if(this.returnName == un){
                this.returnName = this.changeUserNew.toLowerCase();
              }
              this.changeUserNew = '';
              this.changeUserOld = '';
              return;
            }
          }
          //Update activities log to show user name was edited
          this.activities.push({
            activity: "User failed to changed username at "+ new Date()
          });
          this.updateDatabase("activities", this.activities);
          alert("Your old username was not found!");
        }
        //If old username isn't found in users array
        else{
          this.activities.push({
            activity: "User failed to changed username at "+ new Date()
          });
          this.updateDatabase("activities", this.activities);
          alert("Please enter all necessary information (old and new username)");
        }
        this.updateDatabase("users", this.users);
      },

      //Find if the desired email to change is in the list of users, then change it to new if it is found
      editUserEmail(){
        if(this.changeEmailOld != '' && this.changeEmailNew != ''){
          //Check if email is found in the array of users, only change if old email is found
          for(i=0; i<this.users.length; i++){
            em = this.users[i].userEmail;
            if(this.changeEmailOld.toLowerCase() == em){
              this.users[i].userEmail = this.changeEmailNew.toLowerCase();
              //Update activities log
              this.activities.push({
                activity: "User " + em + " changed email to "+ this.changeEmailNew +" at "+ new Date()
              });
              this.updateDatabase("activities", this.activities);
              this.updateDatabase("users", this.users);
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
          this.activities.push({
            activity: "User failed to change email at "+ new Date()
          });
          this.updateDatabase("activities", this.activities);
        }
        //If old email is not found in users array
        else{
          this.activities.push({
            activity: "User failed to change email at "+ new Date()
          });
          this.updateDatabase("activities", this.activities);
          alert("Please enter all necessary information (old and new email)")
        }
        this.updateDatabase("users", this.users);
      },

//When this button is clicked, all activities are put into an array and displayed to user (Challenge three)
      showActivities(){
        this.activities.push({
          activity: "User displayed activities log at " + new Date()
        })
        this.updateDatabase("activities", this.activities);
        //Get all activities into a readable array for user
        var a = this.activities;
        var act = [];
        for(i=0; i<this.activities.length; i++){
          act.push(this.activities[i].activity + "\n\n")
        }
        //Display activities to user
        alert(act);
      }
    }
})

// mount vue app
app.$mount('#Board')
