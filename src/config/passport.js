const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config');
const userRepository = require('../repositories/userRepository');
const { validatePassword } = require('../utils/helpers');

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
  algorithms: ['HS256'],
  issuer: config.JWT_ISSUER,
  audience: config.JWT_AUDIENCE,
  passReqToCallback: true
};

passport.use(
  new JwtStrategy(jwtOptions, async (req, payload, done) => {
    try {
      const authToken = req.headers.authorization?.slice(7);
      const user = await userRepository.findOne({ _id: payload.userId });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Local Strategy (for login with email/password)
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await userRepository.findOne(
          { email },
          { select: '+password' }
        );

        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const isValidPassword = await validatePassword(password, user.password);

        if (isValidPassword) {
          return done(null, user);
        }

        return done(null, false, { message: 'Invalid credentials' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Optional: additional strategy for admin
passport.use(
  'jwt-admin',
  new JwtStrategy(jwtOptions, async (req, payload, done) => {
    try {
      const authToken = req.headers.authorization?.slice(7);
      const { userId } = payload;

      const user = await userRepository.findOne({
        _id: userId,
        role: 'ADMIN_ROLE'
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'No permission' });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
