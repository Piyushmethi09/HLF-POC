import React ,{ Component } from "react";
import * as action from "../actions/api";

class ViewList extends Component {

    state={
        searchText: 'mix',
        array: [],
    }

    componentDidMount() {
        this.search();
    }
    
    search = () => {
       
        action.GetAPI(this.state.searchText) 
        .then((res)=>{
            console.log('res----->>>>',res);
            this.setState({
                array: res.data.data
                 })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderItems = () => {
       return this.state.array.map((item, index) => {
            console.log("item-----",item)

            return (
            
            
           
            <tr key={index}>
              <td>{item.Record.ID}</td>
              <td>{item.Record.Color}</td>
              <td>{item.Record.Owner}</td>
              <td >{item.Record.Size}</td>
              <td>{item.Record.AppraisedValue}</td>
            </tr>
            
           
            );
        });
    }

    render() {
        return (
            <div>
               <table className="table">
            <thead>
                <tr>
            <th >AssetsId</th>
            <th >Colour</th>
            <th >Owner Name</th>
            <th  >Size</th>
            <th >Appraised Value</th>
             </tr>
             </thead>
             <tbody>
             {this.state.array ? this.renderItems() : ""}
            
             </tbody>
                    
           
        </table>
            </div>
        );
    }

}

export default ViewList;