import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/AlertSlice';
import { setUser } from '../../redux/features/Auth/AuthSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../../pages/AdminDashboard';

const PrivateRoutes = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.presistedReducer.auth);

    const getuser = async () => {
        dispatch(showLoading());
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/getuser", {
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });


            dispatch(hideLoading());
            if (res.data.success) {

                dispatch(setUser(res.data.data));
            } else {

                localStorage.clear();
                return <Navigate to="/Login" />;
            }
        } catch (error) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        if (!user) {
            getuser();
        }
    })

    if (localStorage.getItem('token') || user) {



        return children;





    } else {
        return <Navigate to="/Login" />;
    }
};

export default PrivateRoutes;