import React from 'react';
import Gallery from '../../components/home/Gallery';
import HeroBanner from '../../components/home/HeroBanner';
import CollegeSection from '../../components/home/CollegeSection';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Gallery></Gallery>
            <CollegeSection></CollegeSection>
        </div>
    );
};

export default Home;