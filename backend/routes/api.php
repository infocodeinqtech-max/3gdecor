<?php

use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CmsPublicController;
use App\Http\Controllers\Api\CmsResourceController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\AboutPageController;
use App\Http\Controllers\Api\MediaUploadController;
use Illuminate\Support\Facades\Route;

// Auth (public)
Route::post('/auth/login', [AuthController::class, 'login']);

// Public CMS reads
Route::get('/cms-public/site', [CmsPublicController::class, 'site']);
Route::get('/cms-lists/{resource}', [CmsResourceController::class, 'listIndex']);
Route::get('/cms-singletons/{resource}', [CmsResourceController::class, 'singletonShow']);
Route::get('/cms-sections/{storageKey}', [CmsResourceController::class, 'sectionShow']);
Route::post('/enquiries/otp/send', [EnquiryController::class, 'sendOtp']);
Route::post('/enquiries/otp/verify', [EnquiryController::class, 'verifyOtp']);
Route::post('/enquiries', [EnquiryController::class, 'store']);

// Protected admin
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/change-password/otp/send', [AuthController::class, 'sendChangePasswordOtp']);
    Route::post('/auth/change-password/otp/verify', [AuthController::class, 'verifyChangePasswordOtp']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Media uploads → public/uploads/{section}/...
    Route::post('/media/upload', [MediaUploadController::class, 'upload']);

    // CMS lists CRUD
    Route::post('/cms-lists/{resource}', [CmsResourceController::class, 'listStore']);
    Route::put('/cms-lists/{resource}/sync', [CmsResourceController::class, 'listSync']);
    Route::put('/cms-lists/{resource}/{id}', [CmsResourceController::class, 'listUpdate']);
    Route::delete('/cms-lists/{resource}/{id}', [CmsResourceController::class, 'listDestroy']);

    // CMS singletons
    Route::put('/cms-singletons/{resource}', [CmsResourceController::class, 'singletonUpsert']);

    // Section headers
    Route::put('/cms-sections/{storageKey}', [CmsResourceController::class, 'sectionUpsert']);

    // Enquiries
    Route::get('/enquiries', [EnquiryController::class, 'index']);
    Route::patch('/enquiries/{id}', [EnquiryController::class, 'update']);
    Route::delete('/enquiries/{id}', [EnquiryController::class, 'destroy']);

    // Admin users (superadmin)
    Route::get('/admin/users', [AdminUserController::class, 'index']);
    Route::post('/admin/users', [AdminUserController::class, 'store']);
    Route::put('/admin/users/{id}', [AdminUserController::class, 'update']);
    Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy']);
});

// Code By Moumita on 29-07-2026
// About page hero
    // Route::get('/about-page/hero', [AboutPageController::class, 'hero']);
    // Route::post('/about-page/hero', [AboutPageController::class, 'updateHero']);
    // Route::get('/about-page/hero/features', [AboutPageController::class, 'heroFeatures']);
    // Route::post('/about-page/hero/features', [AboutPageController::class, 'storeHeroFeature']);
    // Route::put('/about-page/hero/features/{id}', [AboutPageController::class, 'updateHeroFeature']);
    // Route::delete('/about-page/hero/features/{id}', [AboutPageController::class, 'destroyHeroFeature']);
