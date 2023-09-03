import { useEffect } from 'react';
import { useState } from 'react';
import CircleLoader from "react-spinners/CircleLoader";

const Spinner = (props) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className='spinner-container'>
            <div className='spinner-inner'>
                <CircleLoader
                    color="#ffffff"
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>

    )
}

export default Spinner