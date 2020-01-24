export class AccessMenu {
  id: string;
  name: string;
  menu: string;
  role: string;
  active: boolean = true;
  writeAccess: string;
  priority: number = 999;
  updatedBy: string;
  updatedOn: Date;
}
