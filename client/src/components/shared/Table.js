import React from 'react'
import Spinner from './Spinner'

const Table = ({ headers, data }) => {

    if (data === null || data.length === 0) {
        return <Spinner />
    }
    return (
        <>
            <h2>Section title</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} scope="col">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>

                                {headers.map((header, cellIndex) => ((header === 'logo') ? (<td key={cellIndex}><img style={{ height: 100, width: 100 }} /></td>) : (<td key={cellIndex}>{row[header]}</td>)

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="dashboard.js"></script>

        </>
    )
}

export default Table
