import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";

import EndedIcon from "@material-ui/icons/AccessTime";
import ExpiredIcon from "@material-ui/icons/TimerOff";

import LinearProgressCustom from "../LinearProgress";
import NavLink from "../Routing/NavLink";

import { formatMoney, humanReadableDate } from "../../Helpers/Utils";

const styles = {
    listItem: {
        padding: 8
    },
    headerTextsGrid: {
        padding: "4px 22px",
        paddingBottom: 12
    },
    currentAmountGrid: {
        padding: 8
    },
    currentAmountText: {
        textAlign: "right"
    },
    linearProgressWrapper: {
        display: "flex",
        alignItems: "center"
    },
    progressLabels: {
        textAlign: "center"
    },
    progressLabelGrid: {
        position: "relative",
        height: 20
    },
    progressLabel: {
        position: "absolute"
    }
};

export default props => {
    const { t, savingsGoal, accounts } = props;
    const { startAmount, savedAmount, goalAmount, percentage } = savingsGoal.getStatistics(accounts);

    const startAmountText = formatMoney(startAmount);
    const savedAmountText = formatMoney(savedAmount);
    const endAmountText = formatMoney(goalAmount);

    const minusAmount = percentage < 10 ? 10 : 15;
    const progressLabelStyle = { ...styles.progressLabel, left: `calc(${percentage}% - ${minusAmount}px` };

    return (
        <Grid item xs={12}>
            <Paper>
                <ListItem
                    button
                    component={NavLink}
                    to={`/savings-goal-page/${savingsGoal.id}`}
                    style={styles.listItem}
                >
                    <Grid container>
                        <Grid item xs={12} sm={8} md={9} style={styles.headerTextsGrid}>
                            <Typography variant="h5" style={styles.title}>
                                {savingsGoal.title}
                            </Typography>
                            {savingsGoal.description && (
                                <Typography variant="body1">{savingsGoal.description}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} style={styles.currentAmountGrid}>
                            <Typography variant="h6" style={styles.currentAmountText}>
                                {savedAmountText}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} sm={2} md={1}>
                            <Typography variant="body2" style={styles.progressLabels}>
                                {startAmountText}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={8} md={10} style={styles.linearProgressWrapper}>
                            <LinearProgressCustom value={percentage} color={savingsGoal.color || "primary"} />
                        </Grid>
                        <Grid item xs={4} sm={2} md={1}>
                            <Typography variant="body2" style={styles.progressLabels}>
                                {endAmountText}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} sm={2} md={1} />
                        <Grid item xs={4} sm={8} md={10} style={styles.progressLabelGrid}>
                            <div style={progressLabelStyle}>
                                <Typography variant="body2">{percentage.toFixed(1)}%</Typography>
                            </div>
                        </Grid>

                        {savingsGoal.isEnded && (
                            <Grid item xs={12}>
                                <ListItem dense>
                                    <ListItemIcon>
                                        <EndedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={humanReadableDate(savingsGoal.ended)} secondary="Ended" />
                                </ListItem>
                            </Grid>
                        )}

                        {savingsGoal.isExpired && (
                            <Grid item xs={12}>
                                <ListItem dense>
                                    <ListItemIcon>
                                        <ExpiredIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={humanReadableDate(savingsGoal.expires)}
                                        secondary="Expired"
                                    />
                                </ListItem>
                            </Grid>
                        )}
                    </Grid>
                </ListItem>
            </Paper>
        </Grid>
    );
};
