https://github.com/ErnestWarhead/My-Event-Finder-PinIT-/blob/main/Live%20demo%20recording.mp4  
You may have to download the demo video to see it, it's only 21 MB

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
