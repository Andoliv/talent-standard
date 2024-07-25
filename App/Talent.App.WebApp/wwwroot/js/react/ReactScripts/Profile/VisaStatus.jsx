import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, Input } from 'semantic-ui-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        
        const visaStatus = props.visaStatus ? Object.assign({}, props.visaStatus) : '';
        const visaExpiryDate = props.visaExpiryDate ? Object.assign({}, props.visaExpiryDate) : '';

        this.state = {
            showEditSection: false,
            visaStatus: visaStatus,
            visaExpiryDate: visaExpiryDate,
            showSaveButton: false
        }

        this.handleChangeVisaStatus = this.handleChangeVisaStatus.bind(this);
        this.handleChangeExpiryDate = this.handleChangeExpiryDate.bind(this);
        this.saveVisaStatus = this.saveVisaStatus.bind(this);
    }

    handleChangeVisaStatus(event, data) {
        if (data.value !== 'Work Visa' && data.value !== 'Student Visa') {
            this.setState({
                visaExpiryDate: ''
            });
        }

        this.setState({
            visaStatus: data.value,
            showSaveButton: true
        });
    }

    handleChangeExpiryDate(event) {
        const newData = event.target.value;
        this.setState({
            visaExpiryDate: newData,
            showSaveButton: true
        });
    }
    
    saveVisaStatus() {
        const data = {
            visaStatus: this.state.visaStatus,
            visaExpiryDate: this.state.visaExpiryDate
        }
        this.props.saveProfileData(data);
        this.setState({
            showSaveButton: false
        });
    }

    render() {

        const visaStatusOptions = [
            { key: "Citizen", value: "Citizen", text: "Citizen" },
            { key: "Permanent Resident", value: "Permanent Resident", text: "Permanent Resident" },
            { key: "Work Visa", value: "Work Visa", text: "Work Visa" },
            { key: "Student Visa", value: "Student Visa", text: "Student Visa" }
        ];

        const isValidVisaStatus = this.state.visaStatus !== '' && (this.state.visaStatus !== 'Work Visa' || this.state.visaStatus !== 'Student Visa' && this.state.visaExpiryDate !== '');

        return (
            <div className='ui sixteen wide column'>
                <div className='row'>
                    <Dropdown
                        name='visaStatus'
                        placeholder="Visa Type"
                        selection
                        options={visaStatusOptions}
                        onChange={this.handleChangeVisaStatus}
                        value={this.state.visaStatus}
                    />
                    {this.state.visaStatus === 'Work Visa' || this.state.visaStatus === 'Student Visa' ?
                        <Input 
                            name='visaExpiryDate' 
                            value={this.state.visaExpiryDate} 
                            maxLength={80} 
                            focus 
                            placeholder='Visa Expiry Date' 
                            onChange={this.handleChangeExpiryDate} 
                        />
                        : null
                    }
                    {this.state.showSaveButton ? 
                        <button type="button" className="ui teal button" onClick={this.saveVisaStatus} disabled={!isValidVisaStatus}>Save</button>
                        : null
                    }
                </div>
            </div>
        )
      
    }
}