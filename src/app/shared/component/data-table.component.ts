import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  Input
} from "@angular/core";

/** @title Basic virtual scroll */
@Component({
  selector: "data-table",
  styles: [
    `
      .viewport {
        height: -webkit-fill-available;
        width: 100%;
      }
    `
  ],
  template: `
    <cdk-virtual-scroll-viewport itemSize="25" class="viewport">
      <table>
        <ng-content select="thead"></ng-content>
        <tbody>
          <ng-container *cdkVirtualFor="let item of list">
            <ng-content
              select="tbody"
              *ngTemplateOutlet="itemTmpl; context: { $implicit: item }"
            ></ng-content>
          </ng-container>
        </tbody>
      </table>
    </cdk-virtual-scroll-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input()
  list: any[] = [];

  @Input()
  height = "90vh";

  @Input()
  isTable: boolean = true;

  @ContentChild("itemTempl")
  itemTmpl: TemplateRef<any>;
}
