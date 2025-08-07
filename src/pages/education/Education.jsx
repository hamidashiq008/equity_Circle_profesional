import React from 'react';
import EducationImg1 from '../../assets/images/educationImg1.png';
import EducationImg2 from '../../assets/images/educationImg2.png';
import EducationImg3 from '../../assets/images/educationImg3.png';
import EducationImg4 from '../../assets/images/educationImg4.png';
import { Link } from 'react-router-dom';
const cardData = [
    {
        id: 1,
        image: EducationImg1,
        title: 'Card Title 1',
        description: 'This is the description for card 1.',
        buttonText: 'Read More',
    },
    {
        id: 2,
        image: EducationImg2,
        title: 'Card Title 2',
        description: 'This is the description for card 2.',
        buttonText: 'Explore',
    },
    {
        id: 3,
        image: EducationImg3,
        title: 'Card Title 3',
        description: 'This is the description for card 3.',
        buttonText: 'Details',
    },
    {
        id: 4,
        image: EducationImg4,
        title: 'Card Title 4',
        description: 'This is the description for card 4.',
        buttonText: 'View',
    },

    {
        id: 5,
        image: EducationImg2,
        title: 'Card Title 5',
        description: 'This is the description for card 2.',
        buttonText: 'Explore',
    },
    {
        id: 6,
        image: EducationImg3,
        title: 'Card Title 6',
        description: 'This is the description for card 3.',
        buttonText: 'Details',
    },
    {
        id: 7,
        image: EducationImg4,
        title: 'Card Title 7',
        description: 'This is the description for card 4.',
        buttonText: 'View',
    },

    {
        id: 8,
        image: EducationImg2,
        title: 'Card Title 8',
        description: 'This is the description for card 2.',
        buttonText: 'Explore',
    },
    {
        id: 9,
        image: EducationImg3,
        title: 'Card Title 9',
        description: 'This is the description for card 3.',
        buttonText: 'Details',
    },
    {
        id: 10,
        image: EducationImg4,
        title: 'Card Title 10',
        description: 'This is the description for card 4.',
        buttonText: 'View',
    },
];

const Education = () => {
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
                                {/* <button className="btn btn-primary">{card.buttonText}</button> */}
                                <Link to={`/education/${card.id}`} state={{card}} className="btn btn-primary">
                                    {card.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;

