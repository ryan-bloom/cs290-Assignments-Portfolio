# Explore project -Ryan Bloom Pixi

	For the explore project, I learned how to work with the pixi javascript library.  Pixi is often used to help people create games, and for this project, I created a driving game, where the user uses the left and rigth arrowkeys to move a car across a road to avoid oncoming roadblocks.  

	I have never used nor heard of pixi before and followed several tutorials online, the main one being from the link provided on the project page, http://www.pixijs.com/tutorials, which led me to the kittykatattack tutorial at https://github.com/kittykatattack/learningPixi#application.  I used code from this site to write the keyboard function that detects when the left and right arrows are being clicked by a user.  I also used this tutorial for references for loading images and creating stages and sprites for my application.   


	After installing sprite and setting up my html document and my stage (container that ultimately held the game), I began working with the images that I wanted to include in my game.  

	I load and convert all of my images from png to textures, the image format that works with Pixi (WebGL-ready images) at the start of my javascript after declaring various functions that help with aliasing (var Application and var app).  Var app creates the stage in which the game is played, which is then rendered using pixi's "renderer" function and appending the stage to the body of my application.  I then initialized all of the global variables that I used outside of any specific function.  

	The start button works to load the impages, which, in turn, calls the setup() function which creates the initail state of the game and runs the animation.  This enables the user to start the game upon clicking start instead of having the game start imediately upon loading the screen.  


### Setup Function ###
	In pixi, the setup function is needed to load and create all sprites that are going to be used.  In my application, this function creates all of the images that appear in the gameScene container (which is initialized earlier) and the text that is displayed in the gameOverScene container (initialized earlier as well).  I initialize an array of white dashes that will continuously scroll down the screen (in roadlines[]) to give the illusion of a car moving along the road.  I also add road blocks (blocks) to blocks_array, which are sent down the screen towards the car, giving the illusion that the car is driving towards them.  Each road block is given a random size and location on the screen (with the help of my randomInt function).  I also create an extra life icon and I initialize one car and place it at the bottom of the screen and implement.  The extra life icon periodically moves across the screen and adds a life if the user can make his car collide with the heart.  

	Finally, I used code provided by the kittykatattack tutorial to make my car move with the pressing of left and right arrow keys.  The final step after creating all of the sprites (lines, blocks, car, heart) was to add each sprite to the gameScene stage, which is displayed while playing the game.  I used "gameScene.addChild(sprite)" code to do this.  

	At the end of the setup() function, I used the line "app.ticker.add(delta => gameLoop(delta))" to call my gameLoop function.  This function is what makes all of the sprites that I just created move across the screen and appear to be animated as opposed to just still pictures.  Furthermore, my gameLoop function calls the helper function "state," which is set equal to play in setup.  Therefore, most of the magic happens in my play() function.  


### Play Function ###
	After the user clicks the start button, the images are loaded, which leads to the setup() function being called, which in turn leads to the gameLoop() function being run, which finally sets the play() function in motion.  This is where the sprites become animated.  This function gets called 60 times every second and repositions the sprites as desired, making them appear to move along the screen.  

	I first loop through my array of blocks, moving each one down the screen towards the car.  Once a block moves past the bottom of the screen, it's size and x position are reset, and it's y position is moved back up somewhere above the visible screen, giving the illusion of an infinite loop of new road blocks moving towards the car.  Furthermore, if a road block reaches the bottom of the screen, that means it did not collide with the car, and therefore I increment the score of the user, displaying the new score in the top right of the gameScene stage by editing the text of the "scDisplay" variable.
	
	Through each iteration through the blocks, I check to see if a collision has occured between the block and the car.  I use my collision(sprite1, sprite2) helper function to do so.  This function checks to see if sprite1's (block's) y position is at or below that of sprite 2 (the car), and if it is, it checks to see if there is any overlap in x positions.  If there is overlap, collision() returns true.  Otherwise, it returns false.  Therefore, in my play() function, if collision(block, car) returns true, it means that the user did not avoid the road block.  When this occurs, the user loses a life, which is displayed in the upper righthand side of the stage along with score, and the block is resized and positioned again, and sent above the visible screen to be sent back towards the car.  

	The speed of the blocks moving down the screen increases as the user's score increases, making the game harder for the user.  Additionally, the white dashes that I created in the setup() function move down the screen and loop back to the top upon leaving the bottom of the screen with the same speed as the blocks, giving the illusion of a car driving along a road.  

	Finally, I made the "heart" sprite (extra life) move down the screen periodically as well.  If a user's car collides with this sprite, the user gains an extra life and the sprite is sent back up above the visible screen with a new x location and comes back down once again.  

	Additionally, I move the car left and right by adding car.vx (velocity) based on the pressing of the left and right keys, which is set in the setup function above.  If the car goes past the edges of the screen, I made it so that it would appear on the opposite side, allowing the user to loop through the edges to avoid road blocks.  

	The final step to this game was to make the gameOverScene visible once the user has lost all of his/her lives, and make the gameScene invisible.  To do this, every time a user collides with a block, I check to see if lives are > 0.  Once lives drops below zero, I set the gameScene.visible value to equal false (a funciton of PIXI), and the gameOverScene.visible value (which was initialized to equal false) equal to true.  Now, the stage appears black and tells the user that he/she has lost, and reports their score (number of road blocks avoided) to the user.  Furthermore, once the user loses all of his/her lives, the "reload" button that I created in the html of this file is made visible, and upon clicking that, the page reloads, allowing the user to click play once again and restart the game.  


### Summary ###
	This project took me about 6-7 hours to complete.  It was difficult to start learning about pixi, but it's image loading and stage/container creations definitely make for easier game creations than pure javascript.  I consulted the kittykatattack tuorial a lot at the start of creation of my application, which is why all of my code, including the <script> is located within the html file alone.  This tutorial was extremely helpful in understanding how pixi works with containers and stages as well as image loading and displaying.  The sprites that I used were free png images taken from google, as cited at the bottom of my webpage.  







 