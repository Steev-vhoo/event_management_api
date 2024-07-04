import { EventsModel } from "../models/eventmanager.js";

// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// Create a new event
router.post('/', async (req, res) => {
	const event = new Event({
		title: req.body.title,
		date: req.body.date,
		reminder: req.body.reminder || false,
	});
	try {
		const newEvent = await event.save();
		res.status(201).json(newEvent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete an event
router.delete('/:id', async (req, res) => {
	console.log('****** Deleting event ******');
	try {
		console.log('Delete route called');
		// Use findByIdAndDelete instead of findByIdAndRemove
		await Event.findByIdAndDelete(req.params.id);
		console.log('Event deleted');
		res.json({ message: 'Event deleted' });
	} catch (error) {
		console.error('Error deleting event:', error);
		res.status(500).json({ message: error.message });
	}
});
// Update an event by ID
router.put('/:id', async (req, res) => {
	const eventId = req.params.id;
	const { title, date, reminder } = req.body;

	console.log('reminder', reminder);
	try {
		// Find the event by ID in the database
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}

		// Update the event properties
		event.date = date;
		event.title = title;
		event.reminder = reminder;
		console.log('event updated', event.reminder);
		// Save the updated event
		await event.save();

		// You can send the updated event in the response if needed
		res.json(event);
	} catch (error) {
		console.error('Error updating event:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;













// server/controllers/eventCon.js

import Event from '../models/eventSchema.js';

const eventController = {
    // Create a new event
    createEvent: async (req, res) => {
        try {
            const { title, description, date, location } = req.body;
            const event = new Event({
                title,
                description,
                date,
                location
            });
            await event.save();
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // Get all events
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // Get a single event by ID
    getEventById: async (req, res) => {
        try {
            const { id } = req.params;
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({
                    message: 'Event not found'
                });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // Update an event by ID
    updateEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, date, location } = req.body;
            const event = await Event.findByIdAndUpdate(id,
                {
                    title,
                    description,
                    date,
                    location
                },
                { new: true });
            if (!event) {
                return res.status(404).json({
                    message: 'Event not found'
                });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // Delete an event by ID
    deleteEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const event = await Event.findByIdAndDelete(id);
            if (!event) {
                return res.status(404).json({
                    message: 'Event not found'
                });
            }
            res.json({
                message: 'Event deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
};

export default eventController;