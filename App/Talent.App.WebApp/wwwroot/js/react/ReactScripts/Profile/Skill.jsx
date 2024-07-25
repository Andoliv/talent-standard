/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Dropdown, FormGroup, FormField, Input } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        const skills = Array.isArray(props.skillData) ? Object.assign({}, props.skillData) : [];
       
        this.state = {
            showEditSection: false,
            skills: skills,
            newSkill: {
                skill: '',
                experienceLevel: ''
            }
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.renderAddNewSkill = this.renderAddNewSkill.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.editSkill = this.editSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
    }

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

    handleChangeSkill(event, data) {
        let newData = Object.assign({}, this.state.newSkill);
        newData[data.name] = data.value;
        
        this.setState({
            newSkill: newData
        });
    }

    addSkill() {
        const data = { skills: Array.isArray(this.props.skillData) ? [...this.props.skillData] : [] };
        const newSkill = Object.assign({}, this.state.newSkill);
        console.log(newSkill);

        if (newSkill.id) {
            console.log(data);
            const index = data.skills.findIndex((skill) => skill.id === newSkill.id);
            data.skills[index] = newSkill;
        } else {
            data.skills.push(newSkill);
        }

        this.props.updateProfileData(data);
        
        this.setState({
            skills: data.skills,
            newSkill: {
                skill: '',
                experienceLevel: ''
            }
        });

        this.closeEdit();
    }

    editSkill(id) {
        const skills = Array.isArray(this.props.skillData) ? [...this.props.skillData] : [];
        if (skills.length === 0) {
            return;
        }

        const skill = skills.find((skill) => skill.id === id);
        console.log(skill);

        this.setState({
            newSkill: {
                id: skill.id,
                skill: skill.skill,
                experienceLevel: skill.experienceLevel
            },
            showEditSection: true
        });

        
    }

    deleteSkill(id) {
        const skills = Array.isArray(this.props.skillData) ? [...this.props.skillData] : [];
        if (skills.length === 0) {
            return;
        }

        const index = skills.findIndex((skill) => skill.id === id);
        skills.splice(index, 1);

        this.props.updateProfileData({ skills: skills });
        this.setState({
            skills: skills
        });
    }

    renderAddNewSkill() {
        if (!this.state.showEditSection) {
            return;
        }

        const skillLevelOptions = [
            { key: "Beginner", value: "Beginner", text: "Beginner" },
            { key: "Intermediate", value: "Intermediate", text: "Intermediate" },
            { key: "Expert", value: "Expert", text: "Expert" }
        ];

        const isValidSkill = this.state.newSkill.skill !== '' && this.state.newSkill.experienceLevel !== '';

        return (
            <div className='row'>
                <Input 
                    skill='skill' 
                    value={this.state.newSkill.skill} 
                    maxLength={80} 
                    focus 
                    placeholder='Skill' 
                    onChange={this.handleChangeSkill} 
                />
                <Dropdown
                    skill='experienceLevel'
                    placeholder="Skill Level"
                    selection
                    options={skillLevelOptions}
                    onChange={this.handleChangeSkill}
                    value={this.state.newSkill.experienceLevel}
                />
                <button type="button" className="ui teal button" onClick={this.addSkill} disabled={!isValidSkill}>Add</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        );
    }

    render() {

        const skillLevelOptions = [
            { key: "Beginner", value: "Beginner", text: "Beginner" },
            { key: "Intermediate", value: "Intermediate", text: "Intermediate" },
            { key: "Expert", value: "Expert", text: "Expert" }
        ];

        const renderSkills = this.props.skillData ?
            this.props.skillData.map((skill) => {
                return (
                        <Table.Row key={skill.id}>
                            <Table.Cell>
                                {skill.skill}
                            </Table.Cell>
                            <Table.Cell>
                                {skill.experienceLevel}
                            </Table.Cell>
                            <Table.Cell>
                                <div><i className="write icon" onClick={() => this.editSkill(skill.id)} /><i className="close icon" onClick={() => this.deleteSkill(skill.id)} /></div>
                            </Table.Cell>
                        </Table.Row>
                );
            })
            : null;
        
        return (
            <div className='ui sixteen wide column'>
                <FormGroup inline>
                    <FormField>
                        {this.renderAddNewSkill()}
                    </FormField>
                </FormGroup>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Skill</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                                    <i className="plus small icon" />
                                    Add New
                                </button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderSkills}
                    </Table.Body>
                </Table>                
            </div>
        )
    }
}

