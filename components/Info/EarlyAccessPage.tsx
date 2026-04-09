import React, { useState } from 'react';
import { Mail, ArrowRight, Zap, Sparkles, Brain, CheckCircle, ChevronRight } from 'lucide-react';
import { UIStrings } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useSeoMetadata } from '@/hooks/useSeoMetadata';
import toast from 'react-hot-toast';

interface EarlyAccessPageProps {
    ui: UIStrings;
}

export const EarlyAccessPage: React.FC<EarlyAccessPageProps> = ({ ui }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useSeoMetadata({
        title: ui.earlyAccessTitle,
        description: ui.earlyAccessSubtitle,
        canonical: '/early-access'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            toast.error(ui.subscribeInvalidEmail);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${(window as any).API_BASE_URL || ''}/api/early-access`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'early-access-landing' }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success(ui.earlyAccessSuccess);
            } else {
                throw new Error('Failed to register');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(ui.subscribeError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-32">
                <div className="text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400 shadow-sm mx-auto">
                        <Zap className="w-3 h-3 text-indigo-500" />
                        Next Gen Neurotech
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent italic">
                        {ui.earlyAccessTitle}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                        {ui.earlyAccessSubtitle}
                    </p>

                    <div className="max-w-md mx-auto relative group">
                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 p-2 bg-card border border-border rounded-[2.5rem] shadow-2xl focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-500">
                                <div className="flex-1 flex items-center px-6">
                                    <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                                    <input 
                                        type="email" 
                                        placeholder={ui.subscribePlaceholder}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent outline-none py-4 text-base font-medium placeholder:text-muted-foreground/50"
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? '...' : ui.subscribeButton}
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <div className="p-8 bg-indigo-600/10 border border-indigo-600/30 rounded-[2.5rem] flex items-center justify-center gap-4 animate-in zoom-in-95 duration-500">
                                <CheckCircle className="w-8 h-8 text-indigo-500" />
                                <span className="text-lg font-bold text-indigo-400">{ui.earlyAccessSuccess}</span>
                            </div>
                        )}
                        <p className="mt-4 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold font-sans">
                            {ui.earlyAccessCta}
                        </p>
                    </div>
                </div>

                {/* Concept Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="space-y-4 text-left">
                            <h2 className="text-3xl font-black flex items-center gap-3">
                                <Brain className="w-8 h-8 text-indigo-500" />
                                {ui.principles}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {ui.earlyAccessConcept}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                { icon: Sparkles, title: "AI-Powered Adaptation", desc: "Dynamic prompts updated as you learn" },
                                { icon: Brain, title: "Neuro-centric UI", desc: "Interfaces that respond to your visual intensity" },
                                { icon: Zap, title: "Cognitive Capital", desc: "Turn internal quirks into marketable skills" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-card border border-border rounded-3xl hover:border-indigo-500/30 transition-colors group">
                                    <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-sm uppercase tracking-tighter">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative lg:pl-12 animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border shadow-2xl group">
                            <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-indigo-600/10 transition-colors duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Brain className="w-48 h-48 text-indigo-500/30 animate-pulse" />
                            </div>
                            {/* Decorative mock UI */}
                            <div className="absolute inset-8 border border-white/10 rounded-2xl flex flex-col p-6 space-y-4 backdrop-blur-sm">
                                <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                                <div className="h-4 w-full bg-white/5 rounded-full" />
                                <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                                <div className="mt-8 flex gap-2">
                                    <div className="h-10 w-10 bg-indigo-500/40 rounded-lg" />
                                    <div className="h-10 w-10 bg-white/10 rounded-lg" />
                                    <div className="h-10 w-10 bg-white/10 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Free Demo Promo */}
                <div className="bg-card border-2 border-indigo-500/20 rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap className="w-12 h-12 text-indigo-500/10 rotate-12" />
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                        {ui.tryExpressFree}
                    </h3>

                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        {ui.demoCtaDesc}
                    </p>

                    <button 
                        onClick={() => navigate('/survey/express_demo')}
                        className="inline-flex items-center gap-4 px-12 py-6 bg-foreground text-background rounded-[2.5rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
                    >
                        {ui.expressDiagnosticsCta}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />
                </div>
            </div>
        </div>
    );
};
