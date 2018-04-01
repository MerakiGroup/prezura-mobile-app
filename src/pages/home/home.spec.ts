import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Socket } from 'ng-socket-io';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;


const mockSocketIO = {
  connect: () => {
  },
  emit: () => {
  },
  on: () => {}
};

describe('Component: Root Component', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [{useValue: mockSocketIO, provide: Socket}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  describe('Template tests', () => {
    it('should have a correct title', () => {
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.css('.title'));
      htmlElement = debugElement.nativeElement;
      expect(htmlElement.textContent).toContain('Prezura');
    });
  });
});
