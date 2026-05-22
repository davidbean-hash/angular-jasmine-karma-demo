import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { By } from '@angular/platform-browser';

describe('ItemComponent: testing basic component creation', () => {
   let component: ItemComponent;
   let fixture: ComponentFixture<ItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ItemComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should accept name input', () => {
      component.name = 'Test Item';
      fixture.detectChanges();
      expect(component.name).toEqual('Test Item');
   });

   it('should accept description input', () => {
      component.description = 'Test Description';
      fixture.detectChanges();
      expect(component.description).toEqual('Test Description');
   });

   it('should accept price input', () => {
      component.price = '100';
      fixture.detectChanges();
      expect(component.price).toEqual('100');
   });

   it('should call like() method', () => {
      vi.spyOn(console, 'info').mockImplementation(() => {});
      component.name = 'Test Item';
      component.like();
      expect(console.info).toHaveBeenCalledWith('like Test Item');
   });

   it('should render name in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Test Item');
   });

   it('should render price in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('100 €');
   });

   it('should render description in the template', () => {
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Test Description');
   });

   it('should call like() when like button is clicked', () => {
      vi.spyOn(component, 'like');
      component.name = 'Test Item';
      component.description = 'Test Description';
      component.price = '100';
      fixture.detectChanges();

      const likeButton = fixture.debugElement.query(By.css('button')).nativeElement;
      likeButton.click();
      expect(component.like).toHaveBeenCalledTimes(1);
   });
});
