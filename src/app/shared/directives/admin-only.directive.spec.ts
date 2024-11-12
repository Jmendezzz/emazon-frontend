import { AdminOnlyDirective } from './admin-only.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@/domain/models/Auth';

describe('AdminOnlyDirective', () => {
  let directive: AdminOnlyDirective;
  let authServiceMock: any;
  let templateRefMock: any;
  let viewContainerMock: any;

  beforeEach(() => {
    authServiceMock = {
      userDetails: jest.fn(),
    };

    templateRefMock = {} as TemplateRef<any>;

    viewContainerMock = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    } as unknown as ViewContainerRef;

    directive = new AdminOnlyDirective(authServiceMock, templateRefMock, viewContainerMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should display the template if user is admin and condition is true', () => {
    authServiceMock.userDetails.mockReturnValue({ role: Role.ADMIN });
    directive.appAdminOnly = true;
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should clear the view container if user is not admin', () => {
    authServiceMock.userDetails.mockReturnValue({ role: Role.USER });
    directive.appAdminOnly = true;
    expect(viewContainerMock.clear).toHaveBeenCalled();
  });

  it('should clear the view container if condition is false', () => {
    authServiceMock.userDetails.mockReturnValue({ role: Role.ADMIN });
    directive.appAdminOnly = false;
    expect(viewContainerMock.clear).toHaveBeenCalled();
  });
});