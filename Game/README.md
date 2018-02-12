#Ryan Bloom Readme for Javascript Game

For my game, I created a soccer scene in which the user must move his/her charcater left and right in order to not
allow the soccer ball to hit the ground.  I first created the canvas and upladed the background image (which was 
found from a google search) of a soccer field.  Then, I initialized many variables that would be used throughout 
my javascript, including player size (the size of the character on the screen), ball size (the size of the soccer ball),
position of the player and ball to start, gravity variable to act on the ball in order to simulate gravity, and the speed
of the player as well.  Then, I worked on four main javascript functions, drawBall(), drawPlayer(), drawProgress(), 
and draw().  The drawBall() function checks to make sure that an image was loaded into the ball_img variable, and then 
proceeds to create the image of the soccer ball.  The same is done in the drawPlayer() function with respect to the
user's character.  The drawProgress() function works to show the user how many more juggles he/she must successfully 
make in order to win the level that he/she selected to play.

Finally, most of the work went into my draw() function, which calls drawBall(), drawPlayer(), and drawProgress().  In
my draw() function, I work to make sure that the ball does not bounce out of the screen, by checking when it's coordinates,
x and y, reach the edges of the canvas.  Additionally, I check to make sure that the ball does not drop below the head
level of the player in this draw() function.  I also simulate gravity within the draw() function, by altering my "dy" 
variable, which represents the ball's velocity in the y direction, by the gravity and grav_speed variables.

Finally, after getting my character and the ball to bounce around the screen as desired, I worked to add a "start" button,
and made my program wait until the start button was clicked before beginning the gameplay.  I used the "onclick" attribute for 
the html button in order to do this.  Furthermore, I added three "cheat buttons" that will help you complete levels more easily.  
Each button changes a characteristic of the character on the screen.  One button makes him wider, so that he takes up more space 
and is able to head the falling ball more easily.  The second button makes the character shorter, giving him more time to get under 
the falling ball.  And the third button makes him move faster, enabling him to cover more ground within the canvas.  Additionally, 
I added a level selection drop down menu to change the number of headers required in a row to win the game  Finally, I added 
an advertisement and directions on how to play and how to win.

I spent about 8 hours working on this assignment before completing my finalized game.  I did learn a lot about how to work with 
javascript through this assignment.  I did not know much at all about javascript prior to starting this assignment, and therefore had 
to research and reference many helpful texts and websites, including the provided "pong.html" and "pong.js" example files, stackoverflow, 
w3school.com, and developer.mozilla.org.  I found this assignment to be very useful in learning how to use and deal with the struggles of javascript.