# NeedyMap

## Description

NeedyMap is a single-page application built with React.js, that I developed in 6 days as a final project for Spiced Academy, Stuttgart 
(12-week full-stack web development bootcamp). A donation-sharing platform where you can specify the products you want to donate or need on Google map according to your location and connect with the the people who need or who donate.

## Stack

* React.js including Hooks and Redux.
* Axios for performing HTTP requests.
* Google Map API ( Maps Javascript API, Places API, Geocode API) to display map, current location and to search places.
* AWS S3 for storing images.
* AWS SES for sending mails.
* Socket.IO for realtime messaging.
* PostgreSQL for storing user's data.
* Node.js and Express.
* Multer and FormData for file upload.
* Cookie Session and csurf against CSRF attacks.
* CSS

## Feautures

*  The people who need and donators can register, delete their account, click on the need and donation pins from the map and look at the product-info box.
* They can click the location button to look at the pins according to their current location, type their addresses in the search box to find the pins.
* New donations and needs can be entered by filling out the forms.
* Through these pins, they can contact the people, whom they want to donate, in the private chat room and send pictures.
* New message notification comes to the other user every time it enters the application and by clicking the message box directs to chat room.
* When the donation is complete the pin can be removed from the map.
