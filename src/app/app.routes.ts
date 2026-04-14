import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    title: 'Home | My Store',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then((c) => c.ShopComponent),
    title: 'Shop | My Store',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
    title: 'Categories | My Store',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((c) => c.BrandsComponent),
    title: 'Brands | My Store',
  },
  {
  path: 'wishlist',
  loadComponent: () =>
    import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
  title: 'My Wishlist | My Store',
  canActivate:[authGuard],
},
{
  path: 'cart',
  loadComponent: () =>
    import('./features/cart/cart.component').then((c) => c.CartComponent),
  title: 'Shopping Cart | My Store',
    canActivate:[authGuard],
},
{
  path: 'subcategory-details',
  loadComponent: () =>
    import('./features/subcategory-details/subcategory-details.component').then((c) => c.SubcategoryDetailsComponent),
  title: 'Subcategory Products | My Store',
    canActivate:[authGuard],
},
{
  path: 'details/:id/:slug',
  loadComponent: () =>
    import('./features/details/details.component').then((c) => c.DetailsComponent),
  title: 'Product Details | My Store',
},
{
  path: 'category-details/:id',
  loadComponent: () =>
    import('./features/category-details/category-details.component').then((c) => c.CategoryDetailsComponent),
  title: 'Category Details | My Store',
},
{
  path: 'brand-details/:id',
  loadComponent: () =>
    import('./features/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent),
  title: 'Brand Details | My Store',
},
{
  path: 'checkout/:id',
  loadComponent: () =>
    import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
  title: 'Checkout | My Store',
    canActivate:[authGuard],
},
{
  path: 'allorders',
  loadComponent: () =>
  import('./features/orders/orders.component').then((c) => c.OrdersComponent),
  title: 'My Orders | My Store',
  canActivate:[authGuard],
},
{
  path: 'login',
  loadComponent: () =>
    import('./features/login/login.component').then((c) => c.LoginComponent),
  title: 'Log In | My Store',
},
{
  path: 'register',
  loadComponent: () =>
    import('./features/register/register.component').then((c) => c.RegisterComponent),
  title: 'Register | My Store',
},
{
  path: 'forgot',
  loadComponent: () =>
    import('./features/forgot/forgot.component').then((c) => c.ForgotComponent),
  title: 'Forgot Password | My Store',
},
{
  path: 'settings',
  loadComponent: () =>
    import('./features/settings/settings.component').then((c) => c.SettingsComponent),
  title: 'Settings | My Store',
},
{
  path: 'profile',
  loadComponent: () =>
    import('./features/profile/profile.component').then((c) => c.ProfileComponent),
  title: 'Profile | My Store',
},
{
  path:'**',
   loadComponent: () =>
    import('./features/notfound/notfound.component').then((c) => c.NotfoundComponent),
  title: 'Page Not Found  | My Store',
}
];
