import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@/features/authentication/services/auth.service';
import { Role } from '@/domain/models/Auth';


@Directive({
  selector: '[appAdminOnly]'
})
export class AdminOnlyDirective {

  constructor(
    private readonly authService: AuthService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  @Input() set appAdminOnly(condition: boolean) {
    const user = this.authService.userDetails();
    const isAdmin = user?.role === Role.ADMIN;

    if (isAdmin && condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
