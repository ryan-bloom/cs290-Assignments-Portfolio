<style lang="scss">

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

</style>

<template>

<div id="app">
    <div id="start_page">
        <!--Title of the main homepage-->
        <h1 id="title">{{mainTitle}}</h1><br>
        <!--Set up dropdown menu of quiz types for user to select-->
        <select class="quiz_selector" v-model="quizChoice">
            <option disabled value="">Select Your Quiz</option>
            <option value="math">Math Quiz!</option>
            <option value="duke">Duke Quiz!</option>
            <option value="geography">Geography Quiz!</option>
        </select>
        
        <!--Start button activates the startQuiz() function below to launch the selected quiz-->
        <button class="start" @click="startQuiz(quizChoice)">Start Quiz!</button>
    </div>
    <!--The data below is passed to props in the quiz_component.vue file
        Data is initialized based on which quiz is selected by user-->
    <quizComp
              :qTitle= "quizTitle"
              :qDescription= "quizDescription"
              :qQuestions= "quizQuestions"></quizComp>
</div>

</template>

<script>
    //Import quiz component to be called in html
    import quizComp from './components/quiz_component.vue';
    //Import the quizes from json
    import mathQuiz from './assets/math.json';
    import dukeQuiz from './assets/duke.json';
    import geoQuiz from './assets/geo.json';

export default {
    name: 'app',
    data() {
        return {
            //Title of main page
            mainTitle: 'Pick Your Quiz!',
            //Selected by user before starting the quiz
            quizChoice: "",
            seen: true,
            
            //These will be passed to the component based on which quiz user selects
            quizTitle: "",
            quizDescription: "",
            quizQuestions: [],
            
            //Each quiz json file is located here (used in the startQuiz() function)
            mquiz : mathQuiz,
            dquiz : dukeQuiz,
            gquiz : geoQuiz
        }
    },
    //1 quiz component varies depending on which json file is passed to it (quiz data differs)
    components:{
        quizComp
    },
    methods:{
        //After user selects one of the 3 quiz types and clicks the start button, this function runs 
        //Determins which json file to pass to the data above and therefore into the component in <template>
        startQuiz(quiz){
            //Initialize variables to be used later in the function 
            //(bodyColor used to customize quiz)
            //(startScreen used to hide start screen)
            var bodyColor = document.getElementById("app");
            var startScreen = document.getElementById("start_page");
            
            //If user clicks start without selecting a topic, tell them to select a topic
            if(this.quizChoice == ""){
                alert("Please select a quiz topic!")
                return;
            }
            
            //Set the data above to be data from math.json if math was selected
            else if(this.quizChoice == "math"){
                this.quizTitle = this.mquiz.title;
                this.quizDescription = this.mquiz.Description;
                this.quizQuestions = this.mquiz.questions;
                bodyColor.style.backgroundColor = "lightblue";
                this.quizChoice = "";
            }
            
            //set the data above to be data from duke.json if duke was selected
            else if(this.quizChoice == "duke"){
                this.quizTitle = this.dquiz.title;
                this.quizDescription = this.dquiz.Description;
                this.quizQuestions = this.dquiz.questions;
                bodyColor.style.backgroundColor = "beige";
                this.quizChoice = "";
            }
            
            //set the dat above to be data from geo.json if geography was selected
            else if(this.quizChoice == "geography"){
                this.quizTitle = this.gquiz.title;
                this.quizDescription = this.gquiz.Description;
                this.quizQuestions = this.gquiz.questions;
                bodyColor.style.backgroundColor = "pink";
                this.quizChoice = "";
            }
            //Once quiz is selected, don't show the start button or selection process
            startScreen.style.display = "none";
        }
    }
}

</script>
