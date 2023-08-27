import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DataTable,{createTheme} from 'react-data-table-component';
import Header from '../screens/Header';
import Footer from '../screens/Footer';

function PrintTable(props){
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
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Result</span>
                </div>
            </nav>
            <DataTable
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
            name: 'Audio URL',
            selector: row => row.audioUrl,
        },
        {
            name: 'Source URL',
            selector: row => row.sourceUrl
        },
        {
            name: 'Text',
            selector: row => row.text
            
        }
    ];
    const data = [];
    const dispatch = useDispatch();

    const responses = useSelector(state => state.getData);
    const { responseData, loading, error } = responses;
    if(!(responseData === undefined)) {
    console.log("Response Data",responseData[0].phonetics);
    const phoneticsData = responseData[0].phonetics;
    phoneticsData.map(indPhoneticsData => {
        data.push({"audioUrl":indPhoneticsData.audio,
        "sourceUrl":indPhoneticsData.sourceUrl,
        "text":indPhoneticsData.text});
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
