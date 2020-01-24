import { Profile } from "./Profile";
import { WebMetadata } from "./WebMetadata";
import { Address } from "./Address";

export class Property {
    id: string;
    name: string;
    type: string;
    location: string;
    summary: string;
    mapLocation: string;
    active: boolean = true;
    supervisor: Profile = new Profile();
    webMetadata: WebMetadata = new WebMetadata();
    address: Address = new Address();
}
