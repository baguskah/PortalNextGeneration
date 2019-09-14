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

    const [dataTunnels, setTunnels] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetchTunnel();
    }, [])

    const fetchTunnel = async () => {
        setLoading(true)
        try {
          const response = await fetch({
            url: '/tunnel/alltunnel',
            method: 'get',
            headers: {
              'Authorization': `Bearer ${cookieLogin}`
            },
          })
    
          const status = (response.data.status || false)
          
          if (!status) {
            message.error("Server Error")
            setTunnels(null)
            setLoading(false)
          } else {
            const responseData = response.data.data || []
            setTunnels(responseData)
            setLoading(false)
          }
  
        } catch (error) {          
          message.error("Server Error")
          setTunnels(null)
          setLoading(false)
        }
      }

    const onClickTunnel =(e,idTunnel) => {
        e.preventDefault();
        Router.push('/gridviewdata/' + idTunnel)
    }


    return (
        <>
            <div>
                <h1>Halo Selamat Datang {decode.email || ''} </h1>
                <p>Silahkan pilih jalur yang ingin didownload</p>
                <ul>
                    {dataTunnels.map((value,index)=>(
                        <li onClick={(e)=>onClickTunnel(e,value.id)} >{value.name}</li>
                    ))}
                </ul>
                
            </div>
        </>
    )
}

export default Assesment;