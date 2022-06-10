import React, { useEffect, useState } from 'react';
import axios from "axios";

import { Header } from './Header';
import { Configmap } from './components/Configmap';
import { Env } from './components/Env';
import { Disk } from './components/Disk';
import { Secret } from './components/Secret';

interface IData {
    name: string;
    type: string;
    version: string;
    last_updated: string;
}

interface IEnv {
    key: string;
    value: string;
}

interface IDisk {
	filesystem:  string;
	size:        string;
	used:        string;
	available:       string;
	used_percent: string;
	mounted_on:   string;
}

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IData | undefined>();
    const [env, setEnv] = useState<IEnv[] | undefined>();
    const [disk, setDisk] = useState<IDisk[] | undefined>();
    const [secretValue, setSecretValue] = useState('');
    const [secretResponse, setSecretResponse] = React.useState('');
    const [secretResponseStatus, setSecretResponseStatus] = React.useState(false);

    useEffect(() => {
        setSecretValue('');
        setSecretResponse('');
    }, []);

    useEffect(() => {
        axios.get(`/api/read`, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                setData(response.data)
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/env`, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data)
                setEnv(response.data)
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/disk`, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data)
                setDisk(response.data)
            });
    }, []);

    const onChangeSecret = (event: React.FormEvent<HTMLInputElement>) => {
        setSecretValue(event.currentTarget.value);
        setSecretResponse('');
    }

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        axios.post(`/api/verify`, {
            secret: secretValue
        }, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                setSecretResponse(response.data.message);
                setSecretResponseStatus(response.data.status === "success" ? true : false);
            })
    }

    return (
        <React.Fragment>
            <div className="container py-3">
                <Header />

                <figure className="text-center">
                    <img src="/code-engine.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    <span className="fs-6">IBM Cloud Code Engine</span>
                </figure>
                
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <Configmap name={data?.name} type={data?.type} last_updated={data?.last_updated} version={data?.version} />

                    <Secret secretResponse={secretResponse} secretResponseStatus={secretResponseStatus} onFormSubmit={onFormSubmit} onChangeSecret={onChangeSecret} />

                    <Env kvs={env} />
                    <Disk disks={disk} />
                </div>
            </div>

        </React.Fragment>
    );
};