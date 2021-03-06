import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import PostsController from './controllers/posts.controller';
import ItemsController from './controllers/items.controller';
import DestinationsController from './controllers/destinations.controller';
import BannersController from './controllers/banners.controller';
import BookingController from './controllers/booking.controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);

// Authentication
routes.post('/auth/login', AuthController.login);

// Users
routes.get('/users', UsersController.search);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// Post
routes.get('/posts', PostsController.search);
routes.post('/posts', authenticate, PostsController.create);
routes.get('/posts/:id', PostsController._populate, PostsController.fetch);
routes.delete('/posts/:id', authenticate, PostsController.delete);

// Admin
routes.get('/admin', accessControl('admin'), MetaController.index);

// Item
routes.get('/item', ItemsController.search);

// Categories
routes.get('/category', ItemsController.getCategories)

// Destinations
routes.get('/destination', DestinationsController.search)
routes.get('/random-destination-image',DestinationsController.getDestinationRandomImage)

// Categories
routes.get('/banner', BannersController.search)

// Accommodation Types
routes.get('/item-accommodationtype/', ItemsController.getAccomodationTypes)

// Booking
routes.post('/book/', BookingController.book)

routes.use(errorHandler);

export default routes;
