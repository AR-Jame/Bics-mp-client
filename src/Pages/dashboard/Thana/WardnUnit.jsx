import { useState } from "react";
import GetWardnUnit from "./GetWardnUnit";
import { NavLink } from "react-router-dom";


const tabs = [
    { id: "tab1", label: "ওয়ার্ড", query: 'ward' },
    { id: "tab2", label: "উপশাখা", query: 'unit' },
];

export default function WardnUnit() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="w-full mx-auto p-5">
            {/* Tabs Header */}
            <div className="flex max-w-lg mx-auto mb-6 space-x-5 bg-gray-100 p-1 rounded-lg shadow-md">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 text-center font-medium rounded-lg transition-all  ${activeTab === tab.id ? "bg-blue-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-200"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tabs Content */}
            <div className="bg-white text-gray-800">
                <div className="bg-white text-gray-800">
                    <GetWardnUnit query={tabs.find(tab => tab.id === activeTab).query} />
                </div>
            </div>

            <NavLink to='/dashboard/create-ward'>
                <button className="btn">Create new Ward</button>
            </NavLink>
            <NavLink to='/dashboard/create-unit'>
                <button className="btn">Create new unit</button>
            </NavLink>
        </div>
    );
}