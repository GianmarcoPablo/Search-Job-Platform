import { useState } from 'react';
import {
    UserIcon,
    PhoneIcon,
    MapPinIcon,
    CakeIcon,
    PencilIcon,
    TrashIcon,
    EnvelopeIcon
} from '@heroicons/react/24/solid';

function ProfilePage() {

    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john@doe.com',
        birthDate: '1990-01-05',
        phone: '+1 555 123456',
        gender: 'Male',
        bio: 'Frontend developer',
        location: 'New York City'
    });

    return (
        <div className="p-4">
            <div className="max-w-3xl mx-auto bg-white shadow overflow-hidden rounded-lg">

                <div className="bg-indigo-600 p-6 pb-12">
                    <UserIcon className="h-20 w-20 text-white mx-auto" />
                    <h1 className="mt-4 text-3xl font-medium text-white text-center">
                        {user.name}
                    </h1>
                </div>

                <div className="px-6 py-4">
                    <h3 className="text-xl font-semibold mb-4">Public profile</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                            <EnvelopeIcon className="h-6 w-6 text-gray-500 mr-2" />
                            {user.email}
                        </div>

                        <div className="flex items-center">
                            <PhoneIcon className="h-6 w-6 text-gray-500 mr-2" />
                            {user.phone}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex items-center">
                            <CakeIcon className="h-6 w-6 text-gray-500 mr-2" />
                            Born on {user.birthDate}
                        </div>

                        <div className="flex items-center">
                            <MapPinIcon className="h-6 w-6 text-gray-500 mr-2" />
                            Lives in {user.location}
                        </div>

                    </div>

                </div>

                <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                    <button className="bg-indigo-600 flex justify-center items-center hover:bg-indigo-500 text-white px-4 py-2 rounded">
                        <PencilIcon className="h-6 w-6 mr-2" />
                        Edit
                    </button>

                    <button className="bg-red-600 flex justify-center items-center hover:bg-red-500 text-white px-4 py-2 rounded">
                        <TrashIcon className="h-6 w-6 mr-2" />
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;