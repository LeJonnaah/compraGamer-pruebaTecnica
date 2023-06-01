import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubcategoryService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  categories: any[] | undefined;
  categoriesSubscription: Subscription | undefined;

  @Output() showCategory = new EventEmitter<string>();


  constructor(
    private subcategoryService: SubcategoryService,
  ) { }

  ngOnInit(): void {
    this.subcategoryService.getSubcategories()
      .subscribe((categories: any[]) => {
        console.log(categories);
        this.categories = categories;
      });
  }

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
