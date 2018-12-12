import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let MessageServiceStub: Partial<MessageService>;

  MessageServiceStub = {
    add(): void {

    }
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], providers: [{provide: MessageService, useValue: MessageServiceStub}]
  }));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
