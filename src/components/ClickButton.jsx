import React from 'react';

export default function ClickButton({ onSpreadClick, onOpenCase, currentCredits }) {
  return (
    <section style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
      <button className="click-btn" onClick={onSpreadClick}> КЛІК! </button>
      <div style={{ marginTop: '20px' }}>
        <h3>🎁 Кейси:</h3>
        <button onClick={onOpenCase} disabled={currentCredits < 100}>Відкрити кейс (100 кр.)</button>
      </div>
    </section>
  );
}