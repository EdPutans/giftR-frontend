import Dropzone from 'react-dropzone'
import request from 'superagent'
import React from 'react'
// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dotvnvsga/upload'
// const CLOUDINARY_UPLOAD_PRESET   =  'eeeeee'
const loadingGif = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'

export default class Uploader extends React.Component {


    state = {
        uploading: false,
        uploadedImageURL: ''
    }


    handleImageUpload(file) {
        this.setState({uploading:true})
        let upload = request.post('https://api.cloudinary.com/v1_1/dotvnvsga/image/upload')
            .field('upload_preset', 'eeeeee')
            .field('file', file)

        upload.end((err, response) => {
            if (err) {
                console.error(err)
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedImageURL: response.body.secure_url,
                    uploading: false
                })
                this.props.propFunction && this.props.propFunction(this.state.uploadedImageURL)
            }
        })
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0]
        })

        this.handleImageUpload(files[0])
    }


    render() {
        return <div>
            { this.state.uploadedImageURL && <div>
                { this.state.uploadedImageURL === '' ? <img style={ { height: '200px', width: 'auto', margin: ' 15px auto 15px auto', display: 'block', border: '1px dotted black', borderRadius: '3px', textAlign: 'center' } } src={ this.props.profilePicURL } /> :
                    <div>
                        <img alt='uploaded file' style={ { height: '200px', width: 'auto', margin: ' 15px auto 15px auto', display: 'block', border: '1px dotted black', borderRadius: '3px', textAlign: 'center' } } src={ this.state.uploading ? loadingGif : this.state.uploadedImageURL } />
                        </div>
                    } 
            </div>}
            <div style={ { height: '100px', width: '300px', margin: 'auto', display: 'block', border: '1px dotted black', borderRadius:'3px', textAlign: 'center' } }>
                <Dropzone multiple={false} onDrop={ this.onImageDrop }>
                    { ({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div>
                            <div
                                { ...getRootProps() }
                            >
                                <input { ...getInputProps() } />
                                {
                                    isDragActive ?
                                        <p>Drop the bad boy here</p> :
                                        <div>
                                            <p>Drop profile pic here or click to select one.</p>
                                            <h1>+</h1>
                                        </div>
                                }
                            </div>
                        </div>
                        )
                    } }
                </Dropzone>
            </div>

               
            
        </div>
    }

}