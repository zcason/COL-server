const xss = require('xss');

const CreateEventService = {
    postNewEvent(db, newEvent) {
        return db
            .insert(newEvent)
            .into('col_events')
            .returning('*')
            .then(([event]) => event)
    },
    serializeEvent(event) {
        return {
            id: event.id,
            title: xss(event.title),
            event_desc: xss(event.event_desc),
            event_date: xss(event.event_date)
        }
    }
};

module.exports = CreateEventService;