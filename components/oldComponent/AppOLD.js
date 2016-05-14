import React from 'react';
import Navbar from './Navbar';
import QueryForm from './QueryForm';
import ResultsTable from './ResultsTable';
import DownloadPanel from './DownloadPanel'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <Navbar />
                <QueryForm />
                <hr />
                <div className="container">
                    <div className="row">
                        <ResultsTable />
                        <DownloadPanel />
                    </div>
                </div>
                
            </div>

        );
    }
}

export default App;