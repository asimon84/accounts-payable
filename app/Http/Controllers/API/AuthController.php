<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Validator;

class AuthController extends Controller
{
    /**
     * Default name for Tokens
     *
     * @param string
     */
    const DEFAULT_TOKEN_NAME = 'API Bearer Token';

    /**
     * Default number of minutes before Tokens expire
     *
     * @param string
     */
    const DEFAULT_TOKEN_EXPIRATION_MINUTES = 5000;

    /**
     * Default Token Abilities
     *
     * @param array
     */
    const DEFAULT_TOKEN_ABILITIES = [
//        '*',
        "get-user",
        "edit-user",
        "delete-user",
        "get-records",
        "add-records",
        "edit-records",
        "delete-records",
    ];

    /**
     * Create a new User Token
     *
     * @param Request $request
     * @return array
     */
    public function createToken(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Task failed. Token not created.',
                'error' => 'Unauthorized'
            ], 401);
        }

        $tokenName = $request->get('tokenName', self::DEFAULT_TOKEN_NAME);
        $tokenAbilities = $request->get('abilities', self::DEFAULT_TOKEN_ABILITIES);
        $tokenExpirationMinutes = now()->addMinutes($request->get('expirationMinutes', self::DEFAULT_TOKEN_EXPIRATION_MINUTES));

        $user = Auth::user();

        $token = $user->createToken(
            $tokenName,
            $tokenAbilities,
            $tokenExpirationMinutes
        )->plainTextToken;

        $success = (!empty($token) && !empty($user)) ? true : false;
        $message = ($success) ? 'Token created successfully.' : 'Task failed. Token not created.';

        return response()->json([
            'success' => $success,
            'message' => $message,
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Register a New User
     *
     * @param Request $request
     * @return mixed
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Task failed. User not registered.',
                'error' => $validator->errors()
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(100),
        ]);

        $token = $user->createToken(
            self::DEFAULT_TOKEN_NAME,
            self::DEFAULT_TOKEN_ABILITIES,
            now()->addMinutes(self::DEFAULT_TOKEN_EXPIRATION_MINUTES)
        )->plainTextToken;

        $success = (!empty($token) && !empty($user)) ? true : false;
        $message = ($success) ? 'User registered successfully.' : 'Task failed. User not registered.';

        return response()->json([
            'success' => $success,
            'message' => $message,
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Log a User in with an Email & Password
     *
     * @param Request $request
     * @return mixed
     */
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Task failed. Login unsuccessful.',
                'error' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken(
            self::DEFAULT_TOKEN_NAME,
            self::DEFAULT_TOKEN_ABILITIES,
            now()->addMinutes(self::DEFAULT_TOKEN_EXPIRATION_MINUTES)
        )->plainTextToken;

        $success = (!empty($token) && !empty($user)) ? true : false;
        $message = ($success) ? 'Login successful.' : 'Task failed. Login unsuccessful.';

        return response()->json([
            'success' => $success,
            'message' => $message,
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Log current User out
     *
     * @param Request $request
     * @return mixed
     */
    public function logout(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Task failed. Logout unsuccessful.',
                'error' => 'Unauthorized'
            ], 401);
        }

        Auth::user();

        $success = (bool) $request->user()->tokens()->delete();
        $message = ($success) ? 'Logout successful.' : 'Task failed. Logout unsuccessful.';

        return response()->json([
            'success' => $success,
            'message' => $message
        ]);
    }
}