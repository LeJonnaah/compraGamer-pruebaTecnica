import { Component } from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  category: string | undefined;

  onShowCategory(newCategory: string) {
    this.category = newCategory;
  }
}
