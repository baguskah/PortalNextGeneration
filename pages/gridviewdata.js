import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'next/router';
import { Result, Icon, Button, Divider, List, Avatar, Carousel, Table, message } from 'antd';
import { fetch } from '@helper/fetch';
import Router from 'next/router';





const Assesment = (props) => {

    const { cookieLogin, router } = props
    // console.log(cookieLogin)

    let decode = {}
    try {
        decode = jwtDecode(cookieLogin)

    } catch (error) {
        message.error("Anda harus login terlebih dahulu")
    }

    const [dataParticipants, setParticipant] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [kolom, setKolom] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const payload = {
            TunnelId: router.query.tunnel
        }

        // setIsLoading(true);
        const { cookieLogin, refetchStep } = props;
        try {
            const response = await fetch({
                url: '/recruiter/participant/list-and-detail-by-tunnel',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`,
                }, data: {
                    ...payload
                }
            })

            const status = (response.data.status || false)

            if (!status) {
                message.error(response.data.message)
                // setIsLoading(false);
            } else {
                message.success(response.data.message)
                setParticipant(response.data.data)
                // console.log(response.data.data)           
            }

        } catch (error) {
            message.error("Server Error " + error)

            // setIsLoading(false);
        }
    }

    const onClickTunnel = (e) => {
        e.preventDefault();
        Router.push('/viewdatagrid/' + ktpNumber + '/' + TunnelId)
    }

    
    
    let columns = [];
    if (dataParticipants.length > 0) {
        columns = [];
        const theColumn = dataParticipants[0];
        const theHeaders = Object.keys(theColumn);
        const therealHeaders = theHeaders.map( (value, index) => {
            if (value !== "Answers" && value !== "Summaries") {
                columns.push({
                    key: value,
                    dataIndex:value,
                    name: value
                })
            }
        })


        const theRow = dataParticipants.map((value, index) => {     
        })
    }

    return (
        <>
            <div>
                <h1>Halo Selamat Datang {decode.email || ''} </h1>
                <span>Id Tunnel {props.router.query.tunnel}</span>
                <Table dataSource={dataParticipants} columns={columns} />
            </div>
        </>
    )
}

export default withRouter(Assesment);