import React from 'react';
import Footer from './Footer';
import Header from './Header';
import RetreatList from './RetreatList';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pb-16 sm:pb-2">
                <RetreatList />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
