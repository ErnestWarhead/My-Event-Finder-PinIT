https://github.com/ErnestWarhead/My-Event-Finder-PinIT-/blob/main/Live%20demo%20recording.mp4  
You may have to download the demo video to see it, it's only 21 MB

Live website: https://my-event-finder-pinit-969b1d2cba03.herokuapp.com/

PinIT

Project Description

PinIT is a dynamic web application designed to help users discover and manage events in their area. Leveraging a comprehensive tech stack, PinIT offers a seamless user experience from account creation to event management, featuring advanced API integrations and robust backend support.

Features

User Authentication and Management

	•	Account Creation: Users can create accounts with secure password storage using bcrypt.
	•	JWT Authentication: Secure user authentication implemented with JSON Web Tokens (JWT).
	•	User Data Storage: User information, including location, stored in a SQLite database via SQLAlchemy.

Event Discovery

	•	Event API Integration: Events fetched from the Ticketmaster API based on user location.
	•	Location Input: Address input using Google’s autocomplete API, storing location data for personalized event retrieval.
	•	Location Update: Users can update their location to discover events in new areas.

Enhanced User Experience

	•	Password Recovery: Password reset functionality via email, providing a secure link for users to reset their passwords.
	•	Favorites Management: Users can save favorite events and locations, view them on a dedicated favorites page, and remove them as needed.
	•	Google Calendar Integration: Add events to Google Calendar with pre-filled information through a convenient link generator behind a stylish button.
	•	Logout Function: Securely log out of the application to ensure user data protection.

User Interface

	•	Responsive Design: The interface, inspired by Tinder’s swappable cards, is optimized for desktop use, providing an engaging and interactive experience.
	•	Animations: Implemented with Framer Motion for smooth and visually appealing transitions and interactions.
	•	Modern Aesthetics: Clean and intuitive design ensuring ease of use and visual appeal.

Technologies Used

Frontend

	•	Javascript: Core scripting language for dynamic content.
	•	React.js: Frontend framework for building a dynamic and responsive user interface.
	•	Flux: Architectural pattern for efficient state management.
	•	HTML/CSS: Markup and styling for the application’s structure and design.
	•	Bootstrap: Ensuring responsive design.
	•	Framer Motion: Library for enhancing UI with animations.

Backend

	•	Flask: Lightweight WSGI web application framework for building the backend server.
	•	SQLAlchemy: ORM for managing SQLite database operations.
	•	SQLite: Database for storing user data securely.
	•	JWT: Token-based authentication for secure user sessions.
	•	bcrypt: Secure password hashing.

APIs

	•	Ticketmaster API: Fetches event data based on user location.
	•	Google Autocomplete API: Simplifies user address input and stores location data.
	•	Google Calendar API: Allows users to add events directly to their Google Calendar.
 	•	SendGrig API: Allows users to reset their password seamlessly through and email using a JWT generated token.

In order to run this app, you need to run:  
pipenv shell  
pipenv run migrate  
pipenv run upgrade  
pipenv run start  

in a new terminal:  
npm run start

make both 3000 and 3001 ports public

populate the .env file with the following variables:

    # Back-End Variables
    DATABASE_URL=postgres://gitpod:postgres@localhost:5432/example
    FLASK_APP_KEY=any key works
    FLASK_APP=src/app.py
    FLASK_DEBUG=1
    DEBUG=TRUE
    SQLALCHEMY_DATABASE_URI=sqlite:///site.db
    SECRET_KEY=
    # your key for the JWT authentication
    TICKETMASTER_API=
    # you'll need one
    SENDGRID_API_KEY=
    # you'll need one
    FROM_EMAIL=
    # your SendGrid verified email
    FRONTEND_URL=
    # the default url for your front end (port 3000) without the tailing "/"
    
    # Front-End Variables
    BASENAME=/
    BACKEND_URL=
    # the default url for your back end (port 3001) without the tailing "/"
    REACT_APP_GOOGLE_API=
    # you'll need a google api key
