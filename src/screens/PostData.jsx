import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DataTable,{createTheme} from 'react-data-table-component';
import Header from '../screens/Header';
import Footer from '../screens/Footer';
import ExpandableComponent from '../components/ExpandableComponent';

function PrintTable(props){
    const [currentRow, setCurrentRow] = useState(null);
    const { columns,data } = props;
    const paginationrows = 5;
    const paginationRowsPerPageOptions = [5,10, 15, 20, 25, 30]
    createTheme('solarized', {
        text: {
          primary: '#0519f5',
          secondary: '#0519f5',
        },
        background: {
          default: 'white',
        },
        context: {
          background: 'white',
          text: 'white',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

    return(
        <div>
            <DataTable
                title="API Result"
                columns={columns}
                data={data}
                theme="solarized"
                fixedHeader
                pagination
                paginationPerPage={paginationrows}
                paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            >
            </DataTable>
        </div>
    )
}

function PostData(props) {
    // set states for cityCode and domain 
    const [cityCode, setCityCode] = useState('');
    const [domain, setDomain] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [subscriber_id,setSubscriberId] = useState('');

    const columns = [
        {
            name: 'Subscriber Id',
            selector: row => row.subscriber_id,
            wrap: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            wrap: true
        },
        {
            name: 'UK Id',
            selector: row => row.ukId,
            wrap: true
        },
        {
            name: 'Subscriber URL',
            selector: row => row.subscriber_url,
            wrap: true
        },
        {
            name: 'Country',
            selector: row => row.country,
            wrap: true
        },
        {
            name: 'Domain',
            selector: row => row.domain,
            wrap: true
        },
        {
            name: 'Valid From',
            selector: row => row.valid_from,
            wrap: true
        },
        {
            name: 'Valid Until',
            selector: row => row.valid_until,
            wrap: true
        },
        {
            name: 'Sign Public Key',
            selector: row => row.signing_public_key,
            wrap: true
        },
        {
            name: 'Encr Public Key',
            selector: row => row.encr_public_key,
            wrap: true
        },
        {
            name: 'Created',
            selector: row => row.created,
            wrap: true
        },
        {
            name: 'Updated',
            selector: row => row.updated,
            wrap: true
        },
        {
            name: 'Br Id',
            selector: row => row.br_id,
            wrap: true
        },
        {
            name: 'Type',
            selector: row => row.type,
            wrap: true
        },
        {
            name: 'City',
            selector: row => row.city,
            wrap: true
        }

    ];
    const data = [];
    const dispatch = useDispatch();

    const responses = useSelector(state => state.getData);
    const { responseData, loading, error } = responses;
    if(!(responseData === undefined)) {
    console.log("Response Data",responseData);
    responseData.map(indResponses => {
        data.push({"subscriber_id":indResponses.subscriber_id,
        "status":indResponses.status,
        "ukId":indResponses.ukId,
        "subscriber_url":indResponses.subscriber_url,
        "country":indResponses.country,
        "domain":indResponses.domain,
        "valid_from":indResponses.valid_from,
        "valid_until":indResponses.valid_until,
        "type":indResponses.type,
        "signing_public_key":indResponses.signing_public_key,
        "encr_public_key":indResponses.encr_public_key,
        "created":indResponses.created,
        "updated":indResponses.updated,
        "br_id":indResponses.br_id,
        "city":indResponses.city});
    })
    }

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // signin action here
        dispatch(getData(cityCode, domain,country,type,subscriber_id));
    };

    return (
        <div>
            <Header/>
            <form className='shadow p-3 mb-5 bg-white rounded' onSubmit={submitHandler}>
                <div>
                    {
                        error&&
                        <MessageBox variant="danger">{error}</MessageBox>
                    }
                </div>
                <div class="form-row">
                <div class="form-group col-md-2">
                    <label htmlFor="cityCode">City Code: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="cityCode" 
                        value={cityCode}
                        onChange = {(e) => setCityCode(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-2">
                    <label htmlFor="domain">Domain: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="domain" 
                        value={domain}
                        onChange = {(e) => setDomain(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-2">
                    <label htmlFor="type">Type: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="type" 
                        value={type}
                        onChange = {(e) => setType(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-2">
                    <label htmlFor="Country">Country: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="country" 
                        value={country}
                        onChange = {(e) => setCountry(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-2">
                    <label htmlFor="Subscriber_id">Subscriber Id: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="subscriber_id" 
                        value={subscriber_id}
                        onChange = {(e) => setSubscriberId(e.target.value)}
                    />
                </div>
                </div>
                <div>
                    <label />
                    <button class="btn btn-primary" type="submit">Fetch Data</button>
                </div>
            </form>
            <div>
            {!(responseData===undefined)&&<>{ <PrintTable columns={columns} data={data} />}</>}
            </div>
        </div>
    );
}

export default PostData;
