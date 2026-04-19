import CafeInfo from "../Cafe_info/CafeInfo";
import VoteOptions from "../Vote_options/VoteOptions";
import VoteStats from "../vote_stats/VoteStats";
import Notification from "../Notification/Notification";
import css from "./App.module.css";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
}

export default function App() {
  const [votes, setVotes] = useState<Votes>(initialVotes);
  
  const handleVote = (voteType: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voteType]: prevVotes[voteType] + 1,
    }));
  };
  const resetVotes = () => {
    setVotes(initialVotes);
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

const positiveRate = totalVotes
  ? Math.round((votes.good / totalVotes) * 100)
  : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
          <Notification />
      )}
    </div>
  );
}



