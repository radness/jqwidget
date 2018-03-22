﻿import { Component, ViewChild } from '@angular/core';

import { jqxGridComponent } from '../../../jqwidgets-ts/angular_jqxgrid'

import { generatedata } from '../../../sampledata/generatedata';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    @ViewChild('myGrid') myGrid: jqxGridComponent;

    source: any =
    {
        localdata: generatedata(10, false),
        datafields:
        [
            { name: 'name', type: 'string' },
            { name: 'productname', type: 'string' },
            { name: 'available', type: 'bool' },
            { name: 'date', type: 'date' },
            { name: 'quantity', type: 'number' }
        ],
        datatype: 'array'
    }

    dataAdapter: any = new jqx.dataAdapter(this.source);

    columns: any[] =
    [
        {
            text: 'Name', columntype: 'textbox', filtertype: 'input', datafield: 'name', width: 215,
            initEverPresentRowWidget: (datafield: string, htmlElement: any): void => {
                let input = htmlElement.find('input');
                input.attr('readonly', true);
                input.attr('disabled', true);
                htmlElement.addClass('jqx-fill-state-disabled');
            }
        },
        { text: 'Product', filtertype: 'checkedlist', datafield: 'productname', width: 220 },
        { text: 'Ship Date', datafield: 'date', filtertype: 'range', width: 210, cellsalign: 'right', cellsformat: 'd' },
        { text: 'Qty.', datafield: 'quantity', filtertype: 'number', cellsalign: 'right' }
    ];

    topBtnOnChecked(): void {
        this.myGrid.everpresentrowactions('add reset');
    };

    bottomBtnOnChecked(): void {
        this.myGrid.everpresentrowactions('addBottom reset');
    };
}