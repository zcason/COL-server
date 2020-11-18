const knex = require("knex")




const HomeService = {
    // this query is used to find all the user's events to be sort in the client by month or day
    getAllEvents(db) {
        return db('col_events')
            .select('title', 'event_date', 'event_desc')
            .then(result => {
                console.log(result)
            })
    },

    // this query is used to update a specific event
    updateEvent() { },

    // this query is used to delete a specific event
    deleteEvent() { }
}


module.exports = HomeService
