import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

await mongoose.connect('mongodb://localhost:27017/weatherapp');