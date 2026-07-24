<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactOfficeContent;
use App\Models\Enquiry;
use App\Models\ExpertiseContent;
use App\Models\NavigationMenu;
use App\Models\ProcessContent;
use App\Models\ProjectContent;
use App\Models\ServiceContent;
use App\Models\TestimonialContent;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'users' => User::query()->where('role', 'admin')->where('active', true)->count(),
                'navigation' => NavigationMenu::query()->active()->count(),
                'expertise' => ExpertiseContent::query()->active()->count(),
                'projects' => ProjectContent::query()->active()->count(),
                'services' => ServiceContent::query()->active()->count(),
                'process' => ProcessContent::query()->active()->count(),
                'testimonials' => TestimonialContent::query()->active()->count(),
                'contact_offices' => ContactOfficeContent::query()->active()->count(),
                'enquiries' => Enquiry::query()->active()->count(),
                'new_enquiries' => Enquiry::query()->active()->where('status', 'new')->count(),
            ],
        ]);
    }
}
