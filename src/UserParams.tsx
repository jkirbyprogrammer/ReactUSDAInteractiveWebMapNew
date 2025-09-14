import * as React from 'react';
import './App.css'
import { useParams } from 'react-router-dom';

interface UserParams {
    id: string; // Define the type for your parameter
}

function UserProfile() {
    const { id } = useParams<UserParams>(); // Specify the type for useParams

    return (
        <div className="map-heading">
            {id}
        </div>
    );
}

export default UserProfile;