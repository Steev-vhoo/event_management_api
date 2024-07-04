// server/routes/eventRoute.js

import { Router } from 'express';
import eventCon from '../controllers/eventCon.js';

const router = Router();

// Define your routes here
router.get('/', eventCon.getAllEvents);

router.get('/:id', eventCon.getEventById);

router.post('/', eventCon.createEvent);

router.put('/:id', eventCon.updateEvent);

router.delete('/:id', eventCon.deleteEvent);

export default router;





// server/models/eventSchema.js is the schema for the event model. It contains the title, description, date, and location of the event. 

import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
});

const Event = model('Event', eventSchema);

export default Event;