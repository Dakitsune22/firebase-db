import { useQuery } from '@tanstack/vue-query';
import useSoccer from './storeWrappers/useSoccer';
import {
  countTotalRounds,
  getRound,
  getTotalRounds,
} from 'src/dbqueries/rounds';

const { getCurrentLeague } = useSoccer();

const useRounds = () => {
  const queryRound = useQuery({
    queryKey: [`current-round-${getCurrentLeague()}`],
    queryFn: getRound,
  });

  const queryTotalRounds = useQuery({
    queryKey: [`total-rounds-${getCurrentLeague()}`],
    queryFn: getTotalRounds,
  });

  const queryCountRounds = useQuery({
    queryKey: [`count-rounds-${getCurrentLeague()}`],
    queryFn: countTotalRounds,
    enabled: false, // para que no se ejecute automáticamente al lanzar este composable
  });

  return {
    queryRound,
    queryTotalRounds,
    queryCountRounds,
  };
};

export default useRounds;
