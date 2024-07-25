/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            linkedAccounts: linkedAccounts
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
    }

    componentDidMount() {
        // $('.ui.button.social-media')
        //     .popup();
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
        const data = Object.assign({}, this.state)
        this.props.updateProfileData(data)
        this.closeEdit()
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            linkedAccounts: data
        })
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.linkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={255}
                    placeholder="Enter your LinkedIn URL"
                    errorMessage="Please enter a valid LinkedIn URL"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.linkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={255}
                    placeholder="Enter your GitHub URL"
                    errorMessage="Please enter a valid GitHub URL"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        let linkedIn = this.props.linkedAccounts.linkedIn ? this.props.linkedAccounts.linkedIn : "";
        let github = this.props.linkedAccounts.github ? this.props.linkedAccounts.github : "";

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Popup content={linkedIn} trigger={
                            <Button color='linkedin' >
                                <Icon name='linkedin' /> LinkedIn
                            </Button>
                        } />
                        <Popup content={github} trigger={
                            <Button color='black'>
                                <Icon name='github' /> GitHub
                            </Button>
                        } />
                        <Button floated='right' color='black' content='Edit' onClick={this.openEdit}/>
                    </React.Fragment>
                </div>
            </div>
        )
    }

}