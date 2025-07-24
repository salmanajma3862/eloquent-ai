import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const DashboardPage: React.FC = () => {
    const { userInfo, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-200">
                                Eloquent AI
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-300">
                                {userInfo?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-gray-800 overflow-hidden shadow-lg rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h2 className="text-3xl font-bold text-gray-200 mb-4">
                                Welcome, {userInfo?.name}!
                            </h2>
                            <p className="text-gray-400 mb-6">
                                You're successfully logged in to Eloquent AI - IELTS Speaking Tutor.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gray-700 p-6 rounded-lg border border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-xl">
                                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                                        Start Practice
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Begin your IELTS speaking practice session
                                    </p>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                        Start Now
                                    </button>
                                </div>

                                <div className="bg-gray-700 p-6 rounded-lg border border-green-500 hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-xl">
                                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                                        View Progress
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Track your improvement over time
                                    </p>
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                        View Progress
                                    </button>
                                </div>

                                <div className="bg-gray-700 p-6 rounded-lg border border-purple-500 hover:transform hover:-translate-y-1 transition-all duration-200 hover:shadow-xl">
                                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                                        Settings
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Customize your learning experience
                                    </p>
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                        Settings
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-8 bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-200 mb-2">
                                    Account Information
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Email: {userInfo?.email}
                                </p>
                                <p className="text-sm text-gray-400">
                                    User ID: {userInfo?._id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
