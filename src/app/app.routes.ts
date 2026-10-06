import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Classic Jack Construction | Premium Home Construction',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About Us | Classic Jack Construction',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Our Projects | Classic Jack Construction',
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details.component').then(
        (m) => m.ProjectDetailsComponent
      ),
    title: 'Project | Classic Jack Construction',
  },
  {
    path: 'packages',
    loadComponent: () =>
      import('./pages/packages/packages.component').then((m) => m.PackagesComponent),
    title: 'Construction Packages & Pricing | Classic Jack Construction',
  },
  {
    path: 'estimate',
    loadComponent: () =>
      import('./pages/estimate/estimate.component').then((m) => m.EstimateComponent),
    title: 'Free Construction Cost Estimator | Classic Jack Construction',
  },
  {
    path: 'process',
    loadComponent: () =>
      import('./pages/process/process.component').then((m) => m.ProcessComponent),
    title: 'Our Construction Process | Classic Jack Construction',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact Us | Classic Jack Construction',
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      import('./components/admin-panel/admin-panel').then((m) => m.AdminPanelComponent),
    title: 'Admin Console | Classic Jack Construction',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./components/users/users').then((m) => m.UsersComponent),
    title: 'Team Management | Classic Jack Construction',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/projects',
    loadComponent: () =>
      import('./components/projects/projects').then((m) => m.ProjectsComponent),
    title: 'Project Management | Classic Jack Construction',
    canActivate: [adminGuard],
  },
  {
    path: 'admin/app-config',
    loadComponent: () =>
      import('./components/app-config/app-config').then((m) => m.AppConfigComponent),
    title: 'App Configuration | Classic Jack Construction',
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];