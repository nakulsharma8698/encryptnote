import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import {Link} from 'react-router-dom'


class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            enctType:'',
            messgage:''
            };
          this.submitButton = this.submitButton.bind(this);
          //this.submitButtonn = this.submitButtonn.bind(this);
          this.handleChange = this.handleChange.bind(this);


    }
    componentDidMount()
    {
      console.log(this.props.location.id);
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    submitButton(event)
    {
        event.preventDefault();
        //alert("Note Updated Successfully");
        //this.props.history.push('/bookingdetails');
        console.log(this.state)
    
        const data = { msg:this.state.msg, enctType:this.state.enctType, message:this.state.message}
        axios.put(`https://nameless-bastion-15621.herokuapp.com/update/${this.props.location.id}`, data)
        .then(res => { 
          console.log(res.data);
          if(res.data){
            this.setState({ message: "Note updated successfully." });
          }
        })
    
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div>
                <div className="background">
                <h1>Encrypt Your Note Here</h1>
                    <form className="formm">
                       <h2>Encrypt Now</h2>
                       <p className="message">{this.state.message}</p>
                        <textarea type="text" name="msg" placeholder="Enter Your Note Here" onChange={this.handleChange} required></textarea><br/><br/>
                       <label for="enctTyoe">Select Your Encryption Type</label>
                        <select className="form-control" name="enctType" onChange={this.handleChange} id="sel1" >
                            <option>Select Option</option>
                            <option>Pig-Latin</option>
                            <option>Emoj-Encrypt</option>
                            <option>Word-Scramble</option>
                            <option>Bcrypt</option>
                            <option>Don't Encrypt</option>
                        </select><br/>
                        <button type="button" className="btn btn-warning" onClick={this.submitButton}>Encypt</button><br/><br/>
                        <Link to="/getnotes"><button type="button" className="btn btn-warning">View Notes</button></Link><br/><br/>
                    </form>
                </div>
            </div>
        );
    }
}
export default Update;