import React, {useEffect} from "react";

const AdSense = () => {
    
    useEffect(() => {
        
        if (adsbygoogle && !adsbygoogle.loaded)
            (adsbygoogle = window.adsbygoogle || []).push({});
        
    }, []);

    return (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2048819429966677"
          data-ad-slot="8845050075"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
    );
  };

  export {AdSense}