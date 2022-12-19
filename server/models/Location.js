import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true
  }
});

export default mongoose.model('Location', locationSchema);