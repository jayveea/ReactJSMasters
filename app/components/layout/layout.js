import React from 'react';
import ReactDOM from 'react-dom';

export default function Layout(props){
    return(
        <div className='container-fluid'>
            <div className="col-md-6">
                {props.children}
            </div>
            <div className="col-md-6 pull-right">
                <div id="divAddNewPopover" className="col-md-6 popover-div"></div>
                <div id="divPriorityPopover" className="col-md-6 popover-div"></div>
            </div>
        </div>
    );
};