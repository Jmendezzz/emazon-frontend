import { AuthService } from '@/features/authentication/services/auth.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent {

  constructor(private readonly authService:AuthService) { }

}
