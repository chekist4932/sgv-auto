
import React from 'react';
import bgImage from '~/assets/news/bg-form.png';
import { RequestForm } from '~/components/ui/Form/requestForm';

export const CallToActionSection = () => (
    <section className="mt-8 bg-[#1A1D2A] bg-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container mx-auto max-w-[1280px] px-4 grid lg:grid-cols-5 items-center">
            <div className="lg:col-span-3 flex flex-col">
            </div>
            <div className='lg:col-span-2 flex flex-col bg-[#0C0E15] px-6 py-6'>
                <RequestForm />
            </div>
        </div>
    </section>
);
