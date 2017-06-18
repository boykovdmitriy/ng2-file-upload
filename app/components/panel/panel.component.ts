import {Component} from "@angular/core";
@Component({
    selector: 'panel',
    template: `
        <header>
            <ng-content select="[header]"></ng-content>
        </header>
        <ng-content select="[content]"></ng-content>
    `,
    styles  : [`
        :host {
            box-shadow: 0 0 10px black;
        }

        header {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid black;
        }
    `]
})

export class PanelComponent {
}