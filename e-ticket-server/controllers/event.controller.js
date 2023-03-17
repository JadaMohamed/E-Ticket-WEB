import eventImagesService from "../services/event-images.service.js";
import eventService from "../services/event.service.js";
import seatCategoryService from "../services/seat-category.service.js";

const eventController = {
    getAllEvents: async (req, res) => {
        try {
            const events = await eventService.getAllEvents();
            res.status(200).json(events);
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ error: "Internal server error to get all event " });
        }
    },

    createEvent: async (req, res) => {
        const eventData = req.body;
        try {
            const newEvent = await eventService.createEvent(eventData);
            res.json(newEvent);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create event" });
        }
    },
    createManyEvent: async (req, res) => {
        const { EventsData } = req.body;
        try {
            const newEvents = await Promise.all(
                EventsData.map((Event) => eventService.createEvent(Event))
            );
            res.json(newEvents);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create many Event" });
        }
    },

    getEventById: async (req, res) => {
        const eventId = Number(req.params.id);
        try {
            const event = await eventService.getEventById(eventId);
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ error: `Event with ID ${eventId} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteEventById: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedEvent = await eventService.deleteEventById(parseInt(id));
            if (deletedEvent) {
                res.json(deletedEvent);
            } else {
                res.status(404).json({ error: `Event with id ${id} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateEvent: async (req, res) => {
        const id = req.params.id;
        const eventData = req.body;

        try {
            const updatedEvent = await eventService.updateEvent(id, eventData);

            if (updatedEvent) {
                res.json(updatedEvent);
            } else {
                res.status(404).json({ error: `Event with id ${id} not found` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getAllOrganizerEvents: async (req, res) => {
        const { orgId } = req.params;
        try {
            const events = await eventService.getAllOrganizerEvents(orgId);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong" });
        }
    },

    getOrganizerProfileById: async (req, res) => {
        const { org_id } = req.params;
        try {
            const organizer = await eventService.getOrganizerProfileById(org_id);
            res.status(200).json(organizer);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    searchEvents: async (req, res) => {
        try {
            const { allfilters } = req.body;
            const keyword = req.query.keyword;
            const events = await eventService.searchEvents(keyword, allfilters);
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error ???");
        }
    },

    getLastThreeEventsForOrganizer: async (req, res) => {
        const orgId = Number(req.params.orgId);

        try {
            const events = await eventService.getLastThreeEventsForOrganizer(orgId);
            const eventsStats = await eventService.getOrganizerEventStats(orgId);

            if (events && events.length > 0) {
                const response = {
                    events: events,
                    eventsStats: eventsStats,
                };
                res.status(200).json(response);
            } else {
                res
                    .status(404)
                    .json({ error: `No events found for organizer with ID ${orgId}` });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getOrganizerEventStats: async (req, res) => {
        const { orgId } = req.params;
        try {
            const eventStats = await eventService.getOrganizerEventStats(orgId);
            res.status(200).json(eventStats);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createOrganizerEvent: async (req, res) => {
        const { orgId } = req.params;

        //**********data from requiste for event*************//
        const eventData = {
            org_id: parseInt(orgId),
            duration: req.body.duration,
            trailer_video_url: req.body.trailer_video_url,//not
            description: req.body.description,
            brand_url: req.body.brand_url,
            location: req.body.address1 + "," + req.body.address2,
            start_time: req.body.startTime,
            finish_time: req.body.finish_time,
            //calculate the totalSeats from the table categories
            max_number_attendants: req.body.categories.reduce((acc, category) => acc + category.numSeats, 0),
            is_start_selling: req.body.is_start_selling,//not
            event_type: req.body.eventCategory,
            is_review_enabled: req.body.is_review_enabled,//not
            is_approved: req.body.is_approved,//not
            title: req.body.eventTitle,
        }

        const eventDataWithoutNullProperties = Object.entries(eventData).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        //create the event to database 
        try {
            const newEvent = await eventService.createEvent(eventDataWithoutNullProperties);
            if (newEvent) {
                console.log('newEvent')
                console.log(newEvent)
                console.log('event created sucssussfly')
            }
            //get SeatCategorys from requist
            const SeatCategorys = req.body.categories.map(category => {
                return {
                    event_id: newEvent.event_id,
                    type_name: category.name,
                    type_price: category.price,
                    type_description: "description seat category",
                    number_max: category.numSeats,
                    number_avialable: category.numSeats,
                    max_uses: 1,
                };
            });
            //create categorys
            const newSeatCategorys = await Promise.all(
                SeatCategorys.map(SeatCategory =>
                    seatCategoryService.createSeatCategory(SeatCategory)
                )
            );
            //
            console.log('*************newSeatCategorys')
            console.log(newSeatCategorys)


            const Event_Images = req.body.Event_Images.map(image => {
                return {
                    event_id: newEvent.event_id,
                    img_url: image.img_url
                };
            });

            const newEventImages = await Promise.all(
                Event_Images.map(EventImage =>
                    eventImagesService.createEventImage(EventImage)
                )
            );
            //
            console.log('*******newEventImages')
            console.log(newEventImages)
            console.log('end ******************************')

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create event' });
        }
    },

    getAllEventsCategories: async (req, res) => {
        try {
            const categories = await eventService.getAllEventsCategories();
            res.status(200).json({categories});
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error to get all categories " });
        }
    },
    getTopSalesEvents: async (req, res) => {
    try {
      console.log("Searching......top sales............");
      const events = await eventService.getTopSalesEvents();
      console.log(events);
      res.status(200).json(events);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error get events for slider" });
    }
  },
};



export default eventController;
