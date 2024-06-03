import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
describe('LoginService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoginService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=login.service.spec.js.map