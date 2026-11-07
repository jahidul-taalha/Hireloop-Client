
import type { Metadata } from "next"

import { AuthCard } from "@/components/auth-card"
import { authClient } from "@/lib/auth-client";
import {AuthFormData} from "@/components/auth-form"
export const metadata: Metadata = {
    title: "Sign Up — HireLoop",
}

export default function SignUpPage() {
    const handleSignUp = async (data: AuthFormData) => {
        const { data: signUpData, error } = await authClient.signUp.email({
            name: data.name, // required, The name of the user.
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.

            callbackURL: "/", // An optional URL to redirect to after the user signs up.
        });
        console.log('signUpData:', signUpData, error);
    }
    return <AuthCard mode="sign-up" onSubmit={handleSignUp}/>
}
