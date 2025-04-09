import { getEvents, addEvent, updateEvent, deleteEvent } from '../../projects/calendar/edge-config';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const events = await getEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else if (req.method === 'POST') {
    try {
      const event = req.body;
      const newEvents = await addEvent(event);
      res.status(201).json(newEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add event' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { eventId, updatedEvent } = req.body;
      const newEvents = await updateEvent(eventId, updatedEvent);
      res.status(200).json(newEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { eventId } = req.body;
      const newEvents = await deleteEvent(eventId);
      res.status(200).json(newEvents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 