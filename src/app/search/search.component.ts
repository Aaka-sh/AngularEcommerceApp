import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  //activated route service is used to access information about the current route (URL)
  //route parameter and query parameters
  //we need to extract the search keyword from the route (URL)

  //product service instance is created to call the searchProduct method
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    //console.warn('from the query parameter: ',query);

    query &&
      this.product.searchProduct(query).subscribe((result) => {
        //filter the results based on the search keyword as the api is returning all the products
        let response: product[] = result.filter((item: product) =>
          Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          )
        );
        this.searchResult = response;
      });
    this.searchResult = undefined;
  }
}
