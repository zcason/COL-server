const knex = require("knex")




const HomeService = {
    // this query is used to find all the user's events to be sort in the client by month
    getUserEventsByMonth(db, user_id, dates) {
        return db('col_events')
            .select('id', 'title', 'event_date', 'event_desc')
            .where({ 'user_id': user_id })
            .andWhere(knex.raw('DATE_TRUNC(\'day\', event_date)'), '>=', dates.begin_date)
            .andWhere(knex.raw('DATE_TRUNC(\'day\', event_date)'), '<=', dates.end_date)
            .orderByRaw('1 DESC')
    },

    // this query is used to delete a specific event
    deleteEvent(db, user_id, event_id) {
        return db('col_events')
            .where({ 'id': event_id })
            .andWhere({ 'user_id': user_id })
            .delete()
    }
}


module.exports = HomeService;
