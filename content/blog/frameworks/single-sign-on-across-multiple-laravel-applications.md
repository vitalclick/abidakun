---
layout: Post
title: Solution to achieve a Single Sign-On (SSO) across Multiple Laravel Applications
description: Solution to achieve a single sign-on (SSO) across multiple Laravel applications running as subdomains of a single domain. Here's a detailed step-by-step guide with the necessary code to implement this.
date: '2023-07-03'
tags:
  - frameworks
images:
  - src: /photos/single-sign-on-across-multiple-laravel-applications.jpg
    alt: image alt attribute
---

Solution to achieve a single sign-on (SSO) across multiple Laravel applications running as subdomains of a single domain. Here's a detailed step-by-step guide with the necessary code to implement this.

##### Step 1: Set Up Shared Session Driver

In order to share the session data across multiple subdomains, you need to configure a shared session driver in Laravel. This can be achieved by using a database or Redis as the session driver. For this example, we'll use the Redis session driver.

1. Install the Redis PHP extension if you haven't already:
   ```
   pecl install redis
   ```

2. Configure Laravel to use the Redis session driver by updating the `SESSION_DRIVER` value in the `.env` file:
   ```
   SESSION_DRIVER=redis
   ```

3. Set up the Redis connection configuration in the `config/database.php` file:
   ```php showLineNumbers
   'redis' => [
       'client' => 'predis',
       'default' => [
           'host' => env('REDIS_HOST', '127.0.0.1'),
           'password' => env('REDIS_PASSWORD', null),
           'port' => env('REDIS_PORT', 6379),
           'database' => 0,
       ],
   ],
   ```

##### Step 2: Configure Session Domain

To ensure the session cookies are accessible across all subdomains, you need to set the `SESSION_DOMAIN` value in the `.env` file to the parent domain:

```
SESSION_DOMAIN=.yourdomain.com
```

##### Step 3: Implement SSO Logic

Now, we'll implement the SSO logic in each Laravel application to check the session and automatically log in the user if they are already authenticated in any of the other applications.

1. In each Laravel application, create a new middleware called `SSOMiddleware`:
   ```
   php artisan make:middleware SSOMiddleware
   ```

2. Open the `SSOMiddleware` class and modify the `handle` method as follows:
   ```php showLineNumbers
   <?php

   namespace App\Http\Middleware;

   use Closure;
   use Illuminate\Support\Facades\Auth;

   class SSOMiddleware
   {
       public function handle($request, Closure $next)
       {
           if (!Auth::check()) {
               // Get the session ID from the request
               $sessionId = $request->cookies->get(config('session.cookie'));

               // Set the session ID for the current request
               if ($sessionId) {
                   session_id($sessionId);
               }

               // Start the session
               session()->start();

               // Check if the user is authenticated in any of the other applications
               if (session('authenticated')) {
                   // Log in the user
                   Auth::loginUsingId(session('user_id'));

                   // Update the session with the current user's ID
                   session(['user_id' => Auth::id()]);
               }
           }

           return $next($request);
       }
   }
   ```

3. Register the `SSOMiddleware` in the middleware stack by adding it to the `$middleware` array in the `app/Http/Kernel.php` file:
   ```php showLineNumbers
   protected $middleware = [
       // Other middleware...
       \App\Http\Middleware\SSOMiddleware::class,
   ];
   ```

##### Step 4: Enable SSO Routes

You need to define a route in each Laravel application to serve as the endpoint for logging in and setting the SSO session data.

1. In each Laravel application, create a new route in the `routes/web.php` file:
   ```php showLineNumbers
   Route::get('/sso-login', function () {
       // Set the session data for SSO
       session(['authenticated' => true
    'user_id' => Auth::id()]);

       return redirect('/'); // Redirect to the desired page after SSO login
   })->name('sso-login');
   ```

##### Step 5: Update Login Logic

Modify the login logic in each Laravel application to include a link or button that redirects the user to the SSO login route of the other applications.

```php showLineNumbers
public function login(Request $request)
{
    // Perform the regular login process
    
    // Redirect the user to the SSO login route of the other applications
    $ssoLoginUrl = 'http://app2.yourdomain.com/sso-login'; // Replace with the SSO login route of the other application
    return redirect($ssoLoginUrl);
}
```

Ensure you replace `'http://app2.yourdomain.com/sso-login'` with the actual URL of the SSO login route in the other application.

That's it! With these steps, you have set up a basic SSO implementation across multiple Laravel applications. When a user logs in to one application, they will be automatically logged in to the others as well, thanks to the shared session data.

Repeat the same steps for each Laravel application, ensuring they all have the shared session driver, session domain, SSO middleware, SSO route, and modified login logic.

Note: This implementation assumes that all applications share the same user database or use a centralized authentication system.

Remember to test and adjust the implementation based on your specific requirements and application architecture.