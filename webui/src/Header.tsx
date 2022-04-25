import React from 'react';

export const Header: React.FunctionComponent = () => {
    return (
        <>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a className="d-flex align-items-center text-dark text-decoration-none" href="/">
                        <span className="fs-4">My Code Engine Application</span>
                    </a>
                </div>

                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <p className="fs-5 text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                        in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </header>
        </>
    )
}
