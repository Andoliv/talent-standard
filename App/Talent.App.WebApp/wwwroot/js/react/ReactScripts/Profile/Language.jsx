/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Button, Dropdown, FormGroup, FormField, Input } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';


export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const languages = Array.isArray(props.languageData) ? Object.assign({}, props.languageData) : [];
       
        this.state = {
            showEditSection: false,
            languages: languages,
            newLanguage: {
                name: '',
                level: ''
            }
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.renderAddNewLanguage = this.renderAddNewLanguage.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
        this.editLanguage = this.editLanguage.bind(this);
        this.deleteLanguage = this.deleteLanguage.bind(this);
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

    handleChangeLanguage(event, data) {
        let newData = Object.assign({}, this.state.newLanguage);
        newData[data.name] = data.value;
        
        this.setState({
            newLanguage: newData
        });
    }

    addLanguage() {
        const data = { languages: Array.isArray(this.props.languageData) ? [...this.props.languageData] : [] };
        const newLanguage = Object.assign({}, this.state.newLanguage);
        console.log(newLanguage);

        if (newLanguage.id) {
            console.log(data);
            const index = data.languages.findIndex((language) => language.id === newLanguage.id);
            data.languages[index] = newLanguage;
        } else {
            data.languages.push(newLanguage);
        }

        this.props.updateProfileData(data);
        
        this.setState({
            languages: data.languages,
            newLanguage: {
                name: '',
                level: ''
            }
        });

        this.closeEdit();
    }

    editLanguage(id) {
        const languages = Array.isArray(this.props.languageData) ? [...this.props.languageData] : [];
        if (languages.length === 0) {
            return;
        }

        const language = languages.find((language) => language.id === id);
        console.log(language);

        this.setState({
            newLanguage: {
                id: language.id,
                name: language.name,
                level: language.level
            },
            showEditSection: true
        });

        
    }

    deleteLanguage(id) {
        const languages = Array.isArray(this.props.languageData) ? [...this.props.languageData] : [];
        if (languages.length === 0) {
            return;
        }

        const index = languages.findIndex((language) => language.id === id);
        languages.splice(index, 1);

        this.props.updateProfileData({ languages: languages });
        this.setState({
            languages: languages
        });
    }

    renderAddNewLanguage() {
        if (!this.state.showEditSection) {
            return;
        }

        const languageLevelOptions = [
            { key: "Basic", value: "Basic", text: "Basic" },
            { key: "Conversational", value: "Conversational", text: "Conversational" },
            { key: "Fluent", value: "Fluent", text: "Fluent" },
            { key: "Native/Bilingual", value: "Native/Bilingual", text: "Native/Bilingual" }
        ];

        const isValidLanguage = this.state.newLanguage.name !== '' && this.state.newLanguage.level !== '';

        return (
            <div className='row'>
                <Input 
                    name='name' 
                    value={this.state.newLanguage.name} 
                    maxLength={80} 
                    focus 
                    placeholder='Language' 
                    onChange={this.handleChangeLanguage} 
                />
                <Dropdown
                    name='level'
                    placeholder="Language Level"
                    selection
                    options={languageLevelOptions}
                    onChange={this.handleChangeLanguage}
                    value={this.state.newLanguage.level}
                />
                <button type="button" className="ui teal button" onClick={this.addLanguage} disabled={!isValidLanguage}>Add</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        );
    }

    render() {

        const renderLanguages = this.props.languageData ?
            this.props.languageData.map((language) => {
                return (
                        <Table.Row key={language.id}>
                            <Table.Cell>
                                {language.name}
                            </Table.Cell>
                            <Table.Cell>
                                {language.level}
                            </Table.Cell>
                            <Table.Cell>
                                <div><i className="write icon" onClick={() => this.editLanguage(language.id)} /><i className="close icon" onClick={() => this.deleteLanguage(language.id)} /></div>
                            </Table.Cell>
                        </Table.Row>
                );
            })
            : null;
        
        return (
            <div className='ui sixteen wide column'>
                <FormGroup inline>
                    <FormField>
                        {this.renderAddNewLanguage()}
                    </FormField>
                </FormGroup>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Language</Table.HeaderCell>
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
                        {renderLanguages}
                    </Table.Body>
                </Table>                
            </div>
        )
    }
}