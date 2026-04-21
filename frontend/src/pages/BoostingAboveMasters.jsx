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

const mastersRanks = [
    'Master 0 LP', 'Master 100 LP', 'Master 200 LP', 'Master 300 LP', 'Master 400 LP',
    'Grandmaster 0 LP', 'Grandmaster 100 LP', 'Grandmaster 200 LP', 'Grandmaster 300 LP', 'Grandmaster 400 LP',
    'Challenger 0 LP', 'Challenger 100 LP', 'Challenger 200 LP', 'Challenger 300 LP', 'Challenger 400 LP'
];

const servers = ['EUW', 'NA', 'KR', 'EUNE', 'BR', 'LAN', 'LAS', 'OCE', 'TR', 'RU', 'JP'];

const speeds = [
    { name: 'Basic', multiplier: 1, time: '3-5 days per 100 LP' },
    { name: 'VIP', multiplier: 1.5, time: '2-3 days per 100 LP' },
    { name: 'VIP+', multiplier: 2, time: '1-2 days per 100 LP' }
];

const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

export default function BoostingAboveMasters() {
    const { user } = useAuthContext();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        currentRank: 'Master 0 LP',
        desiredRank: 'Grandmaster 100 LP',
        currentLP: 0,
        desiredLP: 100,
        server: 'EUW',
        speed: 'VIP',
        playWithBooster: false,
        specificBooster: false,
        streaming: false,
        champions: 5,
        roles: 'Mid',
        notes: '',
        discordTag: '',
        accountInfo: {
            username: '',
            password: ''
        }
    });

    const updateField = (field, value) => {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const currentRankIndex = mastersRanks.indexOf(formData.currentRank);
        const desiredRankIndex = mastersRanks.indexOf(formData.desiredRank);

        if (currentRankIndex >= desiredRankIndex) {
            setTotalPrice(0);
            return;
        }

        const lpToClimb = (desiredRankIndex - currentRankIndex) * 100 + (formData.desiredLP - formData.currentLP);
        const basePricePer100LP = 50;
        const speedMultiplier = speeds.find(s => s.name === formData.speed)?.multiplier || 1;
        const championBonus = formData.champions > 3 ? (formData.champions - 3) * 5 : 0;
        const playWithBoosterBonus = formData.playWithBooster ? lpToClimb * 0.3 : 0;
        const streamingBonus = formData.streaming ? lpToClimb * 0.2 : 0;
        const calculatedPrice =
            (lpToClimb / 100 * basePricePer100LP * speedMultiplier) +
            championBonus + playWithBoosterBonus + streamingBonus;

        setTotalPrice(Math.round(calculatedPrice));
    }, [formData]);

    const handleAddToCart = () => {
        if (!user) {
            navigate('/bejelentkezes');
            return;
        }

        if (totalPrice === 0 || !formData.accountInfo.username || !formData.accountInfo.password) {
            alert('Please fill in all required fields');
            return;
        }

        const cartItem = {
            id: uuidv4(),
            serviceId: 2,
            orderType: 'Above Masters Boosting',
            currentRank: formData.currentRank,
            desiredRank: formData.desiredRank,
            currentLP: formData.currentLP,
            desiredLP: formData.desiredLP,
            server: formData.server,
            speed: formData.speed,
            champions: formData.champions,
            roles: formData.roles,
            notes: formData.notes,
            discordTag: formData.discordTag,
            accountInfo: formData.accountInfo,
            playWithBooster: formData.playWithBooster,
            streaming: formData.streaming,
            totalPrice: totalPrice,
            timestamp: new Date().toISOString()
        };

        addToCart(cartItem);
        navigate('/cart');
    };

    // Nested state handler account infohoz
    const updateAccount = (field, value) => {
    setFormData(prev => ({
        ...prev,
        accountInfo: {
            ...prev.accountInfo,
            [field]: value
        }
    }));
    };

    return (
        <div className="boosting-page">
            <div className="boosting-container">

                <HeroSection />

                <BoostingForm>
                            <RankSelection
                                formData={formData}
                                updateField={updateField}
                                mastersRanks={mastersRanks}
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
                                mastersRanks={mastersRanks}
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
