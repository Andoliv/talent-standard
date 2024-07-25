/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, FormGroup, FormField, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        const experiences = Array.isArray(props.experienceData) ? Object.assign({}, props.experienceData) : [];

        this.state = {
            showEditSection: false,
            experiences: experiences,
            newExperience: {
                company: '',
                position: '',
                responsibilities: '',
                start: '',
                end: ''
            }
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.editExperience = this.editExperience.bind(this);
        this.deleteExperience = this.deleteExperience.bind(this);
        this.handleChangeExperience = this.handleChangeExperience.bind(this);
        this.addExperience = this.addExperience.bind(this);

    };

    openEdit() {
        this.setState({
            showEditSection: true
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }

    handleChangeExperience(event) {
        let newData = Object.assign({}, this.state.newExperience);
        newData[event.target.name] = event.target.value;

        this.setState({
            newExperience: newData
        });
    }

    addExperience() {
        const data = { experiences: Array.isArray(this.props.experienceData) ? [...this.props.experienceData] : [] };
        const newExperience = Object.assign({}, this.state.newExperience);
        console.log(newExperience);
        
        if (newExperience.id) {
            console.log(data);
            const index = data.experiences.findIndex((experience) => experience.id === newExperience.id);
            data.experiences[index] = newExperience;
        } else {
            data.experiences.push(newExperience);
        }

        // this.props.updateProfileData(data);

        this.setState({
            experiences: data.experiences,
            newExperience: {
                company: '',
                position: '',
                responsibilities: '',
                start: '',
                end: ''
            }
        });

        this.closeEdit();
    }

    editExperience(id) {
        const experience = this.state.experiences.find((experience) => experience.id === id);
        this.setState({
            newExperience: experience
        });
    }

    deleteExperience(id) {
        const data = { experiences: Array.isArray(this.props.experienceData) ? [...this.props.experienceData] : [] };
        const index = data.experiences.findIndex((experience) => experience.id === id);
        data.experiences.splice(index, 1);

        // this.props.updateProfileData(data);
    }

    handleChangeDate(date, name) {
        var newData = Object.assign({}, this.state.newExperience);
        newData[name] = date;

        console.log(newData);

        this.setState({
            newExperience: newData
        });

        // this.props.updateProfileData(newData);   
    }

    renderAddNewExperience() {
        return (
                <div className="ui sixteen wide column">
                    <FormGroup widths={2}>
                        <FormField>
                            <Input
                                type="text"
                                placeholder="Company"
                                name="company"
                                value={this.state.newExperience.company}
                                onChange={this.handleChangeExperience}
                            />
                        </FormField>
                        <FormField>
                            <Input
                                type="text"
                                placeholder="Position"
                                name="position"
                                value={this.state.newExperience.position}
                                onChange={this.handleChangeExperience}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths={2}>
                        <FormField>
                            <DatePicker
                                selected={this.state.newExperience.start}
                                onChange={(date) => this.handleChangeDate(date, 'start')}
                                minDate={moment()}
                                dateFormat="DD/MM/YYYY"
                                name="start"
                                placeholderText="Start Date"
                            />
                        </FormField>
                        <FormField>
                            <DatePicker
                                selected={this.state.newExperience.end}
                                onChange={(date) => this.handleChangeDate(date, 'end')}
                                minDate={moment()}
                                dateFormat="DD/MM/YYYY"
                                name="end"
                                placeholderText="End Date"
                            />
                        </FormField>
                    </FormGroup>
                        <FormField>
                            <Input
                                type="text"
                                placeholder="Responsibilities"
                                name="responsibilities"
                                value={this.state.newExperience.responsibilities}
                                onChange={this.handleChangeExperience}
                            />
                        </FormField>
                        <FormField>
                            <Button type="button" className="ui teal button" onClick={this.addExperience}>
                                Add
                            </Button>
                            <Button type="button" className="ui button" onClick={this.closeEdit}>
                                Cancel
                            </Button>
                        </FormField>
                </div>
        )
    }


    renderEdit() {

    }
    
    render() {

        const experiences = this.props.experienceData ? 
            this.props.experienceData.map((experience) => {
                return (
                    <Table.Row key={experience.id}>
                        <Table.Cell>{experience.company}</Table.Cell>
                        <Table.Cell>{experience.position}</Table.Cell>
                        <Table.Cell>{experience.responsibilities}</Table.Cell>
                        <Table.Cell>{experience.start}</Table.Cell>
                        <Table.Cell>{experience.end}</Table.Cell>
                        <Table.Cell>
                            <div>
                                <i className="write icon" onClick={() => this.editExperience(experience.id)} />
                                <i className="close icon" onClick={() => this.deleteExperience(experience.id)} />
                            </div>
                        </Table.Cell>
                    </Table.Row>
                )
            })
            : null;


        return (
            <div className='ui sixteen wide column'>
                {this.state.showEditSection ? this.renderAddNewExperience() : null}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                            <Table.HeaderCell>Start</Table.HeaderCell>
                            <Table.HeaderCell>End</Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                                    <i className="plus small icon" />
                                    Add New
                                </button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {experiences}
                    </Table.Body>
                </Table>                
            </div>
        )
        
    }
}
