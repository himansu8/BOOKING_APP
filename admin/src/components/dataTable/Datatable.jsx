import { useEffect, useState } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
//import { userColumns, userRows } from '../../dataTableSource';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

function Datatable({columns}) {
    const location = useLocation()
    const path = location.pathname.split("/")[1]
    const [list, setList] = useState([])
    const { data } = useFetch(`/${path}`)
    useEffect(() => {
        setList(data)
    }, [data])
   async function handledelete(id) {
    try {
        await axios.delete(`/${path}/${id}`)
        setList(list.filter((item) => item._id !== id))
    } catch (error) {
        console.log(error)
    }
    }
    console.log(list)
    const actionColumn = [{
        field: "action", headerName: "Action", width: 200, renderCell: (params) => {
            return (
                <div className="cellAction">
                    <Link to="/users/test" style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
                    <div className="deleteButton" onClick={() => handledelete(params.row._id)}>Delete</div>
                </div>
            );
        },
    },
    ];
    return (
        <div className='datatable'>
            <div className="datatableTitle">
                {path}
                <Link to={`/${path}/new`} className='link'>
                    Add New
                </Link>
            </div>
            {/* <DataGrid
                className='datagrid'
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9, 10]}
                checkboxSelection
            /> */}
            <DataGrid
                className="datagrid"
                rows={list}
                columns={columns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[9, 10]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    )
}

export default Datatable