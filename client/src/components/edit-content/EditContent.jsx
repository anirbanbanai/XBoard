import React from 'react';
import HeadingForm from './HeadingForm';
import ServiceForm from './ServiceForm';
import PriceForm from './PriceForm';

const EditContent = () => {
    return (
        <div className=' mt-5 py-4 lg:px-1 px-5'>
            <h4 className=' text-3xl font-bold leading-10 text-[#23262A]'>Footer</h4>
            <ServiceForm/>
            <HeadingForm/>
            <PriceForm/>
        </div>
    );
};

export default EditContent;