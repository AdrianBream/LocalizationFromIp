import { FC } from 'react';
import { LocalizationResponse } from '../services/ipStack';

interface LocalizationInfoProps {
    location: LocalizationResponse;
}

export const LocationInfo: FC<LocalizationInfoProps> = ({ location }) => (
    <>
        <div>
            Latitude: {location.latitude}
        </div>
        <div>
            Longitude: {location.longitude}
        </div>
        <div>
            City: {location.city}
        </div>
        <div>
            Capital: {location.location.capital}
        </div>
    </>
);