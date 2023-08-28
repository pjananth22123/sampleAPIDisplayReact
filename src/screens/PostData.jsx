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
    createTheme('solarized', {
        text: {
          primary: '#268bd2',
          secondary: '#2aa198',
        },
        background: {
          default: '#002b36',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
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
            >
            </DataTable>
        </div>
    )
}

function PostData(props) {
    // set states for cityCode and domain 
    const [cityCode, setCityCode] = useState('');
    const [domain, setDomain] = useState('');
    const columns = [
        {
            name: 'Subscriber Id',
            selector: row => row.subscriber_id,
        },
        {
            name: 'Status',
            selector: row => row.status
        },
        {
            name: 'UK Id',
            selector: row => row.ukId
            
        },
        {
            name: 'Subscriber URL',
            selector: row => row.subscriber_url
        },
        {
            name: 'Country',
            selector: row => row.country
        },
        {
            name: 'Domain',
            selector: row => row.domain
        },
        {
            name: 'Valid From',
            selector: row => row.valid_from
        },
        {
            name: 'Valid Until',
            selector: row => row.valid_until
        },
        {
            name: 'Type',
            selector: row => row.type
        },
        {
            name: 'City',
            selector: row => row.city
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
        "city":indResponses.city});
    })
    }

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // signin action here
        dispatch(getData(cityCode, domain));
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
                        placeholder="Enter City Code" 
                        value={cityCode}
                        required
                        onChange = {(e) => setCityCode(e.target.value)}
                    />
                </div>
                <div class="form-group col-md-2">
                    <label htmlFor="domain">Domain: </label>
                    <input class="form-control form-control-sm" type="text" 
                        id="domain" 
                        placeholder="Enter Domain" 
                        value={domain}
                        required
                        onChange = {(e) => setDomain(e.target.value)}
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
            <Footer/>
        </div>
    );
}

export default PostData;
