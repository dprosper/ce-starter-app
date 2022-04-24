import React from 'react';

interface dataProps {
    name?: string;
    type?: string;
    version?: string;
    last_updated?: string;
}

export const Configmap: React.FunctionComponent<dataProps> = ({ name, type, version, last_updated }: dataProps) => {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Configmap
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">
                        <strong>This section contains the confimap that is mounted with the application.</strong><br />
                        The <code>data</code> directory contains one file: <code>random.json</code>. This file is added to the Code Engine
                        application as a configmap and is mounted as a file. The table below will contain the values from the <code>name</code>,
                        <code>type</code>, <code>version</code> and <code>last_updated</code> properties if the file is read successfully.

                        <br /><br />

                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item">{name}</li>
                            <li className="list-group-item">{type}</li>
                            <li className="list-group-item">{version}</li>
                            <li className="list-group-item">{last_updated}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
