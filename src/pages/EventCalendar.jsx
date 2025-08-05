
import React from 'react';
import EventCalendarImg1 from '../assets/images/eventCalendarImg1.png';
import EventCalendarImg2 from '../assets/images/eventCalendarImg2.png';
import EventCalendarImg3 from '../assets/images/eventCalendarImg3.png'; 
import EventCalendarImg4 from '../assets/images/eventCalendarImg4.png';
import EventCalendarImg5 from '../assets/images/eventCalendarImg5.png';
import EventCalendarImg6 from '../assets/images/eventCalendarImg6.png'; 
const cardData = [
    {
        id: 1,
        image: EventCalendarImg1,
        title: 'Card Title 1',
        description: 'This is the description for card 1.',
        buttonText: 'Read More',
    },
    {
        id: 2,
        image: EventCalendarImg2,
        title: 'Card Title 2',
        description: 'This is the description for card 2.',
        buttonText: 'Explore',
    },
    {
        id: 3,
        image: EventCalendarImg3,
        title: 'Card Title 3',
        description: 'This is the description for card 3.',
        buttonText: 'Details',
    },
    {
        id: 4,
        image: EventCalendarImg4,
        title: 'Card Title 4',
        description: 'This is the description for card 4.',
        buttonText: 'View',
    },
    {
        id: 5,
        image: EventCalendarImg5,
        title: 'Card Title 5',
        description: EventCalendarImg1,
        buttonText: 'View',
    },
    {
        id: 6,
        image: EventCalendarImg6,
        title: 'Card Title 6',
        description: EventCalendarImg1,
        buttonText: 'View',
    },
];

const EventCalendar = () => {
    return (
        <div className="container my-4">
            <div className="row g-4">
                {cardData.map(card => (
                    <div className="col-md-3" key={card.id}>
                        <div className="card h-100 shadow-sm">
                            <img src={card.image} className="card-img-top" alt={card.title} />
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.description}</p>
                                <button className="btn btn-primary">{card.buttonText}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCalendar;
