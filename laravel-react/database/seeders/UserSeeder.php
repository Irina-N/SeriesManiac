<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [1,2,3,4,5,6,7,8,9,10];
        foreach($data as $key){
            User::create([
                'login' => 'testuser'.$key,
                'email' => 'testuser'.$key.'@gmail.com',
                'password' => Hash::make(12345678),
            ]);
        }
        
    }
}
