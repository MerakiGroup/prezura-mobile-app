import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';

import * as heatMap from 'heatmap.js';

import { Point } from '../../models/heatmap-point';

/**
 * Component representing HeatMap Component.
 */
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

  private heatMap: any;

  /**
   * On data bind changes.
   * @param changes Data bind changes.
   */
  public ngOnChanges(changes: any): void {
    if (changes.heatmapPoints.currentValue) {
      this.setHeatMapData();
    }
  }

  /**
   * On after view init.
   */
  public ngAfterViewInit(): void {
    this.heatMap = heatMap.create({
      container: this.div.nativeElement
    });
  }

  /**
   * Responsible for setting/updating heat map data points.
   */
  private setHeatMapData(): void {
    this.heatMap.setData({
      data: this.data,
      max: this.max
    });
  }
}
