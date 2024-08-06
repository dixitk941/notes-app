import React, { useState } from 'react';
import './Hero.css';
import LoginModal from './LoginModal'; // Import the LoginModal component

const Hero = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleGetStartedClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section className="hero">
			<div className="container">
				<div className="typewriter">
					<h1>Welcome to GenZ-Notes</h1>
				</div>
				<p className="hero-description">Unleash your inner Sole and explore the digital world.</p>
				<button className="hero-button" onClick={handleGetStartedClick}>Get Started</button>
				<div className="hero-info">
					<p>GenZ-Notes is your ultimate digital notebook. Capture your thoughts, ideas, and inspirations in one place. Stay organized and productive with our intuitive interface and powerful features.</p>
					<ul className="hero-features">
						<li><i className="fas fa-check-circle"></i> Easy to use</li>
						<li><i className="fas fa-check-circle"></i> Secure and private</li>
						<li><i className="fas fa-check-circle"></i> Accessible anywhere</li>
						<li><i className="fas fa-check-circle"></i> Customizable themes</li>
					</ul>
				</div>
			</div>
			{isModalOpen && <LoginModal onClose={handleCloseModal} />}
		</section>
	);
};

export default Hero;