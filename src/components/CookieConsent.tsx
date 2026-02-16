import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem('weshow_cookie_consent');
        if (!consent) {
            // Show popup after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('weshow_cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 md:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="text-gray-800 text-sm md:text-base leading-relaxed max-w-4xl">
                            <p className="font-medium mb-1">Мы используем файлы cookie</p>
                            <p className="text-gray-600">
                                Продолжая использовать этот сайт и нажимая кнопку «Принимаю», вы даете согласие на обработку файлов cookie.
                                Подробнее в <Link to="/privacy" className="text-blue-600 hover:underline underline-offset-4">Политике обработки персональных данных</Link>.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Button
                                onClick={handleAccept}
                                className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                ПРИНИМАЮ
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
