import mongoose from 'mongoose';
import CONFIG from './app.setting';

let dbUrl = `mongodb+srv://${CONFIG.DB.USER_NAME}:${CONFIG.DB.PASSWORD}@cluster0.w0lbc.mongodb.net/${CONFIG.DB.NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Error while connection to MongoDB' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Disonnected to MongoDB');
});

import { Schema } from '../models';
