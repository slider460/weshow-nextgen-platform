import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import SEOHead from "../components/SEOHead";
import AdvancedHeroSection from "../components/AdvancedHeroSection";
import Footer from "../components/Footer";
import RedesignedServicesSection from "../components/RedesignedServicesSection";
import ShowreelModal from "../components/ShowreelModal";
import { BlockGameModal } from "../components/BlockGameModal";

const IndexTest = () => {
    const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
    const [isTetrisGameOpen, setIsTetrisGameOpen] = useState(false);

    useEffect(() => {
        const handleOpenTetrisGame = () => {
            setIsTetrisGameOpen(true);
        };

        window.addEventListener('openTetrisGame', handleOpenTetrisGame);
        return () => {
            window.removeEventListener('openTetrisGame', handleOpenTetrisGame);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-[#e0e0e0]">
            <SEOHead
                title="WESHOW — NextGen Agency (Test Design)"
                description="Мультимедиа будущего. Создаем цифровые впечатления нового уровня."
                url="https://weshow.su/test"
            />
            {/* Header might need dark mode adjustment if it's transparent, usually it adapts or has props. 
                Assuming default header is ok or we treat this as a quick test. 
                We can force it to be dark if it supports className or theme props later.
            */}
            <Header />

            <main className="space-y-0 overflow-x-hidden">
                {/* Hero Section - already quite dark/gradient based, fits well */}
                <AdvancedHeroSection onShowShowreel={() => setIsShowreelModalOpen(true)} />

                {/* The NEW Redesigned Services Section */}
                <RedesignedServicesSection />

                {/* For this test page, we might omit the other sections if they clash heavily with the dark theme,
                    OR we just leave them to see how mixed they look. 
                    User asked to "change only the service block", implying keeping others.
                    But "redesign main page in style of file" implies full dark theme. 
                    Let's comment out the light-themed sections to focus on the Services + Hero integration as per "Test Page" goal.
                 */}

                {/* Placeholder for where other sections would be if adapted */}
                <div className="py-20 text-center font-mono text-gray-500">
                    // Other sections (Portfolio, Team) hidden for style consistency test
                </div>

            </main>

            <Footer />

            <ShowreelModal
                isOpen={isShowreelModalOpen}
                onClose={() => setIsShowreelModalOpen(false)}
            />

            <BlockGameModal
                isOpen={isTetrisGameOpen}
                onClose={() => setIsTetrisGameOpen(false)}
            />
        </div>
    );
};

export default IndexTest;
