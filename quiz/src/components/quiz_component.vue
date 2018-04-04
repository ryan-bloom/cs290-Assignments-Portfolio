<template>
    <div class="quiz_div">
        <!--Title and description of the selected quiz from props below-->
        <h1 id="quizType">{{ qTitle }}</h1>
        <h3 class="quizDec">{{ qDescription }}</h3>
        
        <!--Div where the quiz questions and choices will be displayed-->
        <div class="quiz_question_div">
            <div class="quest">{{qQuestions[qdex].question}}</div>
            <!--Loop through the choices for this question and create radio buttons to be selected-->
            <div class="choices" v-for="choice in qQuestions[qdex].choices">
                <input type="radio" id= "radioChoices" name="option" value=choice @click="ans(choice)"> {{choice}} <br>
            </div>
            
            <!--Three buttons below the question/choices, previous, next, submit (not always clickable)-->
            <button id="previousQuestion" @click="prevQ(qQuestions[qdex].correctAnswer, userAns, qdex)" disabled>Prev</button>
            <button id="nextQuestion" @click="nextQ(qQuestions[qdex].correctAnswer, userAns, qdex)">Next</button>
            <button id="submit" @click="submit(qQuestions[qdex].correctAnswer, userAns)" disabled>Submit</button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                //index of current question to be displayed
                qdex: 0,
                //userAns tracks users' answers
                userAns: -1,
                //Array of all skipped or incorrect questions 
                ret: [],
                //Keep track of total correct
                totalCorrect: 0,
                //Temporary index utilized in previous function
                tempPrevDex: -1,
                totalQs: 5
            }
        },
        //Props passed from App.vue (based on json file selected and used in template above)
        props: ['qTitle', 'qDescription', 'qQuestions'],
        methods:{
            //Upon clicking a radio button option, set userAns to the selected choice
            //Needed to check if selected answer is correct
            ans(selected){
                this.userAns = this.qQuestions[this.qdex].choices.indexOf(selected);
            },
            //When the next button is clicked:
            nextQ(correctDex, ansDex, currQDex){
                //array of radio button options set all to unchecked for next question
                var opt = document.getElementsByName("option");
                var i = 0
                for(i; i<opt.length; i++){
                    opt[i].checked = false;
                }
                
                //If ret[] array has questions in it (wrong/skipped), enable previous button
                if(this.ret.length != 0){
                    document.getElementById("previousQuestion").disabled =false;
                }
                
                //If this question is unanswered or wrong and not already in ret[], add it 
                if(ansDex == -1 || ansDex != correctDex){
                    if(this.ret.indexOf(currQDex) < 0){
                        this.ret.push(currQDex);
                    }
                    //Now there is an incorrect/unanswered question, enable previous button
                    document.getElementById("previousQuestion").disabled = false;
                }
                
                //If this question is answered correctly, increment counter
                else if(ansDex == correctDex){
                    this.totalCorrect += 1;
                    //If this question was in ret array (had been previously missed) remove it from ret[]
                    if(this.ret.indexOf(currQDex) != -1){
                        this.ret.splice(this.ret.indexOf(currQDex),1)
                        //If no more questions in ret[]--- disable previous button
                        if(this.ret.length == 0){
                            document.getElementById("previousQuestion").disabled = true;
                        }
                    }
                }
                
                //If the next question is the last question, disable "next" and enable "submit" buttons
                if(currQDex+1 > 3){
                    document.getElementById("nextQuestion").disabled = true;
                    document.getElementById("submit").disabled = false;
                }
                
                //If the current question wasn't accessed via "prev" button, update qdex normally (+1)
                if(this.tempPrevDex == -1){
                    this.qdex = currQDex + 1;
                }
                
                //If This question was jumped to from a question further ahead, set qdex to the further ahead question
                else if(this.tempPrevDex != -1){
                    //If the question it jumped from is the last question (jumping back to last question)
                    if(this.tempPrevDex > 3){
                        document.getElementById("nextQuestion").disabled = true;
                        document.getElementById("submit").disabled = false;
                    }
                    this.qdex = this.tempPrevDex;
                    //Reset tempPrevDex to -1 because now back in normal order
                    this.tempPrevDex = -1;
                }
                //reset userAns to -1 so can check correctness of next questions
                this.userAns = -1;
            },
            prevQ(correctDex, ansDex, currQDex){
                //If previous was just selcted, you will always be able to click next
                document.getElementById("nextQuestion").disabled = false;
                //Only do something if there is a question in ret[] array
                if(this.ret.length != 0){
                    //temporary variable to get the previous wrong question to jump to
                    var prevW = this.ret[this.ret.length-1]
                    if(this.tempPrevDex == -1){
                        this.tempPrevDex = currQDex;
                    }
                    //Set current question index to the previously missed one
                    this.qdex = prevW;
                    this.userAns = -1;
                    //Dont allow people to go previous twice in a row - Must click next to submit before jumping back again
                    document.getElementById("previousQuestion").disabled = true;
                }
            },
            
            //Upon clicking submit button (when on the last question)
            submit(correctDex, ansDex){
                var msg = "";
                //based on number of questions user got correct, customize the message displayed
                if(ansDex == correctDex){
                    this.totalCorrect += 1;
                }
                if(this.totalCorrect == 0){
                    msg = "Realy!?!?!? You got 0 out of 5 questions right! C'mon, you're better than that!";
                }
                if(this.totalCorrect == 1){
                    msg = "Lame! You only got 1 out of 5 questions right!";
                }
                if(this.totalCorrect == 2){
                    msg = "2 out of 5 right, you can do better than that!";
                }
                if(this.totalCorrect == 3){
                    msg = "You got 3 of 5 questions right...I guess thats decent.";
                }
                if(this.totalCorrect == 4){
                    msg = "Ooooooo nice! You got 4 out of 5 questions right! So close to perfect!";
                }
                if(this.totalCorrect > 4){
                    msg = "That's what we're talking about!!!!! CONGRATS! You got all 5 questions right!";
                }
                
                //Allow user to return back to main page and select new quiz to start
                if(!alert(msg)){
                    window.location.reload();
                }
            }
        }
    }
</script>

