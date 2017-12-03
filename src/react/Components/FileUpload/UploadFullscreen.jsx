import React from "react";
import withStyles from "material-ui/styles/withStyles";
import Dialog from "material-ui/Dialog";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Slide from "material-ui/transitions/Slide";
import FileDropZone from "./FileDropZone";

const Transition = props => <Slide direction={"up"} {...props} />;

const contentSize = 320;

const styles = theme => ({
    dialog: {
        marginTop: 50
    },
    header: {
        textAlign: "center"
    },
    content: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    contentWrapper: {
        width: contentSize,
        minHeight: contentSize
    },
    uploadButton: {
        width: "100%"
    }
});

class UploadFullscreen extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            file: false
        };
    }

    onFileChange = file => this.setState({ file });

    startUpload = () => {
        this.props.BunqJSClient.api.attachmentPublic
            .post(this.state.file)
            .then(console.log)
            .catch(console.error);
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                fullScreen
                className={classes.dialog}
                open={this.props.open}
                onRequestClose={this.props.handleRequestClose}
                onClick={this.props.handleRequestClose}
                onEscapeKeyUp={this.props.handleRequestClose}
                onBackdropClick={this.props.handleRequestClose}
                transition={Transition}
            >
                <div className={classes.content}>
                    <div className={classes.contentWrapper}>
                        <Typography
                            type={"headline"}
                            className={classes.header}
                        >
                            {this.props.headlineText}
                        </Typography>
                        <FileDropZone onChange={this.onFileChange} />
                        <br />
                        {this.state.file !== false ? (
                            <Button
                                raised
                                className={classes.uploadButton}
                                onClick={this.startUpload}
                            >
                                {this.props.buttonText}
                            </Button>
                        ) : null}
                    </div>
                </div>
            </Dialog>
        );
    }
}

UploadFullscreen.defaultProps = {
    headlineText: "Upload a new avatar",
    buttonText: "Upload"
};

export default withStyles(styles)(UploadFullscreen);
