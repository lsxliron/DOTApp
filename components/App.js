import React from 'react';
import Navbar from './Navbar';
import QueryForm from './QueryForm';
import ResultsTable from './ResultsTable';
import DownloadPanel from './DownloadPanel';
import LoginForm from './LoginForm';
class App extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-5">
                            <QueryForm/>
                        </div>
                        <div className="col-xs-7">
                            <div className="upper">
                               <ResultsTable />
                           </div>
                           <div className="lower">
                               <DownloadPanel />
                           </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        
                        
                    </div>
                </div>
                <LoginForm />
            </div>

        );
    }
}

export default App;