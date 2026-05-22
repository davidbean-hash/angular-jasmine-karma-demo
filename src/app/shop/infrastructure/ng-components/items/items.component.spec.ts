import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';

describe('ItemsComponent: testing sorting functionality', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have items array initialized with 5 items', () => {
      const itemCount = component.items.length;
      expect(itemCount).toBe(5);
    });

    it('should have sortBy initialized to "name"', () => {
      const sortBy = component.sortBy;
      expect(sortBy).toBe('name');
    });

    it('should have sortOrder initialized to "asc"', () => {
      const sortOrder = component.sortOrder;
      expect(sortOrder).toBe('asc');
    });

    it('should have items in default order (by name ascending)', () => {
      const itemNames = component.items.map(item => item.name);
      expect(itemNames).toEqual(['apple', 'banana', 'foo', 'luigi', 'mario']);
    });
  });

  describe('Sorting by Name', () => {
    it('should sort items by name in ascending order', () => {
      component.sortBy = 'price';
      component.sortOrder = 'desc';

      component.sortItems('name');

      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].name).toBe('apple');
      expect(component.items[component.items.length - 1].name).toBe('mario');
    });

    it('should sort items by name in descending order when toggled', () => {
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      component.sortItems('name');

      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].name).toBe('mario');
      expect(component.items[component.items.length - 1].name).toBe('apple');
    });
  });

  describe('Sorting by Description', () => {
    it('should sort items by description in ascending order', () => {
      component.sortBy = 'name';

      component.sortItems('description');

      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].description).toBe('bar');
      expect(component.items[1].description).toBe('bross');
      expect(component.items[component.items.length - 1].description).toBe('fruit');
    });

    it('should sort items by description in descending order when toggled', () => {
      component.sortBy = 'description';
      component.sortOrder = 'asc';

      component.sortItems('description');

      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].description).toBe('fruit');
      expect(component.items[component.items.length - 1].description).toBe('bar');
    });
  });

  describe('Sorting by Price', () => {
    it('should sort items by price in ascending order', () => {
      component.sortBy = 'name';

      component.sortItems('price');

      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');
      expect(component.items[0].price).toBe('123');
      expect(component.items[1].price).toBe('456');
      expect(component.items[component.items.length - 1].price).toBe('99');
    });

    it('should sort items by price in descending order when toggled', () => {
      component.sortBy = 'price';
      component.sortOrder = 'asc';

      component.sortItems('price');

      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('desc');
      expect(component.items[0].price).toBe('99');
      expect(component.items[component.items.length - 1].price).toBe('123');
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle sortOrder from asc to desc when clicking same field', () => {
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      component.sortItems('name');

      expect(component.sortOrder).toBe('desc');
      expect(component.sortBy).toBe('name');
    });

    it('should toggle sortOrder from desc to asc when clicking same field', () => {
      component.sortBy = 'price';
      component.sortOrder = 'desc';

      component.sortItems('price');

      expect(component.sortOrder).toBe('asc');
      expect(component.sortBy).toBe('price');
    });
  });

  describe('Switching Between Sort Fields', () => {
    it('should reset sortOrder to asc when switching to different field', () => {
      component.sortBy = 'name';
      component.sortOrder = 'desc';

      component.sortItems('price');

      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');
    });

    it('should reset sortOrder to asc when switching from desc to new field', () => {
      component.sortBy = 'description';
      component.sortOrder = 'desc';

      component.sortItems('name');

      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });

    it('should handle multiple field switches correctly', () => {
      component.sortBy = 'name';
      component.sortOrder = 'asc';

      component.sortItems('price');

      expect(component.sortBy).toBe('price');
      expect(component.sortOrder).toBe('asc');

      component.sortItems('description');

      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');

      component.sortItems('name');

      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array without errors', () => {
      component.items = [];
      component.sortBy = 'price';

      component.sortItems('name');

      expect(component.items.length).toBe(0);
      expect(component.sortBy).toBe('name');
      expect(component.sortOrder).toBe('asc');
    });

    it('should handle single item array', () => {
      component.items = [{ name: 'single', description: 'item', price: '100' }];

      component.sortItems('name');

      expect(component.items.length).toBe(1);
      expect(component.items[0].name).toBe('single');
    });

    it('should handle items with same sort field values', () => {
      component.items = [
        { name: 'item1', description: 'same', price: '100' },
        { name: 'item2', description: 'same', price: '200' }
      ];

      component.sortItems('description');

      expect(component.sortBy).toBe('description');
      expect(component.sortOrder).toBe('asc');
      expect(component.items.length).toBe(2);
      expect(component.items[0].description).toBe('same');
      expect(component.items[1].description).toBe('same');
    });

    it('should handle price as string comparison correctly', () => {
      component.items = [
        { name: 'a', description: 'desc', price: '9' },
        { name: 'b', description: 'desc', price: '100' },
        { name: 'c', description: 'desc', price: '50' }
      ];

      component.sortItems('price');

      expect(component.items[0].price).toBe('100');
      expect(component.items[1].price).toBe('50');
      expect(component.items[2].price).toBe('9');
    });
  });

  describe('Sort Order Consistency', () => {
    it('should maintain sort order after multiple sorts on same field', () => {
      const initialNames = component.items.map(i => i.name);

      component.sortItems('name');
      const afterFirstNames = component.items.map(i => i.name);

      component.sortItems('name');
      const afterSecondNames = component.items.map(i => i.name);

      component.sortItems('name');
      const afterThirdNames = component.items.map(i => i.name);

      expect(component.sortOrder).toBe('desc');
      expect(afterFirstNames).not.toEqual(initialNames);
      expect(afterSecondNames).toEqual(initialNames);
      expect(afterThirdNames).toEqual(afterFirstNames);
    });
  });
});
