import { AppData } from "./AppData";
import { FileData } from "./FileData";

export class Expenses {
  id: string;
  txnDate: Date;
  toWhom: string;
  amount: number;
  type: AppData = new AppData();
  fileData: FileData = new FileData();
}
