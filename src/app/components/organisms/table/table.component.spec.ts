import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TableHeader } from 'src/app/domain/models/TableHeader';

interface TestData {
  id: number;
  name: string;
}

describe('TableComponent', () => {
  let component: TableComponent<TestData>;  // Specify the generic type <TestData>
  let fixture: ComponentFixture<TableComponent<TestData>>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [RouterTestingModule],  // Import the RouterTestingModule since the component uses Router
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent<TestData>);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);  // Inject the actual Router instance
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSort and navigate', () => {
    const spyNavigate = jest.spyOn(router, 'navigate');  // Spy on the Router's navigate method
    const header: TableHeader = { key: 'name', label: 'Name', sortable: true };

    component.onSort(header, 'asc');  // Simulate a sort

    expect(spyNavigate).toHaveBeenCalledWith([], {
      queryParams: { sortBy: 'name', direction: 'asc' },
      queryParamsHandling: 'merge',
    });
  });
  it('should return correct keys for an object', () => {
    const testData = { id: 1, name: 'John' };
    const keys = component.getKeys(testData);
    expect(keys).toEqual(['id','name']);
  });
});
