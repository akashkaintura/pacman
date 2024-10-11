import React from 'react';

const Ghost = ({ position }) => (
    <div className="ghost" style={{ top: position.y * 20, left: position.x * 20 }}>
        {/* Render Ghost here */}
    </div>
);

export default Ghost;
