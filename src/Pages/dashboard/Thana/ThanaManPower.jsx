import { useState } from "react";
import GetManPower from "./GetManPower";
import useUserContext from "../../../usehook/useUserContext";


const tabs = [
    { id: "tab1", label: "সদস্য", query: 'সদস্য' },
    { id: "tab2", label: "সাথী", query: 'সাথী' },
    { id: "tab3", label: "কর্মী", query: 'কর্মী' }
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("tab1");
    const { userData } = useUserContext();

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
                    <GetManPower
                        query={tabs.find(tab => tab.id === activeTab).query}
                        area={userData?.activeRole.area}
                        areaName={userData?.activeRole.areaName}
                    />
                </div>
            </div>
        </div>
    );
}