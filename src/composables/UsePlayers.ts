import { useQuery } from '@tanstack/vue-query';
import useSoccer from './storeWrappers/useSoccer';
import { getPlayersByGoalsScored } from 'src/dbqueries/players';

const { getCurrentLeague } = useSoccer();

const usePlayers = () => {
  const queryTopScorers = useQuery({
    queryKey: [`top-scorers-${getCurrentLeague()}`],
    queryFn: getPlayersByGoalsScored,
  });

  return {
    queryTopScorers,
  };
};

export default usePlayers;
