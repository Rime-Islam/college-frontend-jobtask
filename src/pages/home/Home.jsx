import React from 'react';
import Gallery from '../../components/home/Gallery';
import HeroBanner from '../../components/home/HeroBanner';
import CollegeSection from '../../components/home/CollegeSection';
import AllReview from '../../components/home/AllReview';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <Gallery></Gallery>
            <CollegeSection></CollegeSection>
            <AllReview/>
        </div>
    );
};

export default Home;