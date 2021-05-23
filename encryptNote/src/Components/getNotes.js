import React, { Component } from 'react';
import './style.css'
import axios from 'axios';


class GetNotes extends Component {
    constructor(props) {
        super(props);
        this.state={
            noteItems:[],
            id:"",
            val:""
            };
    }
    async deldetails(id)
    {
      alert("Deleted Successfully");
      window.location.reload();
      this.props.history.push('/getnotes');
      await axios.delete('https://nameless-bastion-15621.herokuapp.com/delete/'+id)
      .then((res) => {
          
          console.log('Student successfully deleted!')
      }).catch((error) => {
          console.log(error)
      })
      //this.props.history.push('/empdetails');
    }
    componentDidMount() {
        axios.get('https://nameless-bastion-15621.herokuapp.com/')
        .then(res => {
            this.setState({ noteItems: res.data});
            console.log(res.data);
            //var length = res.length;
        })
        .catch(function (error){
            console.log(error);
        })
    }
    decode=(i)=>
    {
          this.setState({val: !this.state.val})
          console.log(this.state.val);
    }

    render() {
        return (
            <div>
                <div className="background">
                <h2 style={{color:"white"}}>All Encrypted Notes</h2>
            
            <div className="body">
                <table className="center">
                    <h2>Notes</h2>
                <tr>
                    <th>Sr. No.</th>
                    <th>Notes</th>
                    <th>Encryption Type</th>
                    <th>Deode</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
                
          
           
                {this.state.noteItems.map((notes,i)=>
                <tr>
                    <td key={i}>{i+1}</td>
                {this.state.val?<td style={{width:'40%'}}>{notes.encmsg}</td>:<td style={{width:'40%'}}>{notes.msg}</td>}
                 <td>{notes.encType}</td>
                 <td><button type="submit" className="decode" onClick={()=>this.decode(i)} > Decode</button></td>
                 <td>{notes.date}</td>
                 
                 <td> <button className="glyphicon glyphicon-pencil" style={{background:"green", color:"white"}} onClick={() => this.props.history.push({pathname: "/update", id:notes._id} )}/> &nbsp;&nbsp;&nbsp;<button className="glyphicon glyphicon-trash" style={{background:"red", color:"white"}} onClick={()=> this.deldetails(notes._id)} /></td>
                 </tr>
                 )}
            <br/><br/>
            
            </table>
                </div>
                </div>
            </div>
        );
    }
}
export default GetNotes;