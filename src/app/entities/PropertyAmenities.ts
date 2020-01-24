import { Property } from './Property'; import { Amenities } from './Amenities';

export class PropertyAmenities {
    id: string;
    active: boolean;
    property: Property = new Property();
    amenities: Amenities = new Amenities();
}
