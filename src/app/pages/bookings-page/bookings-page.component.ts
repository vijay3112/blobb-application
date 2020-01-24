//core modules
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, FormControl } from "@angular/forms";

//constants and utils
import { Util } from "../../shared/utils/util";
import { Props } from "./../../constants/props";
import { Storage } from "../../shared/utils/storage";

//services
import { BookingsService } from "../../services/bookings.service";
import { LoadService } from "../../constants/load.service";

//entities
import { RoomBook } from "./../../entities/RoomBook";
import { Room } from "./../../entities/Room";
import { Payment } from "./../../entities/Payment";
import { Flat } from "../../entities/Flat";
import { Profile } from "./../../entities/Profile";
import { Property } from "./../../entities/Property";
import { PaymentAddon } from "../../entities/PaymentAddon";
import { CountdownComponent } from "ngx-countdown";

@Component({
    selector: "app-bookings-page",
    templateUrl: "./bookings-page.component.html",
    styleUrls: ["./bookings-page.component.css"]
})
export class BookingsPageComponent implements OnInit {
    @ViewChild(NgForm) myForm: NgForm;
    roomBook: RoomBook = null;
    @ViewChild(CountdownComponent) counter: CountdownComponent;

    @Input()
    enablePay: boolean = false;

    profile: Profile = null;
    flatList: Flat[];
    // rooms: Room[];
    property: Property = null;

    roomBookList: RoomBook[] = [];
    state: any;
    personsCount: any = 0;
    disabled = true;
    profileId: any;

    totalPrice: any = 0;
    totalCgstPrice: any = 0;
    totalSgstPrice: any = 0;
    TotalAmount: any = 0;
    selectedRooms: any = 0;
    selectedFlat: any;
    isARoomSelected: Boolean = false;
    // selectedNoOFPersons: number = 0;
    // maximumNoOfPersonsAvailable: number = 0;
    daysDiff: number = 0;
    bookingAmount: number = 0;
    showEdit: boolean = false;
    roomSearchObj: any = {};
    propertyIds: string[];

    filteredPropertyIDs: any = [];
    uid: string = null;
    personsSelectionObj: { selectedNoOFPersons: number; maximumNoOfPersonsAvailable: number; totalSelectedRoomPersons: number };
    bookedRooms: any = [];
    startLoading: boolean = false;
    selectWholeFlatCheck: boolean = false;
    constructor(private bookingsService: BookingsService) {
        this.uid = Util.UID();
        this.property = new Property();
        this.roomBook = new RoomBook();
        this.roomBook.room = new Room();
        this.roomBook.room.property = new Property();
        this.profile = new Profile();
        this.personsSelectionObj = {
            selectedNoOFPersons: 0,
            maximumNoOfPersonsAvailable: 0,
            totalSelectedRoomPersons: 0
        };
    }

    ngOnInit() {
        // this.onChangePeriod(this.roomBook);
        this.isARoomSelected = false;
        this.buildSearchRequest();
    }
    showDetails: any = "";

    toogleDetails(event: any) {
        this.showDetails = event;
        // console.log(this.showDetails);
    }

    buildSearchRequest() {
        let property = this.bookingsService.getApp().getSessionItem("property");
        let fromDate = this.bookingsService.getApp().getSessionItem("fromDate");
        let toDate = this.bookingsService.getApp().getSessionItem("toDate");
        let timeFrame = this.bookingsService.getApp().getSessionItem("timeFrame");
        let persons = this.bookingsService.getApp().getSessionItem("persons");

        this.roomBook.fromDate = new Date(fromDate);
        this.roomBook.toDate = new Date(toDate);
        // this.roomBook.fromDate = Util.CurrentDate();
        // this.roomBook.toDate = Util.DaysBack(Util.CurrentDate(), -1);
        this.personsSelectionObj.selectedNoOFPersons = Number(persons);
        this.propertyIds = [property];
        this.filteredPropertyIDs.push(this.propertyIds);

        // console.log(this.roomBook);
        this.getPropertyEntity();
        this.onChangePeriod(this.roomBook);
    }

    getPropertyEntity() {
        if (!!this.bookingsService.getParam("property")) {
            this.bookingsService.propertyEntity(this.bookingsService.getParam("property")).subscribe((result: any) => {
                if (result) {
                    setTimeout(() => {
                        this.property = result;
                    }, Props.TIME_OUT);
                }
            });
        }
    }

    applyFilter(event: any) {
        // console.log(event)
        this.filteredPropertyIDs = event;
        this.onChangePeriod(this.roomBook, "location");
    }
    onChangePersons(event: any) {
        this.personsSelectionObj.selectedNoOFPersons = event;
        this.validateReview();
    }
    onChangePeriod(event: any, filterType?: any) {
        this.goForReview = false;
        this.quickProfileAndPay = false;
        if (filterType && filterType === "location") {
            let roomsToBeUnlocked: any = [];
            roomsToBeUnlocked = this.roomBookList.filter((item: RoomBook) => this.filteredPropertyIDs.indexOf(item.room.property.id) == -1);
            if (roomsToBeUnlocked.length > 0) {
                this.unlockSelectedPropertySpecificRooms(roomsToBeUnlocked);
            }
        } else {
            this.unLockAlltheSelectedRooms();
        }
        // this.unLockAlltheSelectedRooms();
        this.isARoomSelected = false;
        this.selectedRooms = 0;
        this.roomBookList = null;
        this.flatList = null;
        let searchObj: any = {
            fromDate: event.fromDate.toISOString(),
            toDate: event.toDate.toISOString()
        };
        searchObj.propertyIds = this.filteredPropertyIDs;
        // if (this.filteredPropertyIDs.length) {
        //     searchObj.propertyIds = this.filteredPropertyIDs;
        // } else {
        //     searchObj.propertyIds = [this.bookingsService.getParam("property")];
        // }
        this.daysDiff = Util.DaysDiff(event.fromDate, event.toDate);
        this.roomBook.payment.units = this.daysDiff;
        this.bookingsService.getAvailableRoomsList(searchObj).subscribe((roomList: any) => {
            this.roomBookList = [];
            if (!!roomList) {
                this.flatList = roomList;
                this.prepareRoomBookList();
            } else {
                this.flatList = [];
            }
            if (filterType == "location") {
                this.roomBookList.forEach(element => {
                    this.roomBookSelected.forEach(element1 => {
                        if (element.room.id == element1.room.id) {
                            element.isSelected = element1.isSelected;
                        }
                    });
                });
                this.finalCalculation();
                this.validateReview();
            }
        });
        console.log("filterType");
    }

    // this.flatList.forEach((item: Flat) => {
    //     item.rooms.forEach((element: Room) => {
    //         this.disableFlatSelection = element.isLock;
    //         console.log(element.isLock);
    //     });
    // });
    disableFlatSelection: Boolean = false;
    prepareRoomBookList() {
        this.personsSelectionObj.maximumNoOfPersonsAvailable = 0;
        let flatIndex = [];
        let index = -1;
        let bookedRoomFound: boolean = false;
        this.flatList.forEach((item: Flat) => {
            bookedRoomFound = false;
            if (!item.roomBookList) {
                item.roomBookList = [];
            }
            // item.rooms.forEach((element: Room) => {
            //     this.disableFlatSelection = element.isLock;
            //     console.log(element.isLock);
            // });

            this.disableFlatSelection = item.rooms.some(item => item.isLock);
            //let found = this.roomBookList.some((item) => item.room.id === element.id);
            item.rooms.forEach((element: Room) => {
                let obj: RoomBook = new RoomBook();
                obj.payment = new Payment();
                this.personsSelectionObj.maximumNoOfPersonsAvailable = this.personsSelectionObj.maximumNoOfPersonsAvailable + element.persons;
                obj.bookType = this.roomBook.bookType;
                obj.fromDate = this.roomBook.fromDate;
                obj.toDate = this.roomBook.toDate;
                obj.room = element;
                if (!element.isLock) {
                    obj.payment.units = this.daysDiff;
                } else {
                    obj.payment.units = 0;
                    item.disabledFlatCheck = true;
                    bookedRoomFound = true;
                }
                obj.payment.cost = element.paymentTax.cost;
                obj.payment.cgst = element.paymentTax.cgst;
                obj.payment.sgst = element.paymentTax.sgst;
                obj.payment.igst = element.paymentTax.igst;
                item.roomBookList.push(obj);
                this.roomBookList.push(obj);
            });
            if (bookedRoomFound) {
                flatIndex.push(item.id);
            }
        });
        flatIndex.forEach((id: any) => {
            let index = this.flatList.findIndex(item => id == item.id);
            let item: Flat = this.flatList[index];
            this.flatList.splice(index, 1);
            this.flatList.push(item);
        });
    }
    selectWholeFlat(flat: Flat, check: boolean) {
        setTimeout(() => {
            flat.isAllFlatsSelected = check;
            if (flat.isAllFlatsSelected) {
                flat.roomBookList.forEach((element: RoomBook) => {
                    this.lockRoom(element);
                });
            } else {
                flat.roomBookList.forEach((element: RoomBook) => {
                    this.unLockRoom(element);
                });
            }
        }, 10);
    }
    unSelectWholeFlat(selectedRoomBook: RoomBook[]) {
        this.flatList.forEach((flat: Flat) => {
            let selectionFound = selectedRoomBook.some(eachSelectedRoomBook => eachSelectedRoomBook.room.flat.id === flat.id);
            if (selectionFound) {
                flat.isAllFlatsSelected = !selectionFound;
            }
        });
    }
    roomBookSelected: RoomBook[] = [];
    selectRoom(selectedItem: RoomBook) {
        // this.lockOrUnlockRoom(selectedItem);
        // console.log(selectedItem)

        this.personsSelectionObj.totalSelectedRoomPersons = 0;
        // calculation for roomBook properties
        this.finalCalculation();
        this.isARoomSelected = this.roomBookList.some(item => item.isSelected);
        //compare between the selectedPersons and selected rooms persons
        this.roomBookSelected = this.getSelectedRoomBookList();
        //unselectWholeFlat functionality goes here
        this.unSelectWholeFlat(this.roomBookSelected);

        this.roomBookSelected.map((element: RoomBook) => {
            this.personsSelectionObj.totalSelectedRoomPersons += element.room.persons;
        });

        this.validateReview();
    }
    getSelectedRoomBookList() {
        return this.roomBookList.filter(element => element.isSelected);
    }

    resetToDefaultValues() {
        console.log("reset values");
        this.totalPrice = 0;
        this.totalCgstPrice = 0;
        this.totalSgstPrice = 0;
        this.TotalAmount = 0;
        this.goForReview = false;
    }
    finalCalculation() {
        setTimeout(() => {
            this.resetToDefaultValues();
            if (this.roomBookList && this.roomBookList.length > 0) {
                this.roomBookList.forEach((element: RoomBook) => {
                    console.log(this.TotalAmount);
                    if (element.payment && element.isSelected == true) {
                        this.isARoomSelected = true;
                        element.price = element.payment.price;
                        element.cgstPrice = element.payment.cgstPrice;
                        element.sgstPrice = element.payment.sgstPrice;
                        element.igstPrice = element.payment.igstPrice;
                        element.amount = element.payment.amount;
                        // element.room.property.name = element.room.property.name;

                        this.totalCgstPrice += Number(element.cgstPrice);
                        this.totalSgstPrice += Number(element.sgstPrice);
                        this.totalPrice += Number(element.price);
                        this.TotalAmount += Number(element.amount);
                        // this.selectedFlat = element.room.property.name;
                    }
                });
            }
            this.paymentAddonDistrubution();
        });
    }

    /**
     * Amount is distrubuted in the amount sorting order
     */
    paymentAddonDistrubution() {
        let roomsSelected = this.getSelectedRoomBookList();
        this.selectedRooms = roomsSelected.length;
        roomsSelected = roomsSelected.sort((a, b) => a.amount - b.amount);
        roomsSelected.forEach(element => {
            element.payment.paymentAddonList = [];
            element.payment.paymentAddonList.push(Object.assign(new PaymentAddon(), { amount: element.payment.amount }));
        });

        this.bookedRooms = roomsSelected;
        if (this.bookedRooms.length <= 0) {
            this.quickProfileAndPay = false;
        }
        console.log(this.bookedRooms);
    }

    goForReview: Boolean = false;
    validateReview() {
        setTimeout(() => {
            this.goForReview = this.isARoomSelected && this.personsSelectionObj.selectedNoOFPersons <= this.personsSelectionObj.totalSelectedRoomPersons;
        }, 500);
        // console.log(this.personsSelectionObj.selectedNoOFPersons <= this.personsSelectionObj.totalSelectedRoomPersons);
    }

    quickProfileAndPay: Boolean = false;
    review() {
        // this.counter.pause();
        this.quickProfileAndPay = true;
        if (this.profile.id) {
            this.bookingsService.getNav().bookingSearch(null);
        } else {
            // this.bookingsService.showMessage("Please check profile");
        }
    }

    lockOrUnlockRoom(selectedRoomBook: RoomBook) {
        selectedRoomBook.isSelected ? this.unLockRoom(selectedRoomBook) : this.lockRoom(selectedRoomBook);
    }
    isRoomLockedInCache: Boolean = false;
    lockRoom(selectedRoomBook: RoomBook) {
        // selectedRoomBook.room.flat.isAllFlatsSelected = true;
        let searchObj: any = {
            fromDate: selectedRoomBook.fromDate.toISOString(),
            toDate: selectedRoomBook.toDate.toISOString(),
            roomId: selectedRoomBook.room.id,
            uid: this.uid
        };
        this.bookingsService.lockRoom(searchObj).subscribe((data: any) => {
            if (data.proceed) {
                selectedRoomBook.isSelected = true;
                selectedRoomBook.room.flat.isAllFlatsSelected = true;
                this.selectRoom(selectedRoomBook);
            } else {
                selectedRoomBook.isRoomLockedInCache = true;
            }
        });
    }
    unLockRoom(selectedRoomBook: RoomBook) {
        // selectedRoomBook.room.flat.isAllFlatsSelected = false;

        let searchObj: any = {
            fromDate: selectedRoomBook.fromDate.toISOString(),
            toDate: selectedRoomBook.toDate.toISOString(),
            roomId: selectedRoomBook.room.id,
            uid: this.uid
        };
        if (this.isARoomSelected) {
            this.bookingsService.unLockRoom(searchObj).subscribe((data: any) => {
                if (!!data) {
                    selectedRoomBook.isSelected = false;
                    selectedRoomBook.room.flat.isAllFlatsSelected = false;
                    this.selectRoom(selectedRoomBook);
                }
            });
        }
    }
    bookNow($event) {
        this.counter.pause();
        if (this.profile.id && $event) {
            this.bookRoom($event);
            // this.bookingsService.getNav().invoiceGenerate(null);
        } else {
            // this.bookingsService.showMessage("Please check profile");
        }
    }

    checkOut($event) {
        this.counter.pause();
        if (this.profile.id && $event) {
            this.bookRoom($event);
            // this.bookingsService.getNav().invoiceGenerate(null);
        } else {
            // this.bookingsService.showMessage("Please check profile");
        }
    }
    cancel() {
        this.quickProfileAndPay = false;
        this.counter.resume();
    }

    bookRoom(paymentId) {
        this.startLoading = true;
        this.roomBookList.map(ele => {
            ele.profile = this.profile;
        });
        let bookedRooms: RoomBook[] = this.roomBookList.filter((item: RoomBook) => item.isSelected);
        this.bookedRooms.map(item => {
            item.payment.paymentId = paymentId;
        });
        this.bookingsService.saveBookRooms(bookedRooms).subscribe((data: any) => {
            if (data.data) {
                this.bookingsService.getNav().invoiceGenerate([{ refs: data.data.bookingRef }]);
                this.bookingsService.getApp().setSessionItem(data.data.bookingRef, data.data);
            }
            this.startLoading = false;
            //this.bookingsService.getApp().showMessage(data.message);
        });
    }
    profileSave($event) {
        this.bookingsService.saveProfileData($event).subscribe((data: any) => {
            if (data.id) {
                this.profile.id = data.id;
                // console.log(this.profile);
            }
        });
    }
    changeAmount() {
        setTimeout(() => {
            this.paymentAddonDistrubution();
        }, 100);
    }

    pay($event) {
        if ($event) {
            this.roomBook.profile = Storage.getSessionUser();
            // this.roomBook.stripeId = $event.id;
            // this.roomBook.paymentType = "stripe";
            this.bookingsService.saveBookRoom(this.roomBook).subscribe((result: any) => {
                if (result) {
                    Storage.removeSessionItem("user");
                    // this.bookingsService.needAssistPage();
                }
            });
        }
    }
    onFinished() {
        this.unLockAlltheSelectedRooms();
        this.ngOnInit();
    }
    unLockAlltheSelectedRooms() {
        if (this.roomBookList) {
            let roomBookSelected = this.getSelectedRoomBookList();
            roomBookSelected.forEach((element: RoomBook) => {
                this.unLockRoom(element);
            });
        }
    }
    unlockSelectedPropertySpecificRooms(roomsToBeUnlocked: any) {
        let deSelectedPropertyRoomSelected = roomsToBeUnlocked.filter(element => element.isSelected);
        deSelectedPropertyRoomSelected.forEach((element: RoomBook) => {
            this.unLockRoom(element);
        });
    }
    ngOnDestroy() {
        this.unLockAlltheSelectedRooms();
    }
}
