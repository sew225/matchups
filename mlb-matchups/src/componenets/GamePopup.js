import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const GamePopup = ({ game, onClose }) => {
  return (
    <Dialog open={!!game} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{`${game.away.team_data.team.name} vs ${game.home.team_data.team.name}`}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              Away Team: {game.away.team_data.team.name}
            </Typography>
            <Typography variant="body1">
              Starting Pitcher: {game.away.sp}
            </Typography>
            <Typography variant="body1">
              Record: {game.away.team_data.wins}-{game.away.team_data.losses}
            </Typography>
            <Typography variant="body1">
              Run Differential: {game.away.team_data.runDifferential}
            </Typography>
            <Typography variant="body1">
              Current Streak: {game.away.team_data.streak.streakCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              Home Team: {game.home.team_data.team.name}
            </Typography>
            <Typography variant="body1">
              Starting Pitcher: {game.home.sp}
            </Typography>
            <Typography variant="body1">
              Record: {game.home.team_data.wins}-{game.home.team_data.losses}
            </Typography>
            <Typography variant="body1">
              Run Differential: {game.home.team_data.runDifferential}
            </Typography>
            <Typography variant="body1">
              Current Streak: {game.home.team_data.streak.streakCode}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GamePopup;
