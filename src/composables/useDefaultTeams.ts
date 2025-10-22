import { Leagues } from 'src/models';
import { useQuery } from '@tanstack/vue-query';
import { SeasonId } from 'src/models/leagues';
import { getTeamsByName } from 'src/dbqueries/teamsDefault';

// const useDefaultTeams = (league: Leagues, teamId?: number) => {
const useDefaultTeams = (league: Leagues) => {
  const queryTeams2526summer = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2025_2026_Summer}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2025_2026_Summer),
  });
  const queryTeams2526Winter = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2025_2026_Winter}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2025_2026_Winter),
  });
  const queryTeams2627summer = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2026_2027_Summer}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2026_2027_Summer),
  });
  const queryTeams2627Winter = useQuery({
    queryKey: [`default-teams-${SeasonId.Season_2026_2027_Winter}-${league}`],
    queryFn: () => getTeamsByName(league, SeasonId.Season_2026_2027_Winter),
  });

  // const queryTeamById = useQuery({
  //   queryKey: [`default-team-${league}`, teamId],
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   queryFn: () => getTeamById(league, teamId!),
  // });

  return {
    // queryTeams,
    // queryTeamById,
    queryTeams2526summer,
    queryTeams2526Winter,
    queryTeams2627summer,
    queryTeams2627Winter,
  };
};

export default useDefaultTeams;
