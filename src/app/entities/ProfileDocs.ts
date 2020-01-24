import {Profile} from './Profile';
import {FileData} from './FileData';
import {Address} from './Address';
import {Img} from './Img';

export class ProfileDocs {
  id: string;
  docNumber: string;
  expDate: Date;
  dob: Date;
  gender: string;
  accountNumber: string;
  bankName: string;
  bankBranch: string;
  swiftCode: string;
  updatedBy: string;
  updatedOn: Date;
  profile: Profile = new Profile();
  fileData: FileData =  new FileData();
  address: Address = new Address();
  img: Img = new Img();
}
