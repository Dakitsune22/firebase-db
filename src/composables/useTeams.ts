import { Leagues } from 'src/models';
import { useQuery } from '@tanstack/vue-query';
import {
  getTeamById,
  getTeamsById,
  getTeamsByName,
  getTeamsByPoints,
} from 'src/dbqueries/teams';

const useTeams = (league: Leagues, id?: number) => {
  const queryTeamsByPoints = useQuery({
    queryKey: [`teams-by-points-${league}`],
    queryFn: () => getTeamsByPoints(league),
  });

  const queryTeamsByName = useQuery({
    queryKey: [`teams-by-name-${league}`],
    queryFn: () => getTeamsByName(league),
  });

  const queryTeamsById = useQuery({
    queryKey: [`teams-by-id-${league}`],
    queryFn: () => getTeamsById(league),
  });

  const queryTeamById = useQuery({
    queryKey: [`team-${league}`, id],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getTeamById(league, id!),
  });

  return {
    queryTeamsByPoints,
    queryTeamsByName,
    queryTeamsById,
    queryTeamById,
  };
};

export default useTeams;
