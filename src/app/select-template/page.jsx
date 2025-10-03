// src/app/select-template/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; // ✅ setDoc use karo
import { db } from "../lib/firebase";

const templates = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean and simple design",
        gradient: "from-gray-100 to-gray-300"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Corporate and formal style",
        gradient: "from-blue-100 to-blue-300"
    },
    {
        id: "creative",
        name: "Creative",
        description: "Colorful and modern design",
        gradient: "from-purple-100 to-pink-300"
    }
];

export default function SelectTemplate() {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleTemplateSelect = async () => {
        if (!selectedTemplate || !user) return;

        setLoading(true);
        try {
            // ✅ setDoc with merge: true use karo
            // select-template/page.js → handleTemplateSelect
            await setDoc(doc(db, "users", user.uid), {
                username: user.displayName || user.email.split('@')[0], // <-- yeh add karo
                template: selectedTemplate,
                onboarded: true,
                email: user.email,
                createdAt: new Date()
            }, { merge: true });

            router.push("/dashboard");
        } catch (error) {
            console.error("Error saving template:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-white text-center mb-2">Choose Your Portfolio Style</h1>
                <p className="text-gray-300 text-center mb-8">Select a template that matches your personality</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`bg-white/5 border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedTemplate === template.id
                                    ? "border-purple-500 bg-white/10"
                                    : "border-white/20 hover:border-white/40"
                                }`}
                            onClick={() => setSelectedTemplate(template.id)}
                        >
                            <div className={`h-32 rounded-lg mb-4 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                                <span className="text-2xl font-bold text-gray-800">{template.name}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                            <p className="text-gray-300">{template.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleTemplateSelect}
                        disabled={!selectedTemplate || loading}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition flex items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Setting up your portfolio...
                            </>
                        ) : (
                            `Continue with ${selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name : 'Template'}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}