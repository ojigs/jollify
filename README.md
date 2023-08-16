# Jollify

Jollify is a web application that allows users to listen to, upload, and share music online. Users can create playlists, follow other users, like and comment on songs, etc.

## Installation

To install and run Jollify on your local machine, you need to have Node.js, MongoDB, and npm installed. You also need to have a Cloudinary account and API key to handle file uploads.

Follow these steps to install and run Jollify:

- Clone the repository: `git clone https://github.com/ojigs/jollify.git`
- Install the dependencies: `npm install`
- Create a .env file in the root directory and add the following variables:
    - PORT: The port number for the server (e.g. 3000)
    - MONGO_URI: The connection string for MongoDB (e.g. mongodb://localhost:27017/jollify)
    - CLOUDINARY_NAME: The name of your Cloudinary account
    - CLOUDINARY_KEY: The API key of your Cloudinary account
    - CLOUDINARY_SECRET: The API secret of your Cloudinary account
- Start the server: `npm start`
- Open the app in your browser: `http://localhost:PORT`

## Usage

To use Jollify, you need to create an account or log in with your existing credentials. Once you are logged in, you can access the following features:

- Home: You can see the latest songs uploaded by other users, as well as your own songs. You can also search for songs by title, artist, or genre.
- Upload: You can upload your own songs from your device or from Cloudinary. You can also add metadata such as title, artist, genre, album art, etc.
- Playlists: You can create and manage your own playlists of songs. You can also view and edit the playlists of other users that you follow.
- Profile: You can view and edit your profile information, such as username, email, bio, avatar, etc. You can also see your followers and following list.
- Settings: You can change your password, delete your account, or log out from the app.

## License

Jollify is licensed under the ISC License. See [LICENSE] file for more details.
