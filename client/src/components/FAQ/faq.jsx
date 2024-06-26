import React, { useState } from 'react';
import TermOfUse from './compo/TermOfUse';
import PrivecyPolicy from './compo/PrivecyPolicy';
import HelpFaq from './compo/HelpFaq';


const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="m-6 rounded-lg max-w-6xl mx-auto space-x-4">
      {/* Tabs */}
      <div className="flex justify-center gap-x-6 ">
        <button
          className={`px-4 py-2 ${activeTab === 0 ? 'bg-blue-400 text-white' : 'bg-gray-200 '} rounded-lg ${activeTab !== 0 ? ' ' : ''} focus:outline-none`}
          onClick={() => handleTabClick(0)}
        >
          Term of use
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 1 ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg ${activeTab !== 1 ? '' : ''} focus:outline-none`}
          onClick={() => handleTabClick(1)}
        >
         Privecy and policy
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 2 ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg ${activeTab !== 2 ? '' : ''} focus:outline-none`}
          onClick={() => handleTabClick(2)}
        >
         Help & FAQ
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Render content based on active tab index */}
        {activeTab === 0 && <TermOfUse />}
        {activeTab === 1 && <PrivecyPolicy />}
        {activeTab === 2 && <HelpFaq />}
      </div>
    </div>
  );
};

export default FAQ;
