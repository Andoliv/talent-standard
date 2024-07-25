/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Icon, Image } from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const imageId = props.imageId ? Object.assign({}, props.imageId) : '';
        const savePhotoUrl = props.savePhotoUrl ? Object.assign({}, props.savePhotoUrl) : '';

        this.state = {
            showUploadButton: false,
            imageId: imageId,
            profilePhoto: null,
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);       
    };

    handleChange(event) {
        const uploaded = event.target.files[0];
        const reader = new FileReader();
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
        if (uploaded) {
            if (validImageTypes.includes(uploaded.type)) {
                reader.onloadend = () => {
                    this.setState({ 
                        profilePhoto: reader.result,
                        imageId: uploaded
                    });
                }
                reader.readAsDataURL(uploaded);
            } else {
                TalentUtil.notification.show("Please upload a correct image file", "error")
            }
        }
    }

    handleUpload() {
        var cookies = Cookies.get('talentAuthToken');
        let formData = new FormData();
        formData.append('file', this.state.imageId);
        $.ajax({
            url: this.state.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile photo uploaded sucessfully", "success", null, null);
                    
                    this.props.updateProfileData({ profilePhotoUrl: this.state.profilePhoto });
                    
                    this.setState({ 
                        profilePhoto: null 
                    })
                } else {
                    TalentUtil.notification.show("Failed uploading profile photo", "error", null, null);
                }
            }.bind(this),
            error: function (res, a, b) {
                console.error(res);
                console.error(a);
                console.error(b);
            }
        });
    }

    

    render() {

        let imageSource = "";
        if (!this.state.imageId) {
            imageSource = "../../../../icons/camera_default.png";
        } else {
            if (this.state.profilePhoto) {
                imageSource = this.state.profilePhoto;
            } else {
                imageSource = this.state.imageId;
            }
        }
        const uploadedPhoto = this.state.imageId
            ? <img src={imageSource} width="120px" height="120px" />
            : <svg width="120" height="120">
                <image xlinkHref={imageSource} x="30" y="30" width="60px" height="60px" />
            </svg>
        const uploadButton = this.state.profilePhoto
            ? <button type="button" className="ui teal button" onClick={this.handleUpload}><i className="upload icon" /> Upload</button>
            : null

        return (
            <React.Fragment>
                <div className="column">
                    <label htmlFor="upload">
                        <div className="ui circular small bordered image">
                            {uploadedPhoto}
                        </div>
                    </label>
                    <input id="upload" type="file" onChange={this.handleChange} style={{ display: 'none' }} />
                </div>
                <br />
                <div className="row">
                    {uploadButton}
                </div>
            </React.Fragment>
        )
        
    }
}
