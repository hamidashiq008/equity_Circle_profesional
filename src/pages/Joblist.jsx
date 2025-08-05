import React from 'react';
import JobListImg1 from '../assets/images/joblistImg1.png';
import JobListImg2 from '../assets/images/joblistImg2.png';
import JobListImg3 from '../assets/images/joblistImg3.png'; 
const cardData = [
    {
        id: 1,
        image: JobListImg1,
        title: 'Card Title 1',
        description: 'This is the description for card 1.',
        buttonText: 'Read More',
    },
    {
        id: 2,
        image: JobListImg2,
        title: 'Card Title 2',
        description: 'This is the description for card 2.',
        buttonText: 'Explore',
    },
    {
        id: 3,
        image: JobListImg3,
        title: 'Card Title 3',
        description: 'This is the description for card 3.',
        buttonText: 'Details',
    }, 
];

const Joblist = () => {
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

export default Joblist;

