import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const address = Array.isArray(this.props.addressData) ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: 0,
                city: "",
                country: ""
            };
        
        this.state = {
            showEditSection: false,
            newAddress: address
        };


        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this); 
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }

    openEdit() {
        const address = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: address
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newAddress)
        this.props.updateProfileData(data)
        this.closeEdit()
    }

    renderDisplay() {
        let number = this.state.newAddress.number ? this.state.newAddress.number : "";
        let street = this.state.newAddress.street ? this.state.newAddress.street : "";
        let suburb = this.state.newAddress.suburb ? this.state.newAddress.suburb : "";
        let postCode = this.state.newAddress.postCode ? this.state.newAddress.postCode : "";
        let city = this.state.newAddress.city ? this.state.newAddress.city : "";
        let country = this.state.newAddress.country ? this.state.newAddress.country : "";

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number}{number ? ', ' : ''} 
                            {street}{street ? ', ' : ''} 
                            {suburb}{suburb ? ', ' : ''} 
                            {postCode != 0 ? postCode : ''}
                        </p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    renderEdit() {

        let number = this.state.newAddress.number ? this.state.newAddress.number : "";
        let street = this.state.newAddress.street ? this.state.newAddress.street : "";
        let suburb = this.state.newAddress.suburb ? this.state.newAddress.suburb : "";
        let postCode = this.state.newAddress.postCode ? this.state.newAddress.postCode : "";

        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;
        
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null ) {
           
            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <div className='field'>
                    <label>City</label>
                    <select
                        className="ui dropdown"
                        placeholder="City"
                        value={selectedCity}
                        onChange={this.handleChange}
                        name="city">
                        <option value="0"> Select a town or city</option>
                        {popCities}
                    </select>
                </div>
        }

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Number"
                    name="number"
                    value={number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter a number"
                    errorMessage="Please enter a valid number"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter a street"
                    errorMessage="Please enter a valid street"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter a suburb"
                    errorMessage="Please enter a valid suburb"
                />
                <ChildSingleInput
                    inputType="text"
                    label="PostCode"
                    name="postCode"
                    value={postCode}
                    controlFunc={this.handleChange}
                    maxLength={10}
                    placeholder="Enter a post code"
                    errorMessage="Please enter a valid post code"
                />
                <div className="field">
                    <label>Country</label>
                    <select className="ui right labeled dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">

                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                    <div style={{ marginBottom:"5px", marginTop:"5px" }}></div>
                    {citiesOptions}
                </div>
                    

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    
   
    render() {
       return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
       )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const nationality = props.nationalityData ? props.nationalityData : "";
       
        this.state = {
            newNationality: nationality
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newNationality);
        data[event.target.name] = event.target.value;
        this.setState({
            newNationality: data
        });

        this.props.saveProfileData(data);
    }
    
    render() {
        let nationalitiesOptions = [];
        const selectedNationality = this.state.newNationality ? this.state.newNationality : "";
        
        nationalitiesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <div className='ui sixteen wide column'>                
                <div className="field">
                    <select className="ui right labeled dropdown"
                        placeholder="Nationality"
                        value={selectedNationality}
                        onChange={this.handleChange}
                        name="nationality">

                        <option value="">Select a nationality</option>
                        {nationalitiesOptions}
                    </select>
                    <div style={{ marginBottom:"5px", marginTop:"5px" }}></div>
                </div>
            </div>
        )
    }
}