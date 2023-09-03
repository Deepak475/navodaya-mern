import Alert from 'react-bootstrap/Alert';

function AlertInfo(props) {
    return (
        <>
            {[props.color].map((variant) => (
                <Alert key={variant} variant={variant}>
                    {props.msg}
                </Alert>
            ))}
        </>
    );
}

export default AlertInfo;