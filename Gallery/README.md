#Ryan Bloom ReadMe for Image Gallary Assignment:

For this assignment, I started by creating a json file with all of my images.  Each image was kept in 
the list of pictures and had three elements, "name" "type" and "imgPath".  The name of the images are
unique for each image and are later used as the captions for the image modals.  The types of images vary 
between water, mountain, and canyon, which helped me distinguish between the three categories of images that 
I used on my site.  

After creating my json file, I wrote a simple html file that outlined my webpage.  I created 8 div containers 
in my html file, each of which had minimal content.  The "title" div box simply had the site title, the "slideshow" 
div box simply had two buttons to be clicked by the user, while the "checkboxes" div box had checkboxes that could 
display and hide the various images (water, mountain, or canyon).  Then, I created three div boxes for my images,
one div box per image category.  In the html file, no images are located in any of these div boxes, instead, they are 
loaded in through my javascript file.  Finally, I have a modal div box and a footer div box, in which I attribute 
all of my images.  

Then, in my javascript file, I read my json file and loop through each picture element (with name, type, and imgPath 
elements).  I check to see which "type" of image the image in question is, and add it to the correct image div box.  
At the same time, I selected 1 image from each type to be added to my slideshow at the top of the page.  After all of 
the images had been loaded, I added functions that made the checkboxes interactive so that if the water checkbox is 
unchecked, then the water images (the entire water image div box) disappear from the screen, and reappear when the 
checkbox is rechecked.  I did the same thing for the mountain and canyon checkboxes and div boxes as well.

Then, I used the three images that I previousl selected for the slideshow and followed the instructions found on the 
w3school slideshow tutorial in order to create a slide show that the user can interact with at the top of my page.  After 
getting the slide show to work, I added functions that worked "onClick" so that clicking on one of the images ensured 
that the checkbox for that image was checked, and unchecked the checkboxes for the other two image categories.  By doing 
this, I allowed the user to view one category of images simply by clicking on that image's slide.  

Finally, I followed the w3school modal image tuotrial in order to make each image on the page interactive.  I created 
a modal for each image inside the "$.each()" loop where I load the images in.  This modal allows the user to click on 
the image to enlarge it and dispaly it with a caption.  Although there is only 1 modal div box in the html file, I 
create one for each image as I loop through the json file in order to ensure that all images are interractive.  This 
assignment took me about 6 hours to complete and helped me become far more comfortable with jquery and json files.  

