const schedule = require('node-schedule');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Departure = require('../../models/departure');
const factory = require('../handlerFactory');
const sendEmail = require('../../utils/email');

exports.newDeparture = catchAsync(async (req, res, next) => {
  const dept = await Departure.create({
    room: req.body.room,
    nod: req.body.nod,
    reason: req.body.reason,
    place: req.body.place,
    user: req.user._id,
    hostel: req.user.hostel,
  });

  // schedule the job
  const today = new Date();
  const retDate = new Date(today);
  retDate.setDate(retDate.getDate() + req.body.nod);

  const URL = `${req.protocol}://${req.delete('host')}/hms/users/departure/${
    dept._id
  }`;

  const message = `Your departure was suppose to end today i.e. ${req.body.nod} days. Either extend your stay or if have completed your departure then use this link to mark your entry ${URL}`;

  schedule.scheduleJob(retDate, function () {
    try {
      sendEmail({
        email: req.user.email,
        subject: 'Departure complete notice',
        message,
      });
    } catch (err) {
      // console.log(err);
      return next(
        new AppError(
          'There was an error sending an email, try sending later',
          500
        )
      );
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: dept,
    },
  });
});

exports.getMyDeparture = catchAsync(async (req, res, next) => {
  const myDepts = await Departure.findOne({ user: req.user._id });

  if (!myDepts) {
    return next(new AppError('No departures found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: myDepts,
    },
  });
});

exports.deleteMyDepartures = factory.deleteOne(Departure);

exports.updateMyDepartures = factory.updateOne(Departure);

exports.getAdminDepartures = catchAsync(async (req, res, next) => {
  const dept = await Departure.find({
    hostel: req.user.hostel,
  });

  if (!dept) {
    return next(new AppError('No departures found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: dept,
    },
  });
});
