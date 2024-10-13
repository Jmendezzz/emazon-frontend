import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { ReplaySubject } from 'rxjs';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  let routerMock: { events: ReplaySubject<any> };
  let activatedRouteMock: any;

  beforeEach(() => {
    routerMock = {
      events: new ReplaySubject(1)
    };

    activatedRouteMock = {
      root: {
        children: []
      }
    };

    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    service = TestBed.inject(BreadcrumbService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should listen the NavigationEnd and generate the breadcrumbs', () => {
    const createBreadcrumbsSpy = jest.spyOn(service, 'createBreadcrumbs');

    routerMock.events.next(new NavigationEnd(1, '/home', '/home'));

    expect(createBreadcrumbsSpy).toHaveBeenCalledWith(activatedRouteMock.root);
  });

  describe('createBreadcrumbs', () => {
    it('sohuld return an empty array if there are no routes', () => {
      const breadcrumbs = service.createBreadcrumbs(activatedRouteMock.root);
      expect(breadcrumbs).toEqual([]);
    });

    it('should generate breadcumbs when there are nested routes', () => {
      activatedRouteMock.root.children = [
        {
          snapshot: {
            url: [{ path: 'home' }],
            data: { breadcrumb: 'Home' }
          },
          children: []
        }
      ];

      const breadcrumbs = service.createBreadcrumbs(activatedRouteMock.root);
      expect(breadcrumbs).toEqual([{ label: 'Home', url: '/home' }]);
    });

    it('should add some routes to the breadcrumb', () => {
      activatedRouteMock.root.children = [
        {
          snapshot: {
            url: [{ path: 'home' }],
            data: { breadcrumb: 'Home' }
          },
          children: [
            {
              snapshot: {
                url: [{ path: 'dashboard' }],
                data: { breadcrumb: 'Dashboard' }
              },
              children: []
            }
          ]
        }
      ];

      const breadcrumbs = service.createBreadcrumbs(activatedRouteMock.root);
      expect(breadcrumbs).toEqual([
        { label: 'Home', url: '/home' },
        { label: 'Dashboard', url: '/home/dashboard' }
      ]);
    });
  });

  describe('createLabel private method', () => {
    it('should return breadcumb value if it exists', () => {
      const routeMock = {
        snapshot: {
          data: {
            breadcrumb: 'Test Label'
          }
        }
      };

      const label = (service as any).createLabel(routeMock);
      expect(label).toBe('Test Label');
    });

    it('should return an empty string if there is no breadcumb data.', () => {
      const routeMock = {
        snapshot: {
          data: {}
        }
      };

      const label = (service as any).createLabel(routeMock);
      expect(label).toBe('');
    });
  });
});
