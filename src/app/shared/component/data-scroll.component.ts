import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, Input } from "@angular/core";

/** @title Basic virtual scroll */
@Component({
  selector: "data-scroll",
  styles: [
    `
      ::ng-deep .cdk-virtual-scroll-content-wrapper {
        flex-wrap: wrap !important;
      }
    `,
  ],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" [style.height]="height" *ngIf="list" autosize>
      <ng-container *cdkVirtualFor="let item of list">
        <ng-content select="item" *ngTemplateOutlet="itemTmpl; context: { $implicit: item }"></ng-content>
      </ng-container>
    </cdk-virtual-scroll-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataScrollComponent {
  @Input()
  list: any[] = [];

  @Input()
  height = "90vh";

  @Input()
  isTable: boolean = false;

  @ContentChild("itemTmpl")
  itemTmpl: TemplateRef<any>;
}
