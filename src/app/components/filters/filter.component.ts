import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter } from "@angular/core";
import { LoadService } from "../../constants/load.service";
@Component({
    selector: "app-filter",
    templateUrl: "./filter.component.html",
    styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
    propertyList: any[] = [];
    selectedProperty: string = null;

    @Input()
    filterPropertyList: any = [];
    @Output()
    outputFilteredPropertyList: EventEmitter<any> = new EventEmitter<any>();
    constructor(private loadService: LoadService) { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        const changeValue: SimpleChange = changes["filterPropertyList"];
        if (changeValue && changeValue.previousValue != changeValue.currentValue) {
            if (this.filterPropertyList.length == 1) {
                this.getProperties();
            }
        }
    }

    getProperties() {
        this.loadService.propertyAll().subscribe((data: any) => {
            if (data && data.length > 0) {
                this.propertyList = data;
                this.selectedProperty = data[0].val;
                console.log(this.propertyList.length);
            } else {
                this.selectedProperty = "";
                this.propertyList = [];
            }
        });
    }
    propertyFilterList(propertyId: any, isChecked: boolean) {
        if (isChecked) {
            this.filterPropertyList.push(propertyId);
        } else {
            let index = this.filterPropertyList.indexOf(propertyId);
            this.filterPropertyList.splice(index, 1);
        }
        console.log(this.filterPropertyList);
        this.outputFilteredPropertyList.emit(this.filterPropertyList);
    }

    checked(val) {
        let returnVal = this.filterPropertyList.includes(val);
        return returnVal;
    }
}
