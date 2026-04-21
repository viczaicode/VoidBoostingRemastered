import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { v4 as uuidv4 } from 'uuid';

import RankSelection from '../components/boosting/RankSelection';
import PremiumOptions from '../components/boosting/PremiumOptions';
import GamePreferences from '../components/boosting/GamePreferences';
import AccountInfo from '../components/boosting/AccountInfo';
import Notes from '../components/boosting/Notes';
import PriceSummary from '../components/boosting/PriceSummary';
import HeroSection from '../components/boosting/HeroSection';
import BoostingForm from '../components/boosting/BoostingForm';
import ActionButtons from '../components/boosting/ActionButtons';

const ranks = [
    'Iron IV','Iron III','Iron II','Iron I',
    'Bronze IV','Bronze III','Bronze II','Bronze I',
    'Silver IV','Silver III','Silver II','Silver I',
    'Gold IV','Gold III','Gold II','Gold I',
    'Platinum IV','Platinum III','Platinum II','Platinum I',
    'Emerald IV','Emerald III','Emerald II','Emerald I',
    'Diamond IV','Diamond III','Diamond II','Diamond I'
];

const servers = ['EUW','NA','KR','EUNE','BR','LAN','LAS','OCE','TR','RU','JP'];

const speeds = [
    { name: 'Basic', multiplier: 1, time: '2-3 days per division' },
    { name: 'VIP', multiplier: 1.5, time: '1-2 days per division' },
    { name: 'VIP+', multiplier: 2, time: 'Same day completion' }
];

const roles = ['Top','Jungle','Mid','ADC','Support','Fill'];

export default function BoostingBelowMasters() {
    const { user } = useAuthContext();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentRank: 'Iron IV',
        desiredRank: 'Gold I',
        currentLP: 0,
        desiredLP: 0,
        server: 'EUW',
        speed: 'Basic',
        champions: 3,
        roles: 'Top',
        notes: '',
        discordTag: '',
        accountInfo: {
            username: '',
            password: ''
        }
    });

    const [totalPrice, setTotalPrice] = useState(0);

    // 🔹 field updater
    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 🔹 nested updater
    const updateAccount = (field, value) => {
        setFormData(prev => ({
            ...prev,
            accountInfo: {
                ...prev.accountInfo,
                [field]: value
            }
        }));
    };

    useEffect(() => {
        const currentRankIndex = ranks.indexOf(formData.currentRank);
        const desiredRankIndex = ranks.indexOf(formData.desiredRank);

        if (currentRankIndex >= desiredRankIndex) {
            setTotalPrice(0);
            return;
        }

        const divisionsToClimb = desiredRankIndex - currentRankIndex;
        const basePricePerDivision = 15;
        const speedMultiplier = speeds.find(s => s.name === formData.speed)?.multiplier || 1;
        const championBonus = formData.champions > 3 ? (formData.champions - 3) * 2 : 0;
        const calculatedPrice =
            (divisionsToClimb * basePricePerDivision * speedMultiplier) + championBonus;

        setTotalPrice(Math.round(calculatedPrice));
    }, [formData]);

    const handleAddToCart = () => {
        if (!user) {
            navigate('/bejelentkezes');
            return;
        }

        if (
            totalPrice === 0 ||
            !formData.accountInfo.username ||
            !formData.accountInfo.password
        ) {
            alert('Please fill in all required fields');
            return;
        }

        const cartItem = {
            id: uuidv4(),
            serviceId: 1,
            orderType: 'Below Masters Boosting',
            ...formData,
            totalPrice,
            timestamp: new Date().toISOString()
        };

        addToCart(cartItem);
        navigate('/cart');
    };

    return (
        <div className="boosting-page">
            <div className="boosting-container">

                <HeroSection />

                <BoostingForm>

                    <RankSelection
                        formData={formData}
                        updateField={updateField}
                        mastersRanks={ranks}
                    />

                    <PremiumOptions
                        formData={formData}
                        updateField={updateField}
                        servers={servers}
                        speeds={speeds}
                    />

                    <GamePreferences
                        formData={formData}
                        updateField={updateField}
                        roles={roles}
                    />

                    <AccountInfo
                        formData={formData}
                        updateField={updateField}
                        updateAccount={updateAccount}
                    />

                    <Notes
                        formData={formData}
                        updateField={updateField}
                    />

                    <PriceSummary
                        formData={formData}
                        totalPrice={totalPrice}
                        mastersRanks={ranks}
                        speeds={speeds}
                    />

                    <ActionButtons
                        totalPrice={totalPrice}
                        formData={formData}
                        onAddToCart={handleAddToCart}
                        onViewCart={() => navigate('/cart')}
                    />

                </BoostingForm>

            </div>
        </div>
    );
}