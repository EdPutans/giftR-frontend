import Dropzone from 'react-dropzone'
import request from 'superagent'
import React from 'react'
// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dotvnvsga/upload'
// const CLOUDINARY_UPLOAD_PRESET   =  'eeeeee'

export default class Uploader extends React.Component{


    state={
        uploadedImageURL: ''
    }


    handleImageUpload(file) {
        let upload = request.post('https://api.cloudinary.com/v1_1/dotvnvsga/image/upload')
            .field('upload_preset', 'eeeeee')
            .field('file', file)

        upload.end((err, response) => {
            if (err) {
                console.error(err)
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedImageURL: response.body.secure_url
                })
            }
        })
    }

    onImageDrop= (files)=> {
        this.setState({
            uploadedFile: files[0]
        })

        this.handleImageUpload(files[0])
    }


    render() {
       return <div>
               <Dropzone onDrop={ this.onImageDrop }>
                   { ({ getRootProps, getInputProps, isDragActive }) => {
                       return (
                           <div
                               { ...getRootProps() }
                           >
                               <input { ...getInputProps() } />
                               {
                                   isDragActive ?
                                       <p>Drop files here...</p> :
                                       <p>Try dropping some files here, or click to select files to upload.</p>
                               }
                           </div>
                       )
                   } }
               </Dropzone>
          
           
            <div>
                { this.state.uploadedImageURL === '' ? null :
                    <div>
                        <img src={ this.state.uploadedImageURL } style={{maxWidth: '300px', height: 'auto'}}/>
                    </div> }
            </div>
        </div>
    }

}