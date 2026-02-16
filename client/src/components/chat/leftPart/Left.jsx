import React from 'react';
import Header from './header';
import Users from './users';
import Footer from './footer';
import './leftPart.css';

export default function Left() {
  return (
    <div className="left">
      <Header />
      <div className="left__body">
        <Users/>
      </div>
      <Footer />
    </div>
  );
}
