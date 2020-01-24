import { Component, OnInit, HostListener, ElementRef } from "@angular/core";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
    sticky: boolean = false;
    elementPosition: any;
    valid: boolean = true;
    valid1: boolean = true;
    isShowHeadActive = false;

    constructor(private eRef: ElementRef) {}

    ngOnInit() {}
    ngAfterViewInit() {}

    @HostListener("document:click", ["$event"])
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            console.log("click inside");
        } else {
            var element = document.getElementById("navigationbar");
            element.classList.remove("show");
        }
    }

    @HostListener("window:scroll", ["$event"])
    onWindowScroll(event) {
        //console.log(event);
        // console.log(event.clientY + " -- " + event.offsetY + "--" + event.pageY + " -- " + event.screenY + " -- " + event.pageY);
        const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const value = Math.round(offset);
        if (value > 100) {
            this.isShowHeadActive = true;
        } else {
            this.isShowHeadActive = false;
        }
    }

    // @HostListener("window:scroll", ["$event"])
    // onWindowScroll(e) {
    //     let element = document.querySelector(".nav");
    //     if (window.pageYOffset > 100) {
    //         element.classList.add("navbar-inverse");
    //     } else {
    //         element.classList.remove("navbar-inverse");
    //     }
    // }
    // @HostListener("window:scroll", ["$event"])
    // track(event: any): void {
    //     const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //     const value = Math.round(offset);
    //     if (value > 10) {
    //         this.isShowHeadActive = true;
    //     } else {
    //         this.isShowHeadActive = false;
    //     }
    // }
}

function check(e) {
    var target = (e && e.target) || (event && event.srcElement);
    var obj = document.getElementById("mydiv");
    if (target != obj) {
        obj.style.display = "none";
    }
}
