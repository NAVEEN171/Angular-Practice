import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWeather } from './search-weather';

describe('SearchWeather', () => {
  let component: SearchWeather;
  let fixture: ComponentFixture<SearchWeather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchWeather]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchWeather);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
