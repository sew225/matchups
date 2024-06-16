import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/system";
import GamePopup from "./GamePopup";
import axios from "axios";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Matchups = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await axios.get("/api/matchups");
        setMatchups(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMatchups();
  }, []);

  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleClosePopup = () => {
    setSelectedGame(null);
  };

  return (
    <Paper elevation={3}>
      <List>
        {matchups.map((game, index) => (
          <StyledListItem
            button
            key={index}
            onClick={() => handleGameClick(game)}
            divider
          >
            <ListItemText
              primary={`${game.time}`}
              secondary={`${game.away.team_data.team.name} vs ${game.home.team_data.team.name}`}
            />
          </StyledListItem>
        ))}
      </List>
      {selectedGame && (
        <GamePopup game={selectedGame} onClose={handleClosePopup} />
      )}
    </Paper>
  );
};

export default Matchups;
