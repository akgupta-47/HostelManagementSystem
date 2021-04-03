const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Complaint = require('../../models/complaint');
const factory = require('../handlerFactory');

exports.newComplaint = catchAsync(async (req, res, next) => {
  const comp = await Complaint.create({
    to: req.body.to,
    problem: req.body.problem,
    des: req.body.des,
    user: req.user._id,
    hostel: req.user.hostel,
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: comp,
    },
  });
});

exports.getMyComplaints = catchAsync(async (req, res, next) => {
  const myComps = await Complaint.findOne({ user: req.user._id });

  if (!myComps) {
    return next(new AppError('No complaints found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: myComps,
    },
  });
});

exports.deleteMyComplaints = factory.deleteOne(Complaint);

exports.getAdminComplaints = catchAsync(async (req, res, next) => {
  const comp = await Complaint.find({
    to: req.user.role,
    hostel: req.user.hostel,
  });

  if (!comp) {
    return next(new AppError('No complaints found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: comp,
    },
  });
});

exports.resolveComplaints = catchAsync(async (req, res, next) => {
  const resComp = await Complaint.findById(req.params.id);

  if (!resComp) {
    return next(new AppError('no complaint found', 404));
  }

  resComp.status = 'solved';
  resComp.expireAfterSeconds = 30;

  await resComp.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'problem has been solved',
  });
});
