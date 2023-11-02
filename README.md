# Кире Лалков - Internship assignment

## Graphql + Angular + Bootstrap

I managed to add product listings and details page. 
The search filter and the sorting options are using the GraphQL api's for searching and sorting.

For state management i resorted to RxJs observables and angular services for distributing state across components. 

For the activeOrder api there should be a user authenticated, although i tried making a registration and login, the activeOrder still returned null even after adding orders. 
Eventually i resorted to storing products as orders locally so i can at least make a somewhat usable cart. 

