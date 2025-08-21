import mongoose from 'mongoose';

const PetActivitySchema = new mongoose.Schema({
  petName: { type: String, required: true },
  activityType: { type: String, enum: ['walk', 'meal', 'medication'], required: true },
  durationOrQuantity: { type: Number, required: true },
  dateTime: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('PetActivity', PetActivitySchema);
