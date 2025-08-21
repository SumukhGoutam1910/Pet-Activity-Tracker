import PetActivity from '../models/PetActivity.js';

export const logActivity = async (req, res) => {
  try {
    const { petName, activityType, durationOrQuantity, dateTime } = req.body;
    const activity = new PetActivity({ petName, activityType, durationOrQuantity, dateTime });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const start = new Date(date.setHours(0,0,0,0));
    const end = new Date(date.setHours(23,59,59,999));
    const activities = await PetActivity.find({ dateTime: { $gte: start, $lte: end } });
    let summary = { walkTime: 0, meals: 0, meds: 0 };
    activities.forEach(act => {
      if (act.activityType === 'walk') summary.walkTime += act.durationOrQuantity;
      if (act.activityType === 'meal') summary.meals += 1;
      if (act.activityType === 'medication') summary.meds += 1;
    });
    res.json(summary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const checkWalk = async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const start = new Date(date.setHours(0,0,0,0));
    const cutoff = new Date(date.setHours(18,0,0,0));
    const walk = await PetActivity.findOne({ activityType: 'walk', dateTime: { $gte: start, $lte: cutoff } });
    res.json({ walkLogged: !!walk });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
