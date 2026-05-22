import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { UsersComponent } from './users.component';

describe('UsersComponent: testing calling a service from a component.', () => {
   let component: UsersComponent;
   let fixture: ComponentFixture<UsersComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [UsersComponent],
         providers: [provideHttpClient()]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('getUsers() should return a list of users', () => {
      const users = ['foo', 'bar', 'mario'];
      vi.spyOn(component.usersServices, 'getUsers').mockReturnValue(of({users: users}));

      component.getUsers();

      expect(component.users).toEqual({users});
   });

   it('getUsers() should handle empty user list', () => {
      const users: string[] = [];
      vi.spyOn(component.usersServices, 'getUsers').mockReturnValue(of({users: users}));

      component.getUsers();
      expect(component.users).toEqual({users});
   });

   it('getUsers() should log to console when called', () => {
      vi.spyOn(console, 'info').mockImplementation(() => {});
      const users = ['foo', 'bar'];
      vi.spyOn(component.usersServices, 'getUsers').mockReturnValue(of({users: users}));

      component.getUsers();
      expect(console.info).toHaveBeenCalledWith('getUsers');
   });

   it('should render users works text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('users works!');
   });

   it('should have a Get Users button', () => {
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Get Users');
   });

   it('should call getUsers when button is clicked', () => {
      vi.spyOn(component, 'getUsers');
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      expect(component.getUsers).toHaveBeenCalledTimes(1);
   });

   it('should initialize with empty users array', () => {
      expect(component.users).toEqual([]);
   });

   it('should render user list when users are loaded', () => {
      const users = [{name: 'User1'}, {name: 'User2'}];
      vi.spyOn(component.usersServices, 'getUsers').mockReturnValue(of(users));

      component.getUsers();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('User1');
      expect(compiled.textContent).toContain('User2');
   });
});
