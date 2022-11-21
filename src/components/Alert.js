import React, {forwardRef, useImperativeHandle} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alert = forwardRef((props, ref) => {
    
    const notify = () => {
        console.log("called");
        if(props.alert === null)
            return;

        if(props.alert.type === "success")
            toast.success(props.alert.msg);

        if(props.alert.type === "info")
            toast.info(props.alert.msg);

        if(props.alert.type === "warn")
            toast.warn(props.alert.msg);

        if(props.alert.type === "error")
            toast.error(props.alert.msg);
    }   

    useImperativeHandle(ref,notify);

    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            />
        </div>
    )
});

export default Alert;
