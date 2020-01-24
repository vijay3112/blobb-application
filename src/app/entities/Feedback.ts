import { Profile } from "./Profile";

export class Feedback {
    id: string;
    rateUs: number = 5;
    summary: string;
    active: boolean = true;
    profile: Profile = new Profile();
}
