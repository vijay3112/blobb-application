import { Component, ChangeDetectorRef, Input } from "@angular/core";
import { ApexService } from "../service/apex.service";

@Component({
  selector: "apex-progress-bar",
  template: `
    <ng-template [ngIf]="showLoading == true">
      <div class="block-page" *ngIf="type == 'page'">
        <div class="loading">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
    </ng-template>

    <div class="loading" *ngIf="type == 'loading'">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>
  `,
  styles: [
    `
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
      }
      .loading-bar {
        display: inline-block;
        width: 4px;
        height: 18px;
        border-radius: 4px;
        animation: loading 1s ease-in-out infinite;
      }
      .loading-bar:nth-child(1) {
        background-color: #3498db;
        animation-delay: 0;
      }
      .loading-bar:nth-child(2) {
        background-color: #c0392b;
        animation-delay: 0.09s;
      }
      .loading-bar:nth-child(3) {
        background-color: #f1c40f;
        animation-delay: 0.18s;
      }
      .loading-bar:nth-child(4) {
        background-color: #27ae60;
        animation-delay: 0.27s;
      }

      @keyframes loading {
        0% {
          transform: scale(1);
        }
        20% {
          transform: scale(1, 2.2);
        }
        40% {
          transform: scale(1);
        }
      }
      .block-page {
        background-color: rgba(0, 0, 0, 0.8);
        top: 0px;
        bottom: 0px;
        letf: 0px;
        right: 0px;
        position: fixed;
        height: 100vh;
        width: 100vw;
        z-index: 999;
      }
    `
  ]
})
export class ProgressBarComponent {
  @Input()
  type: string = "page";
  showLoading: any = true;
  constructor(private apexService: ApexService) {
    this.apexService.loaderEvent().subscribe((result: boolean) => {
      setTimeout(() => {
        this.showLoading = result;
      }, 100);
    });
    // this.cd.detectChanges();
  }
}
