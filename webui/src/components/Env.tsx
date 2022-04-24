import React from 'react';

interface kvProps {
    key: string;
    value: string;
}

interface envProps {
    kvs?: kvProps[];
}

export const Env: React.FunctionComponent<envProps> = ({ kvs }: envProps) => {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Environment
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">
                        <strong>This section contains the environment from the application.</strong>
                        <br/>
                        The table below will contain the keys/values from the application environment in Code Engine if read successfully.
                        <br /><br />
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Key</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kvs?.map(kv => {
                                        return (
                                            <tr>
                                                <td>{kv.key}</td>
                                                <td>{kv.value}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
