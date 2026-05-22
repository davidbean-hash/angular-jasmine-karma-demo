import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersServices } from './UsersServices';

describe('UsersServices', () => {
  let service: UsersServices;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersServices
      ]
    });

    service = TestBed.inject(UsersServices);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be properly injected', () => {
    expect(service).toBeInstanceOf(UsersServices);
    expect(httpClient).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should make HTTP GET request to correct URL', () => {
      const expectedUrl = 'https://jsonplaceholder.typicode.com/users';

      service.getUsers().subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
    });

    it('should return users data on successful response', () => {
      const mockUsers = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
        { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
        { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' }
      ];

      service.getUsers().subscribe((users: any) => {
        expect(users).toEqual(mockUsers);
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle empty response array', () => {
      const mockUsers: any[] = [];

      service.getUsers().subscribe((users: any) => {
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle response data structure correctly', () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874'
          }
        }
      ];

      service.getUsers().subscribe((users: any) => {
        expect(Array.isArray(users)).toBe(true);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
        expect(users[0]).toHaveProperty('email');
        expect(users[0].id).toBe(1);
        expect(users[0].name).toBe('Leanne Graham');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
    });

    it('should handle 404 Not Found error', () => {
      service.getUsers().subscribe({
        next: () => { throw new Error('should have failed with 404 error'); },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 Internal Server Error', () => {
      service.getUsers().subscribe({
        next: () => { throw new Error('should have failed with 500 error'); },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network error', () => {
      service.getUsers().subscribe({
        next: () => { throw new Error('should have failed with network error'); },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(0);
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.error(new ProgressEvent('error'));
    });

    it('should handle 403 Forbidden error', () => {
      const errorMessage = 'Access forbidden';

      service.getUsers().subscribe({
        next: () => { throw new Error('should have failed with 403 error'); },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(403);
          expect(error.statusText).toBe('Forbidden');
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(errorMessage, { status: 403, statusText: 'Forbidden' });
    });

    it('should handle multiple concurrent requests', () => {
      const mockUsers1 = [{ id: 1, name: 'User 1' }];
      const mockUsers2 = [{ id: 2, name: 'User 2' }];
      let responseCount = 0;

      service.getUsers().subscribe((users) => {
        responseCount++;
        expect(users).toEqual(mockUsers1);
      });

      service.getUsers().subscribe((users) => {
        responseCount++;
        expect(users).toEqual(mockUsers2);
      });

      const requests = httpMock.match('https://jsonplaceholder.typicode.com/users');
      expect(requests.length).toBe(2);

      requests[0].flush(mockUsers1);
      requests[1].flush(mockUsers2);

      expect(responseCount).toBe(2);
    });
  });
});
