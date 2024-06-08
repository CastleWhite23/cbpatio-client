import React, { useEffect } from 'react';

const AdsComponent = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('Adsense error:', e);
            }
        }
    }, []);

    return (
        <>
            <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2048819429966677"
            data-ad-slot="8845050075"
            data-ad-format="auto"
            data-full-width-responsive="true"
            />
        </>
    );
};

export { AdsComponent };