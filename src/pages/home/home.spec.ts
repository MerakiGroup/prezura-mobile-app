import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Point } from '../../models/heatmap-point';
import { SocketService } from '../../providers/socket-service/socket-service';

describe('Component: Root Component', () => {

  let socketService: SocketService;
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let heatmapSubject;

  beforeEach(async(() => {

    heatmapSubject = new Subject<Point[]>();

    const mockSocketService = {
      connect: () => {
      },
      disconnect: () => {
      },
      emit: () => {
      },
      getHeatMapData: () => {
        return heatmapSubject;
      }
    };

    TestBed.configureTestingModule({

      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [{ useValue: mockSocketService, provide: SocketService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    socketService = TestBed.get(SocketService);
    spyOn(socketService, 'connect');
    spyOn(socketService, 'disconnect');

  }));

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should display a correct title', () => {
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.title'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toContain('Prezura');
  });

  it('should invoke socketService.connect when connect button is clicked', () => {
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.connect-btn'));
    debugElement.triggerEventHandler('click', null);
    expect(socketService.connect).toHaveBeenCalled();
  });

  it('should invoke socket.connect when connect button is clicked', () => {
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.disconnect-btn'));
    debugElement.triggerEventHandler('click', null);
    expect(socketService.disconnect).toHaveBeenCalled();
  });

  it('should get latest heat map points data from socket', () => {
    expect(component.data).toBe(undefined);
    heatmapSubject.next({ data: [{ x: 10, y: 50, value: 80 }, { x: 40, y: 40, value: 90 }] });
    fixture.detectChanges();
    expect(component.data.length).toBe(2);
  });
});
