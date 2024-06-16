import React, { useEffect, useState } from "react";
import axios from "axios";

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

	return (
		<div>
			<h1>Today's MLB Matchups</h1>
			{/* <pre>{JSON.stringify(matchups, null, 2)}</pre> */}
			{matchups.map((matchup, index) => {
				console.log(matchup); // Log the matchup object to see its structure
				return (
					<div key={index}>
                        <h1>Game {index+1}</h1>
						<h3>
							Away Team:{" "}
							{matchup.away.team_data?.team?.name || "Data not available"}
						</h3>
						<p>
							Starting Pitcher:{" "}
							{matchup.away?.sp || "Data not available"}
						</p>
						<p>
							Wins:{" "}
							{matchup.away.team_data?.wins !== undefined
								? matchup.away.team_data.wins
								: "Data not available"}
						</p>
						<p>
							Losses:{" "}
							{matchup.away.team_data?.losses !== undefined
								? matchup.away.team_data.losses
								: "Data not available"}
						</p>
                        <p>
                            Run Differential:{" "}
							{matchup.away.team_data?.runDifferential !== undefined
								? matchup.away.team_data.runDifferential
								: "Data not available"}
                        </p>
                        <p>
                            Current Streak:{" "}
							{matchup.away.team_data?.streak.streakCode !== undefined
								? matchup.away.team_data.streak.streakCode
								: "Data not available"}
                        </p>

						<h3>
							Home Team:{" "}
							{matchup.home.team_data?.team?.name || "Data not available"}
						</h3>
						<p>
                            Starting Pitcher:{" "}
							{matchup.home?.sp || "Data not available"}
						</p>
						<p>
							Wins:{" "}
							{matchup.home.team_data?.wins !== undefined
								? matchup.home.team_data.wins
								: "Data not available"}
						</p>
						<p>
							Losses:{" "}
							{matchup.home.team_data?.losses !== undefined
								? matchup.home.team_data.losses
								: "Data not available"}
						</p>
                        <p>
							Run Differential:{" "}
							{matchup.home.team_data?.runDifferential !== undefined
								? matchup.home.team_data.runDifferential
								: "Data not available"}
						</p>
                        <p>
                            Current Streak:{" "}
							{matchup.home.team_data?.streak.streakCode !== undefined
								? matchup.home.team_data.streak.streakCode
								: "Data not available"}
                        </p>




                        <h1>___________________________________</h1>
                        
					</div>
				);
			})}{" "}
		</div>
	);
};

export default Matchups;
