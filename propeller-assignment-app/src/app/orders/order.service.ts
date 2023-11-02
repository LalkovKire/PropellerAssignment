import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Variants } from '../products/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderSubject = new BehaviorSubject<Variants[]>([]);
  public orders$ : Observable<Variants[]> = this.orderSubject.asObservable();

  constructor(private apollo: Apollo) { }

  public addProductToOrderList(id: number) {
      this.apollo.mutate({
        mutation: gql`
        mutation {
          addItemToOrder(productVariantId: 1, quantity: 1) {
             __typename
             ...on Order {
               lines {
									productVariant {
										name
                    sku
                    price
                    stockLevel
                    
                  }
              }
            }
         }
       }`
      }).subscribe((res : any) => {
        const response = res.data.addItemToOrder.lines[0].productVariant
        const currentCartStatus = this.orderSubject.getValue();

        if (currentCartStatus) {
            this.orderSubject.next([...currentCartStatus,response]);
        } else {
            this.orderSubject.next(response);
        }
      });
  }
  
}
