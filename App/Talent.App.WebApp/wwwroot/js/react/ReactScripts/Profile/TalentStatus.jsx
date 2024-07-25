import React from 'react'
import { Form, FormField, Radio } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const jobSeekingStatus = props.status ? Object.assign({}, props.status) : { status: "", availableDate: null };

        this.state = {
            showEditSection: false,
            jobSeekingStatus: jobSeekingStatus
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChange(event, data) {
        const newData = Object.assign({}, this.state.jobSeekingStatus);
        newData.status = data.value;

        this.setState({
            jobSeekingStatus: newData
        })
    }

    handleChangeDate(date) {
        var newData = Object.assign({}, this.state.jobSeekingStatus);
        newData.availableDate = date;
        this.setState({
            jobSeekingStatus: newData
        });

        this.props.updateProfileData(newData);   
    }
    
    render() {
        
        return (
            <div className='ui sixteen wide column'>
                <div className='row'>
                    <FormField>
                        <Radio
                            label='Actively looking for a job'
                            name='radioGroup'
                            value='lookingForJob'
                            checked={this.state.jobSeekingStatus.status === 'lookingForJob'}
                            onChange={this.handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Radio
                            label='Not looking for a job at the moment'
                            name='radioGroup'
                            value='notLookingForJob'
                            checked={this.state.jobSeekingStatus.status === 'notLookingForJob'}
                            onChange={this.handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Radio
                            label='Currently employed but open to offers'
                            name='radioGroup'
                            value='openToOffers'
                            checked={this.state.jobSeekingStatus.status === 'openToOffers'}
                            onChange={this.handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Radio
                            label='Will be available on later date'
                            name='radioGroup'
                            value='lateAvailable'
                            checked={this.state.jobSeekingStatus.status === 'lateAvailable'}
                            onChange={this.handleChange}
                        />
                        {this.state.jobSeekingStatus.status === 'lateAvailable' ? 
                            <DatePicker
                                selected={this.state.jobSeekingStatus.availableDate}
                                onChange={(date) => this.handleChangeDate(date)}
                                minDate={moment()}
                                dateFormat="DD/MM/YYYY"
                            />
                            : null
                        }
                    </FormField>
                </div>
            </div>
        )
    }
}