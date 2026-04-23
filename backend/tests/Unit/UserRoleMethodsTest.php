<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class UserRoleMethodsTest extends TestCase
{
    public function test_is_admin_returns_true_only_for_role_two(): void
    {
        $admin = new User(['role' => 2]);
        $booster = new User(['role' => 1]);
        $customer = new User(['role' => 0]);

        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($booster->isAdmin());
        $this->assertFalse($customer->isAdmin());
    }

    public function test_is_booster_returns_true_for_role_one_and_two(): void
    {
        $admin = new User(['role' => 2]);
        $booster = new User(['role' => 1]);
        $customer = new User(['role' => 0]);

        $this->assertTrue($admin->isBooster());
        $this->assertTrue($booster->isBooster());
        $this->assertFalse($customer->isBooster());
    }

    public function test_role_values_are_in_expected_equivalence_classes(): void
    {
        $roles = [0, 1, 2];

        foreach ($roles as $role) {
            $user = new User(['role' => $role]);

            if ($role === 0) {
                $this->assertFalse($user->isAdmin());
                $this->assertFalse($user->isBooster());
            }

            if ($role === 1) {
                $this->assertFalse($user->isAdmin());
                $this->assertTrue($user->isBooster());
            }

            if ($role === 2) {
                $this->assertTrue($user->isAdmin());
                $this->assertTrue($user->isBooster());
            }
        }
    }
}
