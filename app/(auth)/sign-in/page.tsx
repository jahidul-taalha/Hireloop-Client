

import { AuthCard,  } from "@/components/auth-card"
import { authClient } from "@/lib/auth-client";
import {AuthFormData} from "@/components/auth-form";


export default function SignInPage() {
    const handleSignIn = async (data: AuthFormData) => {
        const { data: SignInRespones, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        });
        console.log('SingInRespones', SighnInRespones, error);
    }
    return <AuthCard mode="sign-in" />
}
