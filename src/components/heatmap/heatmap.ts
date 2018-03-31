import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import * as heatMap from 'heatmap.js';

/**
 * Generated class for the HeatmapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

interface Point {
  x: number;
  y: number;
  value: number;
}
@Component({
  selector: 'heatmap',
  templateUrl: 'heatmap.html'
})
export class HeatmapComponent implements OnChanges, AfterViewInit {
  public data: Point[];
  text: string;
  @ViewChild('div') public div: any;

  @Input()
  set heatmapPoints(data: Point[]) {
    this.data = data;
  }

  @Input() public max = 255;

  // private data: Point[];
  private heatMap: any;

  constructor() {}

  public ngOnChanges(changes: any): void {
    if (changes.heatmapPoints.currentValue) {
      this.setHeatMapData();
    }
  }

  public ngAfterViewInit(): void {
    this.heatMap = heatMap.create({
      container: this.div.nativeElement
    });
  }

  private setHeatMapData(): void {
    this.heatMap.setData({
      data: this.data,
      max: this.max
    });
  }
}
