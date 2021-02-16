const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const helmet = require("helmet");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const companyRouter = require("./routes/company");
const staffRouter = require("./routes/staff");
const shopRouter = require("./routes/shop");
const rateLimit = require("express-rate-limit");
const config = require("./config/index");
const cors = require('cors')

const app = express();

app.use(cors())

app.set('trust proxy',1)
const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
});

app.use(limiter);

app.use(helmet());

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/company", companyRouter);
app.use("/staff", staffRouter);
app.use("/shop", shopRouter);

app.use(errorHandler);

module.exports = app;
