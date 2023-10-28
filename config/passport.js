const GoogelStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogelStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            done(null, user);
          } else {
            const newUser = {
              username: profile.name.givenName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              googleId: profile.id,
            };
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            done(null, user);
          } else {
            const newUser = {
              username: profile.name.givenName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              facebookId: profile.id,
            };
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            done(null, user);
          } else {
            const newUser = {
              username: profile.name.givenName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              twitterId: profile.id,
            };
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
};
