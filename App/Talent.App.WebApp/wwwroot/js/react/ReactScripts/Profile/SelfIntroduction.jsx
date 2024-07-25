/* Self introduction section */
import React, { Component } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { FormField, TextArea } from 'semantic-ui-react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        const summary = props.summary ? props.summary : "";
        const description = props.description ? props.description : "";

        this.state = {
            summary: summary,
            description: description
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.isValidDescriptionLength = this.isValidDescriptionLength.bind(this);
    
    };

    handleChange(event) {
        const data = Object.assign({}, this.state)
        data[event.target.name] = event.target.value
        this.setState({
            [event.target.name]: event.target.value
        })

        console.log(this.state.description.length)
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            linkedAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state);
        this.props.updateProfileData(data);
        this.closeEdit();
    }

    isValidDescriptionLength() {
        console.log(this.state.description.length >= 150 && this.state.description.length <= 600);
        return this.state.description.length >= 150 && this.state.description.length <= 600;
    }

    renderEdit() {

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Summary"
                    name="summary"
                    value={this.state.summary}
                    controlFunc={this.handleChange}
                    maxLength={150}
                    placeholder="Enter a summary"
                    errorMessage="Please enter a valid summary"
                />
                <FormField
                    control={TextArea}
                    label='Description'
                    name='description'
                    placeholder='Tell us more about you...'
                    value={this.state.description}
                    onChange={this.handleChange}
                    minLength={150}
                    maxLength={600}
                    error={!this.isValidDescriptionLength()}                    
                />
                <div className='error field'>
                    {!this.isValidDescriptionLength() ? <div role='alert' aria-atomic className='ui pointing prompt label'>'Please enter a valid description (150-600 characters)'</div> : null}
                </div>
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Summary: {this.props.summary}</p>
                        <p>Description: {this.props.description}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}



