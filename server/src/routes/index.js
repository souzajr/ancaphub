// Express
const express = require("express");
const router = express.Router();

// Middlewares
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const multer = require('multer');

// Config
const multerConfig = require('../config/multer');

// Controllers
const {
  Auth,
  Category,
  File,
  Library,
  Notification,
  Post,
  Profile,
  Rate,
  Search,
  User,
  Bookmark
} = require('../controllers')

// Routes

// Auth
router.get('/auth', auth, Auth.get)
router.post('/auth', Auth.login)

// Category
router.get('/categories', Category.getAll)
router.get('/categories/:id', Category.get)
router.post('/categories', auth, admin, Category.insert)
router.put('/categories/:id', auth, admin, Category.update)

// File
router.get('/files', File.get)
router.post('/files', auth, multer(multerConfig).single('file'), File.insert)

// Library
router.get('/library/', Library.getAll)
router.get('/library/:id', Library.get)
router.post('/library/', auth, Library.insert)
router.put('/library/:id', Library.update)
router.delete('/library/:id', Library.remove)
router.post('/library/:id/approve', Library.approve)
router.get('/library/auth/contributions', auth, Library.getAuthContributions)
router.post('/library/auth/addtolibrary', auth, Library.addToLibrary)

// Bookmark
router.get('/bookmarks', auth, Bookmark.getAll)
router.post('/bookmarks', auth, Bookmark.insert)

// Notification
router.get('/notifications', auth, Notification.getAll)
router.put('/notifications/markallasread', auth, Notification.markAllAsRead)

// Post
router.get('/posts/auth/feed', auth, Post.getUserFeed)
router.get('/posts/user/:id', auth, Post.getUserPosts)
router.post('/posts', auth, Post.insert)
router.delete('/posts/:id', auth, Post.remove)
router.post('/posts/:id/like', auth, Post.like)
router.post('/posts/:id/unlike', auth, Post.like)

// Profile
router.get('/users/:id/followers', Profile.getFollowers)
router.get('/users/:id/following', Profile.getFollowing)
router.get('/users/:id/contributions', Profile.getContributions)
router.get('/users/:id/library', Profile.getLibrary)
router.post('/users/:id/follow', auth, Profile.follow)
router.post('/users/:id/unfollow', auth, Profile.unfollow)

// Rate
router.get('/rates/:id', Rate.get)
router.post('/rates', auth, Rate.insert)

// Search
router.post('/search', Search.searchTerm)
router.get('/search/nearby', auth, Search.searchNearbyUsers)

// User
router.get('/users', User.getAll)
router.get('/users/:id', User.get)
router.post('/users', User.insert)
router.put('/users', auth, User.update)
router.patch('/users/setlocation', auth, User.updateLocation)

module.exports = router