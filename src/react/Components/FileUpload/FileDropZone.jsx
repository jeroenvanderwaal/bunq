import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import FileUpload from "material-ui-icons/FileUpload";
import Dropzone from "react-dropzone";

const contentSize = 320;

const styles = theme => ({
    dropZone: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // border styling
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5
    },
    fileUploadIcon: {
        width: "100%",
        height: "100%"
    },
    imagePreview: {
        width: "auto",
        maxWidth: contentSize,
        height: "auto",
        maxHeight: contentSize
    }
});

class FileDropZone extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            imagePreviewUrl: false
        };
    }

    handleFileDrop = (allowedFiles, blockedFiles) => {
        const reader = new FileReader();
        const file = allowedFiles[0];

        if (!file) return;

        reader.onloadend = () => {
            this.props.onChange(file);
            this.setState({
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    render() {
        const { classes, customClasses } = this.props;
        const finalClasses = { ...classes, ...customClasses };
        return (
            <Dropzone
                accept="image/jpeg, image/png, image/gif"
                onDrop={this.handleFileDrop}
                className={finalClasses.dropZone}
                style={this.props.dropZoneStyle}
            >
                {this.state.imagePreviewUrl ? (
                    <img
                        src={this.state.imagePreviewUrl}
                        className={finalClasses.imagePreview}
                        style={this.props.imagePreviewStyle}
                    />
                ) : (
                    <FileUpload
                        className={finalClasses.fileUploadIcon}
                        style={this.props.imageUploadIconStyle}
                    />
                )}
            </Dropzone>
        );
    }
}

FileDropZone.defaultProps = {
    dropZoneStyle: {},
    imagePreviewStyle: {},
    imageUploadIconStyle: {}
};

FileDropZone.propTypes = {
    onChange: PropTypes.func.isRequired,
    dropZoneStyle: PropTypes.object,
    imagePreviewStyle: PropTypes.object,
    imageUploadIconStyle: PropTypes.object
};

export default withStyles(styles)(FileDropZone);
