import { Routes } from '@angular/router';
import { ListComponent } from './Product_List/list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

export const routes: Routes = [
    {
        
            path: '',
            component: ListComponent,
         
    },
{
    path: 'list',
    component: ListComponent
},
{
    path: 'create-product',
    component: ProductCreateComponent
},
{
    path: 'product/:id',
    component: ProductCreateComponent
}

];
