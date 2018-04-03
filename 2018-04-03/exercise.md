# Exercise

We're going to be creating a basic SPA based on a mock api located at this url: `jsonplaceholder.typicode.com`

Here is the summary of the app from that lesson.

1. Login page - Display a login form asking user for a username.
    - On Submit, look up the username entered by the user.
    - If no user is found, display a detailed error message.
    - If the user is found, store user object and render User's homepage
2. User's homepage displays:
    - User's name
    - User's post titles
    - User's albums
3. Post View - Clicking on a post renders a post view, including:
    - Post title
    - Post text
    - A list of comments on the post
    - A back link to the user homepage
4. Album View - Clicking on an album renders the album page, including:
    - Thumbnails of all the photos and the photo's title
    - A search box that filters the photos by title as the user types
    - A back link to the user homepage

## Homework 5/23

Create the following components

- Search - a component that has an text box and a button, the text box should be controlled but the button does not need to do anything yet

- <Albums/> and <Posts/> have already been created

- <Username/> should have an id prop and should retrieve and display the users name

- <Homepage/> should have an id prop and should display the Username, Albums, and Posts components for that id

- <Post/> should have an id prop and should display that post, see point 3 above

- <Album/> should have an id prop and should display the album, see point 4 above. *Search is extra credit though it isn't very difficult, think about searching as filtering*