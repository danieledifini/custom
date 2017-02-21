HOW TO START

Clone this repository into your themes folder

npm install

bower install

change the proxy into gulpfile.js with your website url (line 37)

gulp
 
********************************
 
 
SCSS

custom.scss into "includes/scss" is main file importing all the other (Bootstrap, normalize and start with some reset rules). Utilities.scss is for the mixins and utilities, and variables.scss is for ... variables.
These files will become custom.min.css inside "includes/css" folder, loaded by WP.
 
********************************
 
JS
 
Your main js is custom.js inside "js" folder. This will become custom.min.js inside "includes/css" folder, loaded by WP.
 
********************************
 
VENDOR
 
Download all the plugins or everything extra you need with bower and save. Gulpfile will check for all the main css or js file and will bundle them together as vendor.min.css inside "includes/css" folder, or vendor.min.js inside "includes/js" folder, loaded by WP.
 
********************************
 
IMAGE COMPRESSION
 
Gulpfile also will try to compress all the image files inside "images" folder and resave them inside "include/img" folder.


Browsersync will reload the page at every changes made to scss js and php files.


This is just my starting theme, everything could surely make in a better way so feel free to suggest.


Style.css won't be loaded and used. It's there cause I'm lazy.
