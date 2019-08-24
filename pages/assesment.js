import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Result, Icon, Button, Divider, List, Avatar, Carousel, Table, message } from 'antd';
import { fetch } from '@helper/fetch';
import Router from 'next/router';





const Assesment = (props) => {

    const { cookieLogin } = props
    // console.log(cookieLogin)

    let decode = {}

    try {
        decode = jwtDecode(cookieLogin)

    } catch (error) {
        message.error("Anda harus login terlebih dahulu")
    }

    const [dataSource, setDataSource] = useState([
        {
            ktp: 'Loading Data...',
            name: 'Loading Data...',
            jalur: 'Loading Data...',
        },
        {
            ktp: 'Loading Data...',
            name: 'Loading Data...',
            jalur: 'Loading Data...',
        },
    ])


    const columns = [
        {
            title: 'Nomor KTP',
            dataIndex: 'ktp',
            key: 'ktp',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Jalur',
            dataIndex: 'jalur',
            key: 'jalur',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={(e) => onNilaiSekarang(e, record.ktp, record.tunnelId)}>Nilai Sekarang</a>
                </span>
            ),
        },
    ];

    const onNilaiSekarang = (e, ktpNumber, tunnelId) => {
        e.preventDefault();
        Router.push('/detail-participant/'+ktpNumber+'/'+tunnelId)
    }

    useEffect(() => {
        fetchListPeserta();
    }, [])

    const fetchListPeserta = async () => {

        const payload = {
            emailRecruiter: decode.email,
        }

        const fetchedData = [];

        // setIsLoading(true);
        const { cookieLogin, refetchStep } = props;
        try {
            const response = await fetch({
                url: 'recruiter/participant/by-recruiter',
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
                console.log(response.data.data)

                response.data.data.map((value, index) => {
                    fetchedData.push({
                        ktp: value.ktpNumber,
                        name: value.Identity.name,
                        jalur: value.Tunnel.name,
                        tunnelId:value.tunnelId
                    })
                })

                setDataSource(fetchedData)

                // message.success(response.data.message)
                // fetchAllParticipantTersisa();
                // fetchAllParticipantAssign();
                // setAllParticipantAvailable(response.data.data)
            }

        } catch (error) {
            message.error("Something Error")
            // setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <h1>Halo Selamat Datang {decode.email || ''} </h1>
                <p>Ada 100 Kandidat FIM yang harus kamu nilai untuk lolos mengikuti pelatihan FIM</p>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    )
}

export default Assesment;