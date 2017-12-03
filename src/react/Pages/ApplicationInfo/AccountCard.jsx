import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import List, {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction
} from "material-ui/List";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import AccountBalanceIcon from "material-ui-icons/AccountBalance";
import PhoneIcon from "material-ui-icons/Phone";
import EmailIcon from "material-ui-icons/Email";
import PersonIcon from "material-ui-icons/Person";
import LinkIcon from "material-ui-icons/Link";

import LazyAttachmentImage from "../../Components/AttachmentImage/LazyAttachmentImage";
import AccountQRFullscreen from "../../Components/QR/AccountQRFullscreen";
import UploadFullscreen from "../../Components/FileUpload/UploadFullscreen";
import { formatMoney } from "../../Helpers/Utils";

const styles = {
    avatar: {
        width: 60,
        height: 60
    }
};

class AccountCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            displayUploadScreen: false
        };
    }

    copiedValue = type => callback => {
        this.props.openSnackbar(`Copied ${type} to your clipboard`);
    };

    render() {
        const { account } = this.props;
        const formattedBalance = formatMoney(
            account.balance ? account.balance.value : 0
        );

        const accountBalanceText = this.props.hideBalance
            ? "HIDDEN"
            : formattedBalance;

        return (
            <Paper>
                <UploadFullscreen
                    BunqJSClient={this.props.BunqJSClient}
                    open={this.state.displayUploadScreen}
                    handleRequestClose={_ =>
                        this.setState({
                            displayUploadScreen: false
                        })}
                />
                <List>
                    <ListItem>
                        <Avatar
                            style={styles.avatar}
                            onClick={_ =>
                                this.setState({
                                    displayUploadScreen: true
                                })}
                        >
                            <LazyAttachmentImage
                                width={60}
                                BunqJSClient={this.props.BunqJSClient}
                                imageUUID={
                                    account.avatar.image[0]
                                        .attachment_public_uuid
                                }
                            />
                        </Avatar>
                        <ListItemText
                            primary={account.description}
                            secondary={accountBalanceText}
                        />
                        <ListItemSecondaryAction>
                            <AccountQRFullscreen accountId={account.id} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    {account.alias.map(alias => {
                        let icon = <PersonIcon />;
                        switch (alias.type) {
                            case "EMAIL":
                                icon = <EmailIcon />;
                                break;
                            case "PHONE_NUMBER":
                                icon = <PhoneIcon />;
                                break;
                            case "IBAN":
                                icon = <AccountBalanceIcon />;
                                break;
                            case "URL":
                                icon = <LinkIcon />;
                                break;
                        }

                        return (
                            <ListItem button dense={true}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <CopyToClipboard
                                    text={alias.value}
                                    onCopy={this.copiedValue(alias.type)}
                                >
                                    <ListItemText primary={alias.value} />
                                </CopyToClipboard>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        );
    }
}

export default AccountCard;
