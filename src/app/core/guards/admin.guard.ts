import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notify = inject(NotificationService);

  if (auth.isLoggedIn()) return true;

  notify.show('Please log in to access the admin panel.', 'info');
  return router.createUrlTree(['/']);
};