"use client";

import SignupForm from "@/components/SignupForm";
import { useSession } from "next-auth/react";


export default function Signup() {
    const { data: session, status } = useSession();
    console.log('Session data:', session);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-500">
                Bienvenue sur notre application authentification
            </h1>
            <SignupForm />

        </div>
    );
}
