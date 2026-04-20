export default function BoostingForm({ children }) {
    return (
        <section className="order-section">
            <div className="order-container">
                <div className="order-form">
                    <h2>Configure Your Elite Boost</h2>
                    {children}
                </div>
            </div>
        </section>
    );
}