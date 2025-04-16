import React, { useState } from 'react';
import Card from '../components/ui/Card'; // Ensure path is correct
import Button from '../components/ui/Button'; // Ensure path is correct

const LoginView = ({ onLogin, loginError }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username, password);
    };

    return (
        // **ADDED px-4 for horizontal padding**
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            {/* Card already has max-w-md which is good */}
            <Card title="OptiDash Login" className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {loginError && (
                        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                            {loginError}
                        </div>
                    )}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., admin"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., password"
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginView;