import React from 'react';

interface secretProps {
    secretResponse: string;
    secretResponseStatus: boolean;
    onFormSubmit: (
        event: any,
    ) => void;
    onChangeSecret: (
        event: React.FormEvent<HTMLInputElement>,
    ) => void;
}

export const Secret: React.FunctionComponent<secretProps> = ({ secretResponse, secretResponseStatus, onFormSubmit, onChangeSecret }: secretProps) => {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Secret
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body">
                        <strong>This section is used to verify a secret that is added to the appplication.</strong><br />
                        The value of <code>APP_SECRET</code> is read from the server and compared to the value you enter below.
                        <br /><br />

                        <form className="row g-3" onSubmit={onFormSubmit}>
                            <div className="col-auto">
                                <label htmlFor="inputSecret" className="visually-hidden">Secret</label>
                                <input type="password" className="form-control" id="inputSecret" placeholder="secret" onChange={onChangeSecret} />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Compare secret</button>
                            </div>
                        </form>
                        {
                            secretResponse !== '' ?
                                secretResponseStatus ?
                                    <div className="alert alert-success" role="alert">
                                        {secretResponse}
                                    </div>
                                    :
                                    <div className="alert alert-danger" role="alert">
                                        {secretResponse}
                                    </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
