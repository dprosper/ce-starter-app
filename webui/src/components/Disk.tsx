import React from 'react';

interface diskProps {
	filesystem:  string;
	size:        string;
	used:        string;
	available:       string;
	used_percent: string;
	mounted_on:   string;
}

interface envProps {
    disks?: diskProps[];
}

export const Disk: React.FunctionComponent<envProps> = ({ disks }: envProps) => {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Disks
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">
                        <strong>This section contains the disks from the container.</strong>
                        <br/>
                        The table below will contain the disks from the application environment in Code Engine if read successfully.
                        <br /><br />
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">File System</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Used</th>
                                        <th scope="col">Available</th>
                                        <th scope="col">Used %</th>
                                        <th scope="col">Mounted on</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {disks?.map(disk => {
                                        return (
                                            <tr>
                                                <td>{disk.filesystem}</td>
                                                <td>{disk.size}</td>
                                                <td>{disk.used}</td>
                                                <td>{disk.available}</td>
                                                <td>{disk.used_percent}</td>
                                                <td>{disk.mounted_on}</td>
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
