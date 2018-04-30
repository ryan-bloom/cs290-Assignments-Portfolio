var schoolJSON = {
    "schools":[
        
        {
            "name": "Duke",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 36.00, -78.93 ]
        },
        {
            "name": "Harvard",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 42.37, -71.11 ]
        },
        {
            "name": "Yale",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 41.32, -72.92 ]
        },
        {
            "name": "Princeton",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 40.34, -74.65 ]
        },
        {
            "name": "Brown",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 41.83, -71.40 ]
        },
        {
            "name": "MIT",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 42.36, -71.09 ]
        },
        {
            "name": "UPenn",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 39.95, -75.19 ]
        },
        {
            "name": "Dartmouth",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 43.70, -72.29 ]
        },
        {
            "name": "Williams",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 42.71, -73.20 ]
        },
        {
            "name": "Columbia",
            "tours":[1,1,1,1,1,1,1],
            "location": [ 40.81, -73.96 ]
        }
    ]
};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCSYxVO59SGArvQt97mFdVN_dJElpl0jE",
    authDomain: "final-college-connectour.firebaseapp.com",
    databaseURL: "https://final-college-connectour.firebaseio.com",
    projectId: "final-college-connectour",
    storageBucket: "",
    messagingSenderId: "640733598580"
  };
var db = firebase.initializeApp(config).database();
Vue.use(VueFire);



var app = new Vue({
    created: function(){
        var curr = this;
        function readData(snapshot){
            var data = snapshot.val();
            if(data){
                if("users" in data){
                    if(!("trips" in data.users[0])){
                        data.users[0].trips = [];
                    }
                    if(!("schoolsCor" in data.users[0])){
                        data.users[0].schoolsCor = [];
                    }
                    if(!("trips" in data.users[0])){
                        data.users[1].trips = [];
                    }
                    if(!("schoolsCor" in data.users[0])){
                        data.users[1].schoolsCor = [];
                    }
                    curr.users[0] = data.users[0];
                    curr.users[1] = data.users[1];
                    for(i = 2; i<data.users.length; i++){
                        //order of curr.users.push might be different
                        if(!("trips" in data.users[i])){
                            data.users[i].trips = [];
                        }
                        if(!("schoolsCor" in data.users[i])){
                            data.users[i].schoolsCor = [];
                        }
                        curr.users.push(data.users[i]);
                    }
                }
                
                if("signInDisp" in data){
                    curr.signInDisp = data.signInDisp;
                    var signInScreen = document.getElementById("start_page_div");
                    signInScreen.style.display = curr.signInDisp;
                }
                if("createSchedDisp" in data){
                    curr.createSchedDisp = data.createSchedDisp;
                    var createSchedScreen = document.getElementById("schedCreateContainer");
                    createSchedScreen.style.display = curr.createSchedDisp;
                }
                if("viewSchedDisp" in data){
                    curr.viewSchedDisp = data.viewSchedDisp;
                    var viewSchedScreen = document.getElementById("schedViewContainer");
                    viewSchedScreen.style.display = curr.viewSchedDisp;
                } 
                
                if("userIndex" in data){
                    curr.userIndex = data.userIndex;
                }
                if("activeUser" in data){
                    curr.activeUser = data.activeUser;
                }
                /*
                if(!("publicTrips" in data)){
                    data.publicTrips = [];
                }*/
                if("publicTrips" in data){
                    for(i = 0; i<data.publicTrips.length; i++){
                        curr.publicTrips.push(data.publicTrips[i]);
                    }
                }
                /*
                if(!("pubSchools" in data)){
                    data.pubSchools = []; 
                }
                */
                if("pubSchools" in data){
                    for(i=0; i<data.pubSchools.length; i++){
                        curr.pubSchools.push(data.pubSchools[i]);
                    }
                }
                
                /*
                if(!("schoolDat" in data)){
                    data.schoolDat = {"schools":[]};
                }
                */
                
                if("schoolDat" in data){
                    //CHANGE THE i START INDEX IF ADD MORE SCHOOLS
                    for(i=10; i<data.schoolDat.schools.length; i++){
                        curr.schoolDat.schools.push(data.schoolDat.schools[i]);
                    }
                }
                if("schedDex" in data){
                    curr.schedDex = data.schedDex;
                }
                /*
                if(!("schedSchools" in data)){
                    data.schedSchools = [];
                }
                */
                if("schedSchools" in data){
                    for(i = 0; i<data.schedSchools.length; i++){
                        curr.schedSchools.push(data.schedSchools[i]);
                    }
                }
                if("schedDisplay" in data){
                    for(i = 0; i<data.schedDisplay.length; i++){
                        curr.schedDisplay.push(data.schedDisplay[i]);
                    }
                }
            }
            db.ref("/").off("value", readData);
        }
        db.ref("/").on("value", readData);
    },
    data: {
        //Temporary data objects referenced with v-models in html
        returnUsername: "",
        returnPassword: "",
        newUsername: "",
        newPassword: "",
        confirmPassword: "",
        activeUser: "", //Remember in firebase
        users: [ //Remember in firebase
            {
                username: "admin",
                password: "AdminPassword",
                trips:[],
                schoolsCor:[]
            },
            {
                username: "guest",
                password: "",
                trips:[],
                schoolsCor:[]
            }
        ],
        //array of saved trips that people make public for guests to view
        publicTrips: [], //Remember in firebase
        pubSchools:[], //Remember in firebase
        
        //JSON file of school data
        schoolDat: schoolJSON, //Remember in firebase
        
        //Temporary data to store user inputs
        startDate: "", //date, want day of week //Remember in firebase
        endDate: "", //date, want day of week //Remember in firebase
        startDay: "", //Monday = 0... Sunday = 6 //Remember in firebase
        endDay: "", //Monday = 0... Sunday = 6; //Remember in firebase
        mySchools: "", //In firebase must initialize to something //Remember in firebase
        pubAccess: 1, //value 1 = private; value 0 = public (with radio buttons) //Remember in firebase
        //startZip: "", //Remember in firebase
        schedSchools: [], //same as mySchools? //Remember in firebase
        userIndex: 0, //To find user in users to add trips to this user //Remember in firebase
        tripL: 0, //Will be the length of the user's trip //Remember in firebase
        genSchedules: "", //schedules generated for the user after clicking "create Schedule" button //Remember in firebase
        schedDisplay: [], //used to display genSchedules to user //Remember in firebase
        schedDex: 0, //used to loop through created schedules //Remember in firebase
        newSchoolName: "",
        newLat: "",
        newLon: "",
        schoolRemove: "",
        signInDisp: "block",
        createSchedDisp: "none",
        viewSchedDisp: "none"
    },

    methods: {
        updateDatabase(fbObject, data){
            db.ref("/" + fbObject).set(data);
        },
        signIn(userName, userPassword){
            var i = 0;
            var signInScreen = document.getElementById("start_page_div");
            var createSchedScreen = document.getElementById("schedCreateContainer");
            
            //Ensure that all data has been filled out
            if(userName == "" || userPassword == ""){
                alert("Please enter all required information");
                //reset information
                this.returnUsername = "";
                this.returnPassword = "";
                return;
            }
            
            //Loop through users array and check if valid username, password combo
            for(i=0; i<this.users.length; i++){
                //un already lowercase in array (added as .toLowerCase() in sign up method)
                var un = this.users[i].username;
                var pw =this.users[i].password;
                //Username in users, check password
                if(un == userName.toLowerCase()){
                    if(pw == userPassword){
                        //set active user to userName to use later components
                        this.activeUser = un;
                        this.userIndex = i;//set the user index to find this user's trips
                        //Show edit schools div when admin is user
                        
                        /*if(this.activeUser == "admin"){
                            var adminCheck = document.getElementById("admin_check");
                            adminCheck.style.display = "block";
                        }*/
                        
                        if(this.activeUser == "admin"){
                            document.getElementById("admin_check").style.display = "block";
                        }
                        if(this.activeUser != "admin"){
                            document.getElementById("admin_check").style.display = "none";
                        }
                        alert("Welcome back " + userName + "!");
                        //Hide the sign in screen and take user to create schedule screen
                        signInScreen.style.display = "none";
                        this.signInDisp = "none";
                        createSchedScreen.style.display = "block";
                        this.createSchedDisp = "block";
                        
                        
                        this.returnUsername = "";
                        this.returnPassword = "";
                        
                        this.updateDatabase("users", this.users);
                        this.updateDatabase("userIndex", this.userIndex);
                        this.updateDatabase("activeUser", this.activeUser);
                        this.updateDatabase("publicTrips", this.publicTrips);
                        this.updateDatabase("pubSchools", this.pubSchools);
                        this.updateDatabase("schoolDat", this.schoolDat);
                        this.updateDatabase("schedDex", this.schedDex);
                        this.updateDatabase("schedDisplay", this.schedDisplay);
                        
                        
                        this.updateDatabase("signInDisp", this.signInDisp);
                        this.updateDatabase("createSchedDisp", this.createSchedDisp);
                        this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
                        
                        
                        return;
                    }
                }
            }
            
            //If username and password wasn't found in users array
            alert("Your username and/or password were not found")
            
            //Reset sign-in info
            this.returnUsername = "";
            this.returnPassword = "";
            return;
        },
        signUp(userName, userPassword, pwConf){
            var i = 0;
            var signInScreen = document.getElementById("start_page_div");
            var createSchedScreen = document.getElementById("schedCreateContainer");
            
            
            //Check if username already in database
            for(i=0; i<this.users.length; i++){
                var un = this.users[i].username;
                if(un == userName.toLowerCase()){
                    alert("Sorry, that username is already taken.  Please select a different username.");
                    this.newUsername = "";
                    this.newPassword = "";
                    this.confirmPassword ="";
                    return;
                }
            }
            
            //Make sure password and password confirmation match
            if(userPassword != pwConf){
                alert("Please make sure your password confirmation matches.");
                this.newPassword = "";
                this.confirmPassword = "";
                return;
            }
            
            //Make sure password is at least length 6
            if(userPassword.length < 6){
                alert("Please make sure your password contains at least 6 charcaters.");
                this.newPassword = "";
                this.confirmPassword = "";
                return;
            }
            
            //If got here, username is available and passwords matches criteria
            //Add to users dataset
            this.users.push({
                username: userName.toLowerCase(),
                password: userPassword,
                trips: [],
                schoolsCor: []
            })
            
            this.userIndex = this.users.length-1;
            
            
            document.getElementById("admin_check").style.display = "none";
            
            //Show desired screens
            signInScreen.style.display = "none";
            this.signInDisp = "none";
            createSchedScreen.style.display = "block";
            this.createSchedDisp = "block";
            
            
            //Set active user to userName to be used in later components
            this.activeUser = userName.toLowerCase();
            this.newUsername = "";
            this.newPassword = "";
            this.confirmPassword = "";
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

        
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
            
            return;
        },
        guestAccess(){
            var signInScreen = document.getElementById("start_page_div");
            var createSchedScreen = document.getElementById("schedCreateContainer");
            this.activeUser = "guest";
            this.userIndex = 1;
            
            //Display the desired screens
            signInScreen.style.display = "none";
            this.signInDisp = "none";
            createSchedScreen.style.display = "block";
            this.createSchedDisp = "block";
            
            document.getElementById("admin_check").style.display = "none";
            
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
            return;
        },  
        
        //Logout function reserts all attributes specific to the user logged in
        logout(){
            //reset all data objects
            this.activeUser = "";
            this.startDate = "";
            this.endDate = "";
            this.startDay = "";
            this.endDay = "";
            this.mySchools = "";
            //this.startZip = "";
            this.pubAccess = 1;
            this.userIndex = 0;
            this.tripL = 0;
            this.schedSchools = [];
            this.schedDex = 0;
            this.genSchedules = "";
            this.schedDisplay = [];
            
            
            //Display sign-in screen but neither of other two
            var signInScreen = document.getElementById("start_page_div");
            var createSchedScreen = document.getElementById("schedCreateContainer");
            var viewSchedScreen = document.getElementById("schedViewContainer");

            signInScreen.style.display = "block";
            this.signInDisp = "block";
            createSchedScreen.style.display = "none";
            this.createSchedDisp = "none";
            viewSchedScreen.style.display = "none";
            this.viewSchedDisp = "none";
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

        
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        /*Turns the start date into an integer (0-6)
        representing day of the week to use in JSON file*/
        //Dont think we need to use this at all anymore
        startDateConvert(sDate){
            //console.log(sDate);
            var sd = new Date(sDate);
            //console.log(sd);
            this.startDay = sd.getDay();
            //console.log(this.startDay);
            return;
        },

        /*Turns the end date into an integer (0-6)
        representing day of the week to use in JSON file*/
        //Dont think we need to use this at all anymore either 
        endDateConvert(eDate){
            var ed = new Date(eDate);
            this.endDay = ed.getDay();
            return;
        },

        /*Adds selected schools to mySchools array
        to be displayed to user*/
        addSchool(school){
            //If no schools in mySchools array yet, start it
            if(this.mySchools.length == 0){
                this.mySchools = [school];
            }
            else{
                //If the school was already selected, don't add it twice
                if(this.mySchools.indexOf(school) == -1){
                    this.mySchools.push(school);
                }
            }
        },
        /*When the "x" buttons next to a displayed school
        is clicked, it removes that school from the array
        of mySchools*/
        remove(school){
            var dex = this.mySchools.indexOf(school);
            this.mySchools.splice(dex, 1);
        },

        /*Function that creates schedules and moves to next component view 
        when clicked: check for valid input from user*/
        createSchedule(schoolsList, start, end){
            //check that dates have been entered
            if(start == "" || end == ""){
                alert("Please enter valid start and end dates")
            }
            var sd = new Date(start);
            var ed = new Date(end);
            var thisUser = {};
            var mySchoolsInfo = [];
            var userDex = -1;
            //Find length of trip to make sure you have enough days for schools selected
            this.tripL = this.tripLength(sd, ed);

            //check that user is logged in
            if(this.activeUser == "guest"){
                alert("Sorry, but only users can create new schedules! Sign up on our home screen to use this function!")
                return;
            }
            
            if(this.activeUser == "admin"){
                alert("Please do not create a trip using Admin account. Log out and sign back in as a regular user.")
                return;
            }

            //Make sure all required fields are filled out with workable information
            if(sd < new Date() || ed < new Date() || ed < sd){
                alert("Please select valid dates for your trip");
                this.startDate = "";
                this.endDate = "";
                return;
            }

            //Make sure at least 1 school is selected to visit
            if(schoolsList.length < 1){
                alert("Please select at least 1 school to visit on your trip");
                return;
            }

            //If more schools selected than days in the trip--- don't calculate schedules
            if(this.tripL+1 < schoolsList.length){
                alert("Sorry! Your trip isn't long enough to visit all those schools!")
                return;
            }
            
            //Re-enable the buttons if they had been disabled by viewing an old schedule
            var prevButton = document.getElementById("prevSched");
            prevButton.disabled =false;
            
            var nxtButton = document.getElementById("nextSched");
            nxtButton.disabled = false;
            
            var newSchButton = document.getElementById("moreSched");
            newSchButton.disabled = false;

            //Find this user's trips in users to add trips to the user object
            for(var i=0; i<this.users.length; i++){
                if(this.users[i].username == this.activeUser){
                    //thisUser with .username .password and .trips fields
                    //Track index of this user in userArray so can insert new info directly
                    thisUser = this.users[i];
                    userDex = i;

                    //This is where valid trips are found
                    //Loop through JSON file to find schools in schoolsList
                    for(var j = 0; j<this.schoolDat.schools.length; j++){
                        //console.log("Searching schoolDat");
                        //If the school was in schoolsList (mySchools) array
                        if(schoolsList.indexOf(this.schoolDat.schools[j].name) != -1){
                            //add this school and its information to my local array
                            mySchoolsInfo.push(this.schoolDat.schools[j]);
                        } 
                    }
                    continue; //don't keep looping through array of users because found the one
                }
            }

            //Here, schedSchools and mySchoolsInfo contains school objects of all your selected schools
            this.schedSchools = mySchoolsInfo;
            this.schedDex = 0;
            //console.log(this.schedSchools);
            
            var createSchedScreen = document.getElementById("schedCreateContainer");
            createSchedScreen.style.display = "none";
            this.createSchedDisp = "none";
            
            var viewSchedScreen = document.getElementById("schedViewContainer");
            viewSchedScreen.style.display = "block";
            this.viewSchedDisp = "block";
            this.userIndex = userDex;

            //Loop through mySchoolsInfo and assign dates and times for all selected schools
            //Add each schedule to thisUser.trips then add thisUser back into this.users at "userDex" index
            var fact = this.factorial(this.tripL+1 - this.schedSchools.length);//Factorial to multiply length by for permutations

            var permutations = 0;
            if(this.schedSchools.length == 1){
                permutations = this.tripL + 1;
            }
            if(this.schedSchools.length > 1){
                permutations = this.factorial((this.tripL+1))/(fact);  
            }
            
            if(permutations > 5){
                permutations = 5;
            }

            //Array of trips length of trip 
            //Add individual tps into allTrips array
            var allTrips = [];
            
            //Loop through each trip (1-5)
            for(q = 0; q<permutations; q++){
                var conflict = true;
                var hit = 0;
                
                //check if this schedule already been made
                while(conflict == true){
                    var tempSched = this.singleSched((this.tripL + 1), this.schedSchools.length);
                    for(var t=0; t<allTrips.length; t++){
                        var oldSched = allTrips[t].toString();
                        var newSched = tempSched.toString();
                        if(oldSched == newSched){
                            hit += 1;
                        }
                    }
                    if(hit == 0){
                        conflict = false;
                    }
                    else{
                        conflict = true;
                        hit = 0;
                    }
                }
                allTrips.push(tempSched);
                conflict = true;
            }
            
            //Store all the trips created in genSchedules data object
            this.genSchedules = allTrips;
            this.schedDisplay = new Array(allTrips.length);
            //this.genSchedules holds diff schools at indices representing day of the trip to visit this school
            //console.log(this.genSchedules);
            
            
            //var daysOfWeek = ["Monday", "Tuesday", "Wednesday",
            //                 "Thursday", "Friday", "Saturday", "Sunday"];
            var firstDate = new Date(start);
            //console.log(start);
            //Make schedDisplay understandable to present to user
            for(var scheds = 0; scheds < this.schedDisplay.length; scheds++){
                var sc = new Array(this.tripL + 1);
                for(var sd = 0; sd < this.tripL + 1; sd++){
                    var activity = this.genSchedules[scheds][sd]
                    //console.log(activity)
                    if(activity != "No Tour"){
                        //console.log(activity);
                        activity = activity[0];
                        //console.log(activity);
                    }
                    //console.log(activity);
                   
                    //var day = daysOfWeek[dex];
                    var date = new Date(start);
                    date.setDate(firstDate.getDate()+sd + 1);
                    //console.log(date.toString());
                    
                    sc[sd] = date + ": " + activity + "\n";
                    //this.schedDisplay[scheds] += date + ": " + activity + "\n";
                }
                this.schedDisplay[scheds] = sc;
            }
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //Add new school to the database if you can't find your school
        newSchool(name,lat,lon){
            var latitude = parseFloat(lat);
            var longitude = parseFloat(lon);
            if(this.activeUser == "guest"){
                alert('Guests cannot add schools. Please sign in or create an account!')
                this.newSchoolName = "";
                this.newLat = "";
                this.newLon = "";
            }else if((Math.abs(latitude) > 90) || (Math.abs(longitude) > 180)){
                alert("Please enter valid school latitude and longitude values!");
                this.newSchoolName = "";
                this.newLat = "";
                this.newLon = "";
            }else{
                this.schoolDat.schools.push({
                    "name": name,
                    "tours":[1,1,1,1,1,1,1],
                    "location": [ latitude, longitude ]
                });
                this.newSchoolName = "";
                this.newLat = "";
                this.newLon = "";
            }
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        editSchool(name){
            for(var i = 0; i < this.schoolDat.schools.length; i++){
              if(this.schoolDat.schools[i].name == name){
                  this.schoolDat.schools.splice(i, 1);
              }
            } 
            this.removeSchool = "";
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //move to viewing previous schedule
        prevSch(sdex){
            if(sdex == 0){
                //console.log("HERE");
                return;
            }
            //console.log(sdex);
            this.schedDex = sdex - 1;
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //move to viewing next schedule
        nextSch(sdex){
            if(sdex == this.schedDisplay.length-1){
                return;
            }
            this.schedDex = sdex + 1;
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //Click this to save the current schedule being viewed to user's trips object
        favorite(currSched){
            if(this.activeUser == "guest"){
                alert("Sorry! Guests can't save trips! Sign-up to do so!");
                return;
            }
            
            //console.log(this.startDate + 1);
            //console.log(currSched);
            //Add user to the saved schedule
            currSched.push(this.activeUser);
            //Add a 0 or 1 for public vs. private
            currSched.push(this.pubAccess);
            
            //User already saved the trip or is looking at an old trip
            if((this.users[this.userIndex].trips.indexOf(currSched) != -1)){
                alert("You already have this trip saved!");
                currSched.pop();
                currSched.pop();
                return;
            }
            
            //console.log(this.mySchools);
            //Add this schedule to this user's trips
            var schoolsArray = new Array(this.mySchools.length);
            for(var i = 0; i < this.mySchools.length; i++){
                schoolsArray[i] = this.mySchools[i];
            }
        
            
            this.users[this.userIndex].trips.push(currSched);
            this.users[this.userIndex].schoolsCor.push(schoolsArray);
            
            //Add all trips to admin's trips
            if(this.activeUser != "admin"){
                this.users[0].trips.push(currSched);
                this.users[0].schoolsCor.push(schoolsArray);
            }

            //If this trip was made public, add it to the public trips array
            if(this.pubAccess == 0){
                //Don't need to include the final element because that tells public or private
                this.publicTrips.push(currSched);//.slice(0,this.tripL+1));
                this.pubSchools.push(schoolsArray);
            }
            //console.log(this.publicTrips);
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
            return;
        },
        
        //Click this to go back to the createSchedule page to select new schools and new dates
        newTrip(){
            var viewSchedScreen = document.getElementById("schedViewContainer");
            viewSchedScreen.style.display = "none";
            this.viewSchedDisp = "none";
            
            var createSchedScreen = document.getElementById("schedCreateContainer");
            createSchedScreen.style.display = "block";
            this.createSchedDisp = "block";
            
            //Show edit schools div when admin is user
            if(this.activeUser == "admin"){
                document.getElementById("admin_check").style.display = "block";
            }
            if(this.activeUser != "admin"){
                document.getElementById("admin_check").style.display = "none";
            }
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //To view an old schedule that you made or that is public and you are a guest
        viewOldSched(dex, oldTrips){
            //console.log(oldTrips);
            //var signInScreen = document.getElementById("start_page_div");
            var createSchedScreen = document.getElementById("schedCreateContainer");
            var viewSchedScreen = document.getElementById("schedViewContainer");

            //signInScreen.style.display = "block";
            createSchedScreen.style.display = "none";
            this.createSchedDisp = "none";
            viewSchedScreen.style.display = "block";
            this.viewSchedDisp = "block";
            
            this.schedDisplay = oldTrips;
            //this.genSchedules = oldTrips;
            this.schedDex = dex;
            
            //disable buttons allowing users to view other permutations of schedules
            //var prevButton = document.getElementById("prevSched");
            //prevButton.disabled =true;
            
            //var nxtButton = document.getElementById("nextSched");
            //nxtButton.disabled = true;
            
            var newSchButton = document.getElementById("moreSched");
            newSchButton.disabled = true;
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //remove a previously saved trip from user's trips
        removeSaved(tDex, uDex){
            //console.log(uDex);
            //console.log(tDex);
            this.users[uDex].trips.splice(tDex,1);
            this.users[uDex].schoolsCor.splice(tDex,1);
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },
        
        //To view public trips
        viewPubTrip(dex, pubTrips){
            var createSchedScreen = document.getElementById("schedCreateContainer");
            var viewSchedScreen = document.getElementById("schedViewContainer");

            //signInScreen.style.display = "block";
            createSchedScreen.style.display = "none";
            this.createSchedDisp = "none";
            viewSchedScreen.style.display = "block";
            this.viewSchedDisp ="block";
            
            this.schedDisplay = pubTrips;
            this.schedDex = dex;
            
            //Update firebase
            this.updateDatabase("users", this.users);
            this.updateDatabase("userIndex", this.userIndex);
            this.updateDatabase("activeUser", this.activeUser);
            this.updateDatabase("publicTrips", this.publicTrips);
            this.updateDatabase("pubSchools", this.pubSchools);
            this.updateDatabase("schoolDat", this.schoolDat);
            this.updateDatabase("schedDex", this.schedDex);
            this.updateDatabase("schedDisplay", this.schedDisplay);

            
            this.updateDatabase("signInDisp", this.signInDisp);
            this.updateDatabase("createSchedDisp", this.createSchedDisp);
            this.updateDatabase("viewSchedDisp", this.viewSchedDisp);
            
        },

        //Helper function called in "createSchedule" method to 
        //Check if the schedule generated has already been listed
        singleSched(tripLength, numSchools){
            var taken = [];
            var sched = new Array(tripLength);
            //Intialize schedule to "no tours" replaced later
            for(var i =0; i<sched.length; i++){
                    sched[i] = "No Tour";
                }
            
            //Generate indices for schools to be placed into schedule
            for(var s = 0; s<numSchools; s++){
                var d = this.randNum(tripLength);
                while(taken.indexOf(d) != -1){
                    d = this.randNum(tripLength);
                }
                taken.push(d);
                //sched[d] = this.schedSchools[s];
                //console.log(this.schedSchools[s]);
                sched[d] = [this.schedSchools[s].name, this.schedSchools[s].location[0], this.schedSchools[s].location[1]];
            }
            return sched;
        },
        
        //Helper function to generate random numbers to assign schools to days of trip
        randNum(upper){
            return Math.floor(Math.random() * Math.floor(upper));
        },
        
        //Helper function to find number of days between dates selected
        //from https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
        tripLength(date1, date2){
            //1 day in milliseconds
            var day = 1000*60*60*24
            //Convert date1 and date2 to milliseconds too
            var date1_convert = date1.getTime();
            var date2_convert = date2.getTime();
            var diff = date2_convert - date1_convert;
            return Math.round(diff/day);
        },

        //Helper function to calculate number of permutations of schedules to make 
        factorial(number){
            var res = number;
            if(number == 0 || number == 1){
                return 1;
            }
            while(number > 1){
                number = number -1;
                res = res*number;
            }
            return res;
        }
    }  
});

// mount
app.$mount('#finalapp');
